
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Quran from './pages/Quran';
import Community from './pages/Community';
import About from './pages/About';
import Contact from './pages/Contact';
import AIChatModal from './components/AIChatModal';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home setActivePage={setActivePage} />;
      case 'courses': return <Courses />;
      case 'quran': return <Quran />;
      case 'community': return <Community />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <>
      <Layout 
        activePage={activePage} 
        setActivePage={setActivePage}
      >
        {renderPage()}
      </Layout>
      <AIChatModal />
    </>
  );
};

export default App;
