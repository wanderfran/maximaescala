
import React from 'react';
import { Mic, FileText, TrendingUp, Map, Users } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Mic size={32} />,
      title: "COMUNICAÇÃO",
      highlight: "POSICIONAMENTO",
      desc: "Definição clara da sua narrativa. Apresente sua empresa com a autoridade que o seu faturamento exige.",
    },
    {
      icon: <FileText size={32} />,
      title: "PROCESSO",
      highlight: "ARQUITETURA",
      desc: "Diagnóstico, Proposta e Fechamento. Uma estrutura comercial profissional para escalar sem depender da sorte.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "ESTRATÉGIA",
      highlight: "GROWTH PLAN",
      desc: "Um plano executivo de 30 dias. Metas claras, alocação de recursos e ações de alto impacto para o próximo mês.",
    },
    {
      icon: <Map size={32} />,
      title: "TRAÇÃO",
      highlight: "CANAIS REAIS",
      desc: "Identificação dos canais de aquisição que trazem clientes qualificados e geram ROI para o seu modelo de negócio.",
    },
    {
      icon: <Users size={32} />,
      title: "AMBIENTE",
      highlight: "ECOSSISTEMA",
      desc: "Networking intencional com outros líderes que estão jogando o jogo da escala. Negócios acontecem aqui dentro.",
    },
  ];

  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-32 bg-[#F2F2F2] relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-gray-200 to-transparent opacity-50 pointer-events-none"></div>

       <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto pt-4 md:pt-12">
              <span className="text-brand-red font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">Metodologia Integrada</span>
              
              <h2 className="font-display uppercase leading-tight mb-8 w-full">
                  <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-1 md:mb-2 tracking-tight">Fundamentos de</span>
                  <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-red filter drop-shadow-sm tracking-tighter pb-2">Crescimento.</span>
              </h2>
              
              <div className="w-24 h-1.5 bg-black/10 mx-auto rounded-full mb-8"></div>

              <p className="text-gray-600 text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                  Não é sobre dicas soltas. É sobre implementar os <strong className="text-black">pilares estruturais</strong> que sustentam empresas líderes de mercado.
              </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`
                    relative bg-white 
                    rounded-2xl
                    border-l-[6px] border-[#C20000]
                    p-6 md:p-8
                    flex flex-col items-center text-center 
                    shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] 
                    hover:shadow-[0_20px_40px_-10px_rgba(194,0,0,0.2)] 
                    transform transition-all duration-300 hover:-translate-y-2
                    group
                    w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-2rem)]
                `}
              >
                {/* Number Badge */}
                {/* Mobile: Top Left Inside */}
                <div className="absolute left-5 top-5 bg-[#C20000] text-white font-display text-sm w-8 h-8 flex items-center justify-center rounded-full shadow-md z-20 md:hidden">
                    {idx + 1}
                </div>
                
                {/* Desktop: Hanging Left */}
                <div className="hidden md:flex absolute left-0 top-12 -translate-x-1/2 bg-[#C20000] text-white font-display text-xl w-10 h-10 items-center justify-center rounded-full shadow-md z-20 border-4 border-[#F2F2F2]">
                    {idx + 1}
                </div>

                {/* Icon Container - Centered */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center text-[#C20000] mb-6 md:mb-8 group-hover:bg-[#C20000] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-glow">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 36, strokeWidth: 1.5 })}
                </div>
                
                <div className="mb-4 md:mb-6 relative z-10 w-full overflow-hidden">
                  {/* Title (First Line) */}
                  <p className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-2 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </p>
                  
                  {/* Highlight (Second Line) */}
                  {/* Removed whitespace-nowrap to prevent text cutoff and added break-words */}
                  <h3 className="text-black font-display text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl uppercase leading-normal tracking-tight group-hover:text-[#C20000] transition-colors w-full pb-2 break-words">
                    {feature.highlight}
                  </h3>
                </div>

                {/* Divider small */}
                <div className="w-12 h-1.5 bg-gray-100 mb-6 group-hover:bg-red-100 transition-colors rounded-full"></div>

                <p className="text-gray-500 font-sans text-sm md:text-base leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
       </div>
    </section>
  );
};

export default Features;
