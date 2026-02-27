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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden flex flex-col w-full">
      {/* Navbar / Header */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200">
             <Plus size={24} strokeWidth={3} />
          </div>
          <span className="text-2xl font-black text-blue-900 tracking-tight">ActiveNet</span>
        </div>

        <div className="hidden md:flex items-center gap-8 ml-12">
           <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">Upptäck</a>
           <a href="#" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">Mina aktiviteter</a>
           <a href="#" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">Vänner</a>
        </div>

        <div className="flex items-center gap-4">
           <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative">
              <MessageCircle size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
           </button>
           <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Bell size={20} />
           </button>
           <button className="flex items-center gap-2 p-1 pl-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
              <span className="text-xs font-bold text-gray-700">Mitt Konto</span>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200 overflow-hidden">
                 <User size={18} />
              </div>
           </button>
        </div>
      </nav>

      {/* Hero / Banner Section */}
      <header className="bg-linear-to-br from-blue-700 to-blue-900 text-white pt-12 pb-24 px-6 text-center w-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Upptäck ditt nästa <span className="text-blue-300">äventyr</span> i Stockholm
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
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
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Utforska på karta
              </h2>
            </div>
            <MapSection activities={filteredActivities} />
            
            {/* Quick Actions / Stats Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="font-bold text-gray-900 mb-3">Snabba steg</h3>
               <div className="space-y-3">
                  <button onClick={() => setIsOpen(true)} className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors group">
                     <span className="font-bold text-sm">Skapa ny aktivitet</span>
                     <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Plus size={14} strokeWidth={4} />
                     </div>
                  </button>
                  <p className="text-xs text-gray-400 px-1 leading-relaxed italic">
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
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-2xl rounded-full border border-gray-100 flex items-center gap-2 p-2 px-4 z-50">
          <button className="flex items-center gap-2 p-2 px-4 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-200">
             <Plus size={18} strokeWidth={3} />
             Skapa
          </button>
      </div>

      {/* Simple Footer */}
      <footer className="mt-auto py-12 border-t border-gray-200 bg-white px-6 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                 <Plus size={18} strokeWidth={3} />
              </div>
              <span className="text-xl font-bold text-blue-900">ActiveNet</span>
           </div>
           <div className="text-gray-400 text-sm">
              © 2026 Team Jinjer Hackathon. Built with React & Tailwind.
           </div>
           <div className="flex gap-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest cursor-pointer hover:text-blue-600">Integritet</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest cursor-pointer hover:text-blue-600">Villkor</span>
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
