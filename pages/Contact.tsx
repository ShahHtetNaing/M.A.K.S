
import React from 'react';
import { Cpu, Linkedin, Globe, Mail, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-900 leading-tight">
          Contact & Innovation
        </h1>
        <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
      </section>

      {/* Platform Development Section */}
      <section className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <div className="flex items-center space-x-3 text-emerald-600 font-black text-xs uppercase tracking-widest">
              <Cpu size={20} />
              <span>Technology & Innovation</span>
            </div>
            <h2 className="text-3xl font-bold text-emerald-900">Platform Development</h2>
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              The M.A.K.S platform is designed and developed by <strong>Shah Htet Naing</strong>, an IT Analyst and cybersecurity professional, with the aim of combining traditional knowledge delivery with modern technology.
            </p>
            
            <div className="space-y-4">
              <p className="font-bold text-sm text-gray-400 uppercase tracking-widest">Key Integrations:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: ShieldCheck, text: "Structured pathways" },
                  { icon: Sparkles, text: "Lughah exploration" },
                  { icon: Cpu, text: "AI clarification tools" },
                  { icon: Globe, text: "TTS pronunciation support" }
                ].map(item => (
                  <div key={item.text} className="flex items-center space-x-3 px-4 py-3 bg-emerald-50 rounded-xl text-emerald-800 text-sm font-bold border-l-4 border-emerald-500">
                    <item.icon size={16} className="text-emerald-600" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <a 
                href="https://www.linkedin.com/in/shah-htet-naing/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-emerald-900 text-white rounded-2xl hover:bg-emerald-800 transition-all hover:scale-110 shadow-lg"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://mysite2024.s3.us-east-1.amazonaws.com/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-emerald-900 text-white rounded-2xl hover:bg-emerald-800 transition-all hover:scale-110 shadow-lg"
              >
                <Globe size={24} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-emerald-50 p-10 rounded-[2.5rem] border border-emerald-100 flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">System Reliability</p>
              <div className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-200 mb-2">
                <ShieldCheck size={48} className="text-white" />
              </div>
              <h4 className="font-black text-emerald-900 text-sm">Educationally Authentic <br/> & Technically Reliable</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <div className="p-12 md:p-16 bg-emerald-950 text-white rounded-[4rem] shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
             <div className="w-16 h-1 w-20 bg-emerald-500 mx-auto rounded-full mb-4"></div>
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Closing Statement</h3>
             <p className="text-2xl md:text-3xl font-bold leading-relaxed italic">
               "M.A.K.S is not just a website. It is a long-term effort toward reviving meaningful learning, strengthening understanding of Arabic and the Qur’an, and contributing to the appearance of a knowledge-based society."
             </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900 rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-800 rounded-full blur-3xl opacity-10 -ml-24 -mb-24"></div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="space-y-12 pt-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full text-emerald-700 text-xs font-black uppercase tracking-widest">
            <Mail size={16} />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl font-extrabold text-emerald-900">We Value Your Feedback</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Whether you have technical issues, educational inquiries, or partnership suggestions, we're here to help.</p>
        </div>
        
        <div className="bg-white rounded-[4rem] overflow-hidden border border-gray-100 shadow-2xl">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSf5tiJhZOwm_WHbJSRhDEjHo4h97CG6sFGuTo-p6C9eTvY4iw/viewform?embedded=true" 
            width="100%" 
            height="900" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            title="M.A.K.S Contact Form"
          >
            Loading…
          </iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
