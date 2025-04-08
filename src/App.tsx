import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Kiwify from "./pages/Kiwify";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import { trackPageView as trackPinterestPageView } from "./services/PinterestConversionsAPI";
import { initializeTikTokPixel, trackPageView as trackTikTokPageView } from "./services/TikTokPixel";
import { initializeGoogleAnalytics, trackPageView as trackGooglePageView } from "./services/GoogleAnalytics";
import { trackPageView as trackDataLayerPageView } from "./services/DataLayer";
import { trackMetaPageView } from './services/MetaConversionsAPI';

const queryClient = new QueryClient();

// Componente para rastrear mudanças de página
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Rastrear visualização de página no dataLayer
    trackDataLayerPageView();
    
    // Rastrear visualização de página no Pinterest
    trackPinterestPageView();
    
    // Rastrear visualização de página no TikTok
    trackTikTokPageView();
    
    // Rastrear visualização de página no Google Analytics
    trackGooglePageView();

    // Tracking de visualização de página
    trackMetaPageView();
  }, [location]);

  return null;
};

// Inicializar pixels e analytics
initializeTikTokPixel();
initializeGoogleAnalytics();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kiwify" element={<Kiwify />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <WhatsAppButton />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
