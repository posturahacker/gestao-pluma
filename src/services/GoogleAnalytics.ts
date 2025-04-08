import { Analytics } from '@vercel/analytics/react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const MEASUREMENT_IDS = ['G-766KC1DRRL', 'G-BP9Z0961BC'];
const DEBUG = true;

/**
 * Inicializa o Google Analytics
 */
function initializeGoogleAnalytics(): void {
  try {
    if (DEBUG) {
      console.log('[Google Analytics] Iniciando configuração...');
    }

    // Criar script do GA4 para cada conta
    MEASUREMENT_IDS.forEach((measurementId) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      
      // Adicionar handler de erro para o script
      script.onerror = function(error) {
        console.error(`[Google Analytics] Erro ao carregar script para ${measurementId}:`, error);
      };

      // Adicionar handler de carregamento
      script.onload = function() {
        if (DEBUG) {
          console.log(`[Google Analytics] Script carregado com sucesso para ${measurementId}`);
        }
      };

      // Inserir script no head
      document.head.appendChild(script);
    });

    // Inicializar dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Configurar GA4 para cada conta
    gtag('js', new Date());
    MEASUREMENT_IDS.forEach((measurementId) => {
      gtag('config', measurementId);
    });

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

    // Enviar evento para cada conta
    MEASUREMENT_IDS.forEach((measurementId) => {
      window.gtag('event', 'page_view', {
        page_location: pageLocation,
        send_to: measurementId
      });
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

    // Enviar evento para cada conta
    MEASUREMENT_IDS.forEach((measurementId) => {
      window.gtag('event', 'contact', {
        method: contactMethod,
        send_to: measurementId
      });
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

    // Enviar evento para cada conta
    MEASUREMENT_IDS.forEach((measurementId) => {
      window.gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: price,
        items: [{
          item_name: planName,
          price: price
        }],
        send_to: measurementId
      });
    });
  } catch (error) {
    console.error('[Google Analytics] Erro ao rastrear início de checkout:', error);
  }
}

export const trackGooglePageView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', '483483132', {
      page_path: window.location.pathname,
      page_title: document.title
    });
  }
};

export const trackGoogleContact = (method: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact', {
      method: method
    });
  }
};

export const trackGoogleCheckout = (productName: string, price: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: price,
      items: [{
        item_name: productName,
        price: price
      }]
    });
  }
};

export {
  initializeGoogleAnalytics,
  trackPageView,
  trackContact,
  trackInitiateCheckout
}; 