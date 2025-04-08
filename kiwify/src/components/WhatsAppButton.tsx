import { Button } from "@/components/ui/button";
import { trackGoogleContact } from '../services/GoogleAnalytics';
import { trackMetaContact } from '../services/MetaConversionsAPI';
import { trackTikTokContact } from '../services/TikTokPixel';
import { trackPinterestContact } from '../services/PinterestConversionsAPI';
import { trackDataLayerContact } from '../services/DataLayer';

const WhatsAppButton = () => {
  const handleClick = () => {
    // Tracking
    trackGoogleContact('WhatsApp');
    trackMetaContact('WhatsApp');
    trackTikTokContact('WhatsApp');
    trackPinterestContact('WhatsApp');
    trackDataLayerContact('WhatsApp');
    
    // Redirecionamento
    window.location.href = 'https://wa.me/5511973841920';
  };

  return (
    <Button
      variant="default"
      size="lg"
      className="fixed bottom-4 right-4 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      WhatsApp
    </Button>
  );
};

export default WhatsAppButton; 