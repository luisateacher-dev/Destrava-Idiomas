import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Lock, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Copy, 
  Check, 
  Clock, 
  ArrowRight, 
  Loader2, 
  AlertCircle 
} from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const [activeTab, setActiveTab] = useState<"pix" | "card">("pix");
  const [copiedPix, setCopiedPix] = useState(false);
  const [pixTime, setPixTime] = useState(600); // 10 minutes
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Card states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardError, setCardError] = useState("");

  const pixKey = "00020101021126750014br.gov.bcb.pix0136e6a13c4c-3f2d-4560-84c0-df93dbb790fc520400005303986540537.005802BR5921MetodoDestravaIdiomas6009SAO_PAULO62070503***6304ED3A";

  // Countdown timer for Pix
  useEffect(() => {
    if (!isOpen || activeTab !== "pix") return;
    const interval = setInterval(() => {
      setPixTime((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, activeTab]);

  const formatPixTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const copyPixToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formattedValue.substring(0, 19));
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setCardExpiry(value.substring(0, 5));
  };

  const simulateCheckout = () => {
    if (activeTab === "card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        setCardError("Por favor, preencha todos os campos do cartão.");
        return;
      }
      if (cardNumber.length < 15) {
        setCardError("Número de cartão inválido.");
        return;
      }
      setCardError("");
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      onClose();
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="checkout-overlay" 
        className="fixed inset-0 bg-slate-900/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          id="checkout-container"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-auto text-slate-100"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-[#e6a13c]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-mono tracking-widest uppercase font-bold">Checkout Seguro SSL</span>
              </div>
              <h3 className="text-xl font-serif text-white font-semibold mt-1">Inscreva-se com Oferta Especial</h3>
            </div>
            <button 
              id="close-checkout"
              onClick={onClose} 
              className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Purchase Item Summary */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 font-medium">Você receberá:</p>
                <h4 className="font-semibold text-white text-md">Combo Método Destrava Idiomas + Áudio-Livro</h4>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                  Acesso imediato enviado por e-mail & disponível na tela
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through">R$ 79</span>
                <span className="block text-2xl font-serif text-[#e6a13c] font-black">R$ 37</span>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="grid grid-cols-2 gap-2 mb-6 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                id="tab-pix"
                type="button"
                className={`py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                  activeTab === "pix" 
                    ? "bg-[#e6a13c] text-slate-950 font-bold shadow" 
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={() => { setActiveTab("pix"); setCardError(""); }}
              >
                <QrCode className="w-4 h-4" />
                PIX (Imediato)
              </button>
              <button
                id="tab-card"
                type="button"
                className={`py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                  activeTab === "card" 
                    ? "bg-[#e6a13c] text-slate-950 font-bold shadow" 
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("card")}
              >
                <CreditCard className="w-4 h-4" />
                Cartão de Crédito
              </button>
            </div>

            {/* Tab: PIX */}
            {activeTab === "pix" && (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center p-4 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                  {/* Styled scanning QR Box */}
                  <div className="relative p-3 bg-white rounded-lg mb-3 shadow">
                    <div className="w-36 h-36 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                      <QrCode className="w-28 h-28 text-slate-900" />
                      {/* Laser scanner effect */}
                      <motion.div 
                        className="absolute left-0 right-0 h-0.5 bg-green-500"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <p className="text-xs text-slate-400">Escaneie o código acima com o aplicativo do seu banco</p>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 py-1 px-2.5 rounded-full mt-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Código Pix expira em: <b>{formatPixTime(pixTime)}</b></span>
                    </div>
                  </div>
                </div>

                {/* Pix copy and paste payload */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">Pix Copia e Cola:</label>
                  <div className="flex gap-2">
                    <input
                      id="pix-key-val"
                      type="text"
                      readOnly
                      value={pixKey}
                      className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-3 py-2 w-full text-slate-300 font-mono truncate select-all focus:outline-none"
                    />
                    <button
                      id="copy-pix-btn"
                      onClick={copyPixToClipboard}
                      className="bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 px-3 rounded-lg flex items-center justify-center transition-colors shrink-0"
                      title="Copiar Pix"
                    >
                      {copiedPix ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-300" />}
                    </button>
                  </div>
                  {copiedPix && (
                    <p className="text-xs text-green-400 font-medium">Código copiado com sucesso! Só colar no aplicativo do seu banco.</p>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Card */}
            {activeTab === "card" && (
              <div className="space-y-4">
                {cardError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs p-3 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{cardError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Nome impresso no cartão *</label>
                    <input
                      id="card-name-input"
                      type="text"
                      placeholder="JOÃO S SILVA"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors uppercase placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Número do cartão *</label>
                    <div className="relative">
                      <input
                        id="card-num-input"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors font-mono placeholder:text-slate-600"
                      />
                      <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Validade *</label>
                      <input
                        id="card-expiry-input"
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors font-mono placeholder:text-slate-600 text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">CVC / Código de segurança *</label>
                      <input
                        id="card-cvv-input"
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors font-mono placeholder:text-slate-600 text-center"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 flex items-center gap-1.5 bg-slate-900/20 p-2.5 rounded-lg border border-slate-900">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Criptografia ponta a ponta AES de 256 bits. Seus dados de cartão nunca são salvos em nenhum servidor.</span>
                </div>
              </div>
            )}

            {/* Action purchase Buttons */}
            <div className="mt-8 pt-4 border-t border-slate-900 space-y-3">
              <button
                id="submit-payment"
                disabled={isProcessing}
                onClick={simulateCheckout}
                className="w-full bg-gradient-to-r from-amber-500 to-[#e6a13c] hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-amber-500/10 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processando seu pagamento...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar Pagamento Seguro</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                id="simulate-free-checkout"
                type="button"
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setIsProcessing(false);
                    onSuccess();
                    onClose();
                  }, 500);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 font-medium py-2 px-4 rounded-lg transition-all"
              >
                Simular Pagamento Rápido (Acesso Imediato para Testes)
              </button>
            </div>
          </div>

          {/* Refund Footer Banner */}
          <div className="p-4 bg-slate-900/80 border-t border-slate-800 text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
            <p className="text-[11px] text-slate-400">
              <b>Garantia Incondicional de 7 Dias:</b> Se não destravar ou não gostar, devolvemos 100% do seu dinheiro.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
