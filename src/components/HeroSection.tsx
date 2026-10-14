import React from 'react';
import { Search, MapPin, Sparkles, Flame, Clock, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  location: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectCategory: (catId: string) => void;
  onOpenFoodieAi: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  location,
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  onOpenFoodieAi
}) => {
  const { isDarkMode } = useTheme();

  const quickPills = [
    { label: 'Biryani', id: 'biryani' },
    { label: 'Pizza', id: 'pizza' },
    { label: 'Burgers', id: 'burgers' },
    { label: 'Sushi', id: 'sushi' },
    { label: 'Healthy', id: 'healthy' },
    { label: 'Desserts', id: 'desserts' }
  ];

  return (
    <section className="relative w-full min-h-[50vh] sm:min-h-[62vh] lg:min-h-[76vh] flex items-end overflow-hidden bg-slate-950">
      
      {/* Big Full-Bleed Background Image (Zero Margin) */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=1920"
          alt="Gourmet Food Table Feast"
          className="w-full h-full object-cover object-center transform scale-100"
        />
        {/* Layered dark gradients for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-5 pt-8 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-36 flex flex-col justify-end space-y-3 sm:space-y-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-200" />
            <span>Fast Delivery in {location}</span>
          </span>

          <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 border border-white/20 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            ⚡ 25-30 Mins Avg
          </span>
        </div>

        {/* Big Bold Headline */}
        <div className="space-y-1.5 sm:space-y-3 max-w-3xl">
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
            Craving Delicious Food Delivered Hot &amp; Fast?
          </h1>
          <p className="text-[11px] sm:text-base lg:text-lg text-slate-200 font-normal leading-snug sm:leading-relaxed drop-shadow max-w-2xl">
            Order from top-rated restaurants, authentic dum biryanis, artisan woodfired pizzas, and gourmet burgers in minutes.
          </p>
        </div>

        {/* Big Interactive Search Bar (Theme adaptive) */}
        <div className={`max-w-2xl w-full backdrop-blur-md p-1.5 sm:p-2.5 rounded-2xl shadow-2xl border flex flex-col sm:flex-row items-center gap-2 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/80 shadow-black/60' 
            : 'bg-white/95 border-white/80 shadow-slate-950/20'
        }`}>
          <div className="flex items-center space-x-2.5 pl-2.5 w-full sm:w-auto text-slate-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, restaurants, biryani..."
              className={`w-full sm:w-88 py-2 sm:py-3 bg-transparent text-xs sm:text-sm font-bold focus:outline-hidden ${
                isDarkMode ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto sm:ml-auto">
            <button
              onClick={onOpenFoodieAi}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-orange-600/30 transition-all flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Foodie AI</span>
            </button>
          </div>
        </div>

        {/* Quick Cravings Filter Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
          <span className="text-slate-300 font-extrabold uppercase tracking-wider text-[10px] shrink-0 mr-1">
            Cravings:
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => onSelectCategory(pill.id)}
              className="bg-slate-900/80 hover:bg-orange-600 hover:text-white text-slate-200 border border-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all shrink-0 active:scale-95"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Promotional Ribbon Cards */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/10">
          <div className="bg-slate-900/75 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center space-x-3.5 text-white shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-orange-400">FLAT 50% OFF</span>
              <p className="text-[11px] text-slate-300">Use coupon code <strong className="text-white">CRAVE50</strong></p>
            </div>
          </div>

          <div className="bg-slate-900/75 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center space-x-3.5 text-white shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-emerald-400">Express Delivery</span>
              <p className="text-[11px] text-slate-300">On-time guarantee or $5 cashback</p>
            </div>
          </div>

          <div className="bg-slate-900/75 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center space-x-3.5 text-white shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-amber-400">Zero Delivery Fee</span>
              <p className="text-[11px] text-slate-300">Free delivery on orders above $20</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
