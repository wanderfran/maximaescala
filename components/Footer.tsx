import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-6">
        <img 
            src="https://framerusercontent.com/images/svjFFUI9y35yZHV3xw9aVVGM1GU.png?width=369&height=92" 
            alt="Logo" 
            className="w-40 opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
        />
        <p className="text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} Máxima Escala. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;