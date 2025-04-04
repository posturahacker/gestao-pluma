declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const MEASUREMENT_ID = 'G-766KC1DRRL';
const DEBUG = true;

/**
 * Inicializa o Google Analytics
 */
function initializeGoogleAnalytics(): void {
  try {
    if (DEBUG) {
      console.log('[Google Analytics] Iniciando configuração...');
    }

    // Criar script do GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    
    // Adicionar handler de erro para o script
    script.onerror = function(error) {
      console.error('[Google Analytics] Erro ao carregar script:', error);
    };

    // Adicionar handler de carregamento
    script.onload = function() {
      if (DEBUG) {
        console.log('[Google Analytics] Script carregado com sucesso');
      }
    };

    // Inserir script no head
    document.head.appendChild(script);

    // Inicializar dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Configurar GA4
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID);

    if (DEBUG) {
      console.log('[Google Analytics] Configuração concluída');
    }
  } catch (error) {
    console.error('[Google Analytics] Erro durante a inicialização:', error);
  }
}

/**
 * Rastrear visualização de página
 */
function trackPageView(path?: string): void {
  try {
    if (!window.gtag) {
      console.error('[Google Analytics] gtag não está disponível');
      return;
    }

    const pageLocation = path || window.location.href;

    if (DEBUG) {
      console.log('[Google Analytics] Rastreando visualização de página:', pageLocation);
    }

    window.gtag('event', 'page_view', {
      page_location: pageLocation
    });
  } catch (error) {
    console.error('[Google Analytics] Erro ao rastrear visualização de página:', error);
  }
}

/**
 * Rastrear evento de contato
 */
function trackContact(contactMethod: string): void {
  try {
    if (!window.gtag) {
      console.error('[Google Analytics] gtag não está disponível');
      return;
    }

    if (DEBUG) {
      console.log('[Google Analytics] Rastreando evento de contato:', contactMethod);
    }

    window.gtag('event', 'contact', {
      method: contactMethod
    });
  } catch (error) {
    console.error('[Google Analytics] Erro ao rastrear evento de contato:', error);
  }
}

/**
 * Rastrear evento de início de checkout
 */
function trackInitiateCheckout(planName: string, price: number): void {
  try {
    if (!window.gtag) {
      console.error('[Google Analytics] gtag não está disponível');
      return;
    }

    if (DEBUG) {
      console.log('[Google Analytics] Rastreando início de checkout:', { planName, price });
    }

    window.gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: price,
      items: [{
        item_name: planName,
        price: price
      }]
    });
  } catch (error) {
    console.error('[Google Analytics] Erro ao rastrear início de checkout:', error);
  }
}

export {
  initializeGoogleAnalytics,
  trackPageView,
  trackContact,
  trackInitiateCheckout
}; 