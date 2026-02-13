
import React from 'react';
import { Check, Star, Zap, ShieldCheck, MessageCircle } from 'lucide-react';

interface TicketsProps {
  onRegister: (ticketType?: 'vip' | 'vip_duplo' | 'diamond') => void;
}

const Tickets: React.FC<TicketsProps> = ({ onRegister }) => {
  return (
    <section id="ingressos" className="py-20 md:py-32 bg-[#080808] relative overflow-hidden scroll-mt-28 md:scroll-mt-32">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
                <span className="text-brand-highlight font-sans text-sm font-bold tracking-widest uppercase mb-4 block">
                    Vagas Limitadas
                </span>
                <h2 className="font-condensed text-4xl md:text-6xl font-normal text-white uppercase tracking-tight mb-6">
                    Escolha seu <span className="text-brand-highlight">Acesso</span>
                </h2>
                <p className="text-gray-400 text-lg font-sans max-w-2xl mx-auto">
                    Apenas 120 lugares disponíveis.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
                
                {/* VIP CARD */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col relative hover:border-white/30 transition-all duration-300 group h-full">
                    <div className="mb-8 border-b border-white/5 pb-8">
                        <span className="bg-white/5 text-gray-300 text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">Individual</span>
                        <h3 className="font-condensed text-4xl text-white mt-4">VIP</h3>
                        <p className="text-gray-500 text-sm mt-2">Para quem quer viver os 2 dias e aplicar o método.</p>
                        
                        <div className="mt-6">
                             <div className="flex items-baseline gap-1">
                                <span className="text-xl text-white font-bold">R$</span>
                                <span className="text-5xl font-condensed text-white">297</span>
                             </div>
                             <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">12x de R$ 29,82</p>
                        </div>
                    </div>

                    <ul className="space-y-5 mb-8 flex-1">
                        {['Acesso completo aos 2 dias', 'Participação nas dinâmicas', 'Coffee break padrão', 'Acesso ao Networking', 'Plano de Escala 30 Dias'].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                <Check className="text-brand-darkRed shrink-0 group-hover:text-brand-highlight transition-colors" size={18} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={() => onRegister('vip')}
                        className="w-full block bg-[#1a1a1a] border border-white/10 text-white hover:bg-white hover:text-black font-condensed text-xl text-center py-4 rounded-lg transition-all uppercase tracking-wide mt-auto"
                    >
                        Comprar VIP
                    </button>
                </div>

                {/* VIP DUPLO CARD (Recommended) */}
                <div className="bg-[#111] border-2 border-[#C20000] rounded-2xl p-8 flex flex-col relative transform lg:-translate-y-6 shadow-[0_0_50px_rgba(194,0,0,0.1)] z-10 h-full">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C20000] text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap flex items-center gap-2">
                        <Zap size={12} fill="white" /> Melhor Custo-Benefício
                    </div>
                    
                    <div className="mb-8 border-b border-white/10 pb-8 mt-2">
                        <span className="bg-brand-red/10 text-brand-highlight text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">Dupla (2 Ingressos)</span>
                        <h3 className="font-condensed text-4xl text-white mt-4">VIP DUPLO</h3>
                        <p className="text-gray-400 text-sm mt-2">Para sócios e duplas de execução. Um cobra o outro.</p>
                        
                        <div className="mt-6">
                             <div className="flex items-baseline gap-1">
                                <span className="text-xl text-white font-bold">R$</span>
                                <span className="text-6xl font-condensed text-[#C20000]">497</span>
                             </div>
                             <p className="text-brand-highlight text-xs uppercase tracking-wider mt-1 font-bold">R$ 248,50 por pessoa</p>
                        </div>
                    </div>

                    <ul className="space-y-5 mb-8 flex-1">
                         <li className="flex items-start gap-3 text-white text-sm font-semibold">
                            <Star className="text-brand-highlight shrink-0 fill-brand-highlight" size={18} />
                            <span>Tudo do VIP para 2 pessoas</span>
                        </li>
                        {['Economia inteligente', 'Execução em dupla pós-evento', 'Acesso completo aos 2 dias', 'Dinâmicas em dupla'].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                <Check className="text-brand-highlight shrink-0" size={18} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={() => onRegister('vip_duplo')}
                        className="w-full block bg-[#C20000] hover:bg-[#a50000] text-white font-condensed text-2xl text-center py-5 rounded-lg shadow-lg transition-all uppercase tracking-wide transform hover:scale-[1.02] mt-auto"
                    >
                        Comprar Duplo
                    </button>
                </div>

                {/* DIAMOND CARD */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col relative hover:border-white/30 transition-all duration-300 group h-full">
                    <div className="mb-8 border-b border-white/5 pb-8">
                        <span className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider flex items-center gap-1 w-max">
                            <Star size={12} fill="black" /> Experiência
                        </span>
                        <h3 className="font-condensed text-4xl text-white mt-4">DIAMOND</h3>
                        <p className="text-gray-500 text-sm mt-2">Para quem quer evento + ambiente e proximidade.</p>
                        
                        <div className="mt-6">
                             <div className="flex items-baseline gap-1">
                                <span className="text-xl text-white font-bold">R$</span>
                                <span className="text-5xl font-condensed text-white">997</span>
                             </div>
                             <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">12x de R$ 99,90</p>
                        </div>
                    </div>

                    <ul className="space-y-5 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-white text-sm font-bold">
                            <Check className="text-brand-highlight shrink-0" size={18} />
                            <span>Jantar com Palestrantes</span>
                        </li>
                         <li className="flex items-start gap-3 text-white text-sm font-bold">
                            <Check className="text-brand-highlight shrink-0" size={18} />
                            <span>Área VIP Exclusiva e Mesa Frontal</span>
                        </li>
                        {['Sessão de fotos profissional', 'Sessão de autógrafos', 'Coffee Break Premium', 'Posicionamento diferenciado'].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                <Check className="text-brand-darkRed shrink-0 group-hover:text-brand-highlight transition-colors" size={18} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={() => onRegister('diamond')}
                        className="w-full block bg-[#1a1a1a] border border-white/10 text-white hover:bg-white hover:text-black font-condensed text-xl text-center py-4 rounded-lg transition-all uppercase tracking-wide mt-auto"
                    >
                        Ser Diamond
                    </button>
                </div>
            </div>

            {/* Corporate / Group Negotiation Button */}
            <div className="max-w-3xl mx-auto mb-20 text-center">
                <div className="bg-[#111] border border-dashed border-white/20 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-brand-red/50 transition-colors">
                    <div className="text-left">
                        <h4 className="text-white font-condensed text-xl uppercase mb-1">Vai trazer seu time?</h4>
                        <p className="text-gray-400 text-sm">Condições especiais para compras acima de 5 ingressos.</p>
                    </div>
                    <a 
                        href="#" 
                        className="flex items-center gap-2 bg-transparent border border-white/20 text-white hover:bg-white hover:text-black font-bold py-3 px-6 rounded-lg transition-all uppercase tracking-wide text-sm whitespace-nowrap"
                    >
                        <MessageCircle size={18} />
                        Falar com Equipe
                    </a>
                </div>
            </div>
            
            {/* Guarantee Section */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#0f0f0f] border border-brand-red/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden group hover:border-brand-red/40 transition-all duration-500">
                    {/* Background sheen */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-brand-red/5 to-transparent blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                    <div className="shrink-0 relative">
                        <div className="w-20 h-20 bg-black rounded-full border border-brand-red/30 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(194,0,0,0.2)]">
                            <ShieldCheck className="text-brand-red w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-brand-red/20 rounded-full animate-ping opacity-20"></div>
                    </div>
                    
                    <div className="text-center md:text-left relative z-10">
                        <h3 className="font-condensed text-2xl md:text-3xl text-white uppercase mb-4 leading-tight">
                            Garantia Incondicional
                        </h3>
                        <div className="space-y-3">
                            <p className="text-gray-400 leading-relaxed text-base font-medium">
                                Você participa do primeiro dia. 
                            </p>
                            <p className="text-gray-400 leading-relaxed text-base font-medium">
                                Se sentir que o <strong className="text-white">Máxima Escala</strong> não entregou o valor prometido, devolvemos 100% do seu investimento. 
                            </p>
                            <p className="text-gray-400 leading-relaxed text-base font-medium">
                                Sem letras miúdas. Basta procurar a equipe até o final do Dia 1.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Tickets;
