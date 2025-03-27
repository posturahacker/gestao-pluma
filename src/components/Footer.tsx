import React from 'react';

const BrandName = () => (
  <>
    Gestão<span className="italic">Pluma</span>
  </>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-psi-950 text-white py-12">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <span className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: '"Instrument Serif", serif' }}>
                <BrandName />
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Sistema completo para psicólogas organizarem sua clínica com clareza e leveza.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Funcionalidades</a></li>
              <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefícios</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Preço</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Suporte</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contato</h4>
            <p className="text-gray-400 mb-2">Mande uma mensagem para nós:</p>
            <a href="mailto:contato@gestaopluma.com.br" className="text-psi-300 hover:text-psi-200 transition-colors">
              contato@gestaopluma.com.br
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Gestão Pluma. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
