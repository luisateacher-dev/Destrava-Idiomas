import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Headphones, 
  CheckCircle, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  User, 
  UserCheck, 
  Timer, 
  Bookmark, 
  Check 
} from "lucide-react";

import CheckoutModal from "./components/CheckoutModal";
import MembersArea from "./components/MembersArea";

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(() => {
    return localStorage.getItem("destrava_purchased") === "true";
  });
  
  // Controls whether the buyer is currently viewing their Portal (MembersArea)
  const [viewingPortal, setViewingPortal] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  // Limited time discount timer
  const [timeLeft, setTimeLeft] = useState(1140); // 19 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 1140));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Scroll listener for sticky footer CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePurchaseSuccess = () => {
    setIsPurchased(true);
    localStorage.setItem("destrava_purchased", "true");
    setViewingPortal(true);
  };

  const handleResetPurchase = () => {
    setIsPurchased(false);
    setViewingPortal(false);
    localStorage.removeItem("destrava_purchased");
    localStorage.removeItem("destrava_completed_chapters");
    localStorage.removeItem("destrava_completed_days");
    localStorage.removeItem("destrava_day_notes");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If the customer has purchased and wants to view their training materials dashboard
  if (viewingPortal && isPurchased) {
    return (
      <MembersArea 
        onBackToLanding={() => setViewingPortal(false)} 
        onResetPurchase={handleResetPurchase} 
      />
    );
  }

  const faqData = [
    {
      q: "Para qual idioma funciona?",
      a: "O método é aplicável a qualquer idioma. Os exemplos práticos do e-book usam principalmente inglês e espanhol, mas a lógica — e as causas psicológicas do bloqueio — é rigorosamente a mesma para francês, italiano, alemão ou qualquer outro idioma que você esteja aprendendo."
    },
    {
      q: "Precisa ter nível avançado para aproveitar?",
      a: "Não. O método foi criado exatamente para quem já tem alguma base elementar de gramática — do básico ao intermediário — mas trava por ansiedade performática na hora de usar o idioma na prática. Se você nunca estudou o idioma, recomendamos ter um vocabulário de sobrevivência básico antes de aplicar este método de destrave."
    },
    {
      q: "Como vou receber o livro e o áudio após a compra?",
      a: "Imediatamente após a confirmação do pagamento, os links para download do PDF e dos arquivos de áudio em MP3 são encaminhados para o seu e-mail de cadastro. Além disso, se você comprar agora, o acesso à nossa Área de Membros integrada na tela é liberado automaticamente de forma instantânea no portal."
    },
    {
      q: "O áudio-livro é apenas lido ou narrado?",
      a: "O áudio é narrado de forma orgânica e em tom de conversa natural — sem aquela leitura robótica ou teatral. A proposta é soar como um mentor experiente compartilhando segredos práticos do processo, facilitando para ouvir no trânsito, na academia, ou antes de dormir."
    },
    {
      q: "E se eu ler e achar que não resolveu meu problema?",
      a: "Temos total segurança na eficácia do material. Por isso, você conta com uma garantia incondicional de 7 dias inteiros. Se ler o livro, testar as técnicas do plano prático e sentir que não valeu o investimento, basta nos enviar um e-mail simples e devolveremos todo o seu valor investido, sem perguntas e sem atrito comercial."
    },
    {
      q: "Tem alguma forma de aprender mais além do livro?",
      a: "Sim! Para alunos que buscam destravar suas habilidades de conversação ainda mais rápido e preferem acompanhamento dinâmico, oferecemos turmas fechadas do Programa Prático de Mentoria Compartilhada. As instruções e convites para se candidatar são apresentados no final do livro digital."
    }
  ];

  return (
    <div id="landing-root" className="min-h-screen flex flex-col antialiased selection:bg-amber-400 selection:text-slate-900 bg-[#fdfbf7] text-slate-800">
      
      {/* Dynamic Trust Header Bar */}
      <header className="bg-slate-950/95 sticky top-0 z-40 backdrop-blur-md border-b border-white/[0.06] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 bg-[#e6a13c] text-slate-950 rounded-lg flex items-center justify-center font-extrabold font-serif text-lg tracking-tighter" title="Logo Método Destrava">D</span>
            <div className="flex flex-col">
              <span className="text-[10px] tracking-wider font-mono font-bold text-[#e6a13c] uppercase">MÉTODO DESTRAVA</span>
              <span className="text-xs sm:text-sm font-serif font-bold text-slate-100 italic">Conversação Desbloqueada</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button id="nav-how" onClick={() => scrollToSection("situations-segment")} className="hover:text-white transition-colors cursor-pointer">Como funciona</button>
            <button id="nav-method" onClick={() => scrollToSection("chapters-segment")} className="hover:text-white transition-colors cursor-pointer">O e-Book</button>
            <button id="nav-testimonials" onClick={() => scrollToSection("testimonials-segment")} className="hover:text-white transition-colors cursor-pointer">Depoimentos</button>
            <button id="nav-pricing" onClick={() => scrollToSection("pricing-segment")} className="hover:text-white transition-colors cursor-pointer">Preço Especial</button>
            <button id="nav-faq" onClick={() => scrollToSection("faq-segment")} className="hover:text-white transition-colors cursor-pointer">Perguntas</button>
          </nav>

          <div className="flex items-center gap-3">
            <a
              id="header-cta-hotmart"
              href="https://pay.hotmart.com/I105924235J?bid=1779378754025"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-[#e6a13c] hover:from-amber-600 hover:to-amber-500 text-slate-950 font-extrabold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all outline-none hover:scale-[1.02] cursor-pointer no-underline"
            >
              <span>Quero Destravar</span>
            </a>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO DISPLAY SCENE */}
      <section 
        id="hero-segment" 
        className="relative bg-[#0a192f] text-white pt-20 pb-24 px-4 sm:px-6 overflow-hidden border-b border-slate-900"
      >
        {/* Subtle luminous blurred backgrounds inside the container */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#e6a13c]/5 rounded-full blur-3xl" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#e6a13c]/10 text-[#e6a13c] px-4 py-1.5 rounded-full border border-[#e6a13c]/20 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Método Destrava Idiomas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-[1.12] text-slate-100">
            Você entende. <br />
            Mas <span className="text-[#e6a13c] italic font-normal underline decoration-wavy decoration-[#e6a13c]/30">trava</span> na hora de falar.
          </h2>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed font-sans">
            O problema real não é falta de vocabulário, inteligência ou talento. É apenas um padrão comportamental de autodefesa do cérebro que pode ser quebrado de vez com o método prático correto.
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            <a
              id="hero-checkout-trigger"
              href="https://pay.hotmart.com/I105924235J?bid=1779378754025"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-[#e6a13c] hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black py-4 px-8 rounded-xl shadow-lg hover:shadow-xl text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] cursor-pointer no-underline"
            >
              <span>Quero o livro + áudio-livro →</span>
            </a>
            <button 
              id="hero-understand-trigger"
              onClick={() => scrollToSection("situations-segment")}
              className="text-xs sm:text-sm text-slate-400 hover:text-white underline underline-offset-4 font-mono uppercase tracking-widest mt-1"
            >
              Entender primeiro
            </button>
          </div>

          {/* Core high-level specs list */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-12 border-t border-white/[0.06] text-center">
            <div id="badge-stat-1" className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.03]">
              <span className="block text-xl sm:text-3xl font-serif font-extrabold text-[#e6a13c]">7</span>
              <span className="text-[9px] sm:text-xs text-slate-400 font-medium">capítulos diretos no método</span>
            </div>
            <div id="badge-stat-2" className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.03]">
              <span className="block text-xl sm:text-3xl font-serif font-extrabold text-[#e6a13c]">+25min</span>
              <span className="text-[9px] sm:text-xs text-slate-400 font-medium">de áudio integrado de mentoria</span>
            </div>
            <div id="badge-stat-3" className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.03]">
              <span className="block text-xl sm:text-3xl font-serif font-extrabold text-[#e6a13c]">7 dias</span>
              <span className="text-[9px] sm:text-xs text-slate-400 font-medium">cronograma prático de ação</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE CONFLICT (Duas situações) */}
      <section 
        id="situations-segment" 
        className="py-20 px-4 sm:px-6 bg-[#fdfbf7] border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Você se reconhece aqui?</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-black text-slate-950 leading-tight">
              Duas situações que todo aprendiz de idioma conhece — e ninguém explica direito
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Situation Card 1 */}
            <div id="situation-card-1" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between">
              <div className="space-y-4 font-serif">
                <span className="text-xs font-sans font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full inline-block">SITUAÇÃO 1</span>
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed">
                  Alguém faz uma pergunta em outro idioma. Você entende perfeitamente. Sabe exatamente o que quer responder. Mas na hora de falar, a boca não abre. As palavras somem de forma misteriosa. Você sorri amiguinho, muda de assunto rapidamente e finge que não escutou direito.
                </p>
              </div>
            </div>

            {/* Situation Card 2 */}
            <div id="situation-card-2" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between">
              <div className="space-y-4 font-serif">
                <span className="text-xs font-sans font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full inline-block">SITUAÇÃO 2</span>
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed">
                  Você está ouvindo um podcast, uma série ou uma palestra. Os primeiros segundos vão perfeitamente bem. Aí surge uma palavra que você desconhece — apenas uma — e sua mente paralisa nela. Quando você se dá conta, já perdeu metade do conteúdo inteiro. A conclusão amarga de sempre é: "Eu não entendi nada."
                </p>
              </div>
            </div>

          </div>

          {/* Conclusive bold navy-callout box */}
          <div className="bg-[#0b1a30] text-center text-white rounded-2xl p-8 sm:p-10 text-md sm:text-xl border border-slate-900 shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#e6a13c]/5 rounded-full blur-2xl pointer-events-none" />
            <p className="font-serif leading-relaxed text-slate-200">
              Isso não é falta de inteligência. Não é falta de vocabulário. <br className="hidden sm:inline" />
              É apenas um <b className="text-[#e6a13c] font-black">padrão comportamental que você foi induzido a repetir</b> — e que pode ser quebrado rapidamente com a intervenção recomendada.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE DELIVERABLES (O Método) */}
      <section 
        id="chapters-segment" 
        className="py-20 px-4 sm:px-6 bg-[#faf8f3] border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">O que você vai receber</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
              O Método Destrava Idiomas
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Sete capítulos escritos de forma cirúrgica para estudantes que já possuem base teórica, mas travam na hora de falar livremente. Sem enrolação teórica inútil.
            </p>
          </div>

          {/* Chapters Grid list layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Cap 1 */}
            <div id="chapter-card-1" className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Cap. 01</span>
              <h4 className="font-serif font-black text-slate-900 text-sm mt-1">Não é falta de capacidade</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Entenda os dois tipos de bloqueio — na fala e na escuta — e adote o refrão mental que muda todo o processo de verbalização imediata.
              </p>
            </div>

            {/* Cap 2 */}
            <div id="chapter-card-2" className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Cap. 02</span>
              <h4 className="font-serif font-black text-slate-900 text-sm mt-1">Por que você trava</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                As 4 causas estruturais da timidez verbal: medo patológico do erro, perfeccionismo de tradução, estudo mecânico e treinamento inadequado de escuta.
              </p>
            </div>

            {/* Cap 3 */}
            <div id="chapter-card-3" className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Cap. 03</span>
              <h4 className="font-serif font-black text-slate-900 text-sm mt-1">As 5 regras do destrave</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Fale errado de forma assertiva. Simplifique absolutamente tudo. Repita com intenção real. Contém exercícios guiados integrados.
              </p>
            </div>

            {/* Cap 4 */}
            <div id="chapter-card-4" className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Cap. 04</span>
              <h4 className="font-serif font-black text-slate-900 text-sm mt-1">Ferramentas de improviso</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                As principais estruturas linguísticas "curinga", técnicas flexíveis de redirecionamento, e como operar um processo de audição tolerante em conversas.
              </p>
            </div>

            {/* Cap 5 */}
            <div id="chapter-card-5" className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Cap. 05</span>
              <h4 className="font-serif font-black text-slate-900 text-sm mt-1">Plano prático de 7 dias</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Um dia, uma ação dirigida. Rotina rápida de menos de 15 minutos para sair do silêncio claustrofóbico e pavimentar sua primeira conversa fluida.
              </p>
            </div>

            {/* Cap 6-7 */}
            <div id="chapter-card-6" className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Cap. 06-07</span>
              <h4 className="font-serif font-black text-slate-900 text-sm mt-1">Consolidação e Expansão</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Integração do método e diretrizes claras de escalada comportamental recomendadas para as semanas após a conclusão do e-book.
              </p>
            </div>

          </div>

          {/* Sub cards panel representing assets detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
              <span className="h-10 w-10 bg-slate-100 text-[#0b1a30] rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Livro Digital Completo</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  PDF diagramado de alta qualidade com 7 capítulos estruturados, exercícios direcionados, quadros explicativos, e tabela de frases práticas.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
              <span className="h-10 w-10 bg-slate-100 text-[#0b1a30] rounded-xl flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Áudio-Livro em Tom Conversacional</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Mais de 25 minutos de áudio sintonizado. Ouça como um podcast descontraído e absorva as técnicas no seu próprio tempo, em qualquer ambiente.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 4: THE CORE LAWS (Três Regras) */}
      <section 
        id="rules-segment" 
        className="py-20 px-4 sm:px-6 bg-[#0a192f] text-white border-b border-slate-900"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#e6a13c] uppercase">O coração do método</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
              Três regras que vão contra tudo que te ensinaram — e que funcionam por isso
            </h3>
          </div>

          <div className="space-y-8">
            
            {/* Rule 1 */}
            <div id="rule-item-1" className="flex gap-6 items-start">
              <span className="text-4xl sm:text-5xl font-serif font-black text-slate-700 select-none">01</span>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-100 font-serif">Fale errado mesmo, no início</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  A autoconfiança não antecede a prática ativa; ela surge após o acúmulo de tentativas. Você não se torna pronto para dialogar estudando infinitamente em silêncio — você se prepara abrindo a boca e expressando as palavras, mesmo que de forma imprecisa e truncada.
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div id="rule-item-2" className="flex gap-6 items-start">
              <span className="text-4xl sm:text-5xl font-serif font-black text-slate-700 select-none">02</span>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-100 font-serif">Simplifique absolutamente tudo</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Você costuma falhar porque tenta conjugar expressões complexas no idioma nativo sem ter o domínio técnico consolidado. A resposta inteligente não está em inflar o vocabulário, mas sim em manusear seu vocabulário atual de modo eficiente. Sentenças simples e exatas são infinitamente superiores a sentenças longas e bloqueadas.
                </p>
              </div>
            </div>

            {/* Rule 3 */}
            <div id="rule-item-3" className="flex gap-6 items-start">
              <span className="text-4xl sm:text-5xl font-serif font-black text-slate-700 select-none">03</span>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-100 font-serif">Repita frases completas com forte intenção</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  A repetição desatenta gera decoreba passiva ineficaz. Já a repetição intencional atua na fixação mecânica duradoura. O lobo temporal automatiza aquilo que é ensaiado com presença mental ativa, deixando as expressões guardadas prontas para uso imediato em situações de conversação real.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: SOCIAL TRUST (O que dizem) */}
      <section 
        id="testimonials-segment" 
        className="py-20 px-4 sm:px-6 bg-[#fdfbf7] border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0b1a30] uppercase">Opinião de quem aplicou</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-black text-slate-950">
              O que dizem quem aplicou o método
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Testimonial 1 */}
            <div id="testimonial-card-1" className="bg-white p-6 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-2xs">
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed font-serif">
                "Eu sempre tive total domínio gramatical mas na hora de conversar travava de dar suor frio. Baixei o livro por impulso e li em 2 horas. No outro dia, mudei a estratégia e consegui me expressar sem aquela autocobrança chata de concordância. Destravou uma chavinha mental importante sobre o que significa errar."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4">
                <span className="h-8 w-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold leading-none">ML</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Marina L.</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Analista Comercial, São Paulo</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div id="testimonial-card-2" className="bg-white p-6 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-2xs">
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed font-serif">
                "O capítulo focado em barreiras passivas de escuta foi revelador. Eu não percebia o quanto de informação eu perdia na conversa simplesmente porque parava em uma palavra que eu não sabia a tradução na minha cabeça. Foi sensacional, simples e incrivelmente prático."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4">
                <span className="h-8 w-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold leading-none">RC</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Rodrigo C.</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Arquiteto de Software, Belo Horizonte</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div id="testimonial-card-3" className="bg-white p-6 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-2xs">
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed font-serif">
                "Consumi todo o áudio-livro durante meus treinos na academia e voltei pra casa empolgada para praticar. É tudo muito lógico e as táticas fazem total sentido. Finalmente encontrei uma abordagem de autoajuda de idiomas que não me põe sentimentos de culpa por falhar na pronúncia."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4">
                <span className="h-8 w-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold leading-none">JF</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Juliana F.</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Professora Acadêmica, Recife</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: THE FINAL OFFER CARD */}
      <section 
        id="pricing-segment" 
        className="py-20 px-4 sm:px-6 bg-white border-b border-slate-200"
      >
        <div className="max-w-xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0b1a30] uppercase">A Oferta</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-black text-slate-950">
              Tudo que você precisa para sair do bloqueio
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Livro digital + áudio-livro completo e atualizações, por um único pagamento.
            </p>
          </div>

          {/* Golden outline dark pricing box */}
          <div id="offer-checkout-box" className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/35 relative overflow-hidden shadow-2xl">
            {/* Luminous accents */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#e6a13c]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <span className="bg-gradient-to-r from-amber-500 to-[#e6a13c] text-slate-950 font-mono font-extrabold text-[10px] uppercase py-1 px-3 rounded-md">
                  Oferta de Lançamento
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>Oferta expira em {formatTimer(timeLeft)}</span>
                </span>
              </div>

              {/* Bullet checklist benefits */}
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#e6a13c] mt-0.5 shrink-0" />
                  <span className="text-slate-200">Livro digital completo — 7 capítulos com táticas (acesso imediato)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#e6a13c] mt-0.5 shrink-0" />
                  <span className="text-slate-200">Áudio-livro integrado completo — mais de 25 minutos de mentoria</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#e6a13c] mt-0.5 shrink-0" />
                  <span className="text-slate-200">Plano prático de 7 dias — roteiro simples diário de 15 minutos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#e6a13c] mt-0.5 shrink-0" />
                  <span className="text-slate-200">Tabela de expressões curinga fundamentais</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#e6a13c] mt-0.5 shrink-0" />
                  <span className="text-slate-200">Acesso vitalício — salve na nuvem ou imprima quando desejar</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-slate-900 flex flex-col items-center">
                <div className="text-center">
                  <span className="text-sm text-slate-500 line-through">De R$79</span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-lg font-bold text-slate-400 font-serif">R$</span>
                    <span className="text-5xl font-serif font-black text-[#e6a13c]">37</span>
                  </div>
                  <span className="text-xs text-slate-400 font-serif lowercase mt-1 block">pagamento único • acesso vitalício imediato</span>
                </div>

                <a
                  id="offer-cta-checkout"
                  href="https://pay.hotmart.com/I105924235J?bid=1779378754025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 bg-gradient-to-r from-amber-500 to-[#e6a13c] hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black py-4 px-6 rounded-xl text-center flex items-center justify-center gap-2 hover:shadow-lg transition-transform hover:scale-[1.01] cursor-pointer no-underline"
                >
                  <span>Mecanização Imediata — Quero o livro</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-[10px] text-slate-500 uppercase font-mono mt-3 tracking-widest leading-none">
                  PIX • Cartão de Crédito • Boleto Bancário
                </p>
              </div>

              {/* SSL safe seal icon badges */}
              <div className="bg-[#0b1a30]/50 p-4 rounded-xl border border-slate-900/80 flex items-start gap-3 text-[11px] text-slate-400">
                <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p>
                  <b>Segurança Compra 100% Blindada.</b> Contamos com auditorias de nível corporativo e reembolso automático se o material não for útil ao seu aprendizado.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: CORE FAQ ACCORDIONS */}
      <section 
        id="faq-segment" 
        className="py-20 px-4 sm:px-6 bg-[#faf8f3] border-b border-slate-200"
      >
        <div className="max-w-2xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0b1a30] uppercase">Dúvidas Frequentes</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-black text-slate-950">
              Perguntas frequentes
            </h3>
          </div>

          <div className="space-y-3">
            {faqData.map((item, index) => {
              const isExpanded = faqExpanded === index;
              return (
                <div 
                  key={index} 
                  id={`faq-accordion-${index}`}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    id={`faq-toggle-${index}`}
                    onClick={() => setFaqExpanded(isExpanded ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 cursor-pointer"
                  >
                    <span className="font-serif text-sm sm:text-base">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180 text-[#e6a13c]" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 8: BOTTOM HERO CTA SCENE */}
      <section 
        id="bottom-cta-segment" 
        className="py-24 px-4 sm:px-6 bg-[#0a192f] text-white text-center border-b border-slate-950 overflow-hidden relative"
      >
        <div className="absolute left-1/2 -bottom-48 w-96 h-96 bg-[#e6a13c]/10 rounded-full blur-3xl -translate-x-1/2" />
        
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-5xl font-serif font-black text-slate-100 tracking-tight leading-tight">
            Você não era incapaz. <br />
            Você só estava sem direção.
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-xs sm:text-sm leading-relaxed font-sans">
            Agora você tem as técnicas exatas de improviso. Comece hoje mesmo investindo apenas 15 minutos em sua primeira prática ativa dirigida.
          </p>

          <a
            id="bottom-checkout-trigger"
            href="https://pay.hotmart.com/I105924235J?bid=1779378754025"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-gradient-to-r from-amber-500 to-[#e6a13c] hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black py-4 px-8 rounded-xl text-center inline-flex items-center justify-center gap-2 hover:shadow-lg transition-transform hover:scale-[1.01] cursor-pointer text-sm sm:text-base no-underline"
          >
            <span>Quero destravar meu idioma agora por R$37 →</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-12 px-4 sm:px-6 text-center text-[11px] border-t border-slate-900">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center gap-6 text-slate-400 mb-2">
            <button id="foot-pp" onClick={() => alert("Políticas de e-books em conformidade com as diretivas e leis de proteção ao consumidor vigentes.")} className="hover:text-white transition-colors cursor-pointer">Políticas de Privacidade</button>
            <span>•</span>
            <button id="foot-tou" onClick={() => alert("Os resultados das técnicas descritas no livro dependem estritamente da prática ativa recomendada.")} className="hover:text-white transition-colors cursor-pointer">Termos de Uso</button>
          </div>
          <p className="leading-relaxed">
            Método Destrava Idiomas é uma marca registrada por Luisa Idiomas Ltda. CNPJ 34.567.890/0001-99. <br />
            Todas as transações e pagamentos processados contam com selo e proteção de criptografia Secure Socket Layer (SSL).
          </p>
        </div>
      </footer>

      {/* STICKY FLOOR TICKER CTA BAR */}
      <AnimatePresence>
        {showStickyBar && !checkoutOpen && (
          <motion.div
            id="sticky-ticker-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-[#0b1a30] text-white border-t border-slate-800 px-4 py-3 sm:py-4 z-40 shadow-xl flex items-center justify-between gap-4 max-w-7xl mx-auto sm:rounded-t-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-4 truncate min-w-0">
              <span className="hidden sm:inline-flex h-8 w-8 bg-amber-500/10 text-[#e6a13c] rounded-lg items-center justify-center font-bold font-serif shrink-0">D</span>
              <div className="truncate">
                <h4 className="font-bold text-xs sm:text-sm text-slate-100 truncate">Combo Livro + Áudio-Livro completo por R$37</h4>
                <p className="text-[10px] text-amber-500 font-mono tracking-wide leading-none mt-0.5">Promoção expira em: <b>{formatTimer(timeLeft)}</b></p>
              </div>
            </div>

            <a
              id="sticky-bar-checkout-trigger"
              href="https://pay.hotmart.com/I105924235J?bid=1779378754025"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-[#e6a13c] hover:from-amber-600 hover:to-amber-500 text-slate-950 font-extrabold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs tracking-tight shrink-0 flex items-center justify-center gap-1.5 transition-all outline-none no-underline"
            >
              <span>Quero Comprar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout dialogue modal overlay hook */}
      <CheckoutModal 
        isOpen={checkoutOpen} 
        onClose={() => setCheckoutOpen(false)} 
        onSuccess={handlePurchaseSuccess} 
      />

    </div>
  );
}
