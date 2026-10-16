import React from 'react';
import { Search, Flame, Clock, Tag, Sparkles } from 'lucide-react';
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
    <section className={`group relative w-full min-h-[50vh] sm:min-h-[62vh] lg:min-h-[76vh] flex items-end overflow-hidden ${
      isDarkMode 
        ? 'bg-[#0b1329] text-white' 
        : 'bg-[#faf8f5] text-slate-950'
    }`}>
      
      {/* Big Full-Bleed Background Image (Zero Margin) */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=1920"
          alt="Gourmet Food Table Feast"
          className="motion-image w-full h-full object-cover object-center scale-100 group-hover:scale-105"
        />
        {/* Layered gradients tailored per theme for instant, flawless contrast */}
        {isDarkMode ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/80 to-[#0b1329]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/95 via-[#0b1329]/75 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/90 to-white/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/95 via-[#faf8f5]/80 to-white/30" />
          </>
        )}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-5 pt-8 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-36 flex flex-col justify-end space-y-3 sm:space-y-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-200" />
            <span>Fast Delivery in {location}</span>
          </span>

          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
            isDarkMode 
              ? 'bg-[#121c3b]/90 backdrop-blur-md text-amber-300 border border-blue-800/40 shadow-xs' 
              : 'bg-amber-100/90 backdrop-blur-md text-amber-900 border border-amber-300/80 shadow-xs'
          }`}>
            ⚡ 25-30 Mins Avg
          </span>
        </div>

        {/* Big Bold Headline */}
        <div className="space-y-1.5 sm:space-y-3 max-w-3xl">
          <h1 className={`text-2xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight ${
            isDarkMode ? 'text-white drop-shadow-lg' : 'text-slate-950'
          }`}>
            Craving Delicious Food Delivered Hot &amp; Fast?
          </h1>
          <p className={`text-[11px] sm:text-base lg:text-lg font-medium leading-snug sm:leading-relaxed max-w-2xl ${
            isDarkMode ? 'text-blue-100 drop-shadow' : 'text-slate-700'
          }`}>
            <span className="sm:hidden">Order top-rated restaurants, authentic biryanis, and artisan pizzas in minutes.</span>
            <span className="hidden sm:inline">Order from top-rated restaurants, authentic dum biryanis, artisan woodfired pizzas, and gourmet burgers in minutes.</span>
          </p>
        </div>

        {/* Big Interactive Search Bar (Instant adaptive) */}
        <div className={`max-w-2xl w-full backdrop-blur-md p-1.5 sm:p-2.5 rounded-2xl shadow-2xl border flex flex-col sm:flex-row items-center gap-2 ${
          isDarkMode 
            ? 'bg-[#101b3b]/95 border-blue-900/50 shadow-2xl shadow-blue-950/80' 
            : 'bg-white/95 border-orange-200/90 shadow-xl shadow-orange-950/10'
        }`}>
          <div className="flex items-center space-x-2.5 pl-2.5 w-full sm:w-auto text-slate-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, restaurants, biryani..."
              className={`w-full sm:w-88 py-2 sm:py-3 bg-transparent text-xs sm:text-sm font-bold focus:outline-hidden ${
                isDarkMode ? 'text-white placeholder-blue-300/50' : 'text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto sm:ml-auto">
            <button
              onClick={onOpenFoodieAi}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-orange-600/30 flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Foodie AI</span>
            </button>
          </div>
        </div>

        {/* Quick Cravings Filter Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
          <span className={`font-extrabold uppercase tracking-wider text-[10px] shrink-0 mr-1 ${
            isDarkMode ? 'text-blue-200/80' : 'text-slate-600'
          }`}>
            Cravings:
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => onSelectCategory(pill.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 active:scale-95 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-[#121e42]/85 hover:bg-orange-600 hover:text-white text-blue-100 border border-blue-800/40 backdrop-blur-md'
                  : 'bg-white/95 hover:bg-orange-600 hover:text-white text-slate-800 border border-orange-200/80 shadow-xs backdrop-blur-md'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Promotional Ribbon Cards */}
        <div className={`hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t ${
          isDarkMode ? 'border-blue-900/30' : 'border-slate-300/60'
        }`}>
          <div className={`p-4 rounded-xl flex items-center space-x-3.5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
            isDarkMode 
              ? 'bg-[#101a38]/85 backdrop-blur-md border border-blue-900/40 text-white shadow-xs' 
              : 'bg-white/90 backdrop-blur-md border border-orange-100 text-slate-800 shadow-md shadow-orange-500/5'
          }`}>
            <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-orange-600 dark:text-orange-400">FLAT 50% OFF</span>
              <p className={`text-[11px] ${isDarkMode ? 'text-blue-200/80' : 'text-slate-600'}`}>
                Use coupon code <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>CRAVE50</strong>
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl flex items-center space-x-3.5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
            isDarkMode 
              ? 'bg-[#101a38]/85 backdrop-blur-md border border-blue-900/40 text-white shadow-xs' 
              : 'bg-white/90 backdrop-blur-md border border-orange-100 text-slate-800 shadow-md shadow-orange-500/5'
          }`}>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">Express Delivery</span>
              <p className={`text-[11px] ${isDarkMode ? 'text-blue-200/80' : 'text-slate-600'}`}>
                On-time guarantee or $5 cashback
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl flex items-center space-x-3.5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
            isDarkMode 
              ? 'bg-[#101a38]/85 backdrop-blur-md border border-blue-900/40 text-white shadow-xs' 
              : 'bg-white/90 backdrop-blur-md border border-orange-100 text-slate-800 shadow-md shadow-orange-500/5'
          }`}>
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">Zero Delivery Fee</span>
              <p className={`text-[11px] ${isDarkMode ? 'text-blue-200/80' : 'text-slate-600'}`}>
                Free delivery on orders above $20
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
