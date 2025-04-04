import { v4 as uuidv4 } from 'uuid';

// Configurações da API de Conversões do Pinterest
const AD_ACCOUNT_ID = import.meta.env.VITE_PINTEREST_AD_ACCOUNT_ID;
const ACCESS_TOKEN = import.meta.env.VITE_PINTEREST_ACCESS_TOKEN;
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

declare global {
  interface Window {
    pintrk: any;
  }
}

const TAG_ID = '2613740629600';
const DEBUG = true;

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

/**
 * Inicializa o Pinterest Tag
 */
function initializePinterestTag(): void {
  try {
    if (DEBUG) {
      console.log('[Pinterest Tag] Iniciando configuração...');
    }

    // Código base do Pinterest
    if (!window.pintrk) {
      window.pintrk = function () {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments));
      };
      const n = window.pintrk;
      n.queue = [];
      n.version = "3.0";
      const t = document.createElement("script");
      t.async = true;
      t.src = "https://s.pinimg.com/ct/core.js";
      
      // Adicionar handler de erro para o script
      t.onerror = function(error) {
        console.error('[Pinterest Tag] Erro ao carregar script:', error);
      };

      // Adicionar handler de carregamento
      t.onload = function() {
        if (DEBUG) {
          console.log('[Pinterest Tag] Script carregado com sucesso');
        }
      };

      const r = document.getElementsByTagName("script")[0];
      r.parentNode?.insertBefore(t, r);
    }

    // Inicializar o tag
    window.pintrk('load', TAG_ID);
    window.pintrk('page');

    // Adicionar noscript tag
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.alt = '';
    img.src = `https://ct.pinterest.com/v3/?event=init&tid=${TAG_ID}&noscript=1`;
    noscript.appendChild(img);
    document.head.appendChild(noscript);

    if (DEBUG) {
      console.log('[Pinterest Tag] Configuração concluída');
    }
  } catch (error) {
    console.error('[Pinterest Tag] Erro durante a inicialização:', error);
  }
}

/**
 * Rastrear visualização de página
 */
function trackPageView(): void {
  try {
    if (!window.pintrk) {
      console.error('[Pinterest Tag] pintrk não está disponível');
      return;
    }

    if (DEBUG) {
      console.log('[Pinterest Tag] Rastreando visualização de página');
    }

    window.pintrk('page');
  } catch (error) {
    console.error('[Pinterest Tag] Erro ao rastrear visualização de página:', error);
  }
}

/**
 * Rastrear evento de contato
 */
function trackContact(contactMethod: string): void {
  try {
    if (!window.pintrk) {
      console.error('[Pinterest Tag] pintrk não está disponível');
      return;
    }

    if (DEBUG) {
      console.log('[Pinterest Tag] Rastreando evento de contato:', contactMethod);
    }

    window.pintrk('track', 'lead', {
      lead_type: contactMethod
    });
  } catch (error) {
    console.error('[Pinterest Tag] Erro ao rastrear evento de contato:', error);
  }
}

/**
 * Rastrear evento de checkout
 */
function trackCheckout(planName: string, price: number): void {
  try {
    if (!window.pintrk) {
      console.error('[Pinterest Tag] pintrk não está disponível');
      return;
    }

    if (DEBUG) {
      console.log('[Pinterest Tag] Rastreando evento de checkout:', { planName, price });
    }

    window.pintrk('track', 'checkout', {
      value: price,
      currency: 'BRL',
      order_quantity: 1,
      product_name: planName
    });
  } catch (error) {
    console.error('[Pinterest Tag] Erro ao rastrear evento de checkout:', error);
  }
}

export {
  initializePinterestTag,
  trackPageView,
  trackContact,
  trackCheckout,
  sendEvent
}; 