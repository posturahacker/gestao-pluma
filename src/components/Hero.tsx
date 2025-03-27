import React, { useEffect, useRef } from 'react';
import Button from './Button';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const BrandName = () => (
  <>
    Gestão<span className="italic">Pluma</span>
  </>
);

const Hero = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = scrollRef.current;
      if (!element) return;
      
      const distance = window.scrollY;
      const opacity = 1 - Math.min(distance / 500, 1);
      element.style.opacity = opacity.toString();
      element.style.transform = `translateY(${distance * 0.3}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-psi-100/50 to-transparent"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-psi-200 rounded-full filter blur-3xl opacity-40"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-psi-200 rounded-full filter blur-3xl opacity-30"></div>
      
      <div ref={scrollRef} className="container-lg relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-psi-100 text-psi-700 text-sm font-medium mb-6">
              Sistema completo para psicólogas
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight md:leading-tight text-balance mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Organize sua clínica com <span className="text-psi-500">clareza</span> e <span className="text-psi-500">leveza</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Sua prática clínica organizada do jeito que você sempre sonhou
          </motion.p>
          
          <motion.div
            className="max-w-2xl mx-auto mb-14 text-muted-foreground text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              Com o método <BrandName />, você vai estruturar toda sua prática profissional: 
              gerir seus pacientes, acompanhar evoluções clínicas, controlar finanças, organizar seus estudos e 
              planejar seu crescimento com clareza e leveza. Proteja seu tempo para focar no que realmente importa: 
              cuidar das pessoas e de você mesma.
            </p>
          </motion.div>
          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-lg shadow-psi-300/20 px-8"
              href="https://pay.kiwify.com.br/avjNVQ2"
              target="_blank"
            >
              Quero organizar minha prática clínica
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#features" className="inline-flex flex-col items-center text-sm text-muted-foreground hover:text-psi-500 transition-colors">
              <span className="mb-2">Veja o sistema por dentro</span>
              <ArrowDown size={20} className="animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <span className="bg-psi-50 px-4 py-2 rounded-full inline-block">
          ✸ você não precisa saber mexer no notion, no nosso treinamento, você vai aprender tudo que precisa pra usar seu sistema ✸
        </span>
      </div>
    </section>
  );
};

export default Hero;
