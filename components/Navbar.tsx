
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onRegister: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'PALESTRANTES', href: '#speakers' },
    { name: 'PROGRAMAÇÃO', href: '#programacao' },
    { name: 'INGRESSOS', href: '#ingressos' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`w-full transition-all duration-300 ${scrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/5 py-2' : 'bg-transparent py-4'}`}>
      {!scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>
      )}
      
      {/* Changed container to w-full max-w-7xl mx-auto for tighter constraint on wide screens */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo - Reduced size */}
        <div className="flex-shrink-0 w-28 md:w-32 transition-all duration-300">
          <a href="#">
            <img 
              src="https://framerusercontent.com/images/svjFFUI9y35yZHV3xw9aVVGM1GU.png?width=369&height=92" 
              alt="Logo" 
              className="w-full h-auto object-contain"
            />
          </a>
        </div>

        {/* Desktop Links - Reduced size */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wider uppercase font-sans"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA - Reduced size */}
        <div className="hidden md:block">
          <button 
            onClick={onRegister}
            className="bg-[#C20000] hover:bg-[#a50000] text-white text-sm font-normal py-2.5 px-6 rounded shadow-lg transition-all duration-200 uppercase tracking-wide font-condensed transform hover:-translate-y-0.5"
          >
            Comprar Ingresso
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none p-2"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0e0e0e] border-b border-white/10 py-6 px-4 flex flex-col space-y-4 shadow-2xl z-50 h-screen">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-2xl font-bold text-gray-200 hover:text-white block py-4 border-b border-white/5 font-condensed"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onRegister();
            }}
            className="bg-[#C20000] text-white text-center font-normal py-5 rounded block mt-8 text-2xl uppercase font-condensed shadow-glow tracking-wide w-full"
          >
            COMPRAR INGRESSO
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
