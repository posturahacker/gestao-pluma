import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const BrandName = () => (
  <>
    Gestão<span className="italic">Pluma</span>
  </>
);

interface TestimonialProps {
  quote: string;
  author?: string;
  role?: string;
}

const testimonialData: TestimonialProps[] = [
  {
    quote: "Finalmente consigo ter todas as informações dos meus pacientes organizadas e acessíveis, sem precisar carregar cadernos ou me preocupar com papéis soltos.",
  },
  {
    quote: "Diminuí em 70% o tempo que gastava com tarefas administrativas e agora consigo dedicar esse tempo ao meu autocuidado!",
  },
  {
    quote: "Um material para conseguir aplicar e ver resultados na prática. Revolucionou minha forma de organizar a clínica.",
  },
  {
    quote: "✨ Surpreende em cada detalhe. Pensei que seria apenas mais um organizador, mas é um sistema completo que pensa em tudo o que precisamos ✨",
  },
  {
    quote: "✨ Direto e super prático. Em uma semana já estava com tudo organizado e me sentindo muito mais leve ✨",
  },
  {
    quote: "Consegui visualizar melhor meu fluxo financeiro e aumentei meu faturamento em 30% após organizar melhor minha agenda e precificação com o sistema!",
  }
];

const TestimonialCard: React.FC<TestimonialProps & { className?: string }> = ({ quote, author, role, className }) => {
  return (
    <div className={cn(
      "glass-card p-8 rounded-2xl relative z-10 h-full flex flex-col",
      className
    )}>
      <div className="mb-4 text-psi-400">
        <Quote size={30} />
      </div>
      <p className="text-lg mb-6 flex-grow">{quote}</p>
      {author && (
        <div>
          <p className="font-semibold">{author}</p>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      )}
    </div>
  );
};

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const maxSlides = Math.ceil(testimonialData.length / 3);
  
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % maxSlides);
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
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
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-psi-100 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container-lg relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal" ref={sectionRef}>
          <span className="text-sm font-medium text-psi-600 uppercase tracking-wider">Depoimentos</span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mt-2 mb-4">
            O que dizem as psicólogas que já usam o sistema
          </h2>
          <p className="text-muted-foreground text-lg">
            Veja como o <BrandName /> tem transformado a rotina de psicólogas clínicas
          </p>
        </div>
        
        <div className="relative">
          {/* Desktop view */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {testimonialData.slice(activeSlide * 3, activeSlide * 3 + 3).map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                quote={testimonial.quote} 
                author={testimonial.author} 
                role={testimonial.role}
                className="reveal"
                // Style will be applied by reveal animation
              />
            ))}
          </div>
          
          {/* Mobile view */}
          <div className="md:hidden">
            <TestimonialCard 
              quote={testimonialData[activeSlide].quote} 
              author={testimonialData[activeSlide].author} 
              role={testimonialData[activeSlide].role}
              className="reveal"
            />
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-200 hover:bg-psi-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2 items-center">
              {Array.from({ length: maxSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeSlide === index ? "bg-psi-500 w-4" : "bg-gray-300"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-200 hover:bg-psi-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
