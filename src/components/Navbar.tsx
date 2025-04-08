import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { trackInitiateCheckout } from '@/services/GoogleAnalytics';
import { trackCheckout as trackPinterestCheckout } from '@/services/PinterestConversionsAPI';
import { trackInitiateCheckout as trackMetaCheckout } from '@/services/MetaConversionsAPI';
import { trackInitiateCheckout as trackTikTokCheckout } from '@/services/TikTokPixel';
import { trackGoogleCheckout } from '../services/GoogleAnalytics';
import { trackDataLayerCheckout } from '../services/DataLayer';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // Tracking
    trackGoogleCheckout('GestãoPluma', 47);
    trackPinterestCheckout('GestãoPluma', 47);
    trackDataLayerCheckout('GestãoPluma', 47);
    
    // Redirecionamento
    window.location.href = 'https://payment.ticto.app/O5114D5AA';
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 border-b',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-gray-200/20 shadow-sm' 
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container-lg">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-bold text-psi-600" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Gestão<span className="italic">Pluma</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-foreground hover:text-psi-600 transition-colors">Funcionalidades</a>
            <a href="#benefits" className="text-sm font-medium text-foreground hover:text-psi-600 transition-colors">Benefícios</a>
            <a href="#pricing" className="text-sm font-medium text-foreground hover:text-psi-600 transition-colors">Preço</a>
            <a href="#testimonials" className="text-sm font-medium text-foreground hover:text-psi-600 transition-colors">Depoimentos</a>
            <a href="#faq" className="text-sm font-medium text-foreground hover:text-psi-600 transition-colors">FAQ</a>
          </nav>
          
          <div className="hidden md:block">
            <Button
              variant="primary" 
              className="w-full"
              href="https://payment.ticto.app/O5114D5AA"
              target="_blank"
              onClick={handleClick}
            >
              Quero organizar minha prática
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[60px] bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out md:hidden",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        )}
      >
        <div className="container py-4 flex flex-col gap-4">
          <a 
            href="#features" 
            className="px-4 py-2 text-foreground hover:text-psi-600 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Funcionalidades
          </a>
          <a 
            href="#benefits" 
            className="px-4 py-2 text-foreground hover:text-psi-600 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Benefícios
          </a>
          <a 
            href="#pricing" 
            className="px-4 py-2 text-foreground hover:text-psi-600 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Preço
          </a>
          <a 
            href="#testimonials" 
            className="px-4 py-2 text-foreground hover:text-psi-600 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Depoimentos
          </a>
          <a 
            href="#faq" 
            className="px-4 py-2 text-foreground hover:text-psi-600 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </a>
          <div className="mt-2 px-4">
            <Button
              variant="primary" 
              className="w-full"
              href="https://payment.ticto.app/O5114D5AA"
              target="_blank"
              onClick={handleClick}
            >
              Quero organizar minha prática
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
