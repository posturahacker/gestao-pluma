import React, { useEffect, useRef } from 'react';
import { Clock, Brain, TrendingUp, X, Check, FileSearch, TimerOff, BrainCircuit, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const BrandName = () => (
  <>
    Gestão<span className="italic">Pluma</span>
  </>
);

interface BenefitProps {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  delay: number;
}

const Benefit: React.FC<BenefitProps> = ({ title, description, icon, delay }) => {
  const benefitRef = useRef<HTMLDivElement>(null);
  
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
    
    if (benefitRef.current) {
      observer.observe(benefitRef.current);
    }
    
    return () => {
      if (benefitRef.current) {
        observer.unobserve(benefitRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={benefitRef}
      className={cn(
        "reveal flex flex-col md:flex-row items-start gap-5 p-6 rounded-2xl transition-all duration-500",
        `reveal-delay-${delay}`
      )}
    >
      <div className="mb-4 md:mb-0 p-3 bg-psi-100 rounded-xl w-12 h-12 flex items-center justify-center shrink-0 text-psi-600">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const Benefits = () => {
  const benefitsData = [
    {
      title: "Economia de tempo",
      description: <>O <BrandName /> centraliza todas as informações da sua prática em um único local, evitando gastar tempo com tarefas administrativas. Com tudo organizado, você pode focar no que realmente importa: atender seus pacientes com mais qualidade e cuidar do seu próprio bem-estar.</>,
      icon: <Clock size={24} />,
      delay: 100
    },
    {
      title: "Mais presença",
      description: "Com as tarefas administrativas organizadas, você consegue estar mais presente durante as sessões, sem a preocupação de lembrar detalhes administrativos ou se perder em anotações desorganizadas. Seus pacientes sentirão a diferença!",
      icon: <Brain size={24} />,
      delay: 200
    },
    {
      title: "Mais crescimento",
      description: <>O <BrandName /> ajuda você a usar o tempo da melhor forma, oferecendo uma visão sistêmica da sua prática para que consiga enxergar novas oportunidades, expandir seus serviços e transformar sua vocação em uma carreira próspera e sustentável.</>,
      icon: <TrendingUp size={24} />,
      delay: 300
    }
  ];

  const comparisonData = [
    {
      disorganized: "Perda de tempo com papelada, agendamentos manuais e burocracia",
      organized: "Economia de tempo com organização centralizada e processos otimizados",
      iconDisorganized: <TimerOff size={20} />,
      iconOrganized: <Clock size={20} />
    },
    {
      disorganized: "Distração durante as sessões por preocupações administrativas",
      organized: "Presença total nas sessões, focada exclusivamente em seus pacientes",
      iconDisorganized: <FileSearch size={20} />,
      iconOrganized: <Brain size={20} />
    },
    {
      disorganized: "Estagnação profissional por falta de visão estratégica",
      organized: "Crescimento sustentável com visão clara das oportunidades",
      iconDisorganized: <TrendingDown size={20} />,
      iconOrganized: <TrendingUp size={20} />
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  
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
    
    if (compareRef.current) {
      observer.observe(compareRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (compareRef.current) {
        observer.unobserve(compareRef.current);
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="flex flex-col gap-10">
            {benefitsData.map((benefit, index) => (
              <Benefit
                key={index}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
                delay={benefit.delay}
              />
            ))}
          </div>
          
          <motion.div 
            className="flex items-center justify-center reveal"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            ref={compareRef}
          >
            <div className="glass-card p-6 rounded-2xl shadow-xl w-full">
              <h3 className="text-xl font-semibold text-center mb-6">Antes × Depois</h3>
              
              <div className="space-y-6">
                {comparisonData.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="p-2 bg-red-100 text-red-600 rounded-full">
                        <X size={16} />
                      </div>
                      <div>
                        <p className="text-sm text-red-700">{item.disorganized}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 text-green-600 rounded-full">
                        <Check size={16} />
                      </div>
                      <div>
                        <p className="text-sm text-green-700">{item.organized}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
