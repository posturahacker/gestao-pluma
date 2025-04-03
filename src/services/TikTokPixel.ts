declare global {
  interface Window {
    TiktokAnalyticsObject: string;
    ttq: any;
  }
}

const PIXEL_ID = 'CVNGK5BC77U34F1TM1U0';

/**
 * Inicializa o Pixel do TikTok
 */
function initializeTikTokPixel(): void {
  const w = window;
  const d = document;
  const t = 'ttq';

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

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = r + "?sdkid=" + e + "&lib=" + t;

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  };

  // Inicializar o pixel
  ttq.load(PIXEL_ID);
  ttq.page();
}

/**
 * Rastrear visualização de página
 */
function trackPageView(): void {
  if (window.ttq) {
    window.ttq.page();
  }
}

/**
 * Rastrear evento de contato
 */
function trackContact(contactMethod: string): void {
  if (window.ttq) {
    window.ttq.track('Contact', {
      content_name: contactMethod
    });
  }
}

export {
  initializeTikTokPixel,
  trackPageView,
  trackContact
}; 