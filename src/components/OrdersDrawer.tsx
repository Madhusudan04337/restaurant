import React from 'react';
import { X, Clock, ArrowRight, CheckCircle2, Bike } from 'lucide-react';
import { Order } from '../types';
import { useTheme } from '../context/ThemeContext';

interface OrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export const OrdersDrawer: React.FC<OrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder
}) => {
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div className={`w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-l border-slate-800 text-white shadow-black/80' 
          : 'bg-white border-l border-slate-200 text-slate-900'
      }`}>
        
        <div className={`p-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <h2 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Your Orders ({orders.length})
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orders.length === 0 ? (
            <div className={`text-center py-16 px-6 rounded-2xl border space-y-4 my-auto ${
              isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-orange-50/50 border-orange-100'
            }`}>
              <div className="w-16 h-16 rounded-2xl bg-orange-600/15 text-orange-600 dark:text-orange-400 mx-auto flex items-center justify-center">
                <Bike className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  No active orders right now
                </h3>
                <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Explore our top-rated gourmet kitchens or 10-minute CraveMart essentials to place your first order.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-600/30 transition-all cursor-pointer active:scale-95"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const isDelivered = order.status === 'DELIVERED';
                return (
                  <div
                    key={order.id}
                    onClick={() => {
                      onSelectOrder(order);
                      onClose();
                    }}
                    className={`rounded-2xl p-4 border hover:border-orange-500 hover:shadow-md cursor-pointer transition-all space-y-3 ${
                      isDarkMode 
                        ? 'bg-slate-950 border-slate-800 text-white' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isDelivered 
                          ? isDarkMode ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/60' : 'bg-emerald-100 text-emerald-800'
                          : isDarkMode ? 'bg-orange-950/70 text-orange-400 border border-orange-800/60 animate-pulse' : 'bg-orange-100 text-orange-800 animate-pulse'
                      }`}>
                        {order.status === 'DELIVERED' ? 'Delivered' : `Live: ${order.status}`}
                      </span>
                      <span className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                        #{order.id}
                      </span>
                    </div>

                    <div>
                      <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {order.restaurantName}
                      </h4>
                      <p className={`text-xs truncate mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {order.items.map(i => `${i.quantity}x ${i.dish.name}`).join(', ')}
                      </p>
                    </div>

                    <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                      isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
                    }`}>
                      <div>
                        <span className={`text-[10px] block font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                          Total Paid
                        </span>
                        <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-sm">
                        <span>{isDelivered ? 'View Details' : 'Track Live'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
