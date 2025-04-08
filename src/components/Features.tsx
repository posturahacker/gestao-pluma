import React, { useEffect, useRef } from 'react';
import { Users, Calendar, DollarSign, BookOpen, TrendingUp, Zap, Robot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  title: string;
  description: string | React.ReactNode;
  icon: React.ReactNode;
  delay: number;
  isPremium?: boolean;
}

const BrandName = () => (
  <>
    Gestão<span className="italic">Pluma</span>
  </>
);

const Feature: React.FC<FeatureProps> = ({ title, description, icon, delay, isPremium = false }) => {
  const featureRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (featureRef.current) {
      observer.observe(featureRef.current);
    }
    
    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={featureRef}
      className={cn(
        "reveal glass-card p-6 rounded-2xl transition-all duration-500",
        `reveal-delay-${delay}`,
        isPremium && "border-2 border-psi-400 relative bg-gradient-to-br from-white to-psi-50"
      )}
    >
      {isPremium && (
        <div className="absolute -top-3 -right-3 bg-psi-600 text-white text-xs px-3 py-1 rounded-full">
          IA + Automação
        </div>
      )}
      <div className={cn(
        "mb-4 p-3 rounded-xl w-12 h-12 flex items-center justify-center",
        isPremium ? "bg-psi-200 text-psi-700" : "bg-psi-100 text-psi-600"
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const Features = () => {
  const featuresData = [
    {
      title: "Gestão de Pacientes",
      description: "Centralize todas as informações dos seus pacientes em um só lugar! Organize prontuários, históricos e evolução do tratamento.",
      icon: <Users size={24} />,
      delay: 100
    },
    {
      title: "Agenda e Horários",
      description: "Tenha controle total da sua agenda! Organize seus horários de atendimento, pausas, férias e supervisão.",
      icon: <Calendar size={24} />,
      delay: 200
    },
    {
      title: "Finanças da Clínica",
      description: "Simplifique a gestão financeira da sua prática. Acompanhe receitas, despesas e pagamentos pendentes.",
      icon: <DollarSign size={24} />,
      delay: 300
    },
    {
      title: "Formação Continuada",
      description: "Organize seus estudos e desenvolvimento profissional! Centralize artigos, livros, cursos e anotações.",
      icon: <BookOpen size={24} />,
      delay: 400
    },
    {
      title: "Marketing e Crescimento",
      description: "Potencialize sua carreira e visibilidade profissional! Organize seu conteúdo para redes sociais e planeje parcerias.",
      icon: <TrendingUp size={24} />,
      delay: 500
    },
    {
      title: "IA & Automações",
      description: "Totalmente integrável com a PlumaAI: economize tempo com automações inteligentes, agendamentos automáticos com pacientes e geração de prontuários com comandos de voz!",
      icon: <Zap size={24} />,
      delay: 600,
      isPremium: true
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
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-psi-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-psi-100 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container-lg relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal" ref={sectionRef}>
          <span className="text-sm font-medium text-psi-600 uppercase tracking-wider">Funcionalidades</span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mt-2 mb-4">
            Organização e foco: tudo que sua prática clínica precisa num só lugar!
          </h2>
          <p className="text-muted-foreground text-lg">
            Perfeito para psicólogas clínicas em início de carreira, profissionais com agenda lotada,
            atendimentos online ou quem deseja escalar sua prática.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
              isPremium={feature.isPremium}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
