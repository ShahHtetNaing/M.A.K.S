
import React from 'react';
import { Users, MessageSquare, Sparkles, MessageCircle, Heart, ArrowRight, Plus } from 'lucide-react';

const Community: React.FC = () => {
  const GROUP_URL = "https://groups.google.com/g/maksdiscussion";

  return (
    <div className="space-y-12 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-4 pt-8 animate-in fade-in duration-700">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em]">
          <Sparkles size={16} />
          <span>Knowledge Society Dialogue</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-900 leading-tight tracking-tight">
          MAKS Discussion <span className="text-emerald-600">Community</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium italic">Reflecting on the language of revelation, together.</p>
      </header>

      {/* Main Info Section */}
      <section className="bg-white rounded-[3.5rem] border border-emerald-100 shadow-xl overflow-hidden relative group">
        <div className="p-10 md:p-16 space-y-10 relative z-10">
          <div className="flex items-center space-x-3">
             <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <MessageSquare size={24} />
             </div>
             <h2 className="text-2xl font-black text-emerald-900">About MAKS Discussion Community</h2>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-medium">
            <p>
              The MAKS Discussion Community is a free, open platform for exploring the richness of Arabic language and Qur’anic eloquence. This community invites everyone to reflect, share, and discuss the meanings of ayat, words, phrases, and surahs in a thoughtful and respectful environment.
            </p>
            <p>
              Hosted via Google Groups, the forum allows anyone on the web to view and post without the need for special accounts or logins. Members can participate in discussions, ask questions, or share insights while the platform ensures structured, threaded conversations that are easy to follow.
            </p>
            <p>
              Our goal is to create a lasting, accessible, and open space for learning and dialogue, supporting both beginners and advanced learners in deepening their understanding of Qur’anic language and meaning.
            </p>
            <p>
              Join the discussion, contribute your reflections, and be part of a growing community committed to thoughtful, shared learning.
            </p>
          </div>

          <div className="pt-10 border-t border-emerald-50 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full bg-emerald-100 border-4 border-white flex items-center justify-center text-emerald-600 font-bold text-sm shadow-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
               </div>
               <div className="space-y-0.5">
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-900">Open Community</p>
                  <p className="text-[10px] font-bold text-gray-400">Join the Circle of Knowledge</p>
               </div>
            </div>

            <a 
              href={GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 active:scale-95 flex items-center justify-center space-x-3 group"
            >
              <Plus size={20} />
              <span>New Post</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-40 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-30 -ml-24 -mb-24"></div>
      </section>

      {/* Values Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            icon: MessageCircle, 
            title: "Free & Open", 
            desc: "A platform for all, ensuring the free flow of knowledge without barriers." 
          },
          { 
            icon: Heart, 
            title: "Respectful Dialogue", 
            desc: "Maintaining a high standard of academic and spiritual etiquette." 
          },
          { 
            icon: Sparkles, 
            title: "Deeper Insights", 
            desc: "Threads focused on the linguistic miracles and roots of sacred text." 
          }
        ].map((item, i) => (
          <div key={i} className="bg-emerald-900/5 border border-emerald-100 p-8 rounded-[2.5rem] space-y-4 hover:bg-white hover:shadow-xl transition-all duration-300">
             <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                <item.icon size={20} />
             </div>
             <h4 className="font-bold text-emerald-950">{item.title}</h4>
             <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </section>
      
      {/* Footer Note */}
      <div className="text-center pt-8">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Mission to Appearance of a Knowledge Society</p>
      </div>
    </div>
  );
};

export default Community;
