declare global {
  interface Window {
    TiktokAnalyticsObject: string;
    ttq: any;
  }
}

const PIXEL_ID = 'CVNGK5BC77U34F1TM1U0';
const DEBUG = true; // Habilitar logs de debug

/**
 * Inicializa o Pixel do TikTok
 */
function initializeTikTokPixel(): void {
  try {
    const w = window;
    const d = document;
    const t = 'ttq';

    if (DEBUG) {
      console.log('[TikTok Pixel] Iniciando configuração...');
    }

    w.TiktokAnalyticsObject = t;
    const ttq = w[t] = w[t] || [];
    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
      "holdConsent",
      "revokeConsent",
      "grantConsent"
    ];

    ttq.setAndDefer = function(t: any, e: string) {
      t[e] = function() {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };

    for (let i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }

    ttq.instance = function(t: string) {
      const e = ttq._i[t] || [];
      for (let n = 0; n < ttq.methods.length; n++) {
        ttq.setAndDefer(e, ttq.methods[n]);
      }
      return e;
    };

    ttq.load = function(e: string, n?: any) {
      const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
      const o = n && n.partner;
      ttq._i = ttq._i || {};
      ttq._i[e] = [];
      ttq._i[e]._u = r;
      ttq._t = ttq._t || {};
      ttq._t[e] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[e] = n || {};

      if (DEBUG) {
        console.log(`[TikTok Pixel] Carregando script para pixel ID: ${e}`);
        console.log(`[TikTok Pixel] URL atual: ${window.location.href}`);
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = r + "?sdkid=" + e + "&lib=" + t;

      // Adicionar handler de erro para o script
      script.onerror = function(error) {
        console.error('[TikTok Pixel] Erro ao carregar script:', error);
      };

      // Adicionar handler de carregamento
      script.onload = function() {
        if (DEBUG) {
          console.log('[TikTok Pixel] Script carregado com sucesso');
        }
      };

      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    };

    // Inicializar o pixel
    ttq.load(PIXEL_ID);
    
    // Verificar se o pixel foi carregado corretamente
    setTimeout(() => {
      if (!w.ttq || typeof w.ttq.page !== 'function') {
        console.error('[TikTok Pixel] Erro: Pixel não foi inicializado corretamente');
      } else if (DEBUG) {
        console.log('[TikTok Pixel] Pixel inicializado com sucesso');
      }
    }, 2000);

    ttq.page();
  } catch (error) {
    console.error('[TikTok Pixel] Erro durante a inicialização:', error);
  }
}

/**
 * Rastrear visualização de página
 */
function trackPageView(): void {
  try {
    if (!window.ttq) {
      console.error('[TikTok Pixel] ttq não está disponível');
      return;
    }

    if (DEBUG) {
      console.log('[TikTok Pixel] Rastreando visualização de página:', window.location.href);
    }

    window.ttq.page();
  } catch (error) {
    console.error('[TikTok Pixel] Erro ao rastrear visualização de página:', error);
  }
}

/**
 * Rastrear evento de contato
 */
function trackContact(contactMethod: string): void {
  try {
    if (!window.ttq) {
      console.error('[TikTok Pixel] ttq não está disponível');
      return;
    }

    if (DEBUG) {
      console.log('[TikTok Pixel] Rastreando evento de contato:', contactMethod);
    }

    window.ttq.track('Contact', {
      content_name: contactMethod
    });
  } catch (error) {
    console.error('[TikTok Pixel] Erro ao rastrear evento de contato:', error);
  }
}

export {
  initializeTikTokPixel,
  trackPageView,
  trackContact
}; 