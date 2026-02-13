import React from 'react';
import { Star } from 'lucide-react';

const DaySummary: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header - Adjusted size to fit 2 lines cleanly */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-brand-red font-bold tracking-widest uppercase text-sm mb-2 block">O que você vive na prática</span>
           <h2 className="font-display text-3xl md:text-6xl font-normal text-black uppercase tracking-tight leading-tight">
              A ROTINA DE <span className="text-brand-red">LÍDERES DE MERCADO</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Day 01 Card */}
          <div className="flex flex-col rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] bg-white border border-gray-100 h-full">
             <div className="bg-[#C20000] p-8 text-center py-12">
                <h3 className="font-display text-5xl md:text-6xl text-white mb-3 tracking-tight">DIA 01</h3>
                <div className="w-16 h-1 bg-white/30 mx-auto mb-4 rounded-full"></div>
                <p className="font-sans text-white text-lg md:text-xl font-bold max-w-sm mx-auto tracking-wide uppercase leading-snug">
                   Identidade, Comunicação e Networking
                </p>
             </div>
             
             <div className="bg-gray-50 p-8 md:p-12 flex-1">
                <div className="mb-10 p-6 bg-white border-l-4 border-brand-red rounded-r-xl shadow-sm">
                    <p className="font-sans text-gray-500 font-bold mb-2 uppercase text-xs tracking-widest">Foco do dia</p>
                    <p className="text-black text-lg font-medium leading-relaxed">
                        Elevar o padrão da sua comunicação e alinhar sua mentalidade para gerir o crescimento acelerado.
                    </p>
                </div>

                <ul className="space-y-6">
                   {[
                     "Comunicação de Liderança: Voz, postura e intenção.",
                     "Construção de Narrativa: Como apresentar seu negócio de forma irrefutável.",
                     "Networking de Alto Nível: Conexões estratégicas entre decisores.",
                     "Mentalidade de Escala: Saindo do operacional para o estratégico.",
                     "Gestão de Imagem: Alinhando sua marca pessoal à ambição da empresa.",
                     "Hot Seats Estratégicos: Análise de modelos de negócio ao vivo."
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-5 group">
                        <div className="mt-1.5 bg-red-100 p-1.5 rounded-full shrink-0 group-hover:bg-red-200 transition-colors">
                            <Star className="text-[#C20000] fill-current" size={16} />
                        </div>
                        <span className="text-gray-700 font-sans font-medium text-lg leading-relaxed tracking-normal">
                          {item}
                        </span>
                     </li>
                   ))}
                </ul>
             </div>
          </div>

          {/* Day 02 Card */}
          <div className="flex flex-col rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] bg-white border border-gray-100 h-full">
             <div className="bg-[#C20000] p-8 text-center py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <h3 className="font-display text-5xl md:text-6xl text-white mb-3 relative z-10 tracking-tight">DIA 02</h3>
                <div className="w-16 h-1 bg-white/30 mx-auto mb-4 rounded-full relative z-10"></div>
                <p className="font-sans text-white text-lg md:text-xl font-bold max-w-sm mx-auto relative z-10 tracking-wide uppercase leading-snug">
                   Governança, Vendas e Plano de Ação
                </p>
             </div>

             <div className="bg-gray-50 p-8 md:p-12 flex-1">
                <div className="mb-10 p-6 bg-white border-l-4 border-brand-red rounded-r-xl shadow-sm">
                    <p className="font-sans text-gray-500 font-bold mb-2 uppercase text-xs tracking-widest">Foco do dia</p>
                    <p className="text-black text-lg font-medium leading-relaxed">
                        Implementar a estrutura comercial e o plano tático para escalar seus resultados já no próximo mês.
                    </p>
                </div>

                <ul className="space-y-6">
                   {[
                     "Arquitetura Comercial: Do lead ao fechamento sem gargalos.",
                     "Técnicas de Negociação Avançada e Fechamento.",
                     "Estruturação de Propostas de Alto Valor.",
                     "Canais de Aquisição: Onde está o lucro da sua operação.",
                     "Posicionamento de Mercado: Diferenciação real.",
                     "Plano Executivo de 30 Dias: O mapa da sua próxima fase."
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-5 group">
                        <div className="mt-1.5 bg-red-100 p-1.5 rounded-full shrink-0 group-hover:bg-red-200 transition-colors">
                             <Star className="text-[#C20000] fill-current" size={16} />
                        </div>
                        <span className="text-gray-700 font-sans font-medium text-lg leading-relaxed tracking-normal">
                          {item}
                        </span>
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaySummary;