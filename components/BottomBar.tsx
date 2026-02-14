
import React, { useState, useEffect } from 'react';

interface BottomBarProps {
  onRegister: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onRegister }) => {
  const [visible, setVisible] = useState(false);

  // Configuração manual
  const soldPercentage = 15;
  const currentLote = '1º Lote';
  const priceLabel = 'R$ 297';

  useEffect(() => {
    const handleScroll = () => {
      // Aparece quando o scroll passa da altura da viewport (fim do Hero)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] bg-black/95 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)] transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:py-3.5 md:px-8 max-w-7xl mx-auto gap-4">

        {/* Lado Esquerdo: CTA Button */}
        <button
          onClick={onRegister}
          className="bg-[#C20000] hover:bg-[#a50000] text-white font-condensed text-sm md:text-base uppercase py-3 px-5 md:px-8 rounded-lg transition-all flex items-center gap-2 md:gap-3 whitespace-nowrap shadow-[0_0_20px_rgba(194,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="font-bold">COMPRAR INGRESSO</span>
          <span className="text-white/40">|</span>
          <span className="text-white/80 text-xs md:text-sm">{currentLote.toUpperCase()}</span>
        </button>

        {/* Lado Direito: Progresso de vendas */}
        <div className="flex flex-col items-end justify-center gap-1.5 w-[140px] md:w-[240px] shrink-0">
          <div className="flex items-center justify-end gap-1.5 text-[10px] md:text-xs font-bold uppercase w-full leading-tight">
            <span className="text-white/60 hidden md:inline">{soldPercentage}% dos ingressos vendidos a</span>
            <span className="text-white/60 md:hidden">{soldPercentage}% vendido</span>
            <span className="text-brand-highlight">{priceLabel}</span>
          </div>

          {/* Barra de Progresso */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C20000] to-[#FF2A00] rounded-full transition-all duration-1000"
              style={{ width: `${soldPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
