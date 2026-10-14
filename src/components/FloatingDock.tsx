import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Bike, Calendar, Phone, Sun, Moon, ChevronRight, ChevronLeft, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED').length;

  if (isHidden) {
    return (
      <button
        onClick={() => setIsHidden(false)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center bg-orange-600 hover:bg-orange-700 text-white px-2.5 py-3 rounded-l-xl shadow-xl transition-all font-bold text-xs space-x-1"
        title="Show Quick Dock"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="[writing-mode:vertical-lr] rotate-180 tracking-wider">Quick Menu</span>
      </button>
    );
  }

  return (
    <aside aria-label="Quick Actions" className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end">
      <div className={`backdrop-blur-md border shadow-2xl rounded-2xl p-1.5 flex flex-col items-center space-y-1.5 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white shadow-black/50' 
          : 'bg-white/90 border-slate-200 text-slate-800 shadow-slate-900/15'
      }`}>
        
        {/* Collapse / Shrink & Hide Controls Header */}
        <div className="flex items-center justify-between w-full pb-1 mb-0.5 border-b border-slate-200/20 px-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[10px] font-bold text-slate-400 hover:text-orange-500 uppercase tracking-wider flex items-center space-x-0.5 px-0.5 py-0.5 rounded"
            title={isCollapsed ? 'Expand Dock' : 'Shrink Dock'}
          >
            <span>{isCollapsed ? 'Expand' : 'Shrink'}</span>
            <ChevronRight className={`w-3 h-3 transition-transform ${isCollapsed ? '' : 'rotate-90'}`} />
          </button>
          <button
            onClick={() => setIsHidden(true)}
            className="text-slate-400 hover:text-red-500 p-0.5 rounded transition-colors"
            title="Hide when not needed"
          >
            <EyeOff className="w-3 h-3" />
          </button>
        </div>

        {/* Dock Items (Shown when not collapsed) */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center space-y-2 overflow-hidden"
            >
              {/* Theme Toggle (Sun/Moon) */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDarkMode ? <Sun className="w-4 h-4 fill-amber-400" /> : <Moon className="w-4 h-4 fill-slate-700" />}
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
                  className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/30 relative"
                  title="View Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
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
                  className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30"
                  title="Ask Foodie AI"
                >
                  <Sparkles className="w-4 h-4" />
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
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors relative ${
                    isDarkMode 
                      ? 'bg-slate-800 text-slate-300 hover:text-orange-400' 
                      : 'bg-slate-100 text-slate-700 hover:text-orange-600'
                  }`}
                  title="Live Order Tracking"
                >
                  <Bike className="w-4 h-4" />
                  {activeOrdersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
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
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-800 text-slate-300 hover:text-orange-400' 
                      : 'bg-slate-100 text-slate-700 hover:text-orange-600'
                  }`}
                  title="Book Restaurant Table"
                >
                  <Calendar className="w-4 h-4" />
                </motion.button>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                  Book Dine-in Table
                </div>
              </div>

              {/* Hotline */}
              <div className="relative group">
                <a
                  href="tel:+15552345678"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-800 text-slate-300 hover:text-orange-400' 
                      : 'bg-slate-100 text-slate-700 hover:text-orange-600'
                  }`}
                  title="Call Support"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                  24/7 Foodie Hotline
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </aside>
  );
};
