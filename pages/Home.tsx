
import React from 'react';
import { ArrowRight, BookOpen, ScrollText, Users, PlayCircle, Star, Sparkles, Target, Languages, Music, Layers, Award, ShieldCheck } from 'lucide-react';

interface HomeProps {
  setActivePage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full text-emerald-700 text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-4 duration-700">
          <Sparkles size={16} />
          <span>Welcome to M.A.K.S</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-950 leading-tight tracking-tight">
          Mission to Appearance of a <br />
          <span className="text-emerald-600">Knowledge Society</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">
          M.A.K.S is a learning platform dedicated to making Arabic language and Qur’anic understanding clear, structured, and accessible for everyone — from complete beginners to serious students of knowledge.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button 
            onClick={() => setActivePage('courses')}
            className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Start Learning</span>
            <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => setActivePage('quran')}
            className="w-full sm:w-auto px-10 py-4 border-2 border-emerald-100 text-emerald-800 rounded-2xl font-bold hover:bg-white hover:border-emerald-600 transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <ScrollText size={20} />
            <span>Study Quran</span>
          </button>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-white p-10 md:p-20 rounded-[4rem] border border-emerald-50 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <p className="text-lg text-gray-700 leading-relaxed italic font-light">
            "We believe true learning is built step by step, with clarity, meaning, and purpose. M.A.K.S focuses on helping learners understand Arabic not just as a language, but as a key to understanding the Qur’an."
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-emerald-200 rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-40 -ml-32 -mt-32"></div>
      </section>

      {/* What You'll Learn Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-emerald-900">What You’ll Learn</h2>
          <p className="text-gray-500 font-medium">Clear progression without confusion.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: Languages, 
              title: 'Structured Arabic', 
              desc: 'From basic alphabet and vowel shapes to real-world usage and complex sentence structures.',
              color: 'text-blue-600',
              bg: 'bg-blue-50'
            },
            { 
              icon: Layers, 
              title: 'Qur’anic Lughah', 
              desc: 'Deep linguistic understanding of root words, recurring patterns, and semantic variations across Surahs.',
              color: 'text-emerald-600',
              bg: 'bg-emerald-50'
            },
            { 
              icon: Music, 
              title: 'Pronunciation', 
              desc: 'Integrated listening support and phonetic guides to help you master how Arabic sounds, not just how it looks.',
              color: 'text-purple-600',
              bg: 'bg-purple-50'
            },
            { 
              icon: Target, 
              title: 'Guided Paths', 
              desc: 'Step-by-step learning modules that ensure consistent growth for both new learners and those returning to study.',
              color: 'text-orange-600',
              bg: 'bg-orange-50'
            },
          ].map((feat, i) => (
            <div key={i} className="group p-10 bg-white rounded-[3rem] border border-gray-100 hover:border-emerald-500 hover:shadow-2xl transition-all duration-500">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 ${feat.bg} ${feat.color} group-hover:scale-110 transition-transform`}>
                <feat.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-emerald-950">{feat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-emerald-950 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-emerald-900 px-4 py-2 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
              <Award size={16} />
              <span>Founded on Knowledge</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Driven by Sincerity, <br /> Built for Impact
            </h2>
            <div className="space-y-6 text-emerald-100/80 text-lg leading-relaxed">
              <p>
                M.A.K.S was founded by <strong>Ko Lay Naing</strong>, a dedicated student and teacher of Arabic and Qur’anic studies, with a focus on clarity, meaning, and practical understanding.
              </p>
              <p>
                The platform is developed by <strong>Shah Htet Naing</strong>, combining traditional learning values with modern technology to create a focused, reliable learning experience.
              </p>
            </div>
            <button 
              onClick={() => setActivePage('about')}
              className="px-8 py-3 bg-white text-emerald-900 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center space-x-2"
            >
              <span>Read Our Story</span>
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="aspect-square bg-emerald-900 rounded-[2.5rem] flex items-center justify-center border border-emerald-800">
                <ShieldCheck size={48} className="text-emerald-400" />
              </div>
              <div className="aspect-square bg-emerald-800/30 rounded-[2.5rem] backdrop-blur-sm border border-emerald-700/50"></div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square bg-emerald-800/30 rounded-[2.5rem] backdrop-blur-sm border border-emerald-700/50"></div>
              <div className="aspect-square bg-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                <Users size={48} className="text-white" />
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900 rounded-full blur-3xl opacity-30 -mr-24 -mt-24"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900 rounded-full blur-3xl opacity-20 -ml-12 -mb-12"></div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-10 py-10 max-w-3xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold text-emerald-950">Learn With Purpose</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            M.A.K.S is more than lessons — it is a growing effort toward a knowledge-centered society, where learning Arabic and understanding the Qur’an becomes a meaningful and lifelong journey.
          </p>
        </div>
        <div className="pt-6">
          <button 
            onClick={() => setActivePage('courses')}
            className="group px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 flex items-center space-x-3 mx-auto active:scale-95"
          >
            <span>Begin Your Journey</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest font-bold">No barriers. Just knowledge.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
