
import React, { useState } from 'react';
import { Home, BookOpen, ScrollText, Users, Info, Menu, X, Sparkles, Mail, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'All Courses', icon: BookOpen },
    { id: 'quran', label: 'Holy Quran', icon: ScrollText },
    { id: 'community', label: 'Discussion', icon: Users },
    { id: 'about', label: 'About MAKS', icon: Info },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-emerald-400" size={20} />
          <h1 className="text-xl font-black tracking-tighter text-white uppercase">M.A.K.S</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle Menu">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-0 z-40 bg-emerald-950 text-emerald-50 transition-transform md:translate-x-0 md:static md:w-64
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col overflow-y-auto scrollbar-hide">
          <div className="flex items-center space-x-2 mb-10 hidden md:flex">
             <Sparkles className="text-emerald-400" size={24} />
             <h1 className="text-2xl font-black tracking-tighter text-white uppercase">M.A.K.S</h1>
          </div>
          
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all ${
                  activePage === item.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 scale-[1.02]' 
                    : 'hover:bg-emerald-900/50 text-emerald-100/70 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-emerald-900/50">
            <div className="p-4 bg-emerald-900/30 rounded-2xl border border-emerald-800 text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Open Learning</span>
              </div>
              <p className="text-[10px] text-emerald-100/60 leading-relaxed font-medium">Mission to Appearance of a Knowledge Society</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-emerald-50/30 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
