import React from 'react';
import { ShoppingBag, Sparkles, Bike, MapPin, Calendar, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, Order } from '../types';

interface FloatingDockProps {
  cartItems: CartItem[];
  orders: Order[];
  onOpenCart: () => void;
  onOpenFoodieAi: () => void;
  onOpenOrders: () => void;
  onOpenReservation: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  cartItems,
  orders,
  onOpenCart,
  onOpenFoodieAi,
  onOpenOrders,
  onOpenReservation
}) => {
  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED').length;

  return (
    <aside aria-label="Quick Actions" className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col space-y-3">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xl rounded-2xl p-2 flex flex-col items-center space-y-3">
        
        {/* Cart Quick Trigger with Live Badge */}
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="w-11 h-11 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/30 relative"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {totalCartCount}
              </span>
            )}
          </motion.button>
          
          {/* Tooltip on hover */}
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
            Cart ({totalCartCount} items • ${totalCartPrice.toFixed(2)})
          </div>
        </div>

        {/* Foodie AI Assistant */}
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenFoodieAi}
            className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30"
            title="Ask Foodie AI"
          >
            <Sparkles className="w-5 h-5" />
          </motion.button>
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
            AI Taste Concierge
          </div>
        </div>

        {/* Live Delivery Tracker */}
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenOrders}
            className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 flex items-center justify-center transition-colors relative"
            title="Live Order Tracking"
          >
            <Bike className="w-5 h-5" />
            {activeOrdersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {activeOrdersCount}
              </span>
            )}
          </motion.button>
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
            Live Delivery Track ({activeOrdersCount} active)
          </div>
        </div>

        {/* VIP Table Reservation */}
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenReservation}
            className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 flex items-center justify-center transition-colors"
            title="Book Restaurant Table"
          >
            <Calendar className="w-5 h-5" />
          </motion.button>
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
            Book Dine-in Table
          </div>
        </div>

        {/* Hotline */}
        <div className="relative group">
          <a
            href="tel:+15552345678"
            className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 flex items-center justify-center transition-colors"
            title="Call Support"
          >
            <Phone className="w-4 h-4" />
          </a>
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
            24/7 Foodie Hotline
          </div>
        </div>

      </div>
    </aside>
  );
};
