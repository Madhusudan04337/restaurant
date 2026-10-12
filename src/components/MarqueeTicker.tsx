import React from 'react';
import { Flame, Clock, Sparkles, Tag, Bike, Star, Utensils } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
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
    <div className="w-full bg-slate-950 text-white border-y border-amber-500/20 py-3.5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-8 items-center">
        {/* Double the list for infinite seamless marquee loop */}
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-slate-300">
              <Icon className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="whitespace-nowrap hover:text-orange-400 transition-colors">{item.text}</span>
              <span className="text-orange-500/50 ml-4 font-bold">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
