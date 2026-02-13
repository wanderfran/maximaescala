
// Supabase Edge Function: meta-capi
// Deploy: supabase functions deploy meta-capi --no-verify-jwt

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

declare const Deno: any;

const ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
const PIXEL_ID = '1482043399376819'; // Máxima Escala Pixel ID
const TEST_EVENT_CODE: string | undefined = undefined; // Use 'TESTxxxxx' para testar no Event Manager

// Helper de Hashing (SHA-256) para User Data (Normalização exigida pelo Meta)
async function sha256(message: string) {
  if (!message) return null;
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  try {
    const { record } = await req.json();

    if (!record || !record.email) {
      return new Response(JSON.stringify({ message: "No record data" }), { status: 200 });
    }

    // 1. SINCRONIA DE TIMESTAMP
    // Tentamos extrair o timestamp original do evento gerado no frontend (Lead-177064...)
    // para garantir que a desduplicação funcione perfeitamente.
    let eventTime = Math.floor(Date.now() / 1000); 
    
    if (record.last_event_id && record.last_event_id.includes('-')) {
        const parts = record.last_event_id.split('-');
        if (parts.length >= 2) {
            const frontendTs = parseInt(parts[1]);
            if (!isNaN(frontendTs)) {
                eventTime = Math.floor(frontendTs / 1000);
            }
        }
    }

    // 2. CONFIGURAÇÃO DINÂMICA DA OFERTA (Defaults Máxima Escala)
    const currentOfferName = record.offer_name || "Máxima Escala";
    const currentOfferValue = record.offer_value ? parseFloat(record.offer_value) : 297.00;

    // 3. DEFINIÇÃO DO TIPO DE EVENTO
    let eventName = 'Lead';
    let eventId = record.last_event_id;
    
    let customData: any = {
        currency: "BRL",
        content_name: currentOfferName,
        content_category: "Event Ticket"
    };

    // --- LÓGICA DE EVENTOS ---

    // Caso: Purchase (Venda Aprovada - Geralmente vindo via Webhook Hotmart -> Supabase Update)
    if (record.status === 'purchased') {
      eventName = 'Purchase';
      eventId = record.hotmart_transaction; // ID Único da transação
      eventTime = Math.floor(Date.now() / 1000); // Purchase é um evento novo, usa hora atual

      const value = parseFloat(record.total_value) || currentOfferValue;
      
      // Define ID baseado no valor ou ticket (simplificado)
      let contentIds = ['maxima_escala_vip'];
      if (record.selected_ticket === 'vip_duplo') contentIds = ['maxima_escala_vip_duplo'];
      if (record.selected_ticket === 'diamond') contentIds = ['maxima_escala_diamond'];

      customData = {
          ...customData,
          content_type: 'product',
          value: value,
          content_ids: contentIds,
          num_items: contentIds.length,
          order_id: record.hotmart_transaction
      };
    }
    // Caso: InitiateCheckout (Usuário clicou em pagar ou selecionou ingresso)
    else if (record.status === 'initiated_purchase') {
      eventName = 'InitiateCheckout';
      const value = parseFloat(record.total_value) || currentOfferValue;
      
      // Lógica de IDs exata conforme solicitado
      let contentIds = ['maxima_escala_vip']; // Default
      
      if (record.selected_ticket === 'vip_duplo') {
          contentIds = ['maxima_escala_vip_duplo'];
      } else if (record.selected_ticket === 'diamond') {
          contentIds = ['maxima_escala_diamond'];
      }

      customData = {
          ...customData,
          content_type: 'product',
          value: value,
          content_ids: contentIds,
          num_items: record.selected_ticket === 'vip_duplo' ? 2 : 1
      };
    } 
    // Caso: Lead (Usuário preencheu o formulário inicial)
    else if (record.status === 'started_checkout') {
      eventName = 'Lead';
      // Lead inicial é sempre genérico ou VIP, pois ele ainda não selecionou pagamento
      customData = {
          ...customData,
          value: 0.00,
          content_ids: ['maxima_escala_vip']
      };
    } else {
        // Status que não disparam eventos CAPI (ex: erros, ou status intermediários)
        return new Response(JSON.stringify({ message: `Ignored status: ${record.status}` }), { status: 200 });
    }

    // 4. HASHING E NORMALIZAÇÃO DE DADOS (PII)
    const emailHash = await sha256(record.email.trim().toLowerCase());
    // Remove tudo que não for dígito do telefone antes do hash
    const phoneHash = record.phone ? await sha256(record.phone.replace(/\D/g, '')) : null;
    const fnHash = record.name ? await sha256(record.name.split(' ')[0].toLowerCase()) : null;

    // 5. CONSTRUÇÃO DO PAYLOAD
    const payload: any = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime,
          action_source: "website",
          event_id: eventId, // CRUCIAL para desduplicação com Pixel
          event_source_url: record.page_url || "https://maximaescala.com.br",
          user_data: {
            em: [emailHash],
            ph: phoneHash ? [phoneHash] : [],
            fn: fnHash ? [fnHash] : [],
            client_user_agent: record.user_agent,
            fbc: record.fbc || null,
            fbp: record.fbp || null,
          },
          custom_data: customData
        }
      ]
    };

    if (TEST_EVENT_CODE) {
        payload.test_event_code = TEST_EVENT_CODE;
    }

    // 6. ENVIO PARA META GRAPH API
    const response = await fetch(`https://graph.facebook.com/v16.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.error) {
        console.error('[CAPI ERROR]', result.error);
        return new Response(JSON.stringify({ error: result.error }), { status: 400 });
    }

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("[CAPI INTERNAL ERROR]", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
