declare global {
  interface Window {
    dataLayer: any[];
  }
}

const DEBUG = true;

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

export {
  pushEvent,
  trackPageView,
  trackContact,
  trackInitiateCheckout
}; 