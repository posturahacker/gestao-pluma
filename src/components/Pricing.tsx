import React, { useEffect, useRef } from 'react';
import Button from './Button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackInitiateCheckout as trackGoogleCheckout } from '@/services/GoogleAnalytics';
import { trackCheckout as trackPinterestCheckout } from '@/services/PinterestConversionsAPI';
import { trackInitiateCheckout as trackMetaCheckout } from '@/services/MetaConversionsAPI';
import { trackInitiateCheckout as trackTikTokCheckout } from '@/services/TikTokPixel';
import { trackDataLayerCheckout } from '../services/DataLayer';

const BrandName = () => (
  <span className="whitespace-nowrap">Gestão<span className="italic">Pluma</span></span>
);

const PricingFeature: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center gap-2 my-2">
      <Check size={18} className="text-psi-500 shrink-0" />
      <span>{children}</span>
    </div>
  );
};

interface PricingProps {
  isKiwify?: boolean
}

export function Pricing({ isKiwify = false }: PricingProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
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
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handlePurchaseClick = () => {
    // Track events
    trackGoogleCheckout('GestãoPluma', 47);
    trackPinterestCheckout('GestãoPluma', 47);
    trackDataLayerCheckout('GestãoPluma', 47);

    // Redirecionar para a página de checkout
    window.location.href = isKiwify 
      ? 'https://pay.kiwify.com.br/avjNVQ2'
      : 'https://payment.ticto.app/O5114D5AA';
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-psi-50 to-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-psi-200 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-psi-100 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container-lg relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal" ref={sectionRef}>
          <span className="inline-block px-3 py-1 bg-psi-100 text-psi-700 text-sm font-medium rounded-full mb-4">
            Investimento
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mt-2 mb-4">
            Comece agora a organizar sua prática clínica
          </h2>
          <p className="text-muted-foreground text-lg">
            Por menos de 1 real por dia você tem acesso a ferramentas completas para tornar sua rotina profissional mais eficiente
          </p>
        </div>
        
        <div 
          ref={cardRef}
          className="max-w-4xl mx-auto glass-card shadow-xl rounded-3xl overflow-hidden reveal"
        >
          <div className="bg-gradient-to-r from-psi-400 to-psi-500 p-6 text-white">
            <h3 className="text-2xl font-display font-semibold mb-2"><BrandName /></h3>
            <p>Sistema completo para psicólogas organizarem sua clínica</p>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="mb-6">
                  <p className="text-muted-foreground mb-1">Valor normal</p>
                  <p className="text-2xl font-medium line-through decoration-2 text-muted-foreground">R$197,00</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-muted-foreground mb-1">Oferta especial</p>
                  <p className="text-4xl font-bold text-foreground">R$47</p>
                  <p className="text-muted-foreground">ou 11x de R$5,08</p>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold mb-4 text-lg">No <BrandName /> você vai ter acesso a:</h4>
                <div className="space-y-1">
                  <PricingFeature>Sistema completo no notion para gestão</PricingFeature>
                  <PricingFeature>Treinamento completo para utilização</PricingFeature>
                  <PricingFeature>1 ano e meio de acesso à área de membros</PricingFeature>
                  <PricingFeature>30 Prompts de Inteligência artificial</PricingFeature>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <div className="bg-psi-50 p-6 rounded-xl mb-6">
                <p className="text-psi-700 text-center">
                  O acesso ao <BrandName /> é vitalício: uma vez que você adquire, ele será pra sempre seu, com acesso aos tutoriais, suporte com o TimePluma e materiais bônus.
                </p>
              </div>
              
              <Button
                variant="primary" 
                size="lg"
                className="w-full py-6 text-lg shadow-lg shadow-psi-300/20"
                href={isKiwify ? 'https://pay.kiwify.com.br/avjNVQ2' : 'https://payment.ticto.app/O5114D5AA'}
                target="_blank"
                onClick={handlePurchaseClick}
              >
                Quero meu <BrandName />!
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10 text-muted-foreground">
          <p>
            Acreditamos na importância de apoiar profissionais que cuidam da saúde mental, permitindo que possam 
            otimizar seu tempo e energia para o que realmente importa: o cuidado com seus pacientes e consigo mesmas 🙂
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
