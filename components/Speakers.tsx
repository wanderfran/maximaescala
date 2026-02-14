
import React from 'react';

const speakersData = [
  {
    id: 1,
    name: "PATRICK SUYTI",
    role: "VENDAS COMPORTAMENTAIS & ESCALA",
    description: "Diretor comercial e estrategista. Vai traduzir comportamento humano em um passo a passo de venda previsível para sua operação.",
    image: "https://pub-ed4b74b9327b4be88be439c9b3eee519.r2.dev/fotos/WhatsApp%20Image%202026-02-09%20at%2009.52.27.webp" 
  },
  {
    id: 3,
    name: "RENATA",
    role: "VENDAS NA PRÁTICA",
    description: "Simulações e correções ao vivo. Como agir no 'cara a cara' com o cliente.",
    image: "https://pub-ed4b74b9327b4be88be439c9b3eee519.r2.dev/fotos/WhatsApp%20Image%202026-02-09%20at%2009.52.32.webp"
  },
  {
    id: 4,
    name: "WANDER",
    role: "MARKETING & POSICIONAMENTO",
    description: "Como ser lembrado antes de ser comparado. Atraindo o cliente certo.",
    image: "https://pub-ed4b74b9327b4be88be439c9b3eee519.r2.dev/fotos/WhatsApp%20Image%202026-02-09%20at%2009.53.12.webp"
  }
];

const Speakers: React.FC = () => {
  return (
    <section id="speakers" className="relative py-20 bg-brand-dark overflow-hidden scroll-mt-28 md:scroll-mt-32">
        {/* Background Decorative */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
            {/* Header - Compact 2 lines */}
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <p className="text-brand-highlight font-sans text-sm font-bold uppercase mb-3">
                    Quem conduz o Máxima Escala
                </p>
                <h2 className="font-condensed text-4xl md:text-6xl text-white uppercase leading-[0.95]">
                    As Maiores <br className="hidden md:block"/>
                    <span className="text-brand-red">Autoridades</span>
                </h2>
            </div>

            {/* Grid - Adjusted to fit 3 speakers nicely in one row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {speakersData.map((speaker, index) => (
                    <div 
                        key={`${speaker.id}-${index}`} 
                        className="group relative h-[500px] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-brand-red/50 transition-all duration-500 shadow-2xl"
                    >
                        {/* Red Ambient Light (Top) simulating studio light */}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-brand-red/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Image Layer */}
                        {speaker.image && !speaker.image.includes('placeholder') ? (
                            <img 
                                src={speaker.image} 
                                alt={speaker.name} 
                                // Renata (ID 3): Zoom in (scale) and move left (translateX negative)
                                style={speaker.id === 3 ? { transform: 'scale(1.35) translateX(-20px) translateY(10px)' } : {}}
                                className={`absolute inset-0 w-full h-full object-cover object-top mix-blend-normal filter grayscale-0 opacity-100 md:opacity-90 transition-all duration-700 ${speaker.id !== 3 ? 'md:group-hover:opacity-100 md:group-hover:scale-105' : ''}`}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://framerusercontent.com/images/svjFFUI9y35yZHV3xw9aVVGM1GU.png"; // Fallback to logo or empty
                                    (e.target as HTMLImageElement).style.objectFit = "contain";
                                }}
                            />
                        ) : (
                            // Fallback
                             <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                                <span className="font-condensed text-6xl text-white/10">{speaker.name.charAt(0)}</span>
                             </div>
                        )}

                        {/* Dark Gradient Overlay (Bottom) for Text Contrast - REDUCED FADE as requested */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent via-40% z-10"></div>

                        {/* Content Layer (Bottom) */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                            {/* Decorative Brand Tag */}
                            <div className="mb-4 flex items-center gap-2 opacity-60">
                                <div className="w-1 h-3 bg-brand-red"></div>
                                <span className="text-[10px] font-bold uppercase text-gray-400">Máxima Escala</span>
                            </div>

                            {/* Name - Adjusted leading to prevent crop */}
                            <h3 className="font-condensed text-2xl md:text-3xl text-white uppercase leading-none mb-2 drop-shadow-lg">
                                {speaker.name}
                            </h3>
                            
                            {/* Role */}
                            <p className="text-brand-red font-bold text-xs md:text-sm uppercase mb-4">
                                {speaker.role}
                            </p>

                            {/* Description */}
                            <div className="w-full h-px bg-white/10 mb-4 group-hover:bg-brand-red/30 transition-colors"></div>
                            <p className="text-gray-300 text-sm leading-relaxed font-sans font-medium line-clamp-3">
                                {speaker.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Speakers;
