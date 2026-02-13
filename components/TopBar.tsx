import React from 'react';

const TopBar: React.FC = () => {
  const scrollToIngressos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('ingressos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a 
      href="#ingressos" 
      onClick={scrollToIngressos}
      className="block bg-[#C20000] w-full py-2 px-4 text-center z-50 relative border-b border-white/5 hover:bg-[#a50000] transition-colors cursor-pointer"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:gap-2 justify-center items-center text-[10px] md:text-xs font-bold tracking-wide text-white uppercase font-sans leading-tight">
        <span>PRIMEIRO LOTE LIBERADO | GARANTA SEU INGRESSO</span>
        <span className="hidden md:inline"> - </span>
        <span className="mt-1 md:mt-0">SÃO APENAS 120 VAGAS 🔥</span>
      </div>
    </a>
  );
};

export default TopBar;