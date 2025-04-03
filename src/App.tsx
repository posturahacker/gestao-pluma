import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import { trackPageView as trackPinterestPageView } from "./services/PinterestConversionsAPI";
import { initializeTikTokPixel, trackPageView as trackTikTokPageView } from "./services/TikTokPixel";

const queryClient = new QueryClient();

// Componente para rastrear mudanças de página
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Rastrear visualização de página no Pinterest
    trackPinterestPageView();
    // Rastrear visualização de página no TikTok
    trackTikTokPageView();
  }, [location]);

  return null;
};

// Inicializar o Pixel do TikTok
initializeTikTokPixel();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <WhatsAppButton />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
