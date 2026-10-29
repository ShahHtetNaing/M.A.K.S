
import React, { useState, useEffect, useRef } from 'react';
import { Surah, Verse, LughatWord } from '../types';
import { fetchSurahContent, fetchSurahList } from '../services/quranService';
import { getLughatAnalysis, getVerseDeepAnalysis, openInGoogleTranslate } from '../services/groqService';
import PronounceButton from '../components/PronounceButton';
import { 
  ChevronRight, Search, Layers, Sparkles, Loader2, BookOpen, Globe, Info, 
  MapPin, Hash, MousePointer2, Music, ExternalLink, AlertCircle, Play, 
  Pause, Square, List, Type, ArrowRight 
} from 'lucide-react';

interface AyatSearchResult {
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
  number: number;
  text: string;
  numberInSurah: number;
}

const Quran: React.FC = () => {
  const [surahList, setSurahList] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<LughatWord | null>(null);
  const [analyzingWord, setAnalyzingWord] = useState(false);
  const [activeVerse, setActiveVerse] = useState<Verse | null>(null);
  const [deepAnalysis, setDeepAnalysis] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'surah' | 'ayat'>('surah');
  const [ayatResults, setAyatResults] = useState<AyatSearchResult[]>([]);
  const [isSearchingAyats, setIsSearchingAyats] = useState(false);
  const [viewMode, setViewMode] = useState<'read' | 'lughat'>('read');
  const [pendingScrollVerse, setPendingScrollVerse] = useState<number | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Audio Recital States
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const [isFullLoading, setIsFullLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadIndex = async () => {
      try {
        const list = await fetchSurahList();
        setSurahList(list);
      } catch (err) {
        setErrorStatus("Unable to load Surah list. Please check your internet connection.");
      }
    };
    loadIndex();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      loadSurah(selectedSurah.id);
    }
    return () => stopFullRecital();
  }, [selectedSurah]);

  useEffect(() => {
    if (!loading && pendingScrollVerse && verses.length > 0) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`verse-${pendingScrollVerse}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('bg-emerald-50');
          setTimeout(() => el.classList.remove('bg-emerald-50'), 2500);
        }
        setPendingScrollVerse(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, verses, pendingScrollVerse]);

  const loadSurah = async (id: number) => {
    setLoading(true);
    setDeepAnalysis(null);
    setActiveVerse(null);
    setErrorStatus(null);
    try {
      const data = await fetchSurahContent(id);
      setVerses(data);
    } catch (err) {
      setErrorStatus("Failed to load verses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAyatSearch = async () => {
    if (!searchQuery.trim()) return;
    
    const refMatch = searchQuery.match(/^(\d+)[:](\d+)$/);
    if (refMatch) {
      navigateToVerse(searchQuery);
      return;
    }

    setIsSearchingAyats(true);
    setErrorStatus(null);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/search/${searchQuery}/all/en.sahih`);
      const data = await response.json();
      if (data.status === 'OK') {
        setAyatResults(data.data.results);
      } else {
        setAyatResults([]);
      }
    } catch (e) {
      setErrorStatus("Failed to search ayats. Please try again.");
    } finally {
      setIsSearchingAyats(false);
    }
  };

  const playFullRecital = () => {
    if (!selectedSurah) return;
    if (audioRef.current && isFullPlaying) {
      audioRef.current.pause();
      setIsFullPlaying(false);
      return;
    }
    if (audioRef.current && !isFullPlaying && audioRef.current.src) {
      audioRef.current.play();
      setIsFullPlaying(true);
      return;
    }

    setIsFullLoading(true);
    const url = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${selectedSurah.id}.mp3`;
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.oncanplaythrough = () => {
      setIsFullLoading(false);
      audio.play();
      setIsFullPlaying(true);
    };
    audio.onended = () => {
      setIsFullPlaying(false);
      stopFullRecital();
    };
    audio.onerror = () => {
      setIsFullLoading(false);
      setErrorStatus("Failed to load recital. Please check your connection.");
    };
  };

  const stopFullRecital = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ''; 
      audioRef.current.load(); 
      audioRef.current = null;
    }
    setIsFullPlaying(false);
    setIsFullLoading(false);
  };

  const navigateToVerse = (ref: string) => {
    const parts = ref.split(':').map(Number);
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return;
    
    const [surahId, verseNum] = parts;
    const targetSurah = surahList.find(s => s.id === surahId);
    
    if (targetSurah) {
      if (selectedSurah?.id === surahId) {
        const el = document.getElementById(`verse-${verseNum}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('bg-emerald-50');
          setTimeout(() => el.classList.remove('bg-emerald-50'), 2500);
        }
      } else {
        setPendingScrollVerse(verseNum);
        setSelectedSurah(targetSurah);
      }
      setSearchQuery(''); 
    } else {
      setErrorStatus(`Surah ${surahId} not found.`);
    }
  };

  const handleWordClick = async (word: string, verseContext: string) => {
    setAnalyzingWord(true);
    setSelectedWord(null);
    setErrorStatus(null);
    try {
      const analysis = await getLughatAnalysis(word, verseContext);
      setSelectedWord({ ...analysis, word });
    } catch (e: any) {
      if (e.message === "API_KEY_MISSING") {
        setErrorStatus("AI Analysis requires an API key. The free Quran text is still available.");
      } else {
        setErrorStatus("Lughat analysis temporarily unavailable.");
      }
    } finally {
      setAnalyzingWord(false);
    }
  };

  const handleAnalyzeVerse = async (verse: Verse) => {
    setActiveVerse(verse);
    setDeepAnalysis(null);
    try {
      const result = await getVerseDeepAnalysis(verse.text, verse.translation);
      setDeepAnalysis(result);
    } catch (e) {
      setDeepAnalysis("AI Analysis unavailable. Please check your API key configuration.");
    }
  };

  const filteredSurahs = surahList.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.includes(searchQuery) ||
    s.id.toString() === searchQuery
  );

  const isReferenceSearch = searchQuery.match(/^\d+[:]\d+$/);

  if (selectedSurah) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <button onClick={() => setSelectedSurah(null)} className="text-emerald-600 font-bold flex items-center space-x-2">
              <ChevronRight size={18} className="rotate-180" />
              <span>Surah Index</span>
            </button>
            <div className="flex bg-gray-100 p-1 rounded-full">
              <button onClick={() => setViewMode('read')} className={`px-4 py-1 rounded-full text-xs font-bold ${viewMode === 'read' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-500'}`}>Study</button>
              <button onClick={() => setViewMode('lughat')} className={`px-4 py-1 rounded-full text-xs font-bold ${viewMode === 'lughat' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-500'}`}>Lughat Mode</button>
            </div>
          </div>

          <div className="bg-emerald-950 text-white p-8 md:p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl font-bold arabic-font mb-2">{selectedSurah.name}</h2>
              <p className="text-xl opacity-80 mb-6">{selectedSurah.englishName}</p>
              
              <div className="flex justify-center space-x-4 mb-8 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <span>{selectedSurah.versesCount} Ayats</span>
                <span>{selectedSurah.revelationType}</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl flex items-center space-x-4">
                <button 
                  onClick={playFullRecital}
                  disabled={isFullLoading}
                  className="flex items-center space-x-3 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50"
                >
                  {isFullLoading ? <Loader2 size={16} className="animate-spin" /> : (isFullPlaying ? <Pause size={16} /> : <Play size={16} />)}
                  <span>{isFullPlaying ? 'Pause Recital' : 'Play Full Surah'}</span>
                </button>
                {(isFullPlaying || isFullLoading) && (
                  <button 
                    onClick={stopFullRecital}
                    className="p-3 bg-red-500/80 text-white rounded-2xl hover:bg-red-600 transition-all"
                    title="Stop Recital"
                  >
                    <Square size={16} />
                  </button>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900 rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
          </div>

          {errorStatus && (
            <div className="flex items-center justify-center space-x-2 text-sm font-bold text-amber-600 bg-amber-50 p-4 rounded-2xl border border-amber-100">
              <AlertCircle size={18} />
              <span>{errorStatus}</span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="animate-spin text-emerald-600" size={48} />
              <p className="text-emerald-600 font-bold">Loading Full Revelation...</p>
            </div>
          ) : (
            <div className="space-y-8 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
              {verses.map((verse) => (
                <div 
                  key={verse.number} 
                  id={`verse-${verse.number}`} 
                  className={`space-y-6 pb-8 border-b border-gray-100 last:border-0 transition-all rounded-2xl p-4 -m-4`}
                >
                  <div className="flex justify-between items-center">
                    <span className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                      {verse.number}
                    </span>
                    <div className="flex space-x-2">
                      <button onClick={() => handleAnalyzeVerse(verse)} title="AI Verse Analysis" className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full flex items-center space-x-1">
                        <Sparkles size={16} />
                        <span className="text-xs font-bold">Analyze Verse</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="arabic-font text-3xl md:text-5xl leading-[2.5] text-emerald-950">
                      {verse.text.split(' ').map((word, wIdx) => {
                        return (
                          <span 
                            key={wIdx} 
                            onClick={() => handleWordClick(word, verse.text)}
                            className={`cursor-pointer transition-all px-1.5 rounded-xl border-b-2 border-transparent hover:border-emerald-200 hover:bg-emerald-50 inline-block`}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-emerald-800 text-sm font-medium italic opacity-60 tracking-wide">{verse.transliteration}</p>
                    <p className="text-gray-600 text-lg leading-relaxed">{verse.translation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-96 space-y-6">
          {analyzingWord && (
            <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4 animate-pulse sticky top-8">
              <Sparkles className="animate-spin text-emerald-400" />
              <p className="font-bold text-center">Scanning 114 Surahs for global occurrences...</p>
            </div>
          )}

          {selectedWord && !analyzingWord && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-xl sticky top-8 animate-in slide-in-from-right-4 h-fit max-h-[90vh] overflow-y-auto scrollbar-hide">
              <div className="flex justify-between items-start mb-6">
                <h4 className="font-bold text-emerald-900 text-xl flex items-center space-x-2">
                  <Layers size={20} className="text-emerald-600" />
                  <span>Deep Lughat</span>
                </h4>
                <button onClick={() => setSelectedWord(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <p className="arabic-font text-6xl text-emerald-950 mb-2">{selectedWord.word}</p>
                  <p className="text-xl font-bold text-emerald-700 mb-4">{selectedWord.meaning}</p>
                  
                  <PronounceButton
                    text={selectedWord.word}
                    label="Pronounce Word"
                    className="w-full bg-emerald-600 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                  />
                  <button
                    onClick={() => openInGoogleTranslate(selectedWord.word)}
                    className="mt-2 w-full text-emerald-700 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-1 hover:bg-emerald-100 transition-all"
                  >
                    <ExternalLink size={12} />
                    <span>Open in Google Translate</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">Global Freq.</label>
                    <div className="flex items-center space-x-2 text-emerald-800 font-black text-lg">
                       <Hash size={16} className="text-emerald-400" />
                       <span>{selectedWord.globalCount} Times</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase tracking-widest">Root Word</label>
                    <p className="font-mono text-emerald-800 font-bold text-lg">{selectedWord.root}</p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 block mb-2 uppercase tracking-widest">English Contexts</label>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedWord.synonyms.map(s => (
                      <div key={s} className="px-4 py-2 bg-emerald-50 rounded-xl text-xs font-medium text-emerald-800 border border-emerald-100">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 block mb-3 uppercase tracking-widest flex items-center space-x-2">
                    <MapPin size={12} />
                    <span>Cross-Surah Map</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedWord.occurrences.map(o => (
                      <button 
                        key={o} 
                        onClick={() => navigateToVerse(o)}
                        className="px-3 py-1 bg-emerald-900 text-white rounded-lg text-[10px] font-black hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all flex items-center space-x-1"
                      >
                        <MousePointer2 size={8} />
                        <span>{o}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="text-[10px] font-black text-gray-400 block mb-2 uppercase tracking-widest">Grammar Analysis</label>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl">{selectedWord.grammarAnalysis}</p>
                </div>
              </div>
            </div>
          )}

          {activeVerse && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-8 animate-in slide-in-from-right-4">
              <div className="flex justify-between items-start mb-6">
                <h4 className="font-bold text-emerald-900 text-xl">Divine Analysis</h4>
                <button onClick={() => setActiveVerse(null)} className="text-gray-400 text-2xl">×</button>
              </div>
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
                <div className="p-4 bg-emerald-50 rounded-2xl space-y-4">
                  <p className="text-emerald-900 font-bold italic">"{activeVerse.translation}"</p>
                  <button 
                    onClick={() => openInGoogleTranslate(activeVerse.text)}
                    className="w-full bg-emerald-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-1"
                  >
                    <ExternalLink size={12} />
                    <span>Translate Full Verse</span>
                  </button>
                </div>
                {!deepAnalysis ? (
                   <div className="flex justify-center py-10"><Loader2 className="animate-spin text-emerald-600" /></div>
                ) : (
                  <div className="prose prose-sm prose-emerald prose-p:leading-relaxed whitespace-pre-wrap">
                    {deepAnalysis}
                  </div>
                )}
              </div>
            </div>
          )}

          {!selectedWord && !activeVerse && !analyzingWord && (
             <div className="bg-emerald-900 text-white p-10 rounded-[3rem] text-center space-y-6 sticky top-8">
               <div className="w-20 h-20 bg-emerald-800 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-700">
                <BookOpen size={40} className="text-emerald-400" />
               </div>
               <h3 className="text-2xl font-bold">114 Surahs Indexed</h3>
               <p className="text-emerald-100 opacity-70 leading-relaxed">Select any verse or word to begin a deep linguistic and spiritual analysis powered by Groq AI.</p>
             </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">Holy Quran</h1>
          <p className="text-gray-500 text-lg">Full index of all 114 Surahs. Global Ayat keyword search enabled.</p>
          
          <div className="flex bg-gray-100 p-1 rounded-2xl w-fit">
            <button 
              onClick={() => {setSearchMode('surah'); setAyatResults([]);}} 
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${searchMode === 'surah' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-400'}`}
            >
              <List size={14} />
              <span>Surah Index</span>
            </button>
            <button 
              onClick={() => setSearchMode('ayat')} 
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${searchMode === 'ayat' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-400'}`}
            >
              <Type size={14} />
              <span>Ayat Search</span>
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder={searchMode === 'surah' ? "Search Surah name or number..." : "Keyword (e.g. Mercy) or Ref (e.g. 2:37)"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAyatSearch()}
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-12 shadow-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
          />
          {(searchMode === 'ayat' || isReferenceSearch) && (
            <button 
              onClick={handleAyatSearch}
              disabled={isSearchingAyats}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              {isSearchingAyats ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} />}
            </button>
          )}
        </div>
      </header>

      {isReferenceSearch && (
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center justify-between animate-in slide-in-from-top-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold">
              <Hash size={24} />
            </div>
            <div>
              <p className="text-emerald-900 font-bold">Direct Verse Access detected</p>
              <p className="text-emerald-700/60 text-xs">Navigate directly to Surah {searchQuery.split(':')[0]}, Ayat {searchQuery.split(':')[1]}</p>
            </div>
          </div>
          <button 
            onClick={() => navigateToVerse(searchQuery)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold flex items-center space-x-2 hover:bg-emerald-700 transition-all active:scale-95"
          >
            <span>Go to Verse</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {errorStatus && (
        <div className="bg-amber-50 text-amber-800 p-4 rounded-2xl flex items-center space-x-3 border border-amber-100">
          <AlertCircle size={20} />
          <span className="text-sm font-bold">{errorStatus}</span>
        </div>
      )}

      {searchMode === 'ayat' ? (
        <div className="space-y-8">
          {isSearchingAyats ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="animate-spin text-emerald-600" size={48} />
              <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Scanning 6,236 Ayats...</p>
            </div>
          ) : ayatResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {ayatResults.map((res, i) => (
                <div 
                  key={i} 
                  onClick={() => navigateToVerse(`${res.surah.number}:${res.numberInSurah}`)}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {res.surah.englishName}
                      </div>
                      <span className="text-gray-300 text-[10px] font-black uppercase tracking-widest">Ayat {res.numberInSurah}</span>
                    </div>
                    <p className="arabic-font text-xl text-emerald-950">{res.surah.name}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 leading-relaxed italic line-clamp-2">"{res.text}"</p>
                    <div className="flex items-center space-x-1 text-emerald-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      <span>Go to Context</span>
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery && !isSearchingAyats ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Search size={32} />
               </div>
               <p className="text-gray-400 font-bold">No ayats found for "{searchQuery}"</p>
               <p className="text-xs text-gray-400 mt-2">Try searching for common terms like "Mercy", "Prayer", or "Light".</p>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100">
               <Sparkles className="mx-auto text-emerald-200 mb-4" size={48} />
               <p className="text-emerald-900 font-bold">Search all verses by keyword</p>
               <p className="text-xs text-gray-400 mt-2">Enter a topic or word to find every occurrence in the Holy Quran.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSurahs.map((surah) => (
            <div 
              key={surah.id}
              onClick={() => setSelectedSurah(surah)}
              className="group bg-white p-8 rounded-[3rem] border border-gray-100 hover:border-emerald-500 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden active:scale-95"
            >
              <div className="flex items-center space-x-5">
                <div className="w-16 h-16 bg-emerald-900 text-white rounded-3xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:rotate-6 transition-transform">
                  {surah.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold group-hover:text-emerald-700 transition-colors">{surah.englishName}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                     <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">{surah.versesCount} AYATS</p>
                     <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                     <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{surah.revelationType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="arabic-font text-3xl text-emerald-900">{surah.name}</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
                 <div className="flex space-x-1">
                    <Music size={14} className="text-emerald-200" />
                    <Info size={14} className="text-emerald-200" />
                    <Globe size={14} className="text-emerald-200" />
                 </div>
                 <div className="text-emerald-600 font-bold text-xs flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>OPEN SURAH</span>
                    <ChevronRight size={14} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quran;
