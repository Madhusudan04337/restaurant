import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, X, ChevronUp } from 'lucide-react';
import { CartItem } from '../types';

interface MobileCartBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({ cartItems, onOpenCart }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const totalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);

  if (totalCount === 0) return null;

  // Minimized floating bubble button (Takes minimal screen space, doesn't block content)
  if (isMinimized) {
    return (
      <div className="fixed bottom-[58px] right-3 z-40 sm:hidden">
        <button
          onClick={() => setIsMinimized(false)}
          className="relative flex items-center space-x-1.5 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-full shadow-xl border border-orange-400/40 active:scale-95 transition-all text-xs font-black animate-fade-in"
          title="Expand View Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>${totalPrice.toFixed(2)}</span>
          <span className="w-4 h-4 bg-white text-orange-600 rounded-full text-[10px] font-black flex items-center justify-center">
            {totalCount}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-orange-200 ml-0.5" />
        </button>
      </div>
    );
  }

  // Ultra-slim, low-profile compact sticky bar
  return (
    <div className="fixed bottom-[58px] sm:bottom-6 inset-x-2.5 sm:inset-x-auto sm:right-6 z-40">
      <div className="bg-slate-950/92 backdrop-blur-md text-white rounded-xl py-1.5 px-2.5 shadow-2xl border border-slate-800/90 flex items-center justify-between gap-2 max-w-md mx-auto transition-all">
        
        {/* Left: Cart Info (Click opens cart) */}
        <div 
          onClick={onOpenCart}
          className="flex items-center space-x-2 cursor-pointer flex-1 min-w-0"
        >
          <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center font-black text-white shrink-0 shadow-sm">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 leading-none">
              <span className="text-[11px] font-black text-white whitespace-nowrap">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
              <span className="text-slate-500 text-[10px]">•</span>
              <span className="text-[11px] font-black text-orange-400 whitespace-nowrap">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-[9px] text-slate-400 truncate mt-0.5 max-w-[130px]">
              {cartItems[0]?.restaurantName || 'Selected Restaurant'}
            </p>
          </div>
        </div>

        {/* Right: Slim Action Button & Minimize Toggle */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <button 
            onClick={onOpenCart}
            className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider shadow-sm transition-transform active:scale-95"
          >
            <span>View Cart</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </button>

          {/* Minimize button to hide bar and see content behind it */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Minimize cart bar to view content"
            aria-label="Minimize cart bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
