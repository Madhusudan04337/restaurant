import React, { useState } from 'react';
import { Check, Clock, Flame, Sparkles, ShoppingBag, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { FEAST_OPTIONS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface FeastEstimatorProps {
  onAddFeastToCart: (items: typeof FEAST_OPTIONS) => void;
}

export const FeastEstimator: React.FC<FeastEstimatorProps> = ({ onAddFeastToCart }) => {
  const { isDarkMode } = useTheme();
  const [selectedIds, setSelectedIds] = useState<string[]>(['f-1', 'f-3', 'f-6']);
  const [partySize, setPartySize] = useState<'solo' | 'duo' | 'family' | 'party'>('duo');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const toggleItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedItems = FEAST_OPTIONS.filter(f => selectedIds.includes(f.id));
  
  const rawTotal = selectedItems.reduce((acc, i) => acc + i.price, 0);
  // 15% automatic party bundle discount
  const discount = selectedItems.length >= 3 ? rawTotal * 0.15 : 0;
  const estimatedTotal = rawTotal - discount;
  
  const maxPrepTime = selectedItems.length > 0 
    ? Math.max(...selectedItems.map(i => i.prepMins)) + 12 
    : 0;

  const totalCalories = selectedItems.reduce((acc, i) => acc + i.calories, 0);

  const handleAddAll = () => {
    if (selectedItems.length === 0) return;
    onAddFeastToCart(selectedItems);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <section 
      id="feast-estimator" 
      className={`py-8 sm:py-20 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#0d1633] text-white' 
          : 'bg-[#f7f4ed] text-slate-900'
      }`}
    >
      {/* Soft gradient edge fade masks so it melts seamlessly into the page without harsh cutoffs */}
      <div className={`absolute top-0 inset-x-0 h-10 pointer-events-none z-10 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#0b1329] to-transparent' 
          : 'bg-gradient-to-b from-[#faf8f5] to-transparent'
      }`} />
      <div className={`absolute bottom-0 inset-x-0 h-10 pointer-events-none z-10 ${
        isDarkMode 
          ? 'bg-gradient-to-t from-[#0b1329] to-transparent' 
          : 'bg-gradient-to-t from-[#faf8f5] to-transparent'
      }`} />

      {/* Radiant ambient glow orbs with gentle gradient transitions */}
      <div className={`absolute -top-12 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
        isDarkMode 
          ? 'bg-orange-500/10' 
          : 'bg-gradient-to-br from-orange-300/25 via-amber-200/20 to-transparent'
      }`} />
      <div className={`absolute -bottom-12 left-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
        isDarkMode 
          ? 'bg-amber-500/10' 
          : 'bg-gradient-to-tr from-amber-300/20 via-orange-200/15 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Header with warm typography and subtle pill badge */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-xs transition-colors backdrop-blur-xs border leading-none">
            <span className={isDarkMode ? 'text-orange-400 bg-orange-950/60 border-orange-800/60' : 'text-orange-700 bg-orange-100/90 border-orange-200'}>
              ✨ CUSTOMIZE & PLAN YOUR FEAST
            </span>
          </div>

          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Build Your Party Meal
          </h2>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Mix and match royal biryanis, artisan pizzas, sizzling tandoor grills, and desserts with live timing and instant bundle savings.
          </p>

          {/* Party Size Selector with modern fluid pill design */}
          <div className={`inline-flex items-center p-1 rounded-2xl border transition-colors mt-3 max-w-full overflow-x-auto scrollbar-none shadow-xs ${
            isDarkMode 
              ? 'bg-slate-950/90 border-slate-800' 
              : 'bg-white/95 border-orange-100 shadow-orange-500/5'
          }`}>
            {[
              { id: 'solo', label: 'Solo (1p)', icon: Users },
              { id: 'duo', label: 'Duo (2p)', icon: Users },
              { id: 'family', label: 'Family (4p)', icon: Users },
              { id: 'party', label: 'Party (8p+)', icon: Users }
            ].map((p) => {
              const active = partySize === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPartySize(p.id as any)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                    active 
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm shadow-orange-600/30' 
                      : isDarkMode 
                        ? 'text-slate-400 hover:text-white hover:bg-slate-900' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50/70'
                  }`}
                >
                  <p.icon className="w-3.5 h-3.5" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Layout: Dishes Selection Grid (Left) + Live Group Breakdown Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Grid of Feast Options */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className={`flex items-center justify-between pb-2.5 border-b ${
              isDarkMode ? 'border-slate-800' : 'border-orange-100'
            }`}>
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-700'
              }`}>
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Culinary Masterpieces ({selectedItems.length} selected)</span>
              </span>

              <button
                onClick={() => {
                  if (selectedIds.length === FEAST_OPTIONS.length) {
                    setSelectedIds([]);
                  } else {
                    setSelectedIds(FEAST_OPTIONS.map(f => f.id));
                  }
                }}
                className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
              >
                {selectedIds.length === FEAST_OPTIONS.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {FEAST_OPTIONS.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3.5 ${
                      isSelected
                        ? isDarkMode
                          ? 'bg-slate-950 border-orange-500 shadow-md shadow-orange-600/15 ring-1 ring-orange-500/30'
                          : 'bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 border-orange-500 shadow-md shadow-orange-500/10 ring-1 ring-orange-500/20'
                        : isDarkMode
                          ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 opacity-80'
                          : 'bg-white/85 border-slate-200/80 hover:border-orange-200/90 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center space-x-3 shrink-0">
                      {/* Smooth Checkbox Indicator */}
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                        isSelected 
                          ? 'bg-gradient-to-br from-orange-500 to-amber-600 border-orange-500 text-white shadow-xs' 
                          : isDarkMode 
                            ? 'border-slate-700 bg-slate-900' 
                            : 'border-slate-300 bg-slate-50'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <img 
                        src={item.image} 
                        alt={item.name} 
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 shadow-xs" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                          isDarkMode 
                            ? 'bg-orange-950/60 text-orange-400 border border-orange-900/40' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {item.category}
                        </span>
                        <span className={`text-xs sm:text-sm font-black ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <h4 className={`text-xs sm:text-sm font-bold line-clamp-1 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {item.name}
                      </h4>

                      <div className="flex items-center justify-between sm:justify-start sm:space-x-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400 pt-0.5">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-orange-500" />
                          <span>{item.prepMins}m</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Flame className="w-3 h-3 text-amber-500" />
                          <span>{item.calories} kcal</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Breakdown Card with smooth gradient transition */}
          <div className={`sticky top-24 rounded-2xl p-5 sm:p-6 border transition-all space-y-4 shadow-xl ${
            isDarkMode 
              ? 'bg-slate-950 border-slate-800 shadow-slate-950/60 text-white' 
              : 'bg-gradient-to-b from-white via-orange-50/20 to-white border-orange-200/70 shadow-orange-500/5 text-slate-900 backdrop-blur-md'
          }`}>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                FEAST BREAKDOWN
              </span>
              <h3 className={`text-lg font-black tracking-tight mt-0.5 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Party Summary
              </h3>
            </div>

            {/* Quick Metrics */}
            <div className={`space-y-2.5 pt-2 border-t text-xs ${
              isDarkMode ? 'border-slate-800 text-slate-300' : 'border-orange-100 text-slate-600'
            }`}>
              <div className="flex justify-between">
                <span>Selected Courses</span>
                <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedItems.length} dishes
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Hot Arrival</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{maxPrepTime} mins</span>
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Energy</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{totalCalories} kcal</span>
              </div>
            </div>

            {/* Selected Pills */}
            <div className={`space-y-2 pt-2 border-t ${
              isDarkMode ? 'border-slate-800' : 'border-orange-100'
            }`}>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Selected Dishes:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {selectedItems.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No dishes selected yet</span>
                ) : (
                  selectedItems.map((i) => (
                    <span
                      key={i.id}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1 border transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 text-slate-200' 
                          : 'bg-orange-50 border-orange-200 text-orange-900'
                      }`}
                    >
                      <Check className="w-3 h-3 text-orange-500" />
                      <span className="truncate max-w-[140px]">{i.name}</span>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Price Calculation */}
            <div className={`pt-3 border-t space-y-2 ${
              isDarkMode ? 'border-slate-800' : 'border-orange-100'
            }`}>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold">${rawTotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className={`p-2 rounded-xl flex justify-between text-xs font-bold border ${
                  isDarkMode 
                    ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}>
                  <span>Party Bundle Discount (15% OFF)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className={`pt-2 border-t flex items-baseline justify-between ${
                isDarkMode ? 'border-slate-800' : 'border-orange-100'
              }`}>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">
                    Estimated Total
                  </span>
                  <span className="text-[10px] text-slate-400">All taxes included</span>
                </div>
                <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                  ${estimatedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add to Cart Action */}
            <button
              onClick={handleAddAll}
              disabled={selectedItems.length === 0}
              className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-orange-600/25 flex items-center justify-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
            >
              {addedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Added {selectedItems.length} Dishes to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Feast to Cart (${estimatedTotal.toFixed(2)})</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-400 text-center font-medium">
              ⚡ Contactless 25-minute delivery • Real-time GPS tracking
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
