
// Configuração e Funções de Tracking para MÁXIMA ESCALA

// Configuração da Oferta
export const EVENT_CONFIG = {
  OFFER_NAME: "Máxima Escala",
  PRODUCT_ID: "maxima_escala_vip", // ID Padrão
  BASE_PRICE: 297.00,
  PIXEL_ID: "1482043399376819"
};

// Gera ID único para desduplicação (usado no Pixel e no CAPI)
export const generateEventId = (eventName: string): string => {
  return `${eventName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Evento: Visualizou a Oferta
export const trackViewContent = (value: number = EVENT_CONFIG.BASE_PRICE, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: EVENT_CONFIG.OFFER_NAME,
      content_ids: [EVENT_CONFIG.PRODUCT_ID],
      content_type: 'product',
      value: value,
      currency: currency
    });
  }
};

// Evento: Lead (Passo 1 do Form)
export const trackLead = (userData: { email?: string; phone?: string; fn?: string }, eventId?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: EVENT_CONFIG.OFFER_NAME, 
      content_ids: [EVENT_CONFIG.PRODUCT_ID],
      currency: 'BRL',
      value: 0
    }, { eventID: eventId });
  }
};

// Evento: Initiate Checkout (Passo 2 - Escolha do Ingresso)
export const trackInitiateCheckout = (value: number, ticketType: string = 'vip', eventId?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    
    // Definição exata dos IDs conforme solicitado
    let contentIds = ['maxima_escala_vip'];
    
    if (ticketType === 'vip_duplo') {
        contentIds = ['maxima_escala_vip_duplo'];
    } else if (ticketType === 'diamond') {
        contentIds = ['maxima_escala_diamond'];
    }

    window.fbq('track', 'InitiateCheckout', {
      content_name: EVENT_CONFIG.OFFER_NAME,
      content_ids: contentIds,
      content_type: 'product',
      value: value,
      currency: 'BRL',
      num_items: ticketType === 'vip_duplo' ? 2 : 1
    }, { eventID: eventId });
  }
};

// Helper para capturar cookies do Facebook (fbp e fbc)
export const getFacebookCookies = () => {
  if (typeof document === 'undefined') return { fbp: null, fbc: null };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc')
  };
};

// Helper para capturar UTM parameters
export const getUtmParams = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content')
  };
};

// Tipos TypeScript
declare global {
  interface Window {
    fbq?: (action: string, eventName: string, data?: any, options?: any) => void;
  }
}
