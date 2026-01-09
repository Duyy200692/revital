
import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';

interface Props {
  isScrolled: boolean;
}

const Navbar: React.FC<Props> = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center text-white font-brand font-bold text-lg md:text-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
              R
            </div>
            <span className={`text-2xl md:text-3xl font-brand font-bold tracking-tight ${isScrolled ? 'text-dark' : 'text-white'}`}>
              Revital <span className="text-primary">Coffee</span>
            </span>
          </a>

          {/* Desktop Links - Strictly hidden on small screens */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary ${isScrolled ? 'text-dark' : 'text-white'}`}
              >
                {link.label}
              </a>
            ))}
            <button className="px-6 py-2 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all">
              ĐẶT NGAY
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-primary p-2 -mr-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Refined UX */}
      <div className={`fixed inset-0 bg-white z-[100] flex flex-col transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <span className="text-2xl font-brand font-bold tracking-tight text-dark">
            Revital <span className="text-primary">Coffee</span>
          </span>
          <button 
            className="w-12 h-12 bg-gray-100 text-dark rounded-full flex items-center justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8 py-10 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-black text-dark hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button className="mt-4 px-12 py-4 bg-primary text-white font-black rounded-full text-xl shadow-xl shadow-primary/20">
            ĐẶT NGAY
          </button>
        </div>
        
        <div className="p-10 border-t border-gray-100 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">© 2024 Revital Craft</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;