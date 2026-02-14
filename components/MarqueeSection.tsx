
import React from 'react';
import { motion } from 'framer-motion';

const MarqueeSection: React.FC = () => {
  const text = "20 E 21 DE MARÇO NO DCT EM JOÃO PESSOA";
  const repetitions = 6;

  return (
    // Updated to Carbon Black style with Noise
    <div className="relative z-20 bg-[#09090b] border-y border-white/10 py-6 overflow-hidden flex items-center shadow-2xl">
        
        {/* Noise Texture Layer */}
        <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
            style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
        ></div>

        {/* Vignette for depth (Carbon feel) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none z-10"></div>

        <div className="flex overflow-hidden relative w-full z-20">
            <motion.div 
                className="flex whitespace-nowrap gap-12"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 25,
                }}
            >
                {Array.from({ length: repetitions * 2 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-12 shrink-0">
                        {/* Text in off-white/silver to match carbon aesthetic */}
                        <span className="font-condensed text-2xl md:text-4xl font-normal text-gray-200 drop-shadow-sm">
                            {text}
                        </span>
                        {/* Star remains as a color accent */}
                        <span className="text-brand-highlight text-3xl md:text-4xl filter drop-shadow-[0_0_5px_rgba(255,42,0,0.5)]">✦</span>
                    </div>
                ))}
            </motion.div>
        </div>
    </div>
  );
};

export default MarqueeSection;
