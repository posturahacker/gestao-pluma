import { v4 as uuidv4 } from 'uuid';

// Configurações da API de Conversões do Meta
const PIXEL_ID = '1768268140412454'; // ID do Pixel do Facebook
const ACCESS_TOKEN = 'EAAIt14txd0kBO77hbRTRkOyRo6vtmcvU6qKq5QJiMQ1VD5lZChPfqe0qCThLxSnVKRygDMOJoMlG3Dyd4k6Pwh6XRKeabZC40Gtwy8Pnr4D5VLx0wiS6UwTBLPfX4CSkU6ZA6ROCTrZCpSElUOLGuqZABSAepcRZAvWhFJJSsJOZApoxVbbtqugkkitH2BH5767ZCwZDZD';
const API_VERSION = 'v17.0'; // Versão estável da API

interface UserData {
  client_ip_address?: string;
  client_user_agent?: string;
  em?: string[];
  ph?: string[];
  fbc?: string;
  fbp?: string;
}

interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
}

interface EventData {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  user_data: UserData;
  custom_data?: CustomData;
  action_source: string;
}

/**
 * Função para hash SHA-256
 */
async function hashData(data: string): Promise<string> {
  if (!data) return '';
  
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  
  // Converter para string hexadecimal
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Obter cookies do FBP e FBC
 */
function getFbCookies(): { fbp: string | null, fbc: string | null } {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbp: cookies._fbp || null,
    fbc: cookies._fbc || null
  };
}

/**
 * Preparar os dados do usuário com hash
 */
async function prepareUserData(): Promise<UserData> {
  const { fbp, fbc } = getFbCookies();
  
  // Preparando dados do usuário
  const userData: UserData = {
    client_ip_address: '', // Será preenchido pelo servidor do Meta
    client_user_agent: navigator.userAgent
  };

  // Adicionando fbp/fbc se disponíveis
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  return userData;
}

/**
 * Enviar evento para a API de Conversões do Meta
 */
async function sendEvent(
  eventName: string, 
  customData?: CustomData
): Promise<void> {
  try {
    if (!PIXEL_ID) {
      console.error('Meta Pixel ID não configurado');
      return;
    }

    const userData = await prepareUserData();
    const eventTime = Math.floor(Date.now() / 1000);
    const eventId = uuidv4();
    
    const eventData: EventData = {
      event_name: eventName,
      event_time: eventTime,
      event_id: eventId,
      event_source_url: window.location.href,
      user_data: userData,
      action_source: 'website'
    };

    if (customData) {
      eventData.custom_data = customData;
    }

    // Garantindo que temos custom_data
    if (!eventData.custom_data) {
      eventData.custom_data = {};
    }
    
    // Garantindo valores mínimos necessários
    if (!eventData.custom_data.currency && (eventName === 'Contact')) {
      eventData.custom_data.currency = 'BRL';
    }
    
    if (!eventData.custom_data.value && (eventName === 'Contact')) {
      eventData.custom_data.value = 0;
    }

    const payload = {
      data: [eventData]
    };

    const endpoint = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Erro ao enviar evento para API de Conversões do Meta:', result);
      return;
    }

    console.log('Evento enviado com sucesso para API de Conversões do Meta');
  } catch (error) {
    console.error('Erro ao enviar evento para API de Conversões do Meta:', error);
  }
}

// Eventos predefinidos
const trackPageView = () => sendEvent('PageView');

const trackContact = (contactMethod: string) => sendEvent('Contact', {
  content_name: contactMethod,
  currency: 'BRL',
  value: 0
});

/**
 * Rastrear evento de início de checkout
 */
function trackInitiateCheckout(planName: string, price: number): void {
  try {
    if (!window.fbq) {
      console.error('[Meta Pixel] fbq não está disponível');
      return;
    }

    if (DEBUG) {
      console.log('[Meta Pixel] Rastreando início de checkout:', { planName, price });
    }

    window.fbq('track', 'InitiateCheckout', {
      content_name: planName,
      currency: 'BRL',
      value: price
    });
  } catch (error) {
    console.error('[Meta Pixel] Erro ao rastrear início de checkout:', error);
  }
}

export {
  trackPageView,
  trackContact,
  trackInitiateCheckout,
  sendEvent
}; 