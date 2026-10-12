import React, { useState } from 'react';
import { Star, Clock, X, Flame, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Restaurant, MenuItem, CartItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface RestaurantMenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (dish: MenuItem, restaurant: Restaurant) => void;
  onRemoveFromCart: (dishId: string) => void;
  onOpenCart: () => void;
}

export const RestaurantMenuModal: React.FC<RestaurantMenuModalProps> = ({
  restaurant,
  onClose,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart
}) => {
  const { isDarkMode } = useTheme();
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(
    restaurant ? restaurant.menu[0]?.name : ''
  );

  if (!restaurant) return null;

  const currentCategory = activeCategory || restaurant.menu[0]?.name;

  const getDishQty = (dishId: string) => {
    const item = cartItems.find(i => i.dish.id === dishId);
    return item ? item.quantity : 0;
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className={`rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto border transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-white shadow-black/60' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Sticky Header with Back/Close button */}
        <div className={`sticky top-0 z-20 backdrop-blur-md p-4 sm:p-5 border-b flex items-center justify-between transition-colors ${
          isDarkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-100 text-slate-900'
        }`}>
          <button
            onClick={onClose}
            className={`flex items-center space-x-1.5 text-xs font-black px-3.5 py-2 rounded-xl transition-all ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Restaurants</span>
          </button>

          <button 
            onClick={onClose} 
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Restaurant Banner & Details */}
        <div className={`p-6 sm:p-8 border-b transition-colors ${
          isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-100'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-lg">
                  Top Rated
                </span>
                {restaurant.discount && (
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-lg">
                    {restaurant.discount}
                  </span>
                )}
              </div>

              <h2 className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {restaurant.name}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {restaurant.cuisine.join(', ')} • {restaurant.address}
              </p>
            </div>

            <div className={`flex items-center space-x-4 p-3 rounded-2xl border shadow-xs shrink-0 ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-emerald-500 font-black text-xs">
                  <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                  <span>{restaurant.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400">{restaurant.ratingCount}</span>
              </div>
              <div className={`w-px h-6 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <div className="text-center">
                <div className={`flex items-center justify-center space-x-1 font-black text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <span className="text-[10px] text-slate-400">{restaurant.costForTwo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Navigation Tabs & Filters */}
        <div className={`sticky top-[73px] z-10 px-6 py-3 border-b flex items-center justify-between gap-4 overflow-x-auto transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {restaurant.menu.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  currentCategory === cat.name
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                      : 'bg-slate-100 hover:bg-orange-50 text-slate-700'
                }`}
              >
                {cat.name} ({cat.items.length})
              </button>
            ))}
          </div>

          <button
            onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shrink-0 ${
              vegOnlyFilter 
                ? 'bg-emerald-600 text-white' 
                : isDarkMode 
                  ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                  : 'bg-slate-100 text-slate-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Veg Only</span>
          </button>
        </div>

        {/* Menu Items List */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {restaurant.menu
            .filter(cat => cat.name === currentCategory)
            .map((cat) => {
              const filteredItems = cat.items.filter(item => {
                if (vegOnlyFilter && !item.isVeg) return false;
                return true;
              });

              return (
                <div key={cat.name} className="space-y-4">
                  <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {cat.name} ({filteredItems.length})
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4">
                    {filteredItems.map((item) => {
                      const qty = getDishQty(item.id);
                      return (
                        <div
                          key={item.id}
                          className={`rounded-2xl sm:rounded-3xl p-3 sm:p-4 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                            isDarkMode 
                              ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-white' 
                              : 'bg-white border-slate-200 text-slate-900'
                          }`}
                        >
                          <div className="space-y-2">
                            {/* Image with Veg badge */}
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 left-2 flex items-center space-x-1">
                                <span className="w-3.5 h-3.5 rounded-sm border flex items-center justify-center p-0.5 bg-white shadow-xs border-slate-300">
                                  <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                                </span>
                              </div>
                              {item.isBestseller && (
                                <span className="absolute bottom-2 left-2 bg-amber-500/95 backdrop-blur-xs text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs flex items-center space-x-0.5">
                                  <Flame className="w-2.5 h-2.5" />
                                  <span>Top Pick</span>
                                </span>
                              )}
                            </div>

                            <div>
                              <h4 className={`text-xs sm:text-sm font-black line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {item.name}
                              </h4>
                              <p className="text-xs font-black text-orange-600 dark:text-orange-400 mt-0.5">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>

                            <p className={`text-[10px] sm:text-xs line-clamp-2 leading-relaxed hidden sm:block ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              {item.description}
                            </p>
                          </div>

                          {/* Add to cart quantity button */}
                          <div className="pt-2 mt-auto">
                            {qty === 0 ? (
                              <button
                                onClick={() => onAddToCart(item, restaurant)}
                                className={`w-full py-1.5 rounded-xl text-[11px] font-black shadow-xs transition-all uppercase tracking-wider text-center ${
                                  isDarkMode
                                    ? 'bg-slate-800 hover:bg-orange-600 hover:text-white text-orange-400 border border-slate-700'
                                    : 'bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-600 border border-orange-200'
                                }`}
                              >
                                + ADD
                              </button>
                            ) : (
                              <div className="flex items-center justify-between bg-orange-600 text-white px-2 py-1 rounded-xl shadow-xs font-black text-xs">
                                <button onClick={() => onRemoveFromCart(item.id)} className="p-0.5 hover:bg-orange-700 rounded">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span>{qty}</span>
                                <button onClick={() => onAddToCart(item, restaurant)} className="p-0.5 hover:bg-orange-700 rounded">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Floating Cart Footer */}
        {totalCartCount > 0 && (
          <div className="sticky bottom-0 z-20 bg-slate-950 text-white p-4 border-t border-slate-800 flex items-center justify-between shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-orange-600 text-white rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-orange-400">{totalCartCount} items in cart</p>
                <p className="text-sm font-black">${totalCartPrice.toFixed(2)} + taxes</p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center space-x-2"
            >
              <span>View Cart & Checkout</span>
              <span className="bg-orange-700 px-2 py-0.5 rounded-lg">{totalCartCount}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
