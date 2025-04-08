import React from 'react';
import { trackContact } from '@/services/MetaConversionsAPI';

const BrandName = () => (
  <>
    Gestão<span className="italic">Pluma</span>
  </>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-psi-950 text-white py-16">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Coluna da marca */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <span className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: '"Instrument Serif", serif' }}>
                <BrandName />
              </span>
            </div>
            <p className="text-gray-400 text-lg">
              Sistema completo para psicólogas organizarem sua clínica com clareza e leveza.
            </p>
          </div>
          
          {/* Coluna de links */}
          <div className="md:col-span-1">
            <h4 className="font-medium mb-6 text-lg">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Funcionalidades</a></li>
              <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefícios</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Preço</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Coluna de contato */}
          <div className="md:col-span-1">
            <h4 className="font-medium mb-6 text-lg">Contato</h4>
            <p className="text-gray-400 text-lg">Mande uma mensagem para nós no <a 
              href="http://wa.me/+5511967336619" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-psi-300 hover:text-psi-200 transition-colors underline"
              onClick={() => trackContact('WhatsApp Footer')}
            >WhatsApp</a></p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-12 mt-12 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Gestão Pluma. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
