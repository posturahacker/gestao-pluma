import React, { useEffect, useRef } from 'react';
import { Clock, Brain, TrendingUp, X, Check, FileSearch, TimerOff, BrainCircuit, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const BrandName = () => (
  <>
    Gestão<span className="italic">Pluma</span>
  </>
);

export const Benefits = () => {
  const benefitsData = [
    {
      title: "Economia de tempo",
      titleBefore: "Desperdício de tempo",
      description: <>Todas as informações centralizadas em um único local. Processos otimizados e automatizados que eliminam a burocracia, permitindo que você foque no que realmente importa: seus pacientes e seu bem-estar.</>,
      icon: <Clock size={24} />,
      iconBefore: <TimerOff size={24} />,
      before: "Tempo desperdiçado com papelada e burocracia desnecessária. Dificuldade em gerenciar informações espalhadas em diferentes lugares, resultando em retrabalho e ineficiência na gestão da clínica."
    },
    {
      title: "Mais presença",
      titleBefore: "Falta de foco",
      description: "Sistema organizado que elimina preocupações administrativas durante as sessões. Você consegue estar 100% presente para seus pacientes, sem distrações com anotações ou detalhes burocráticos.",
      icon: <Brain size={24} />,
      iconBefore: <FileSearch size={24} />,
      before: "Qualidade das sessões comprometida por distrações administrativas constantes. Dificuldade em manter o foco no paciente por estar sobrecarregada com questões burocráticas e organizacionais."
    },
    {
      title: "Mais crescimento",
      titleBefore: "Estagnação profissional",
      description: "Visão sistêmica da sua prática que permite identificar oportunidades. Tempo e energia direcionados para expandir seus serviços e construir uma carreira próspera.",
      icon: <TrendingUp size={24} />,
      iconBefore: <TrendingDown size={24} />,
      before: "Carreira estagnada pela falta de visão estratégica do negócio. Dificuldade em expandir a prática e aumentar a renda por não ter clareza dos números."
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-white to-psi-50 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-psi-200 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container-lg relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal" ref={sectionRef}>
          <span className="text-sm font-medium text-psi-600 uppercase tracking-wider">Benefícios</span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mt-2 mb-4">
            Como o <BrandName /> pode te ajudar
          </h2>
          <p className="text-muted-foreground text-lg">
            Chega de desorganização. O <BrandName /> é muito mais que um simples organizador – é uma solução completa para psicólogas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Coluna "Antes" */}
          <div className="bg-white/50 p-8 rounded-2xl border border-gray-100 space-y-8">
            <h3 className="text-xl font-semibold text-center mb-8 text-red-600">Sem organização</h3>
            {benefitsData.map((benefit, index) => (
              <div key={`before-${index}`} className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600">
                    {benefit.iconBefore}
                  </div>
                  <h4 className="text-lg font-medium text-red-600">{benefit.titleBefore}</h4>
                </div>
                <p className="text-muted-foreground">{benefit.before}</p>
              </div>
            ))}
          </div>

          {/* Coluna "Depois" */}
          <div className="bg-white/50 p-8 rounded-2xl border border-gray-100 space-y-8">
            <h3 className="text-xl font-semibold text-center mb-8 text-psi-600">Com <BrandName /></h3>
            {benefitsData.map((benefit, index) => (
              <div key={`after-${index}`} className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-psi-100 rounded-lg text-psi-600">
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-medium text-psi-600">{benefit.title}</h4>
                </div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
