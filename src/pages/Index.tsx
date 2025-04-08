import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Benefits } from '@/components/Benefits';
import { Testimonials } from '@/components/Testimonials';
import { Pricing } from '@/components/Pricing';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { motion } from 'framer-motion';
import { trackPageView } from '@/services/MetaConversionsAPI';

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
    
    // Rastrear visualização de página
    trackPageView();
    
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
      <WhatsAppButton />
    </div>
  );
};

export default Index;
