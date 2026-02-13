
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import MarqueeSection from './components/MarqueeSection';
import Features from './components/Features';
import Speakers from './components/Speakers';
import DaySummary from './components/DaySummary';
import Schedule from './components/Schedule';
import Location from './components/Location';
import Tickets from './components/Tickets';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BottomBar from './components/BottomBar';
import RegistrationModal from './components/RegistrationModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<'vip' | 'vip_duplo' | 'diamond' | null>(null);

  const handleOpenRegistration = (ticketTypeOrEvent?: 'vip' | 'vip_duplo' | 'diamond' | unknown) => {
    // Se for uma string de tipo de ingresso válida, abre o modal
    if (typeof ticketTypeOrEvent === 'string' && ['vip', 'vip_duplo', 'diamond'].includes(ticketTypeOrEvent)) {
      setSelectedTicketType(ticketTypeOrEvent as 'vip' | 'vip_duplo' | 'diamond');
      setIsModalOpen(true);
    } else {
      // Caso contrário (clique no Navbar, Hero, etc), rola até a seção de ingressos
      const element = document.getElementById('ingressos');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    // Removed overflow-x-hidden from here to allow sticky position to work reliably
    <div className="min-h-screen bg-brand-dark font-sans text-white pb-16 md:pb-0 relative">
      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialTicketType={selectedTicketType}
      />

      {/* TopBar: RELATIVE positioning. It will scroll up and disappear. */}
      <div className="relative z-[60]">
        <TopBar />
      </div>

      {/* Navbar: STICKY positioning. It will stick to the top (top-0) when the TopBar scrolls out of view. */}
      <div className="sticky top-0 z-[50]">
        <Navbar onRegister={() => handleOpenRegistration()} />
      </div>

      <main className="space-y-0">
        {/* Removed negative margin. Hero now flows naturally AFTER the Navbar. */}
        <div>
            <Hero onRegister={() => handleOpenRegistration()} />
        </div>
        
        {/* Marquee Floating on the division */}
        <div className="relative w-full z-40 h-0">
          <div className="absolute top-0 left-0 right-0 transform -translate-y-1/2">
             <MarqueeSection />
          </div>
        </div>
        
        <Features />
        <Speakers />
        <DaySummary />
        <Schedule />
        <Location />
        <Tickets onRegister={handleOpenRegistration} />
        <FAQ onRegister={() => handleOpenRegistration()} />
      </main>
      <Footer />
      
      {/* Sticky Bottom Bar - Fixed at bottom */}
      <BottomBar onRegister={() => handleOpenRegistration()} />
    </div>
  );
};

export default App;