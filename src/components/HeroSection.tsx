import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, Clock, Tag, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  location: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectCategory: (catId: string) => void;
  onOpenFoodieAi: () => void;
}

const STORY_CHAPTERS = [
  {
    step: '01',
    phase: 'The Dawn Harvest',
    bg: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1920'
  },
  {
    step: '02',
    phase: 'Artisan Kitchen Craft',
    bg: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920'
  },
  {
    step: '03',
    phase: '900° Oak-Wood Crucible',
    bg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920'
  },
  {
    step: '04',
    phase: 'Lightning Thermal Arrival',
    bg: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=1920'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  location,
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  onOpenFoodieAi
}) => {
  const { isDarkMode } = useTheme();
  const [activeStory, setActiveStory] = useState(0);

  // Auto-advance story scene every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % STORY_CHAPTERS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const currentChapter = STORY_CHAPTERS[activeStory];

  const quickPills = [
    { label: 'Biryani', id: 'biryani' },
    { label: 'Pizza', id: 'pizza' },
    { label: 'Burgers', id: 'burgers' },
    { label: 'Sushi', id: 'sushi' },
    { label: 'Healthy', id: 'healthy' },
    { label: 'Desserts', id: 'desserts' }
  ];

  return (
    <section className={`relative w-full min-h-[54vh] sm:min-h-[64vh] lg:min-h-[78vh] flex items-end overflow-hidden ${
      isDarkMode 
        ? 'bg-[#0b1329] text-white' 
        : 'bg-[#faf8f5] text-slate-950'
    }`}>
      
      {/* Animated Storytelling Background (Seamless Cross-fade, Zero Fog) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentChapter.bg}
            src={currentChapter.bg}
            alt={currentChapter.phase}
            initial={{ opacity: 0.35, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </AnimatePresence>

        {/* Balanced Soft Fade Gradient - gentle vignette for comfortable text readability without obscuring food visuals */}
        {isDarkMode ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/55 to-[#0b1329]/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/75 via-[#0b1329]/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/60 to-[#faf8f5]/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/70 via-[#faf8f5]/35 to-transparent" />
          </>
        )}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-5 pt-8 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-36 flex flex-col justify-end space-y-3.5 sm:space-y-6">
        
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

        {/* Editorial Culinary Headline */}
        <div className="space-y-2 sm:space-y-3 max-w-3xl">
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-display font-normal leading-[1.12] tracking-tight ${
            isDarkMode 
              ? 'text-white drop-shadow-xl' 
              : 'text-[#26150c] drop-shadow-xs'
          }`}>
            Craving{' '}
            <span className={`italic ${
              isDarkMode
                ? 'bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent'
            }`}>
              Delicious Food
            </span>{' '}
            Delivered Hot &amp; Fast?
          </h1>

          <p className={`text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl ${
            isDarkMode 
              ? 'text-slate-100 drop-shadow-md' 
              : 'text-stone-700'
          }`}>
            Order from top-rated kitchens, authentic dum biryanis, artisan woodfired pizzas, and gourmet burgers in minutes.
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
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 active:scale-95 cursor-pointer ${
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
          <div className={`p-4 rounded-xl flex items-center space-x-3.5 shadow-xs ${
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

          <div className={`p-4 rounded-xl flex items-center space-x-3.5 shadow-xs ${
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

          <div className={`p-4 rounded-xl flex items-center space-x-3.5 shadow-xs ${
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
