import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section className="py-12 bg-[#0e0e0e] border-t border-white/5 relative">
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 bg-[#161616] rounded-2xl p-2 border border-white/5 overflow-hidden">
                
                {/* Left: Info */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                            <MapPin size={20} />
                        </div>
                        <span className="text-brand-highlight font-bold uppercase text-xs">Localização Premium</span>
                    </div>
                    
                    <h2 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-4 leading-tight">
                        DCT <span className="text-gray-500">Corporate</span>
                    </h2>
                    
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                        Um dos complexos corporativos mais modernos do Nordeste. O ambiente ideal para fechar negócios e expandir sua visão.
                    </p>

                    <div className="space-y-4">
                         <div className="flex items-start gap-4">
                            <div className="h-full w-0.5 bg-brand-red/30 rounded-full"></div>
                            <div>
                                <p className="text-white font-bold text-sm uppercase mb-1">Endereço</p>
                                <p className="text-gray-500 text-sm">R. Empresário Cláudio Santa Cruz, 999 <br/> João Pessoa - PB</p>
                            </div>
                         </div>
                    </div>

                    <a 
                        href="https://maps.app.goo.gl/K6ZqZ9Z9Z9Z9Z9Z9" // Replace with actual Google Maps link
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center gap-2 text-white border-b border-brand-red/50 pb-1 hover:text-brand-red transition-colors w-max text-sm font-bold uppercase"
                    >
                        <Navigation size={14} />
                        Abrir no GPS
                    </a>
                </div>

                {/* Right: Map/Image Area - Slim Height */}
                <div className="w-full lg:w-[60%] h-64 lg:h-80 relative rounded-xl overflow-hidden mr-2 mb-2 lg:mb-0 lg:mr-0 group">
                    {/* Placeholder for Map or Building Image */}
                     <div className="absolute inset-0 bg-gray-800 pointer-events-none">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.096756627768!2d-34.8358!3d-7.1158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace81a1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sDCT%20-%20Duo%20Corporate%20Towers!5e0!3m2!1sen!2sbr!4v1620000000000!5m2!1sen!2sbr" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
                            allowFullScreen 
                            loading="lazy" 
                            title="Mapa DCT"
                        ></iframe>
                     </div>
                     
                     {/* Overlay Gradient on Map for atmosphere */}
                     <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl shadow-inner mix-blend-overlay"></div>

                     {/* Custom Pin Overlay */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center">
                        {/* Label Bubble */}
                        <div className="mb-2 bg-white px-3 py-1.5 rounded shadow-[0_4px_10px_rgba(0,0,0,0.3)] animate-bounce relative">
                            <p className="text-black font-bold text-[10px] uppercase whitespace-nowrap">DCT Corporate</p>
                            {/* Triangle */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                        </div>
                        
                        {/* Pin Icon */}
                        <div className="relative">
                            {/* Pulse Animation */}
                            <div className="absolute inset-0 bg-brand-red rounded-full animate-ping opacity-75"></div>
                            {/* Icon Body */}
                            <div className="relative bg-[#C20000] p-2.5 rounded-full border-2 border-white shadow-lg text-white">
                                <MapPin size={24} fill="currentColor" strokeWidth={2.5} />
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Location;