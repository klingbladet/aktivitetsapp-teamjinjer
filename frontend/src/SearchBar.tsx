import React from 'react';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="bg-brand-dark shadow-2xl rounded-2xl p-6 w-full max-w-4xl mx-auto -mt-10 relative z-10 border border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-brand-dark/40" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-xl focus:ring-2 focus:ring-brand-light/50 text-sm placeholder-brand-dark/30 text-brand-dark bg-brand-soft-white transition-all font-medium"
            placeholder="Sök efter aktivitet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-brand-dark/40" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-xl focus:ring-2 focus:ring-brand-light/50 text-sm text-brand-dark bg-brand-soft-white transition-all appearance-none cursor-pointer font-medium"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Alla">Alla Kategorier</option>
            <option value="Sport">Sport</option>
            <option value="Friskvård">Friskvård</option>
            <option value="Socialt">Socialt</option>
          </select>
        </div>

        {/* Buttons / Quick Filters */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-light text-brand-dark hover:bg-brand-light/90 rounded-xl transition-all text-sm font-bold shadow-sm active:scale-95">
            <MapPin className="h-4 w-4" />
            Nära mig
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-brand-light border border-white/10 rounded-xl transition-all text-sm font-bold active:scale-95">
            <Calendar className="h-4 w-4" />
            Idag
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
