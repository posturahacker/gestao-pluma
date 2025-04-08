const DEBUG = true;

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Envia um evento para o dataLayer
 */
function pushEvent(eventName: string, eventData: Record<string, any> = {}): void {
  try {
    if (!window.dataLayer) {
      console.error('[DataLayer] dataLayer não está disponível');
      return;
    }

    const event = {
      event: eventName,
      ...eventData
    };

    if (DEBUG) {
      console.log('[DataLayer] Enviando evento:', event);
    }

    window.dataLayer.push(event);
  } catch (error) {
    console.error('[DataLayer] Erro ao enviar evento:', error);
  }
}

/**
 * Rastrear visualização de página
 */
function trackPageView(path?: string): void {
  pushEvent('page_view', {
    page_location: path || window.location.href,
    page_title: document.title
  });
}

/**
 * Rastrear evento de contato
 */
function trackContact(contactMethod: string): void {
  pushEvent('contact', {
    method: contactMethod
  });
}

/**
 * Rastrear evento de início de checkout
 */
function trackInitiateCheckout(planName: string, price: number): void {
  pushEvent('begin_checkout', {
    currency: 'BRL',
    value: price,
    items: [{
      item_name: planName,
      price: price
    }]
  });
}

export const trackDataLayerPageView = () => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: window.location.pathname,
      page_title: document.title
    });
    if (DEBUG) console.log('DataLayer: PageView tracked');
  }
};

export const trackDataLayerContact = (method: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'contact',
      method: method
    });
    if (DEBUG) console.log('DataLayer: Contact tracked', { method });
  }
};

export const trackDataLayerCheckout = (productName: string, price: number) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'begin_checkout',
      currency: 'BRL',
      value: price,
      items: [{
        item_name: productName,
        price: price
      }]
    });
    if (DEBUG) console.log('DataLayer: Checkout tracked', { productName, price });
  }
};

export {
  pushEvent,
  trackPageView,
  trackContact,
  trackInitiateCheckout
}; 