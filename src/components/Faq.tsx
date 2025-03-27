import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItemProps {
  question: React.ReactNode;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown 
          size={20} 
          className={cn(
            "transition-transform duration-300",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>
      <div 
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="pb-4 pr-8 text-muted-foreground">
          {answer}
        </div>
      </div>
    </div>
  );
};

const BrandName = () => (
  <>
    Gestão<span className="italic">Pluma</span>
  </>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const faqData = [
    {
      question: <>Eu preciso saber usar o Notion para conseguir usar o <BrandName />?</>,
      answer: <>Não! O treinamento inclui aulas específicas para quem nunca usou o Notion. Você vai aprender tudo passo a passo, desde o básico até como personalizar o sistema para suas necessidades.</>
    },
    {
      question: "Vou precisar pagar o notion para usar?",
      answer: <>O plano gratuito do Notion é suficiente para utilizar o <BrandName />. Você só precisaria considerar o plano pago se quiser recursos extras que o próprio Notion oferece, mas não são necessários para o funcionamento completo do sistema.</>
    },
    {
      question: "O sistema é seguro para informações confidenciais de pacientes?",
      answer: "Sim! O sistema foi desenvolvido seguindo os princípios éticos da psicologia. O Notion possui criptografia de dados e o sistema foi pensado para manter a confidencialidade das informações. Além disso, você recebe orientações sobre melhores práticas de segurança digital."
    },
    {
      question: "Vou conseguir tirar dúvidas depois de comprar?",
      answer: "Sim! Você terá acesso à área do aluno por 18 meses, onde poderá interagir e tirar dúvidas com a professora e comunidade de psicólogas que também utilizam o sistema."
    },
    {
      question: "Serve para quem atende presencialmente e online?",
      answer: "Com certeza! O sistema foi desenvolvido para atender às necessidades tanto de profissionais que trabalham presencialmente quanto online, com recursos específicos para cada modalidade."
    },
    {
      question: "O Sistema tem modelos de documentos específicos para psicólogas?",
      answer: "Sim! Você receberá modelos de contratos, termos de consentimento, declarações e outros documentos essenciais para a prática clínica, todos criados especificamente para psicólogas."
    },
    {
      question: "Como funciona o sistema de evolução clínica dos pacientes?",
      answer: "O sistema permite registrar de forma organizada todas as sessões, observações, técnicas utilizadas e evolução dos pacientes. Você consegue visualizar o histórico completo e fazer anotações de forma segura e acessível."
    },
    {
      question: "O Sistema tem ferramenta de precificação para consultas?",
      answer: "Sim! Você terá acesso a planilhas e modelos para calcular o valor ideal das suas consultas, considerando seus custos, tempo investido e objetivos financeiros."
    }
  ];
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
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
    <section id="faq" className="py-20 relative overflow-hidden">
      <div className="container-lg relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal" ref={sectionRef}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Se você tem alguma dúvida, dá uma olhada aqui. E, caso não encontre o que procurava, manda uma mensagem pra gente! 🙂
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass-card rounded-2xl divide-y reveal">
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
