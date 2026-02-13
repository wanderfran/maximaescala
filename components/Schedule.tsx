
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CalendarDays } from 'lucide-react';

const scheduleData = {
    day1: [
        { time: "09:00", title: "ABERTURA & VISÃO ESTRATÉGICA", speaker: "Patrick Suyti", desc: "Alinhamento de expectativas e o mindset do empresário que escala." },
        { time: "10:30", title: "COMUNICAÇÃO DE LIDERANÇA", speaker: "Patrick Suyti", desc: "Como transmitir autoridade e confiança através da oratória." },
        { time: "12:00", title: "ALMOÇO", speaker: "Livre", desc: "Momento de conexão e networking." },
        { time: "14:00", title: "NARRATIVA E POSICIONAMENTO", speaker: "Patrick Suyti", desc: "Construção do seu discurso único de vendas (Pitch Institucional)." },
        { time: "16:00", title: "NETWORKING ESTRUTURADO", speaker: "Dinâmica", desc: "Rodada de negócios focada em parcerias e oportunidades reais." },
        { time: "17:30", title: "GESTÃO DE IMAGEM", speaker: "Juliano & Renato", desc: "A semiótica do poder: vestimenta e presença executiva." },
        { time: "18:30", title: "HOT SEATS ESTRATÉGICOS", speaker: "Patrick Suyti", desc: "Análise profunda de desafios reais dos participantes." },
        { time: "19:30", title: "ENCERRAMENTO", speaker: "Patrick Suyti", desc: "Briefing para Jantar VIP (Diamonds)." },
    ],
    day2: [
        { time: "09:00", title: "ARQUITETURA COMERCIAL", speaker: "Patrick Suyti", desc: "Estruturando seu funil de vendas para previsibilidade." },
        { time: "10:30", title: "NEGOCIAÇÃO AVANÇADA", speaker: "Renata & Patrick", desc: "Técnicas de fechamento e contorno de objeções complexas." },
        { time: "12:00", title: "ALMOÇO", speaker: "Livre", desc: "Networking." },
        { time: "14:00", title: "BRANDING E MERCADO", speaker: "Wander & Patrick", desc: "Como se tornar a opção óbvia no seu nicho de atuação." },
        { time: "15:30", title: "AQUISIÇÃO E CANAIS", speaker: "Patrick Suyti", desc: "Onde alocar recursos para maximizar o retorno sobre investimento." },
        { time: "16:30", title: "ALTA PERFORMANCE EXECUTIVA", speaker: "Mauro", desc: "Gerindo energia e foco para sustentar o crescimento." },
        { time: "17:15", title: "PLANO EXECUTIVO 30 DIAS", speaker: "Patrick Suyti", desc: "Consolidação da estratégia e definição das próximas ações." },
        { time: "18:00", title: "DIRECIONAMENTO FINAL", speaker: "Patrick Suyti", desc: "O próximo nível estratégico do seu negócio." },
    ]
};

const Schedule: React.FC = () => {
    const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');

    return (
        <section id="programacao" className="py-20 md:py-32 bg-black relative border-t border-white/5 overflow-hidden scroll-mt-28 md:scroll-mt-32">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <p className="text-brand-highlight font-sans text-sm font-bold tracking-widest uppercase mb-2">
                        Agenda Detalhada
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl font-normal text-white uppercase tracking-tight mb-8">
                        Programação
                    </h2>
                    
                    {/* Enhanced Tabs */}
                    <div className="inline-flex flex-col sm:flex-row bg-[#111] p-1.5 rounded-xl border border-white/5 gap-2 w-full sm:w-auto">
                        <button 
                            onClick={() => setActiveDay('day1')}
                            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 group ${
                                activeDay === 'day1' 
                                ? 'bg-[#C20000] text-white shadow-lg' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <div className={`p-2 rounded bg-black/20 ${activeDay === 'day1' ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                                <CalendarDays size={20} />
                            </div>
                            <div className="text-left">
                                <span className="block text-xs font-bold uppercase tracking-widest opacity-80">20 de Março</span>
                                <span className="block font-display text-lg uppercase tracking-wide leading-none mt-1">Dia 01 • Liderança</span>
                            </div>
                        </button>

                        <button 
                            onClick={() => setActiveDay('day2')}
                            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 group ${
                                activeDay === 'day2' 
                                ? 'bg-[#C20000] text-white shadow-lg' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <div className={`p-2 rounded bg-black/20 ${activeDay === 'day2' ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                                <CalendarDays size={20} />
                            </div>
                            <div className="text-left">
                                <span className="block text-xs font-bold uppercase tracking-widest opacity-80">21 de Março</span>
                                <span className="block font-display text-lg uppercase tracking-wide leading-none mt-1">Dia 02 • Estratégia</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Timeline Layout */}
                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[29px] sm:left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-brand-red/50 via-white/10 to-transparent"></div>

                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={activeDay}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-8"
                        >
                            {scheduleData[activeDay].map((item, idx) => (
                                <div key={idx} className="relative flex flex-col sm:flex-row items-start group">
                                    
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[23px] sm:left-[114px] top-5 w-3.5 h-3.5 bg-black border-2 border-brand-red rounded-full z-20 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(194,0,0,0.5)]"></div>

                                    {/* Time - Desktop: Left, Mobile: Indented next to content */}
                                    <div className="sm:w-[120px] flex-shrink-0 mb-2 sm:mb-0 sm:pr-8 sm:text-right pl-[60px] sm:pl-0">
                                        <div className="inline-flex items-center gap-2 bg-[#111] border border-white/5 rounded px-2 py-1 sm:border-none sm:bg-transparent sm:p-0">
                                            <Clock size={14} className="text-brand-red sm:hidden" />
                                            <span className="text-brand-highlight font-display text-xl sm:text-2xl tracking-wide">
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 ml-[60px] sm:ml-0 bg-[#0a0a0a] border border-white/5 hover:border-brand-red/30 p-6 rounded-xl transition-all duration-300 relative overflow-hidden group-hover:bg-[#0f0f0f]">
                                        {/* Hover Glow */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 blur-[50px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        <div className="relative z-10">
                                            <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-display tracking-wide mb-2 leading-tight">
                                                {item.title}
                                            </h3>
                                            
                                            {item.speaker && (
                                                <div className="mb-3">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-white/10 px-2 py-1 rounded bg-white/5">
                                                        {item.speaker}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            <p className="text-gray-500 font-sans text-sm leading-relaxed tracking-normal group-hover:text-gray-400 transition-colors">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
