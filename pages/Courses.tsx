
import React, { useState, useMemo } from 'react';
import { MOCK_COURSES } from '../constants';
import { Course, Lesson, PathwayType } from '../types';
import { Play, FileText, CheckCircle, ChevronRight, BookOpen, Clock, BarChart, Mic, Square, Loader2, Sparkles, Target, Award, ListFilter, Layers, ArrowRight, Languages, ScrollText, Book, PenTool, Lightbulb, GraduationCap, BrainCircuit, ClipboardCheck, ArrowLeft, ChevronLeft, ExternalLink } from 'lucide-react';
import { getPronunciationFeedback, askGemini, openInGoogleTranslate } from '../services/geminiService';

const Courses: React.FC = () => {
  const [activePathway, setActivePathway] = useState<PathwayType>('ARABIC');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'test'>('learn');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [userExerciseInput, setUserExerciseInput] = useState('');

  // Real-time progress calculation
  const currentProgress = useMemo(() => {
    if (!activeLesson) return 0;
    
    let score = 0;
    // Learn phase: max 40% (based on steps)
    const learnWeight = 40;
    score += ((currentStepIndex + 1) / activeLesson.learningSteps.length) * learnWeight;

    // Practice phase: max 30% (unlocked by going to tab)
    if (activeTab === 'practice' || activeTab === 'test') {
      score += 30;
    }

    // Test phase: max 30% (unlocked by going to tab)
    if (activeTab === 'test') {
      score += 30;
    }

    return Math.min(Math.round(score), 100);
  }, [activeLesson, currentStepIndex, activeTab]);

  const handleExerciseSubmit = async () => {
    if (!userExerciseInput.trim()) return;
    setIsAnalysing(true);
    try {
      const prompt = `Grade this exercise for the lesson "${activeLesson?.title}". 
      Topic: ${activeLesson?.topics}. 
      Exercise Task: ${activeLesson?.exercises}. 
      Student Answer: "${userExerciseInput}". 
      Provide constructive feedback using the AI function: ${activeLesson?.aiFunction}.`;
      const result = await askGemini(prompt);
      setFeedback(result);
    } catch (e) {
      setFeedback("Good effort! The AI encountered an error while grading, but your attempt shows progress.");
    } finally {
      setIsAnalysing(false);
    }
  };

  const simulateSpeechFeedback = async () => {
    setIsAnalysing(true);
    setTimeout(async () => {
      const result = await getPronunciationFeedback("Student's audio attempt", activeLesson?.title || "");
      setFeedback(result || "Good attempt! Pay more attention to the vowels.");
      setIsAnalysing(false);
    }, 2000);
  };

  const filteredCourses = MOCK_COURSES.filter(c => c.pathway === activePathway);

  if (activeLesson) {
    const currentStep = activeLesson.learningSteps[currentStepIndex];

    return (
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between">
            <button onClick={() => {setActiveLesson(null); setFeedback(null); setUserExerciseInput(''); setCurrentStepIndex(0); setActiveTab('learn');}} className="text-emerald-600 font-bold flex items-center space-x-2 hover:translate-x-[-4px] transition-transform">
              <ChevronLeft size={20} />
              <span>Back to Course Map</span>
            </button>
            <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                <button onClick={() => setActiveTab('learn')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'learn' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-600'}`}>
                    <GraduationCap size={16} />
                    <span>Learn</span>
                </button>
                <button onClick={() => setActiveTab('practice')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'practice' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-600'}`}>
                    <BrainCircuit size={16} />
                    <span>Practice</span>
                </button>
                <button onClick={() => setActiveTab('test')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'test' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-600'}`}>
                    <ClipboardCheck size={16} />
                    <span>Test</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {activeTab === 'learn' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Phase 1: Instruction</h4>
                                <div className="flex justify-between items-center">
                                  <h2 className="text-4xl font-extrabold text-emerald-900 leading-tight">{activeLesson.title}</h2>
                                </div>
                                <p className="text-gray-500 font-medium italic">{activeLesson.topics}</p>
                            </div>
                            <div className="prose prose-emerald max-w-none text-xl text-gray-700 leading-relaxed font-light">
                                {activeLesson.content}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-emerald-900 flex items-center space-x-2">
                                <Layers size={20} className="text-emerald-600" />
                                <span>Instructional Step {currentStepIndex + 1}</span>
                            </h3>
                            <span className="text-[10px] font-black text-gray-400">{currentStepIndex + 1} OF {activeLesson.learningSteps.length}</span>
                        </div>
                        
                        <div className="bg-white border-2 border-emerald-100 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group shadow-lg shadow-emerald-50">
                             <div className="flex justify-between items-start mb-4">
                               <h5 className="text-emerald-600 font-black text-xs uppercase tracking-widest">{currentStep.title}</h5>
                               <button 
                                 onClick={() => openInGoogleTranslate(currentStep.content)}
                                 className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 hover:bg-emerald-600 hover:text-white transition-all"
                               >
                                 <ExternalLink size={12} />
                                 <span>Pronounce</span>
                               </button>
                             </div>
                             <div className="text-2xl text-emerald-900 font-bold leading-relaxed relative z-10 whitespace-pre-wrap arabic-font-support">
                                {currentStep.content}
                             </div>
                             <div className="absolute top-0 left-0 w-2 bg-emerald-500 h-full"></div>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <button 
                                disabled={currentStepIndex === 0}
                                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                                className="px-6 py-3 rounded-xl border-2 border-emerald-100 text-emerald-600 font-bold disabled:opacity-30 transition-all flex items-center space-x-2"
                            >
                                <ArrowLeft size={18} />
                                <span>Previous Step</span>
                            </button>
                            {currentStepIndex < activeLesson.learningSteps.length - 1 ? (
                                <button 
                                    onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                                    className="px-10 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center space-x-2"
                                >
                                    <span>Next Step</span>
                                    <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setActiveTab('practice')}
                                    className="px-10 py-3 bg-emerald-900 text-white rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-200 flex items-center space-x-2"
                                >
                                    <Sparkles size={18} className="text-emerald-400" />
                                    <span>Practice Session</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
              )}

              {activeTab === 'practice' && (
                <div className="bg-emerald-950 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                    <div className="relative z-10 space-y-10">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-emerald-900 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                <Target size={14} />
                                <span>Phase 2: Practice</span>
                            </div>
                            <h3 className="text-3xl font-bold">Apply Your Knowledge</h3>
                            <p className="text-emerald-100/60 max-w-xl mx-auto text-lg leading-relaxed">
                                {activeLesson.exercises}
                            </p>
                        </div>

                        {activeLesson.type === 'speaking' ? (
                            <div className="flex flex-col items-center space-y-8">
                                <div className="p-10 bg-emerald-900/50 rounded-[2.5rem] border border-emerald-800 shadow-inner text-center w-full max-w-md">
                                    <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Pronunciation Prompt</label>
                                    <span className="arabic-font text-5xl block mb-6">تَمْرِينُ النُّطْقِ</span>
                                    <button 
                                      onClick={() => openInGoogleTranslate('تَمْرِينُ النُّطْقِ')}
                                      className="mx-auto flex items-center space-x-2 text-emerald-400 hover:text-white transition-colors text-xs font-bold"
                                    >
                                      <ExternalLink size={14} />
                                      <span>Listen to correct pronunciation</span>
                                    </button>
                                </div>
                                
                                <div className="flex flex-col items-center space-y-4">
                                    <button 
                                        onClick={() => {
                                            if (isRecording) {
                                                setIsRecording(false);
                                                simulateSpeechFeedback();
                                            } else {
                                                setFeedback(null);
                                                setIsRecording(true);
                                            }
                                        }}
                                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl ${isRecording ? 'bg-red-500 animate-pulse text-white scale-110' : 'bg-white text-emerald-900 hover:scale-105'}`}
                                    >
                                        {isRecording ? <Square fill="currentColor" size={28} /> : <Mic size={40} />}
                                    </button>
                                    <p className="text-xs font-black uppercase tracking-widest text-emerald-400">
                                        {isRecording ? 'Capturing Audio...' : 'Tap to Start Speaking'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <textarea 
                                    value={userExerciseInput}
                                    onChange={(e) => setUserExerciseInput(e.target.value)}
                                    placeholder="Type your translation or analysis here for AI evaluation..."
                                    className="w-full h-40 bg-emerald-900/50 border-2 border-emerald-800 rounded-3xl p-6 text-xl text-white placeholder:text-emerald-700/50 focus:border-emerald-500 focus:ring-0 transition-all"
                                />
                                <div className="flex justify-center">
                                    <button 
                                        onClick={handleExerciseSubmit}
                                        disabled={isAnalysing || !userExerciseInput.trim()}
                                        className="px-12 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-emerald-500/20 flex items-center space-x-2"
                                    >
                                        {isAnalysing ? <Loader2 size={18} className="animate-spin" /> : <PenTool size={18} />}
                                        <span>Submit to Gemini AI</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {feedback && (
                            <div className="w-full bg-white text-emerald-950 p-8 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 border-t-8 border-emerald-400">
                                <div className="flex items-center space-x-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-4">
                                    <Sparkles size={16} />
                                    <span>AI {activeLesson.aiFunction} Feedback</span>
                                </div>
                                <div className="prose prose-emerald">
                                    <p className="text-emerald-900 leading-relaxed text-lg font-medium whitespace-pre-wrap">{feedback}</p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                    <button onClick={() => setActiveTab('test')} className="flex items-center space-x-2 text-emerald-600 font-bold hover:translate-x-1 transition-transform">
                                        <span>Proceed to Final Test</span>
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900 rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
                </div>
              )}

              {activeTab === 'test' && (
                <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-xl space-y-10 animate-in zoom-in-95 duration-500">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                            <Award size={40} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-emerald-900">Module Certification Test</h2>
                        <p className="text-gray-500">Verify your proficiency in "{activeLesson.title}". Completion awards a lesson badge.</p>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center space-y-6">
                        <p className="text-xl text-gray-700 font-medium italic">"Accuracy is the bridge between a student and a master."</p>
                        <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                            Start Assessment
                        </button>
                    </div>
                </div>
              )}
           </div>

           <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-400 flex items-center space-x-2">
                   <Lightbulb size={14} />
                   <span>Expert Guidance</span>
                </h4>
                <div className="space-y-4">
                   <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <p className="text-sm text-emerald-900 font-bold">"Focus on Step {currentStepIndex + 1}: {currentStep.title}. This is the core pillar of this module."</p>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-sm text-gray-600 italic">"Arabic is built like a puzzle. If you understand the root, you understand the branches."</p>
                   </div>
                </div>
              </div>

              <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] space-y-4 text-center group">
                 <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:rotate-12 transition-transform">
                    <Award size={32} className="text-emerald-400" />
                 </div>
                 <h4 className="font-bold">Progress Milestone</h4>
                 <div className="w-full bg-emerald-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full transition-all duration-700 ease-out" 
                      style={{ width: `${currentProgress}%` }}
                    ></div>
                 </div>
                 <p className="text-emerald-100/60 text-[10px] uppercase font-black tracking-widest">Mastery Level: {currentProgress}%</p>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-emerald-600 font-black text-xs uppercase tracking-widest">
            <Sparkles size={16} />
            <span>Learning Pathways</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-900 leading-tight">
            Curated <span className="text-emerald-600">Curriculum</span>
          </h1>
          <p className="text-gray-500 text-xl font-light max-w-2xl">
            Structured lessons designed to take you from first steps in the alphabet to professional-level analysis.
          </p>
        </div>

        {/* Pathway Switcher */}
        <div className="flex bg-white p-2 rounded-[2rem] border border-gray-100 shadow-xl self-start md:self-end">
          <button 
            onClick={() => { setActivePathway('ARABIC'); setSelectedCourse(null); }}
            className={`flex items-center space-x-2 px-8 py-4 rounded-[1.5rem] font-bold text-sm transition-all ${activePathway === 'ARABIC' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-600'}`}
          >
            <Languages size={18} />
            <span>Arabic Pathway</span>
          </button>
          <button 
            onClick={() => { setActivePathway('QURAN'); setSelectedCourse(null); }}
            className={`flex items-center space-x-2 px-8 py-4 rounded-[1.5rem] font-bold text-sm transition-all ${activePathway === 'QURAN' ? 'bg-emerald-900 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-900'}`}
          >
            <ScrollText size={18} />
            <span>Quran Pathway</span>
          </button>
        </div>
      </header>

      {['Beginner', 'Intermediate', 'Professional'].map((level) => {
        const course = filteredCourses.find(c => c.level === level);
        if (!course) return null;

        return (
          <section key={level} className="space-y-10">
            <div className="flex items-center space-x-4">
               <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{level} Mastery</span>
               <div className="h-px bg-gray-100 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
               <div className="xl:col-span-1 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between group">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-extrabold text-emerald-900 leading-tight">{course.title}</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{course.description}</p>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center space-x-3 text-xs font-bold text-emerald-600">
                      <Layers size={16} />
                      <span>{course.lessons.length} Modules</span>
                    </div>
                    <div className="w-full bg-emerald-50 h-2 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full w-0 group-hover:w-full transition-all duration-1000 ease-in-out"></div>
                    </div>
                  </div>
               </div>

               <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {course.lessons.map((lesson, idx) => (
                    <button 
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-emerald-500 hover:shadow-2xl transition-all text-left flex flex-col justify-between group h-64 active:scale-95"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                             {lesson.type === 'speaking' ? <Mic size={20} /> : <FileText size={20} />}
                          </div>
                          <span className="text-[10px] font-black text-gray-300">MOD {idx + 1}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 line-clamp-2">{lesson.title}</h4>
                      </div>
                      <div className="space-y-3">
                         <div className="px-3 py-1 bg-emerald-50 text-[10px] font-black text-emerald-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                            AI: {lesson.aiFunction}
                         </div>
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">STUDY</span>
                            <ArrowRight size={14} className="text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                         </div>
                      </div>
                    </button>
                  ))}
               </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Courses;
