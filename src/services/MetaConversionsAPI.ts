import { v4 as uuidv4 } from 'uuid';

// Configurações da API de Conversões do Meta
const PIXEL_ID = '1768268140412454'; // ID do Pixel do Facebook
const ACCESS_TOKEN = 'EAAIt14txd0kBO77hbRTRkOyRo6vtmcvU6qKq5QJiMQ1VD5lZChPfqe0qCThLxSnVKRygDMOJoMlG3Dyd4k6Pwh6XRKeabZC40Gtwy8Pnr4D5VLx0wiS6UwTBLPfX4CSkU6ZA6ROCTrZCpSElUOLGuqZABSAepcRZAvWhFJJSsJOZApoxVbbtqugkkitH2BH5767ZCwZDZD';
const API_VERSION = 'v17.0'; // Usando uma versão mais estável da API
const TEST_EVENT_CODE = 'TEST11067'; // Código para testes

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
  
  // Garantindo que temos dados de usuário suficientes para a API
  const userData: UserData = {
    client_ip_address: '127.0.0.1', // IP padrão para testes
    client_user_agent: navigator.userAgent
  };

  // Adicionando fbp/fbc se disponíveis
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  // Adicionando um email anônimo para testes (apenas requisito para evento de teste)
  const testEmail = 'test@example.com';
  const hashedEmail = await hashData(testEmail);
  userData.em = [hashedEmail];

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

    // Adicionando valores padrão para testes
    if (!eventData.custom_data) {
      eventData.custom_data = {};
    }
    
    // Garantindo que temos valor e moeda para eventos de teste
    if (!eventData.custom_data.value) {
      eventData.custom_data.value = 0;
    }
    
    if (!eventData.custom_data.currency) {
      eventData.custom_data.currency = 'BRL';
    }

    const payload = {
      data: [eventData],
      test_event_code: TEST_EVENT_CODE
    };

    console.log('Enviando payload:', JSON.stringify(payload, null, 2));

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
      console.error('Detalhes do erro:', JSON.stringify(result, null, 2));
      return;
    }

    console.log('Evento enviado com sucesso para API de Conversões do Meta:', result);
    console.log('Evento de teste enviado com código:', TEST_EVENT_CODE);
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

// Função para testar eventos manualmente
const testEvent = (eventName: string) => {
  console.log(`Enviando evento de teste: ${eventName}`);
  return sendEvent(eventName, {
    content_name: `Teste manual - ${eventName}`,
    content_category: 'teste',
    currency: 'BRL',
    value: 0
  });
};

export {
  trackPageView,
  trackContact,
  sendEvent,
  testEvent
}; 