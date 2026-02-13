
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onRegister: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  // --- CONFIGURAÇÃO MANUAL DA IMAGEM ---
  const IMAGE_SCALE_PERCENT_DESKTOP = 100; // Cover on desktop
  const IMAGE_SCALE_PERCENT_MOBILE = 180; // Zoom in on mobile to focus faces
  
  // --- CONFIGURAÇÃO MANUAL DA FONTE (HEADLINE) ---
  const HEADLINE_SIZE_DESKTOP = '80px';
  const HEADLINE_SIZE_MOBILE = '48px';

  // --- CONTROLE DE ESPAÇAMENTO MOBILE ---
  // Reduzido para 18vh pois o header agora ocupa espaço físico acima
  const MOBILE_CONTENT_SPACING = '18vh'; 

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
        className="relative h-screen flex flex-col justify-center overflow-hidden bg-[#080808]"
        style={{ '--mobile-hero-spacing': MOBILE_CONTENT_SPACING } as React.CSSProperties}
    >
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image */}
        <div 
            className="hidden md:block w-full h-full bg-no-repeat"
            style={{
                backgroundImage: "url('/hero-image.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%', // Adjusted to keep faces at the top
            }}
        ></div>
        
        {/* Mobile Image Strategy - UNCHANGED */}
        <div 
            className="md:hidden w-full h-full bg-no-repeat"
            style={{
                backgroundImage: "url('/hero-image.jpg')",
                backgroundSize: `${IMAGE_SCALE_PERCENT_MOBILE}% auto`,
                backgroundPosition: `center top`, 
            }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent via-40% to-[#080808] to-90% md:hidden"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-[#080808] via-[#080808]/90 to-transparent"></div>
        {/* Desktop Gradient Adjustment to help readability if overlaps slightly */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto px-6 md:px-6 flex flex-col items-center md:items-start w-full max-w-7xl pt-[var(--mobile-hero-spacing)] md:pt-0">

        {/* Date & Location Tags */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-6 md:mb-8 md:ml-0">
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C20000] rounded-full"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-200">20 e 21 de Março</span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C20000] rounded-full"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-200">João Pessoa</span>
            </div>
        </div>

        {/* Headlines */}
        <div className="text-center md:text-left w-full relative flex flex-col items-center md:items-start z-20 mb-6 md:mb-8">
          <style>{`
            .hero-headline {
              font-size: ${HEADLINE_SIZE_MOBILE};
              line-height: 1.2;
              letter-spacing: 0.04em;
            }
            @media (min-width: 768px) {
              .hero-headline {
                font-size: ${HEADLINE_SIZE_DESKTOP};
                line-height: 1.2;
                letter-spacing: 0.04em;
              }
            }
          `}</style>
          <h1 className="hero-headline font-condensed text-white uppercase tracking-wide drop-shadow-2xl mb-6 md:mb-8 max-w-4xl">
            Escale sua<br />
            operação com<br />
            <span className="text-[#C20000]">previsibilidade</span>
          </h1>
          
          {/* Improved Scannability Description */}
          <div className="flex flex-col gap-3 md:gap-4 max-w-2xl md:mx-0 mx-auto px-2">
            <p className="font-sans font-medium text-lg md:text-xl text-gray-300 leading-relaxed">
              Imersão estratégica para <strong className="text-white">Empresários e Líderes</strong> que não aceitam estagnação.
            </p>

            <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed hidden md:block">
              Integramos Vendas, Comportamento e Posicionamento para transformar o potencial do seu negócio em <strong className="text-white border-b border-brand-red/50 pb-0.5">dominância de mercado e lucro real.</strong>
            </p>
             {/* Mobile simplified version */}
             <p className="font-sans text-gray-400 text-base leading-relaxed md:hidden">
              Transforme potencial em <strong className="text-white">lucro real</strong> através de Vendas, Comportamento e Posicionamento.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full max-w-xs md:max-w-md gap-3 md:gap-3 mt-1 md:mt-2">
          <motion.button 
            onClick={onRegister}
            className="w-full bg-[#C20000] hover:bg-[#a50000] text-white text-lg md:text-xl font-normal py-4 md:py-4 px-8 rounded-lg shadow-[0_0_30px_rgba(194,0,0,0.4)] text-center uppercase tracking-wide font-display transition-all border border-red-500/20 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Garantir Minha Vaga
          </motion.button>
          
          {/* Secondary Link */}
          <a
            href="#speakers"
            onClick={(e) => scrollToSection(e, 'speakers')}
            className="flex items-center justify-center md:justify-start gap-2 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold py-2 md:py-2"
          >
            Conhecer os Mentores <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
