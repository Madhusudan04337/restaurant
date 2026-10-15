import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Bike, Calendar, Phone, Sun, Moon, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, Order } from '../types';
import { useTheme } from '../context/ThemeContext';

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
  const { isDarkMode, toggleTheme } = useTheme();
  const [isHidden, setIsHidden] = useState(false);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED').length;

  if (isHidden) {
    return (
      <button
        onClick={() => setIsHidden(false)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center bg-orange-600 hover:bg-orange-700 text-white px-2.5 py-3 rounded-l-xl shadow-xl font-bold text-xs space-x-1 cursor-pointer"
        title="Show Quick Dock"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="[writing-mode:vertical-lr] rotate-180 tracking-wider">Quick Menu</span>
      </button>
    );
  }

  return (
    <aside aria-label="Quick Actions" className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end">
      <div className={`backdrop-blur-md border shadow-2xl rounded-2xl p-2.5 flex flex-col items-center space-y-2.5 ${
        isDarkMode 
          ? 'bg-[#0f1b3d]/90 border-blue-900/40 text-white shadow-2xl shadow-blue-950/60' 
          : 'bg-white/90 border-slate-200 text-slate-800 shadow-slate-900/15'
      }`}>
        
        {/* Hide Control Header with Centered ChevronRight */}
        <div className="flex items-center justify-center w-full pb-1.5 mb-0.5 border-b border-slate-200/20 px-0.5">
          <button
            onClick={() => setIsHidden(true)}
            className="text-slate-400 hover:text-orange-500 w-full flex items-center justify-center py-1 rounded-lg hover:bg-orange-500/10 cursor-pointer transition-colors"
            title="Hide Quick Menu"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dock Items with Generous Icon Padding */}
        <div className="flex flex-col items-center space-y-2.5">
          {/* Theme Toggle (Sun <-> Moon) */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer shadow-xs ${
                isDarkMode 
                  ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-50'
              }`}
              title={isDarkMode ? 'Switch to Sunlit Light Theme' : 'Switch to Midnight Dark Theme'}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 fill-amber-400" /> : <Moon className="w-4.5 h-4.5 fill-slate-700" />}
            </motion.button>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </div>
          </div>

          {/* Cart Quick Trigger with Live Badge */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/30 relative cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-950 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {totalCartCount}
                </span>
              )}
            </motion.button>
            
            <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
              Cart ({totalCartCount} items • ${totalCartPrice.toFixed(2)})
            </div>
          </div>

          {/* Foodie AI Assistant */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenFoodieAi}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 cursor-pointer"
              title="Ask Foodie AI"
            >
              <Sparkles className="w-4.5 h-4.5" />
            </motion.button>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
              AI Taste Concierge
            </div>
          </div>

          {/* Live Delivery Tracker */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenOrders}
              className={`w-10 h-10 rounded-xl flex items-center justify-center relative cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-300 hover:text-orange-400' 
                  : 'bg-slate-100 text-slate-700 hover:text-orange-600'
              }`}
              title="Live Order Tracking"
            >
              <Bike className="w-4.5 h-4.5" />
              {activeOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {activeOrdersCount}
                </span>
              )}
            </motion.button>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
              Live Delivery Track ({activeOrdersCount} active)
            </div>
          </div>

          {/* VIP Table Reservation */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenReservation}
              className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-300 hover:text-orange-400' 
                  : 'bg-slate-100 text-slate-700 hover:text-orange-600'
              }`}
              title="Book Restaurant Table"
            >
              <Calendar className="w-4.5 h-4.5" />
            </motion.button>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
              Book Dine-in Table
            </div>
          </div>

          {/* Hotline */}
          <div className="relative group">
            <a
              href="tel:+15552345678"
              className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-300 hover:text-orange-400' 
                  : 'bg-slate-100 text-slate-700 hover:text-orange-600'
              }`}
              title="Call Support"
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
              24/7 Foodie Hotline
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};
