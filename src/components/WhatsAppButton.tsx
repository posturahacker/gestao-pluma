import { MessageCircle } from 'lucide-react';
import { trackButtonClick } from '@/services/MetaConversionsAPI';

const WhatsAppButton = () => {
  return (
    <a
      href="http://wa.me/+5511967336619"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
      aria-label="Contato WhatsApp"
      onClick={() => trackButtonClick('Contato WhatsApp')}
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default WhatsAppButton; 