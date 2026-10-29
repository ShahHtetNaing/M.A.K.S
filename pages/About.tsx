
import React from 'react';
import { Target, User, Award, Search, Sparkles, MapPin, Book, Youtube, Bookmark, ExternalLink, ShieldCheck } from 'lucide-react';

interface ScholarlyWork {
  id: string;
  title: string;
  desc: string;
  tag: string;
  url?: string;
  type: 'book' | 'video' | 'deep-dive';
  featured?: boolean;
}

const SCHOLARLY_WORKS: ScholarlyWork[] = [
  {
    id: 'w1',
    title: 'Arabic Course Book',
    desc: 'A meticulously designed textbook focusing on structural meaning and logical progression in the Arabic language.',
    tag: 'Available in Myanmar & English',
    url: 'https://drive.google.com/drive/folders/12Ugz8qW3XFzD0BWn9gW_3V-7xpnO2Ncg?usp=drive_link',
    type: 'book'
  },
  {
    id: 'w2',
    title: 'Quran Deep Drive',
    desc: 'Advanced linguistic manual exploring root words (Usul) and their profound semantic variations in the Holy Quran.',
    tag: 'Scholarly Resource',
    url: 'https://drive.google.com/drive/folders/1kc8Y0qa5mqPSgPREF-dOJxdwuv-ndPBR?usp=sharing',
    type: 'deep-dive'
  },
  {
    id: 'w3',
    title: 'Video Lessons',
    desc: 'Comprehensive walkthroughs of Arabic grammar and Quranic reflections for global learners.',
    tag: 'Digital Media Content',
    url: 'https://www.youtube.com/channel/UCY69IEY9L6gyIY8oUnw2iNg',
    type: 'video',
    featured: true
  }
];

const About: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Youtube;
      case 'deep-dive': return Search;
      default: return Book;
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="text-center space-y-4 pt-8">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-4">
          <Sparkles size={14} />
          <span>The Heart of M.A.K.S</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-900 leading-tight">
          About M.A.K.S
        </h1>
        <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
      </section>

      {/* Mission Section */}
      <section className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="flex items-center space-x-3 text-emerald-600 font-black text-xs uppercase tracking-widest">
            <Target size={20} />
            <span>Our Purpose</span>
          </div>
          <h2 className="text-3xl font-bold text-emerald-900">Mission</h2>
          <div className="prose prose-emerald max-w-none text-gray-700 text-lg leading-relaxed space-y-6">
            <p className="font-semibold text-emerald-800">
              M.A.K.S (Mission to Appearance of a Knowledge Society) was established with a clear and timeless purpose: 
              to make Arabic language and Qur’anic understanding accessible, structured, and meaningful for learners of all backgrounds.
            </p>
            <p>
              Knowledge should be built step by step, with clarity, depth, and purpose.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-40 -mr-32 -mt-32"></div>
      </section>

      {/* Founders Section */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
        <div className="lg:col-span-2">
          <div className="bg-emerald-950 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 bg-emerald-800/50 rounded-3xl flex items-center justify-center border border-emerald-700 backdrop-blur-md">
                  <User size={40} className="text-emerald-400" />
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center space-x-2 bg-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-widest border border-emerald-500/30">
                    <MapPin size={12} />
                    <span>Myanmar</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight text-white">Ko Lay Naing</h2>
                <p className="text-emerald-400 font-bold">Founder & Principal Teacher</p>
              </div>

              <p className="text-emerald-100/80 leading-relaxed text-lg">
                M.A.K.S was founded by <strong>Ko Lay Naing</strong>, a dedicated student and teacher from <strong>Myanmar</strong>. His lifework revolves around deconstructing the complexities of Arabic Lughah.
              </p>
            </div>
            
            <div className="relative z-10 pt-10 border-t border-emerald-800/50">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Guardian Verified</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Since 2024</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-6 text-emerald-900">
            <h3 className="text-xl font-bold flex items-center space-x-3">
              <Award size={20} className="text-emerald-600" />
              <span>Pedagogy & Methodology</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Meaning-centric Arabic instruction",
                "Structural analysis of Divine speech",
                "Quranic Awareness training",
                "Root word semantic mapping"
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start space-x-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm font-bold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 space-y-4">
             <div className="flex items-center space-x-2 text-emerald-700 font-black text-[10px] uppercase tracking-widest">
               <ShieldCheck size={14} />
               <span>Scholarly Oversight</span>
             </div>
             <p className="text-sm text-emerald-800 font-medium leading-relaxed">
               All core curriculum and scholarly deep drives are curated and reviewed by <strong>Shah Htet Naing</strong> and <strong>Ko Lay Naing</strong> to ensure the highest standards of accuracy and ethical scholarship.
             </p>
          </div>
        </div>
      </section>

      {/* Featured Works Showcase */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
              <Bookmark size={16} />
              <span>Showcase</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-emerald-900">Scholarly Resources</h2>
            <p className="text-gray-500 max-w-2xl text-lg font-medium">Core materials produced by Ko Lay Naing for structured learning.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SCHOLARLY_WORKS.map((work) => {
            const Icon = getIcon(work.type);
            return (
              <div 
                key={work.id} 
                className={`p-10 rounded-[3.5rem] border shadow-sm hover:shadow-2xl transition-all group relative flex flex-col h-full
                  ${work.featured ? 'bg-emerald-900 text-white border-emerald-800' : 'bg-white text-emerald-950 border-gray-100'}
                `}
              >
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-lg
                  ${work.featured ? 'bg-white text-red-600' : 'bg-emerald-50 text-emerald-600'}
                `}>
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-black mb-4">{work.title}</h3>
                <p className={`text-sm leading-relaxed mb-8 flex-1 font-medium
                  ${work.featured ? 'text-emerald-100/70' : 'text-gray-500'}
                `}>
                  {work.desc}
                </p>

                <div className="space-y-4">
                  <div className={`flex items-center space-x-2 font-black text-[10px] uppercase tracking-widest
                     ${work.featured ? 'text-emerald-400' : 'text-emerald-600'}
                  `}>
                    <ShieldCheck size={12} />
                    <span>Guardian Verified</span>
                  </div>
                  {work.url && (
                    <a 
                      href={work.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 font-black text-[10px] uppercase tracking-widest transition-colors
                        ${work.featured ? 'text-emerald-400 hover:text-white' : 'text-emerald-600 hover:text-emerald-800'}
                      `}
                    >
                      <span>Access Material</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default About;
