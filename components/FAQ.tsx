
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQProps {
  onRegister: () => void;
}

const faqData = [
  {
    question: "É para iniciante?",
    answer: "Não é o foco. Se você ainda não sabe o que vende, esse não é o melhor formato. Se você já vende, já tem empresa e quer método para crescer, faz sentido."
  },
  {
    question: "Vai ter prática?",
    answer: "Sim. Você trabalha pitch, participa de networking guiado, faz dinâmicas de comunicação, vê simulações de vendas e aplica os conceitos em cima da sua realidade."
  },
  {
    question: "Com o que eu saio pronto?",
    answer: "Você sai com: Pitch pronto, Oferta mais clara, Roteiro comercial, Mapa de canais e rotina semanal, Plano de escala de 30 dias."
  },
  {
    question: "E se eu não aplicar depois?",
    answer: "O Plano de Escala de 30 dias existe para isso. Você volta com um documento simples para guiar suas próximas quatro semanas. E sai com pitch, oferta e roteiro já no ponto de usar."
  },
  {
    question: "Onde é o evento?",
    answer: "Em João Pessoa - PB, no DCT, um espaço preparado para receber empresários com conforto."
  },
  {
    question: "Posso trocar o participante?",
    answer: "Pode, dentro das regras e prazos da organização. As instruções chegam por e-mail ou WhatsApp após a compra."
  }
];

const FAQ: React.FC<FAQProps> = ({ onRegister }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-black border-t border-white/5 scroll-mt-28 md:scroll-mt-32">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
            <p className="text-brand-highlight font-sans text-sm font-bold tracking-widest uppercase mb-4">
                Dúvidas Rápidas
            </p>
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-6xl font-normal text-white uppercase tracking-tight leading-none">
                Perguntas <br className="md:hidden" /> <span className="text-brand-red">Frequentes</span>
            </h2>
            </div>

            <div className="space-y-4">
            {faqData.map((item, index) => (
                <div 
                key={index} 
                className={`bg-[#111] border ${openIndex === index ? 'border-brand-red/50 shadow-[0_0_20px_rgba(194,0,0,0.15)]' : 'border-white/5'} transition-all duration-300 rounded-xl overflow-hidden hover:border-white/20`}
                >
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                    <span className={`font-condensed text-lg md:text-xl uppercase tracking-wide transition-colors leading-tight ${openIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {item.question}
                    </span>
                    <span className="flex-shrink-0 ml-6">
                        {openIndex === index ? (
                            <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white">
                                <Minus size={18} />
                            </div>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white/10 group-hover:text-white transition-all">
                                <Plus size={18} />
                            </div>
                        )}
                    </span>
                </button>
                
                <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="p-6 md:p-8 pt-0 text-gray-300 font-sans text-lg leading-relaxed border-t border-white/5 mx-6 md:mx-8 px-0 mt-2 tracking-normal">
                        {item.answer}
                        </div>
                    </div>
                </div>
                </div>
            ))}
            </div>

            <div className="mt-20 text-center">
                <button 
                onClick={onRegister}
                className="inline-block bg-[#C20000] hover:bg-[#a50000] text-white text-lg md:text-2xl font-normal py-5 px-16 rounded-lg shadow-[0_0_30px_rgba(194,0,0,0.4)] transition-all duration-200 uppercase tracking-wide font-condensed transform hover:scale-105"
                >
                QUERO MEU INGRESSO
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
