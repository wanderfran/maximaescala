
import React, { useState, useEffect } from 'react';
import { X, Check, Star, Zap, ShieldCheck, Lock, ArrowRight, Loader2, Ticket, Sparkles, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { 
  generateEventId, 
  trackLead, 
  trackInitiateCheckout,
  getFacebookCookies,
  getUtmParams,
  EVENT_CONFIG 
} from '../lib/meta-maxima-escala';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTicketType?: 'vip' | 'vip_duplo' | 'diamond' | null;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, initialTicketType }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketType, setTicketType] = useState<'vip' | 'vip_duplo' | 'diamond' | null>(initialTicketType || null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('maxima_escala_lead');
    if (savedData) {
        try {
            setFormData(JSON.parse(savedData));
        } catch (e) {
            console.error("Erro ao carregar dados salvos", e);
        }
    }
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsLoading(false);
      setTicketType(initialTicketType || null);
      
      // Re-check storage just in case
      const savedData = localStorage.getItem('maxima_escala_lead');
      if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            // Only overwrite if current state is empty to allow edits
            if (!formData.email) setFormData(parsed); 
          } catch(e) {}
      }
    }
  }, [isOpen, initialTicketType]);

  // Função de Máscara de Telefone: (XX) 9 XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    if (input.length > 11) input = input.slice(0, 11);

    let formatted = input;
    
    if (input.length > 2) {
        // (XX) ...
        formatted = `(${input.substring(0, 2)}) ${input.substring(2)}`;
    }
    if (input.length > 3) {
         // (XX) 9 ...
         formatted = `(${input.substring(0, 2)}) ${input.substring(2, 3)} ${input.substring(3)}`;
    }
    if (input.length > 7) {
         // (XX) 9 XXXX-XXXX
         formatted = `(${input.substring(0, 2)}) ${input.substring(2, 3)} ${input.substring(3, 7)}-${input.substring(7)}`;
    }
    
    setFormData({...formData, phone: formatted});
  };

  if (!isOpen) return null;

  // --- THEME CONFIGURATION BASED ON TICKET ---
  const getTheme = () => {
    switch(ticketType) {
      case 'vip_duplo':
        return {
          bg: 'bg-[#1a0505]',
          border: 'border-brand-red',
          accent: 'text-brand-red',
          gradient: 'from-[#C20000] to-[#500000]',
          title: 'VIP DUPLO',
          glow: 'shadow-[0_0_40px_rgba(194,0,0,0.3)]',
          textColor: 'text-white'
        };
      case 'diamond':
        return {
          bg: 'bg-[#020617]', // Dark Blue/Slate base
          border: 'border-cyan-500/50',
          accent: 'text-cyan-400',
          gradient: 'from-cyan-300 via-blue-600 to-blue-900', // Premium Blue Gradient
          title: 'DIAMOND ACCESS',
          glow: 'shadow-[0_0_50px_rgba(6,182,212,0.25)]', // Cyan Glow
          textColor: 'text-white'
        };
      default: // VIP or None
        return {
          bg: 'bg-[#0a0a0a]',
          border: 'border-white/20',
          accent: 'text-white',
          gradient: 'from-white/10 to-white/5',
          title: ticketType === 'vip' ? 'VIP ACCESS' : 'MÁXIMA ESCALA',
          glow: 'shadow-2xl',
          textColor: 'text-white'
        };
    }
  };

  const theme = getTheme();

  // PASSO 1: Captura de Lead (Evento: Lead)
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.name || !formData.phone) {
      alert('Por favor, preencha todos os campos da sua credencial.');
      setIsLoading(false);
      return;
    }

    // Save to LocalStorage immediately
    localStorage.setItem('maxima_escala_lead', JSON.stringify(formData));

    try {
      const eventId = generateEventId('Lead');
      const { fbp, fbc } = getFacebookCookies();
      const utmParams = getUtmParams();

      // 1. Tracking Frontend (Pixel)
      trackLead({
        email: formData.email,
        phone: formData.phone,
        fn: formData.name.split(' ')[0]
      }, eventId);

      // 2. Salvar no Supabase (Banco de Dados)
      try {
        await supabase.from('leads').insert([{
            name: formData.name,
            email: formData.email.toLowerCase().trim(),
            phone: formData.phone,
            status: 'started_checkout',
            last_event_id: eventId,
            offer_name: EVENT_CONFIG.OFFER_NAME,
            product_id: EVENT_CONFIG.PRODUCT_ID,
            offer_value: EVENT_CONFIG.BASE_PRICE,
            selected_ticket_interest: ticketType || 'undecided',
            page_url: window.location.href,
            user_agent: navigator.userAgent,
            fbp: fbp,
            fbc: fbc,
            ...utmParams
        }]);
      } catch (err) {
          console.warn("Tracking error (non-blocking)", err);
      }

      setStep(2);
      
    } catch (error) {
      console.error('Erro:', error);
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  // PASSO 2: Escolha/Confirmação e Checkout (Evento: InitiateCheckout)
  const handleCheckout = async (selectedType: 'vip' | 'vip_duplo' | 'diamond') => {
    setIsLoading(true);
    try {
      const eventId = generateEventId('InitiateCheckout');
      
      let value = 297;
      let offerCode = 'c6iayhkt'; // VIP Padrão

      if (selectedType === 'vip') {
          value = 297;
          offerCode = 'c6iayhkt';
      }
      if (selectedType === 'vip_duplo') {
          value = 497;
          offerCode = 'ico7cz2u';
      }
      if (selectedType === 'diamond') {
          value = 997;
          offerCode = '1z1zbg5m';
      }

      // Preparar URL da Hotmart com pré-população
      const hotmartBaseUrl = "https://pay.hotmart.com/D104393651I";
      const params = new URLSearchParams();
      
      params.append('off', offerCode);
      params.append('name', formData.name);
      params.append('email', formData.email);

      // Tratamento básico de telefone para Hotmart (phoneac + phonenumber)
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length >= 10) {
          const ddd = cleanPhone.substring(0, 2);
          const number = cleanPhone.substring(2);
          params.append('phoneac', ddd);
          params.append('phonenumber', number);
      }

      // Adicionar checkout mode (opcional, payment page)
      params.append('checkoutMode', '10');

      const checkoutLink = `${hotmartBaseUrl}?${params.toString()}`;

      // 1. Tracking Frontend (Pixel)
      trackInitiateCheckout(value, selectedType, eventId);

      // 2. Atualizar no Supabase
      try {
        await supabase.from('leads')
            .update({ 
            status: 'initiated_purchase',
            last_event_id: eventId,
            total_value: value,
            selected_ticket: selectedType
            })
            .eq('email', formData.email.toLowerCase().trim());
      } catch(err) { console.warn("Update error", err) }

      console.log("Redirecting to Hotmart...", checkoutLink);
      window.location.href = checkoutLink;
      
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* TICKET CONTAINER */}
      <div className={`relative w-full max-w-md animate-fade-in transition-all duration-500 ${theme.glow}`}>
        
        {/* DECORATIVE: Ticket Punch Holes */}
        <div className="absolute -left-3 top-1/3 w-6 h-6 bg-[#0e0e0e] rounded-full z-20"></div>
        <div className="absolute -right-3 top-1/3 w-6 h-6 bg-[#0e0e0e] rounded-full z-20"></div>

        <div className={`relative ${theme.bg} rounded-2xl overflow-hidden border ${theme.border} flex flex-col shadow-2xl`}>
            
            {/* TICKET HEADER */}
            <div className={`relative h-28 overflow-hidden bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                
                <div className="text-center relative z-10 px-6 w-full pt-4">
                    {/* Badge removida conforme solicitado para não cobrir o nome */}
                    
                    <h2 className={`font-condensed text-3xl ${theme.textColor} uppercase tracking-tight filter drop-shadow-md`}>
                        {theme.title}
                    </h2>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${theme.textColor} opacity-80 mt-1`}>
                        20 & 21 MAR • JOÃO PESSOA
                    </p>
                </div>
            </div>

            {/* DOTTED LINE SEPARATOR */}
            <div className="relative flex items-center justify-center -mt-0.5">
                 <div className={`w-full border-t-2 border-dashed ${ticketType === 'diamond' ? 'border-cyan-500/30' : 'border-white/20'}`}></div>
            </div>

            {/* CONTENT AREA */}
            <div className="p-8 pt-6 relative">
                
                {step === 1 && (
                    <form onSubmit={handleLeadSubmit} className="space-y-5">
                        <div className="text-center mb-6">
                            <p className="text-gray-400 text-xs uppercase tracking-wide font-medium">Preencha os dados da credencial</p>
                        </div>

                        <div className="space-y-4">
                            {/* Input: Nome */}
                            <div className="relative group">
                                <label className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-bold text-gray-500 uppercase transition-colors group-focus-within:text-brand-red">
                                    Nome na Credencial
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3.5 text-white font-medium uppercase placeholder-gray-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                                    placeholder="SEU NOME COMPLETO"
                                    required
                                />
                            </div>

                            {/* Input: Email */}
                            <div className="relative group">
                                <label className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-bold text-gray-500 uppercase transition-colors group-focus-within:text-brand-red">
                                    Email para Recebimento
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3.5 text-white font-sans placeholder-gray-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>

                            {/* Input: WhatsApp */}
                            <div className="relative group">
                                <label className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-bold text-gray-500 uppercase transition-colors group-focus-within:text-brand-red">
                                    WhatsApp de Confirmação
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    maxLength={16}
                                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3.5 text-white font-sans placeholder-gray-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                                    placeholder="(DD) 9 XXXX-XXXX"
                                    required
                                />
                            </div>
                        </div>

                        {/* AVISO ESPECÍFICO PARA VIP DUPLO */}
                        {ticketType === 'vip_duplo' && (
                            <div className="bg-brand-red/5 border border-brand-red/20 rounded-lg p-3 flex gap-3 items-start animate-fade-in">
                                <div className="bg-brand-red/10 p-1.5 rounded-full mt-0.5">
                                    <Users size={14} className="text-brand-red" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-300 font-bold uppercase mb-0.5">Sobre o 2º Participante</p>
                                    <p className="text-[10px] text-gray-500 leading-tight">
                                        Fique tranquilo(a). Após a compra, nossa equipe entrará em contato pelo WhatsApp para cadastrar os dados do seu sócio ou acompanhante.
                                    </p>
                                </div>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={`w-full mt-2 bg-gradient-to-r ${theme.gradient} text-white font-condensed text-lg uppercase py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/10`}
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Emitir Credencial'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-fade-in">
                        {/* Se o ingresso já foi pré-selecionado, mostra só ele como "Confirmado" */}
                        {ticketType ? (
                             <div className="text-center">
                                <div className="mb-6 flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30 mb-3">
                                        <Check className="text-green-500 w-8 h-8" />
                                    </div>
                                    <h3 className="text-white font-condensed text-xl uppercase">Cadastro Recebido</h3>
                                    <p className="text-gray-400 text-sm mt-1">Finalize o pagamento para validar sua vaga.</p>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-6 flex items-center justify-between">
                                    <div className="text-left">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Tipo de Acesso</p>
                                        <p className={`font-condensed text-xl ${theme.accent}`}>{theme.title}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Valor</p>
                                        <p className="font-bold text-white text-lg">
                                            {ticketType === 'vip' ? 'R$ 297' : ticketType === 'vip_duplo' ? 'R$ 497' : 'R$ 997'}
                                        </p>
                                    </div>
                                </div>

                                {ticketType === 'vip_duplo' && (
                                     <p className="text-[10px] text-gray-500 text-center mb-4 px-4 leading-tight">
                                        *Lembre-se: O cadastro do segundo participante será feito via WhatsApp após a confirmação.
                                     </p>
                                )}

                                <button 
                                    onClick={() => handleCheckout(ticketType!)}
                                    disabled={isLoading}
                                    className={`w-full bg-green-600 hover:bg-green-500 text-white font-condensed text-xl uppercase py-4 rounded-lg shadow-[0_0_20px_rgba(22,163,74,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02]`}
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : (
                                        <>
                                            PAGAR AGORA <Lock size={18} />
                                        </>
                                    )}
                                </button>
                             </div>
                        ) : (
                            /* Se não selecionou ingresso, mostra as opções com visual "Card" */
                            <div className="space-y-3">
                                <p className="text-center text-gray-400 text-xs uppercase tracking-wide font-medium mb-4">
                                    Selecione seu nível de acesso
                                </p>
                                
                                {/* VIP */}
                                <button 
                                    onClick={() => handleCheckout('vip')}
                                    className="w-full bg-[#111] border border-white/10 hover:border-white/30 p-4 rounded-xl flex items-center justify-between group transition-all text-left"
                                >
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-gray-500 block mb-0.5">Acesso Individual</span>
                                        <span className="text-lg font-condensed text-white group-hover:text-brand-red transition-colors">VIP</span>
                                    </div>
                                    <span className="text-white font-bold">R$ 297</span>
                                </button>

                                {/* DUPLO */}
                                <button 
                                    onClick={() => handleCheckout('vip_duplo')}
                                    className="w-full bg-gradient-to-r from-[#2a0a0a] to-[#1a0505] border border-brand-red/50 hover:border-brand-red p-4 rounded-xl flex items-center justify-between group transition-all text-left relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 bg-brand-red text-white text-[8px] px-2 py-0.5 font-bold uppercase rounded-bl">Recomendado</div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-brand-red block mb-0.5">Para Sócios (2 Pessoas)</span>
                                        <span className="text-lg font-condensed text-white">VIP DUPLO</span>
                                    </div>
                                    <span className="text-white font-bold">R$ 497</span>
                                </button>

                                {/* DIAMOND */}
                                <button 
                                    onClick={() => handleCheckout('diamond')}
                                    className="w-full bg-[#0f1115] border border-gray-600 hover:border-cyan-400 p-4 rounded-xl flex items-center justify-between group transition-all text-left"
                                >
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-gray-400 block mb-0.5">Experiência Completa</span>
                                        <span className="text-lg font-condensed text-white group-hover:text-cyan-400 transition-colors">DIAMOND</span>
                                    </div>
                                    <span className="text-white font-bold">R$ 997</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* SECURITY FOOTER */}
            <div className="bg-black/40 p-3 flex items-center justify-center gap-2 border-t border-white/5">
                <ShieldCheck size={12} className="text-gray-500" />
                <span className="text-[9px] text-gray-500 uppercase tracking-widest">Ambiente Seguro & Criptografado</span>
            </div>
        </div>
        
        {/* CLOSE BUTTON (Outside or minimal) */}
        <button 
            onClick={onClose}
            className="absolute -top-10 right-0 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs uppercase font-bold tracking-widest"
        >
            Fechar <X size={16} />
        </button>

      </div>
    </div>
  );
};

export default RegistrationModal;
