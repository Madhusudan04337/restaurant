import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Leaf, Flame, Timer, CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const CulinaryStorySection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: 'harvest',
      chapterNum: '01',
      title: 'The Dawn Harvest',
      subtitle: 'Regenerative Farm Sourcing',
      description: 'Every culinary masterpiece begins before sunrise. Our sourcing specialists partner exclusively with certified organic, regenerative local farms within 50 miles to harvest vine-ripened heirlooms, heritage grains, and farm-fresh dairy at their absolute peak of flavor.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000',
      icon: Leaf,
      highlight: '100% Organic & Locally Sourced'
    },
    {
      id: 'craft',
      chapterNum: '02',
      title: 'Artisanal Preparation',
      subtitle: 'Century-Old Techniques',
      description: 'In our master kitchens, tradition meets precision. Sourdough rests for 48 hours for delicate wild fermentation, spice blends are dry-roasted in small batches by generational masters, and hand-stretched pasta dough is crafted fresh for every single order.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000',
      icon: Sparkles,
      highlight: '48-Hour Slow Fermentation & Handcrafted'
    },
    {
      id: 'fire',
      chapterNum: '03',
      title: 'The High-Heat Crucible',
      subtitle: 'Oak-Wood & Clay Handi Perfection',
      description: 'Cooking is alchemy. Our Neapolitan pizzas blister in 900°F seasoned oakwood ovens in precisely 90 seconds. Royal biryanis seal in copper clay handis with wheat dough locks, infusing delicate Kashmiri saffron and aged basmati.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
      icon: Flame,
      highlight: '900°F Oakwood Fire & Ancient Clay Braising'
    },
    {
      id: 'delivery',
      chapterNum: '04',
      title: 'Lightning Thermal Arrival',
      subtitle: 'Zero-Loss Freshness Delivery',
      description: 'The journey concludes at your doorstep in record time. Our patented multi-layer thermal containment pods lock in moisture, steam, and crispness so your soufflé remains airy and your crust stays crackling hot.',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=1000',
      icon: Timer,
      highlight: '18-Minute Average Hot Delivery Guarantee'
    }
  ];

  const current = chapters[activeChapter];
  const IconComponent = current.icon;

  return (
    <section className={`py-12 sm:py-24 border-b overflow-hidden ${
      isDarkMode ? 'bg-[#0b1329] border-blue-900/40 text-white' : 'bg-[#faf8f5] border-stone-200/80 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
              THE CRAVEDROP CHRONICLE
            </span>
            <h2 className={`text-3xl sm:text-5xl font-serif font-bold italic tracking-tight mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              The Story of a Masterpiece
            </h2>
            <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Immerse yourself in our four-stage journey from regenerative soil to your dining table.
            </p>
          </motion.div>
        </div>

        {/* Chapter Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {chapters.map((ch, idx) => {
            const isActive = activeChapter === idx;
            const ChIcon = ch.icon;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center space-x-3 ${
                  isActive
                    ? isDarkMode 
                      ? 'bg-orange-600/20 border-orange-500 text-white shadow-lg' 
                      : 'bg-white border-orange-500 text-slate-900 shadow-md ring-2 ring-orange-500/20'
                    : isDarkMode 
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200' 
                      : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isActive ? 'bg-orange-600 text-white' : isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  {ch.chapterNum}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                    Chapter {ch.chapterNum}
                  </span>
                  <span className="text-xs sm:text-sm font-bold block truncate">
                    {ch.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Showcase Card */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl transition-all duration-300 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            
            {/* Story Image with Animated Fade */}
            <div className="lg:col-span-6 relative bg-slate-100 dark:bg-slate-800 min-h-[320px] lg:min-h-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Chapter {current.chapterNum}</span>
                <h3 className="text-xl font-black">{current.title}</h3>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-6 p-6 sm:p-12 flex flex-col justify-between space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-600/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                        {current.subtitle}
                      </span>
                      <h3 className={`text-2xl sm:text-4xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="sm:hidden">{current.description.split('. ')[0]}.</span>
                    <span className="hidden sm:inline">{current.description}</span>
                  </p>

                  <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
                    isDarkMode ? 'bg-slate-950/60 border-slate-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold">
                      {current.highlight}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress & Next Button */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  {chapters.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeChapter === idx 
                          ? 'w-10 bg-orange-600' 
                          : isDarkMode ? 'w-2 bg-slate-800' : 'w-2 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveChapter((prev) => (prev + 1) % chapters.length)}
                  className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                      : 'bg-slate-900 hover:bg-orange-600 text-white shadow-md'
                  }`}
                >
                  <span>Next Chapter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
