import React from 'react';
import { Flame, Clock, Sparkles, Tag, Bike, Star, Utensils } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const MarqueeTicker: React.FC = () => {
  const { isDarkMode } = useTheme();

  const items = [
    { text: '25-MIN LIGHTNING DELIVERY GUARANTEE', icon: Clock },
    { text: 'FLAT 50% OFF WITH CODE "CRAVE50"', icon: Tag },
    { text: 'HYDERABADI DUM BIRYANI • DUM-SEALED POTS', icon: Flame },
    { text: 'AUTHENTIC NAPOLI WOODFIRED CRUST PIZZAS', icon: Utensils },
    { text: 'SMASHED ANGUS WAGYU BURGERS & SHAKES', icon: Sparkles },
    { text: 'FRESH SASHIMI & BLUEFIN TUNA SUSHI', icon: Star },
    { text: 'ZERO DELIVERY FEE ON ORDERS OVER $20', icon: Bike },
    { text: '100% CONTACTLESS & HOT-SEALED PACKAGING', icon: Sparkles }
  ];

  return (
    <div className={`w-full border-y py-3.5 overflow-hidden select-none ${
      isDarkMode 
        ? 'bg-[#091024] text-white border-blue-900/40' 
        : 'bg-gradient-to-r from-orange-50 via-amber-50/60 to-orange-50 text-slate-800 border-orange-200/80 shadow-xs'
    }`}>
      <div className="flex w-max animate-marquee space-x-8 items-center">
        {/* Double the list for infinite seamless marquee loop */}
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`flex items-center space-x-2 text-xs font-black uppercase tracking-widest ${
              isDarkMode 
                ? 'text-slate-300 hover:text-orange-400' 
                : 'text-slate-700 hover:text-orange-600'
            }`}>
              <Icon className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="whitespace-nowrap">{item.text}</span>
              <span className="text-orange-500/50 ml-4 font-bold">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
