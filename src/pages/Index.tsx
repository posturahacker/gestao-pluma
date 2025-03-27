
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const handleScroll = () => {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
};

const Index = () => {
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background antialiased overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      
      <Footer />
      
      {/* Floating "Back to top" button */}
      <BackToTopButton />
    </div>
  );
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  
  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 p-3 rounded-full bg-psi-500 text-white shadow-lg z-50 ${isVisible ? 'flex' : 'hidden'} items-center justify-center hover:bg-psi-600 transition-colors focus:outline-none focus:ring-2 focus:ring-psi-400 focus:ring-offset-2`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
      aria-label="Voltar ao topo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
};

export default Index;
