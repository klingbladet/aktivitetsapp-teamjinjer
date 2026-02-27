import React, { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import MapSection from './MapSection';
import ActivityList from './ActivityList';
import { mockActivities } from './MockData';
import { Plus, Bell, User, MessageCircle } from 'lucide-react';
import CreateActivityModal from './CreateActivityModal';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alla');
  const [isOpen, setIsOpen] = useState(false)

  // Filter logic
  const filteredActivities = useMemo(() => {
    return mockActivities.filter((activity) => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Alla' || activity.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark overflow-x-hidden flex flex-col w-full">
      {/* Navbar / Header */}
      <nav className="bg-brand-light/95 backdrop-blur-md border-brand-dark/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50 w-full">
        <div className="flex items-center">
          <span className="text-2xl font-black text-brand-dark tracking-wider font-logo uppercase">JINJER</span>
        </div>

        <div className="hidden md:flex items-center gap-8 ml-40">
           <a href="#" className="text-sm font-semibold text-brand-dark hover:text-brand-dark/70 transition-colors">Upptäck</a>
           <a href="#" className="text-sm font-semibold text-brand-dark/50 hover:text-brand-dark transition-colors">Mina aktiviteter</a>
           <a href="#" className="text-sm font-semibold text-brand-dark/50 hover:text-brand-dark transition-colors">Vänner</a>
        </div>

        <div className="flex items-center gap-4">
           <button className="p-2 text-brand-dark/40 hover:text-brand-dark hover:bg-brand-dark/10 rounded-lg transition-colors relative">
              <MessageCircle size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-dark border-2 border-brand-light rounded-full"></span>
           </button>
           <button className="p-2 text-brand-dark/40 hover:text-brand-dark hover:bg-brand-dark/10 rounded-lg transition-colors">
              <Bell size={20} />
           </button>
           <button className="flex items-center gap-2 p-1 pl-3 bg-brand-light border border-brand-dark/10 rounded-full hover:bg-brand-light/50 transition-colors">
              <span className="text-xs font-bold text-brand-dark/80">Mitt Konto</span>
              <div className="w-8 h-8 bg-brand-dark/10 rounded-full flex items-center justify-center text-brand-dark border border-brand-dark/10 overflow-hidden">
                 <User size={18} />
              </div>
           </button>
        </div>
      </nav>

      {/* Hero / Banner Section */}
      <header className=" from-brand-light to-brand-dark text-brand-dark pt-12 pb-24 px-6 text-center w-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 leading-tight tracking-tight">
            Upptäck ditt nästa <span className="text-brand-brand-dark/80">äventyr</span> i Stockholm
          </h1>
          <p className="text-brand-dark/80 text-lg md:text-s font-medium max-w-2xl mx-auto opacity-90">
            Hitta, skapa och anslut dig till roliga fritidsaktiviteter nära dig. Enklare än någonsin.
          </p>
        </div>
      </header>

      {/* Search Bar - Absolutely Positioned over Hero */}
      <div className="px-6 w-full max-w-7xl mx-auto">
         <SearchBar 
           searchTerm={searchTerm} 
           setSearchTerm={setSearchTerm} 
           selectedCategory={selectedCategory} 
           setSelectedCategory={setSelectedCategory} 
         />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 w-full">

        {/* Left Column: Map Section (Sticky on Desktop) */}
        <aside className="w-full lg:w-175 order-2 lg:order-1">
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                Utforska på karta
              </h2>
            </div>
            <MapSection activities={filteredActivities} />
            
            {/* Quick Actions / Stats Card */}
            <div className="bg-brand-soft-white backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-brand-dark/10">
               <h3 className="font-bold text-brand-dark mb-3">Snabba steg</h3>
               <div className="space-y-3">
                  <button onClick={() => setIsOpen(true)} className="w-full flex items-center justify-between p-3 rounded-xl bg-brand-dark text-brand-light hover:bg-brand-dark/80 transition-colors group">
                     <span className="font-bold text-sm">Skapa ny aktivitet</span>
                     <div className="w-6 h-6 bg-brand-light rounded-md flex items-center justify-center text-brand-dark group-hover:scale-110 transition-transform">
                        <Plus size={14} strokeWidth={4} />
                     </div>
                  </button>
                  <p className="text-xs text-brand-dark/40 px-1 leading-relaxed italic">
                    "Gör som 234 andra stockholmare och börja röra på dig idag!"
                  </p>
               </div>
            </div>
          </div>
        </aside>

        {/* Right Column: List of Activities */}
        <section className="flex-1 order-1 lg:order-2">
          <ActivityList activities={filteredActivities} />
        </section>

      </main>

      {/* Mobile Bottom Navigation (Optional) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2  rounded-full border-none flex items-center gap-2 p-2 px-4 z-50">
          <button className="flex items-center gap-2 p-2 px-4 bg-brand-dark text-brand-light rounded-full font-bold text-sm shadow-lg shadow-brand-dark/20">
             <Plus size={18} strokeWidth={3} />
             Skapa
          </button>
      </div>

      {/* Simple Footer */}
      <footer className="mt-auto py-12 border-t border-brand-dark/10 bg-brand-light px-6 w-full">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-6">
           <div className="flex items-center">
              <span className="text-xl font-black text-brand-dark font-logo tracking-wider uppercase">JINJER</span>
           </div>
           <div className="text-brand-dark/40 text-sm">
              © 2026 Team Jinjer.
           </div>
           <div className="flex gap-4">
              <span className="text-xs font-semibold text-brand-dark/40 uppercase tracking-widest cursor-pointer hover:text-brand-dark">Integritet</span>
              <span className="text-xs font-semibold text-brand-dark/40 uppercase tracking-widest cursor-pointer hover:text-brand-dark">Villkor</span>
           </div>
        </div>
      </footer>

      <CreateActivityModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Activity"
      />
      
    </div>
  );
};

export default App;
