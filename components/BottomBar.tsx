
import React from 'react';
import { CalendarDays } from 'lucide-react';

interface BottomBarProps {
  onRegister: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onRegister }) => {
  // Configuração manual da porcentagem de vendas
  const soldPercentage = 15; 

  const handleAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom)] transition-all duration-300">
      <a 
        href="#ingressos" 
        onClick={handleAction}
        className="flex items-center justify-between px-4 py-3 md:py-4 md:px-8 max-w-6xl mx-auto hover:bg-gray-50 transition-colors cursor-pointer group"
      >
        {/* Lado Esquerdo: Data */}
        <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gray-100 rounded text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                <CalendarDays size={18} />
            </div>
            <div className="flex flex-col justify-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-tight mb-0.5">Data</span>
                <span className="text-sm font-display text-gray-900 uppercase tracking-wide leading-tight pt-0.5">20 e 21 MAR</span>
            </div>
        </div>

        {/* Lado Direito: Status e Barra */}
        <div className="flex flex-col items-end justify-center gap-1.5 w-[160px] md:w-[220px]">
            <div className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-wider w-full leading-tight">
                <span className="text-brand-red">1º Lote</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{soldPercentage}% Vendido</span>
            </div>
            
            {/* Barra de Progresso */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#500000] via-[#C20000] to-[#FF2A00] transition-all duration-1000"
                    style={{ width: `${soldPercentage}%` }}
                ></div>
            </div>
        </div>
      </a>
    </div>
  );
};

export default BottomBar;
