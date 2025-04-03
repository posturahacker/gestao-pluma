import { v4 as uuidv4 } from 'uuid';

// Configurações da API de Conversões do Pinterest
const AD_ACCOUNT_ID = ''; // Seu ID de conta de anúncios do Pinterest
const ACCESS_TOKEN = ''; // Token de acesso gerado no Ads Manager do Pinterest
const API_VERSION = 'v5'; // Versão atual da API do Pinterest

interface UserData {
  client_ip_address?: string;
  client_user_agent?: string;
  em?: string[];
  ph?: string[];
}

interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  search_string?: string;
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
 * Preparar os dados do usuário com hash
 */
async function prepareUserData(): Promise<UserData> {
  // Preparando dados do usuário
  const userData: UserData = {
    client_ip_address: '', // Será preenchido pelo servidor do Pinterest
    client_user_agent: navigator.userAgent
  };

  return userData;
}

/**
 * Enviar evento para a API de Conversões do Pinterest
 */
async function sendEvent(
  eventName: string, 
  customData?: CustomData
): Promise<void> {
  try {
    if (!AD_ACCOUNT_ID || !ACCESS_TOKEN) {
      console.error('Pinterest Ad Account ID ou Access Token não configurados');
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
      action_source: 'web'
    };

    if (customData) {
      eventData.custom_data = customData;
    }

    // Garantindo que temos custom_data
    if (!eventData.custom_data) {
      eventData.custom_data = {};
    }
    
    // Garantindo valores mínimos necessários para eventos de contato
    if (!eventData.custom_data.currency && (eventName === 'checkout')) {
      eventData.custom_data.currency = 'BRL';
    }
    
    if (!eventData.custom_data.value && (eventName === 'checkout')) {
      eventData.custom_data.value = 0;
    }

    const payload = {
      data: [eventData]
    };

    const endpoint = `https://api.pinterest.com/${API_VERSION}/ad_accounts/${AD_ACCOUNT_ID}/events`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Erro ao enviar evento para API de Conversões do Pinterest:', result);
      return;
    }

    console.log('Evento enviado com sucesso para API de Conversões do Pinterest');
  } catch (error) {
    console.error('Erro ao enviar evento para API de Conversões do Pinterest:', error);
  }
}

// Eventos predefinidos
const trackPageView = () => sendEvent('page_visit');

const trackContact = (contactMethod: string) => sendEvent('checkout', {
  content_name: contactMethod,
  currency: 'BRL',
  value: 0
});

export {
  trackPageView,
  trackContact,
  sendEvent
}; 