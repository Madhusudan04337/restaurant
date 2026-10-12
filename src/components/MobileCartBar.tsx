import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface MobileCartBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({ cartItems, onOpenCart }) => {
  const totalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 inset-x-3 sm:inset-x-auto sm:right-6 z-40">
      <div 
        onClick={onOpenCart}
        className="bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl border border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-all max-w-md mx-auto"
      >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center font-black text-white shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-black text-white">{totalCount} {totalCount === 1 ? 'ITEM' : 'ITEMS'}</span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-black text-orange-400">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate max-w-[170px]">
              {cartItems[0]?.restaurantName || 'Selected Restaurant'}
            </p>
          </div>
        </div>

        <button className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-transform active:scale-95">
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
