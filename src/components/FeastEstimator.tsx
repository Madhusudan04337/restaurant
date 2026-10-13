import React, { useState } from 'react';
import { Check, Clock, Flame, Sparkles, ShoppingBag, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { FEAST_OPTIONS } from '../data/mockData';
import { CartItem } from '../types';

interface FeastEstimatorProps {
  onAddFeastToCart: (items: typeof FEAST_OPTIONS) => void;
}

export const FeastEstimator: React.FC<FeastEstimatorProps> = ({ onAddFeastToCart }) => {
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
    <section id="feast-estimator" className="py-8 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-400">
            CUSTOMIZE & PLAN YOUR FEAST
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Build Your Party Meal
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Select your desired combination of royal biryanis, artisan pizzas, sizzling tandoor grills, and Belgian desserts to see real-time preparation timing and instant group discounts.
          </p>

          {/* Party Size Selector */}
          <div className="inline-flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 mt-4">
            {[
              { id: 'solo', label: 'Solo (1p)', icon: Users },
              { id: 'duo', label: 'Date Night (2p)', icon: Users },
              { id: 'family', label: 'Family (4p)', icon: Users },
              { id: 'party', label: 'House Party (8p+)', icon: Users }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPartySize(p.id as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  partySize === p.id 
                    ? 'bg-orange-600 text-white shadow-xs font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-column layout (Left: Select dishes, Right: Live Breakdown Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Grid of Feast Options */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Culinary Masterpieces ({selectedItems.length} selected)</span>
              </span>

              <button
                onClick={() => setSelectedIds(FEAST_OPTIONS.map(f => f.id))}
                className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
              >
                Select All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {FEAST_OPTIONS.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all flex items-start space-x-4 ${
                      isSelected
                        ? 'bg-slate-950 border-orange-500 shadow-md shadow-orange-600/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-80'
                    }`}
                  >
                    <div className="flex items-center space-x-3 shrink-0">
                      {/* Custom Checkbox */}
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-orange-600 border-orange-600 text-white' : 'border-slate-600 bg-slate-900'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <img 
                        src={item.image} 
                        alt={item.name} 
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover shrink-0" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">{item.category}</span>
                        <span className="text-xs sm:text-sm font-bold text-white">${item.price.toFixed(2)}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <div className="flex items-center justify-between sm:justify-start sm:space-x-3 text-[10px] text-slate-400 font-medium">
                        <span className="flex items-center space-x-0.5">
                          <Clock className="w-3 h-3 text-orange-400" />
                          <span>{item.prepMins}m</span>
                        </span>
                        <span className="flex items-center space-x-0.5">
                          <Flame className="w-3 h-3 text-amber-400" />
                          <span>{item.calories} kcal</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Sticky Session Breakdown Card */}
          <div className="sticky top-24 bg-slate-950 rounded-xl sm:rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                FEAST BREAKDOWN
              </span>
              <h3 className="text-lg font-black text-white mt-0.5">Your Group Session</h3>
            </div>

            {/* Quick Metrics */}
            <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Selected Dishes</span>
                <span className="font-bold text-white">{selectedItems.length} courses</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Estimated Hot Arrival</span>
                <span className="font-bold text-emerald-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{maxPrepTime} mins</span>
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Total Energy</span>
                <span className="font-bold text-amber-400">{totalCalories} kcal</span>
              </div>
            </div>

            {/* Selected Pills */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400">Selected Items:</span>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {selectedItems.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">No dishes selected yet</span>
                ) : (
                  selectedItems.map((i) => (
                    <span
                      key={i.id}
                      className="bg-slate-900 border border-slate-800 text-slate-200 text-[10px] font-semibold px-2.5 py-1 rounded-md flex items-center space-x-1"
                    >
                      <Check className="w-3 h-3 text-orange-400" />
                      <span className="truncate max-w-[140px]">{i.name}</span>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Price Calculation */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span>${rawTotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                  <span>Group Feast Discount (15% OFF)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Total</span>
                  <span className="text-[10px] text-slate-500">Includes kitchen packaging & taxes</span>
                </div>
                <span className="text-2xl font-black text-orange-400">${estimatedTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Add to Cart Action */}
            <button
              onClick={handleAddAll}
              disabled={selectedItems.length === 0}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-orange-600/25 flex items-center justify-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
            >
              {addedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Added {selectedItems.length} Dishes to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Feast to Cart (${estimatedTotal.toFixed(2)})</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-500 text-center font-medium">
              ⚡ Contactless 25-minute delivery guarantee • Real-time GPS tracking
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
