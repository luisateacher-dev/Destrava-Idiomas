import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Headphones, 
  Calendar, 
  Search, 
  Volume2, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Download, 
  LogOut, 
  Flame, 
  Bookmark,
  Check,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { chaptersData, audioTracksData, dayPlansData, cheatSheetWordsData } from "../data";
import { Chapter, AudioTrack, DayPlan, CheatSheetWord } from "../types";

interface MembersAreaProps {
  onBackToLanding: () => void;
  onResetPurchase: () => void;
}

export default function MembersArea({ onBackToLanding, onResetPurchase }: MembersAreaProps) {
  const [activeTab, setActiveTab] = useState<"book" | "audio" | "plan" | "cheat">("book");
  
  // Book Reading states
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chaptersData[0]);
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    const saved = localStorage.getItem("destrava_completed_chapters");
    return saved ? JSON.parse(saved) : [];
  });

  // Audio Player states
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0); // in percentage
  const [audioElapsed, setAudioElapsed] = useState(0); // in seconds
  const [playbackRate, setPlaybackRate] = useState(1); // 1x, 1.25x, 1.5x

  // 7 Day Plan states
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    const saved = localStorage.getItem("destrava_completed_days");
    return saved ? JSON.parse(saved) : [];
  });
  const [dayNotes, setDayNotes] = useState<{ [key: number]: string }>(() => {
    const saved = localStorage.getItem("destrava_day_notes");
    return saved ? JSON.parse(saved) : {};
  });

  // Cheatsheet states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Audio track configuration
  const currentTrack: AudioTrack = audioTracksData[currentTrackIndex];

  // Save Book progress
  const toggleChapterComplete = (id: string) => {
    const updated = completedChapters.includes(id)
      ? completedChapters.filter((cId) => cId !== id)
      : [...completedChapters, id];
    setCompletedChapters(updated);
    localStorage.setItem("destrava_completed_chapters", JSON.stringify(updated));
  };

  // Audio Player Simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioElapsed((prev) => {
          const next = prev + 1;
          if (next >= currentTrack.seconds) {
            // Track finished, stop or skip
            setIsPlaying(false);
            setAudioProgress(100);
            return currentTrack.seconds;
          }
          setAudioProgress((next / currentTrack.seconds) * 100);
          return next;
        });
      }, 1000 / playbackRate);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, playbackRate]);

  // Audio track control handlers
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (direction: "next" | "prev") => {
    setIsPlaying(false);
    setAudioProgress(0);
    setAudioElapsed(0);
    if (direction === "next") {
      setCurrentTrackIndex((prev) => (prev + 1) % audioTracksData.length);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + audioTracksData.length) % audioTracksData.length);
    }
  };

  const handleSpeedToggle = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
  };

  const speakText = (text: string, id: string, lang = "en-US") => {
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        setSpeakingId(id);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.95;
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Sua máquina não suporta audição de áudio por inteligência em tempo real.");
      }
    } catch {
      setSpeakingId(null);
    }
  };

  // Save Day notes
  const handleSaveNote = (day: number, note: string) => {
    const updated = { ...dayNotes, [day]: note };
    setDayNotes(updated);
    localStorage.setItem("destrava_day_notes", JSON.stringify(updated));
  };

  // Toggle Day completion
  const toggleDayComplete = (day: number) => {
    const updated = completedDays.includes(day)
      ? completedDays.filter((d) => d !== day)
      : [...completedDays, day];
    setCompletedDays(updated);
    localStorage.setItem("destrava_completed_days", JSON.stringify(updated));
  };

  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = Math.floor(totalSecs % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Filter cheatsheet phrases
  const filteredPhrases = cheatSheetWordsData.filter((item) => {
    const matchesSearch = item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate Streak or Progress percentage
  const totalItemsCount = chaptersData.length + dayPlansData.length;
  const completedItemsCount = completedChapters.length + completedDays.length;
  const progressPercentage = Math.round((completedItemsCount / totalItemsCount) * 100);

  return (
    <div id="members-dashboard" className="min-h-screen bg-[#fdfbf7] text-slate-800 flex flex-col antialiased">
      {/* Upper Navigation Bar */}
      <header className="bg-slate-950 text-white py-4 px-6 sticky top-0 z-40 shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              id="back-to-sales"
              onClick={onBackToLanding} 
              className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs transition-colors bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Site</span>
            </button>
            <div className="h-4 w-px bg-slate-800 hidden md:block" />
            <div className="flex flex-col">
              <span className="text-xs tracking-wider font-mono font-bold text-[#e6a13c] uppercase">Portal do Aluno</span>
              <h1 className="text-md sm:text-lg font-serif font-extrabold tracking-tight">Método Destrava Idiomas</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sync bar */}
            <div className="hidden md:flex items-center gap-2 bg-[#e6a13c]/10 px-3 py-1.5 rounded-full border border-[#e6a13c]/20">
              <Flame className="w-4 h-4 text-[#e6a13c] animate-pulse" />
              <span className="text-xs font-medium text-slate-300">Seu Progresso: <b className="text-white font-mono">{progressPercentage}%</b></span>
            </div>
            
            <button 
              id="logout-members"
              onClick={onResetPurchase}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 transition-colors py-1.5 px-2.5 hover:bg-red-500/10 rounded-lg border border-red-500/20"
              title="Sair do Portal e voltar ao início"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simular Nova Compra</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Panel grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* LEFT COMPACT NAVIGATION RAIL */}
        <nav className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0 pb-2 md:pb-0 scrollbar-none">
          <button
            id="nav-tab-book"
            onClick={() => setActiveTab("book")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "book" 
                ? "bg-[#0b1a30] text-white shadow-lg shadow-[#0b1a30]/10 font-bold" 
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📘 E-book (Leitor)</span>
          </button>

          <button
            id="nav-tab-audio"
            onClick={() => setActiveTab("audio")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "audio" 
                ? "bg-[#0b1a30] text-white shadow-lg shadow-[#0b1a30]/10 font-bold" 
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>🎧 Áudio-Livro Play</span>
          </button>

          <button
            id="nav-tab-plan"
            onClick={() => setActiveTab("plan")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "plan" 
                ? "bg-[#0b1a30] text-white shadow-lg shadow-[#0b1a30]/10 font-bold" 
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>📅 Plano 7 Dias</span>
          </button>

          <button
            id="nav-tab-cheat"
            onClick={() => setActiveTab("cheat")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "cheat" 
                ? "bg-[#0b1a30] text-white shadow-lg shadow-[#0b1a30]/10 font-bold" 
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>💬 Frases Coringa</span>
          </button>

          {/* Quick stats panel left */}
          <div className="hidden md:block mt-8 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/15">
            <div className="flex items-center gap-2 mb-2 text-amber-800">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Metas Concluídas</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Capítulos lidos:</span>
                <span className="font-semibold">{completedChapters.length} / {chaptersData.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Dias de plano:</span>
                <span className="font-semibold">{completedDays.length} / 7</span>
              </div>
            </div>
          </div>
        </nav>

        {/* RIGHT DISPLAY HUB CONTENT */}
        <main className="flex-1 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            
            {/* VIEW TAB: EBOOK READER */}
            {activeTab === "book" && (
              <motion.div
                key="book-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Chapters Index Rail Left */}
                <div className="lg:col-span-4 space-y-2 border-r border-slate-100 pr-0 lg:pr-6">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Tabela de Conteúdo</h3>
                  {chaptersData.map((chap) => {
                    const isSelected = selectedChapter.id === chap.id;
                    const isRead = completedChapters.includes(chap.id);
                    return (
                      <button
                        key={chap.id}
                        id={`chap-index-${chap.id}`}
                        onClick={() => setSelectedChapter(chap)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected 
                            ? "bg-slate-50 border-[#0b1a30]/30 shadow-xs" 
                            : "bg-white hover:bg-slate-50 border-slate-200/60"
                        }`}
                      >
                        <span className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center shrink-0 text-xs font-bold ${
                          isRead ? "bg-green-100 text-green-700" : isSelected ? "bg-slate-200 text-slate-800" : "bg-slate-100 text-slate-500"
                        }`}>
                          {isRead ? <Check className="w-3 h-3 stroke-[3px]" /> : chap.number[chap.number.length - 1]}
                        </span>
                        <div className="min-w-0">
                          <h4 className={`text-sm font-semibold truncate ${isSelected ? "text-slate-900" : "text-slate-700"}`}>{chap.title}</h4>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{chap.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Chapter Context Display Right */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <article className="space-y-6">
                    {/* Chapter Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full">{selectedChapter.number}</span>
                        {completedChapters.includes(selectedChapter.id) && (
                          <span className="text-xs font-mono font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3px]" /> Lido
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950 mt-2">{selectedChapter.title}</h2>
                      <p className="text-slate-500 italic text-md mt-1">{selectedChapter.subtitle}</p>
                    </div>

                    {/* Chapter Summary Callout */}
                    <div className="bg-slate-50 border-l-4 border-[#0b1a30] p-4 text-sm text-slate-700 font-medium">
                      {selectedChapter.summary}
                    </div>

                    {/* Chapter complete text body */}
                    <div className="space-y-5 text-slate-700 leading-relaxed font-serif">
                      {selectedChapter.sections.map((sect, sIdx) => (
                        <div key={sIdx} className="space-y-3">
                          <h3 className="text-lg font-serif font-bold text-slate-900 mt-2">{sect.title}</h3>
                          {sect.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="text-sm sm:text-base">{p}</p>
                          ))}

                          {/* Excercises panel */}
                          {sect.exercise && (
                            <div className="mt-4 p-5 bg-[#fbf9f4] border border-amber-500/15 rounded-2xl space-y-3 font-sans">
                              <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4" /> Desafio Prático do Capítulo
                              </h4>
                              <p className="text-sm font-semibold text-slate-800">{sect.exercise.title}</p>
                              <p className="text-xs text-slate-600 leading-normal">{sect.exercise.description}</p>
                              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700">
                                {sect.exercise.steps.map((st, stIdx) => (
                                  <li key={stIdx}>{st}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </article>

                  {/* Chapter Footer Actions */}
                  <div className="border-t border-slate-100 mt-8 pt-5 flex items-center justify-between">
                    <button
                      id="toggle-read-btn"
                      onClick={() => toggleChapterComplete(selectedChapter.id)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-colors flex items-center gap-2 ${
                        completedChapters.includes(selectedChapter.id)
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-slate-950 text-white hover:bg-slate-800"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{completedChapters.includes(selectedChapter.id) ? "Lido ✓" : "Completar Capítulo"}</span>
                    </button>

                    <button
                      id="tts-speak-chapter"
                      onClick={() => speakText(selectedChapter.summary, selectedChapter.id, "pt-BR")}
                      className={`text-xs gap-1.5 font-semibold text-slate-500 hover:text-slate-950 py-2 px-3 hover:bg-slate-100 rounded-lg flex items-center transition-colors ${
                        speakingId === selectedChapter.id ? "text-amber-600 font-bold" : ""
                      }`}
                    >
                      {speakingId === selectedChapter.id ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                          <span>Ouvindo resumo...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Ouvir Resumo por Áudio</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW TAB: AUDIO AUDIO-BOOK PLAYER */}
            {activeTab === "audio" && (
              <motion.div
                key="audio-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto flex flex-col items-center py-4"
              >
                {/* Audio cassette mockup cover visualization */}
                <div className="w-56 h-56 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-between p-6 shadow-xl relative overflow-hidden mb-8">
                  {/* Decorative ambient record background elements */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -right-16 -top-16 w-36 h-36 bg-[#e6a13c]/5 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between w-full items-center">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#e6a13c] font-bold">MÉTODO DESTRAVA</span>
                    <Headphones className="w-4 h-4 text-slate-500" />
                  </div>

                  <div className="text-center w-full z-10">
                    <h4 className="text-white font-serif text-lg font-bold truncate px-2">{currentTrack.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono tracking-wide">Trilha {currentTrackIndex + 1} de {audioTracksData.length}</p>
                  </div>

                  {/* Faux playback waveform animations */}
                  <div className="flex items-end justify-center gap-1 h-8 w-full">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((bar) => {
                      const heights = isPlaying 
                        ? [10, 40, 70, 20, 90, 30, 80, 50, 60, 20, 80, 40, 90, 30, 60] 
                        : [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
                      const height = heights[bar % heights.length];
                      return (
                        <motion.div
                          key={bar}
                          className="w-1 bg-[#e6a13c] rounded-full"
                          animate={{ height: `${height}%` }}
                          transition={isPlaying ? { duration: 0.8, repeat: Infinity, repeatType: "reverse", delay: bar * 0.05 } : {}}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Track Details */}
                <div className="text-center space-y-1 w-full mb-6">
                  <h3 className="text-xl font-bold text-slate-900">{currentTrack.title}</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">{currentTrack.description}</p>
                </div>

                {/* Audio Progress Slider bar */}
                <div className="w-full space-y-2 mb-6">
                  <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#0b1a30] transition-all"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                    <span>{formatSeconds(audioElapsed)}</span>
                    <span className="font-bold">{currentTrack.duration}</span>
                  </div>
                </div>

                {/* Controls Deck */}
                <div className="flex items-center justify-center gap-6 mb-8">
                  {/* Playback rate */}
                  <button
                    id="audio-rate"
                    onClick={handleSpeedToggle}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-slate-200"
                    title="Mudar velocidade"
                  >
                    {playbackRate}x
                  </button>

                  <button
                    id="audio-prev"
                    onClick={() => handleSkip("prev")}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-950 hover:bg-slate-50 hover:scale-105 transition-all outline-none"
                    title="Retroceder trilha"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    id="audio-play-pause"
                    onClick={handlePlayPause}
                    className="w-16 h-16 rounded-full bg-[#0b1a30] hover:bg-slate-800 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                    title={isPlaying ? "Pausar" : "Tocar"}
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
                  </button>

                  <button
                    id="audio-next"
                    onClick={() => handleSkip("next")}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-950 hover:bg-slate-50 hover:scale-105 transition-all outline-none"
                    title="Avançar trilha"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  {/* Speak trigger using Browser Synthesis API */}
                  <button
                    id="audio-native-speak"
                    onClick={() => speakText(currentTrack.title + ". " + currentTrack.description, currentTrack.id, "pt-BR")}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors ${
                      speakingId === currentTrack.id ? "bg-amber-100 border-amber-300 text-amber-700 animate-pulse" : ""
                    }`}
                    title="Resumo em voz sintetizada realista"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulated Playlist Index */}
                <div className="w-full border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 text-left">Trilhas Inclusas</h4>
                  <div className="space-y-1">
                    {audioTracksData.map((tr, index) => {
                      const isActive = index === currentTrackIndex;
                      return (
                        <button
                          key={tr.id}
                          id={`track-index-${tr.id}`}
                          onClick={() => {
                            setCurrentTrackIndex(index);
                            setIsPlaying(false);
                            setAudioProgress(0);
                            setAudioElapsed(0);
                          }}
                          className={`w-full text-left font-sans p-3 rounded-lg flex items-center justify-between text-sm transition-colors cursor-pointer ${
                            isActive 
                              ? "bg-[#0b1a30]/5 text-[#0b1a30] font-bold" 
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400">{index + 1}</span>
                            <span className="truncate">{tr.title}</span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono shrink-0 ml-4">{tr.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW TAB: 7 DAYS METHODICAL PLAN */}
            {activeTab === "plan" && (
              <motion.div
                key="plan-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-serif font-black text-slate-950">Plano de Prática Contínua de 7 Dias</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Sua jornada guiada de 15 minutos diários. Escreva notas e registre suas conclusões para acompanhar sua evolução.
                  </p>
                </div>

                {/* Progress banner 7 days */}
                <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                      <Flame className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-amber-900">Seu Progresso no plano</h4>
                      <p className="text-xs text-slate-500">Já concluiu {completedDays.length} dos 7 dias.</p>
                    </div>
                  </div>
                  <div className="w-1/3 max-w-xs space-y-1">
                    <div className="text-right text-xs font-mono font-bold text-amber-700">{Math.round((completedDays.length / 7) * 100)}%</div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-[#e6a13c] transition-all"
                        style={{ width: `${(completedDays.length / 7) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Day-by-Day Cards Loop */}
                <div className="space-y-4">
                  {dayPlansData.map((d) => {
                    const isDone = completedDays.includes(d.day);
                    return (
                      <div 
                        key={d.day} 
                        id={`plan-day-${d.day}`}
                        className={`border rounded-2xl p-5 sm:p-6 transition-all bg-white hover:shadow-xs ${
                          isDone ? "border-green-200/60 bg-green-500/[0.01]" : "border-slate-200"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <span className={`w-10 h-10 rounded-xl font-mono font-extrabold text-sm flex items-center justify-center shrink-0 ${
                              isDone ? "bg-green-100 text-green-700" : "bg-[#0b1a30]/5 text-[#0b1a30]"
                            }`}>
                              D{d.day}
                            </span>
                            <div>
                              <h4 className="font-bold text-slate-900 text-md">{d.title}</h4>
                              <p className="text-xs text-slate-500">{d.description}</p>
                            </div>
                          </div>

                          <button
                            id={`complete-day-${d.day}`}
                            onClick={() => toggleDayComplete(d.day)}
                            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                              isDone 
                                ? "bg-green-100 text-green-700" 
                                : "bg-slate-150 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{isDone ? "Dia Concluído ✓" : "Marcar como Concluído"}</span>
                          </button>
                        </div>

                        {/* Plan daily challenge instruction payload */}
                        <div className="space-y-3 pl-0 sm:pl-13 text-sm">
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                            <span className="text-[10px] font-mono tracking-widest font-bold text-[#e6a13c] uppercase block mb-1">AÇÃO RECOMENDADA:</span>
                            <p className="font-medium text-slate-800 text-xs sm:text-sm">{d.action}</p>
                          </div>

                          {/* Student workbook inputs */}
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-600">Bloco de notas do aluno / Atividade Prática *</label>
                            <textarea
                              id={`textarea-day-${d.day}`}
                              rows={2}
                              value={dayNotes[d.day] || ""}
                              placeholder="Inscreva aqui como correu seu treino diário, pensamentos, desafios..."
                              onChange={(e) => handleSaveNote(d.day, e.target.value)}
                              className="w-full font-serif bg-[#fdfbf7] border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                            />
                            {dayNotes[d.day] && (
                              <p className="text-[10px] text-green-600 font-medium">Salvo automaticamente no seu navegador ✓</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* VIEW TAB: CHEATSHEETS */}
            {activeTab === "cheat" && (
              <motion.div
                key="cheat-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-serif font-black text-slate-950">Tabela de Frases Coringa</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Coleções estratégicas de alta ressonância para preencher silêncios incômodos e dar tempo ao processador bucal do idioma.
                  </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                  <div className="relative w-full sm:max-w-xs">
                    <input
                      id="search-cheatsheet"
                      type="text"
                      placeholder="Pesquisar termo..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white pr-10 pl-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>

                  {/* Filter Categories */}
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
                    <button
                      id="filter-all"
                      onClick={() => setSelectedCategory("all")}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold select-none ${
                        selectedCategory === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Todas ({cheatSheetWordsData.length})
                    </button>
                    <button
                      id="filter-fluxo"
                      onClick={() => setSelectedCategory("fluxo")}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold select-none ${
                        selectedCategory === "fluxo" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Fluxo ☕
                    </button>
                    <button
                      id="filter-bloqueio"
                      onClick={() => setSelectedCategory("bloqueio")}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold select-none ${
                        selectedCategory === "bloqueio" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Segurança 🛡️
                    </button>
                    <button
                      id="filter-resposta"
                      onClick={() => setSelectedCategory("resposta-rapida")}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold select-none ${
                        selectedCategory === "resposta-rapida" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Ação Rápida ⚡
                    </button>
                  </div>
                </div>

                {/* Grid layout phrase list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPhrases.length > 0 ? (
                    filteredPhrases.map((it, idx) => (
                      <div 
                        key={idx}
                        id={`phrase-card-${idx}`} 
                        className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between group"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className={`text-[9px] uppercase font-mono px-2.5 py-0.5 rounded-full font-bold tracking-wider ${
                              it.category === "fluxo" ? "bg-amber-100 text-amber-800" :
                              it.category === "bloqueio" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {it.category === "fluxo" ? "Evitar vácuo / hesitar" :
                               it.category === "bloqueio" ? "Gerenciar bloqueio" : "Respostas rápidas"}
                            </span>

                            <button
                              id={`pronounce-btn-${idx}`}
                              onClick={() => speakText(it.phrase, `card-${idx}`)}
                              className={`p-1.5 rounded-lg text-slate-400 hover:text-[#0b1a30] hover:bg-slate-50 transition-colors shrink-0 cursor-pointer ${
                                speakingId === `card-${idx}` ? "bg-amber-100 text-amber-800 self-center animate-bounce" : ""
                              }`}
                              title="Tocar áudio"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-950 text-md sm:text-lg group-hover:text-[#0b1a30] transition-colors font-serif">{it.phrase}</h4>
                            <p className="text-xs text-slate-500 italic mt-0.5 font-sans font-medium">Pronúncia aproximada: [{it.pronunciationHint}]</p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 mt-2 space-y-1 text-sm font-sans">
                            <p className="text-slate-800 font-medium">Significado: <span className="text-slate-600 font-normal">{it.meaning}</span></p>
                            <p className="text-xs text-slate-600 italic"><b>Modo de usar:</b> "{it.example}"<br />({it.exampleMeaning})</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center text-slate-400 text-sm">
                      Nenhuma frase encontrada para sua pesquisa.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* Decorative footer members area */}
      <footer className="bg-slate-100 py-6 border-t border-slate-200 mt-auto text-center text-xs text-slate-500">
        <p className="max-w-md mx-auto leading-relaxed px-4">
          Método Destrava Idiomas © 2026. Todos os direitos reservados. <br />
          Para dúvidas, suporte ou reembolso imediato contate: <b className="text-slate-700">suporte@destravaidiomas.com.br</b>
        </p>
      </footer>
    </div>
  );
}
