
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Ecosystem from './components/Ecosystem';
import CoffeeAI from './components/CoffeeAI';
import Footer from './components/Footer';
import AdminControls from './components/AdminControls';
import { StoreProvider } from './StoreContext';

const AppContent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar isScrolled={isScrolled} />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="menu" className="py-24 bg-white">
          <Menu />
        </section>

        <section id="about" className="py-24 bg-accent/50">
          <About />
        </section>

        <Ecosystem />
      </main>

      <CoffeeAI />
      <Footer />
      <AdminControls />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
