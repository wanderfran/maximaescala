
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      number: "01",
      title: "COMUNICAÇÃO & POSICIONAMENTO",
      desc: "Definição clara da sua narrativa. Apresente sua empresa com a autoridade que o seu faturamento exige.",
    },
    {
      number: "02",
      title: "PROCESSO & ARQUITETURA",
      desc: "Diagnóstico, Proposta e Fechamento. Uma estrutura comercial profissional para escalar sem depender da sorte.",
    },
    {
      number: "03",
      title: "ESTRATÉGIA & GROWTH PLAN",
      desc: "Um plano executivo de 30 dias. Metas claras, alocação de recursos e ações de alto impacto para o próximo mês.",
    },
    {
      number: "04",
      title: "TRAÇÃO & CANAIS REAIS",
      desc: "Identificação dos canais de aquisição que trazem clientes qualificados e geram ROI para o seu modelo de negócio.",
    },
  ];

  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-32 bg-black relative overflow-hidden">

       <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 md:mb-20 max-w-3xl pt-4 md:pt-12">
              <span className="text-brand-red font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">Metodologia Integrada</span>

              <h2 className="font-condensed uppercase leading-tight mb-6 w-full text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                  Fundamentos de Crescimento.
              </h2>

              <p className="text-gray-500 text-base md:text-lg font-sans leading-relaxed max-w-xl">
                  Os pilares estruturais que sustentam empresas líderes de mercado.
              </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0a] p-8 md:p-10 flex flex-col group hover:bg-[#111] transition-colors duration-300"
              >
                {/* Number */}
                <span className="text-brand-red font-condensed text-5xl md:text-6xl leading-none mb-6">
                    {feature.number}
                </span>

                {/* Title */}
                <h3 className="text-white font-condensed text-lg md:text-xl uppercase tracking-tight leading-snug mb-6">
                    {feature.title}
                </h3>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-6"></div>

                {/* Description */}
                <p className="text-gray-500 font-sans text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
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
