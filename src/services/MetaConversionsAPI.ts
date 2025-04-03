import { v4 as uuidv4 } from 'uuid';

// Configurações da API de Conversões do Meta
const PIXEL_ID = '1768268140412454'; // ID do Pixel do Facebook
const ACCESS_TOKEN = 'EAAIt14txd0kBO77hbRTRkOyRo6vtmcvU6qKq5QJiMQ1VD5lZChPfqe0qCThLxSnVKRygDMOJoMlG3Dyd4k6Pwh6XRKeabZC40Gtwy8Pnr4D5VLx0wiS6UwTBLPfX4CSkU6ZA6ROCTrZCpSElUOLGuqZABSAepcRZAvWhFJJSsJOZApoxVbbtqugkkitH2BH5767ZCwZDZD';
const API_VERSION = 'v22.0';

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
  
  const userData: UserData = {
    client_ip_address: '', // Será preenchido pelo servidor do Meta
    client_user_agent: navigator.userAgent,
    fbp: fbp || undefined,
    fbc: fbc || undefined
  };

  // Se tiver email do usuário, adicione aqui
  // const email = 'example@email.com';
  // if (email) {
  //   const hashedEmail = await hashData(email);
  //   userData.em = [hashedEmail];
  // }

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

    console.log('Evento enviado com sucesso para API de Conversões do Meta:', result);
  } catch (error) {
    console.error('Erro ao enviar evento para API de Conversões do Meta:', error);
  }
}

// Eventos predefinidos
const trackPageView = () => sendEvent('PageView');

export {
  trackPageView,
  sendEvent
}; 