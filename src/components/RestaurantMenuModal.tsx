import React, { useState, useEffect } from 'react';
import { Star, Clock, X, Flame, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, Check, Sparkles, Utensils, ShieldCheck, HeartPulse, Info } from 'lucide-react';
import { Restaurant, MenuItem, CartItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface RestaurantMenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (dish: MenuItem, restaurant: Restaurant) => void;
  onRemoveFromCart: (dishId: string) => void;
  onOpenCart: () => void;
  initialDish?: MenuItem | null;
}

export const RestaurantMenuModal: React.FC<RestaurantMenuModalProps> = ({
  restaurant,
  onClose,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
  initialDish
}) => {
  const { isDarkMode } = useTheme();
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(
    restaurant ? restaurant.menu[0]?.name : ''
  );
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(initialDish || null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Extra Spicy'>('Medium');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  useEffect(() => {
    if (restaurant) {
      setActiveCategory(restaurant.menu[0]?.name || '');
      setSelectedDishDetail(initialDish || null);
      setDetailQuantity(1);
      setSelectedAddOnIds([]);
    }
  }, [restaurant, initialDish]);

  if (!restaurant) return null;

  const currentCategory = activeCategory || restaurant.menu[0]?.name;

  const getDishQty = (dishId: string) => {
    const item = cartItems.find(i => i.dish.id === dishId);
    return item ? item.quantity : 0;
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className={`rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto border transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-[#0c1630] border-blue-900/50 text-white shadow-blue-950/80' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Sticky Header with Back/Close button */}
        <div className={`sticky top-0 z-20 backdrop-blur-md px-6 py-4 sm:px-8 sm:py-5 border-b flex items-center justify-between transition-colors ${
          isDarkMode ? 'bg-[#0c1630]/95 border-blue-900/40 text-white' : 'bg-white/95 border-slate-100 text-slate-900'
        }`}>
          <button
            onClick={onClose}
            className={`flex items-center space-x-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
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
            className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Restaurant Banner & Details */}
        <div className={`p-6 sm:p-10 border-b transition-colors ${
          isDarkMode ? 'bg-[#091126] border-blue-900/40' : 'bg-slate-50 border-slate-100'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <span className="bg-orange-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-xs">
                  Top Rated Kitchen
                </span>
                {restaurant.discount && (
                  <span className="bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-xs">
                    {restaurant.discount}
                  </span>
                )}
              </div>

              <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {restaurant.name}
              </h2>
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {restaurant.cuisine.join(' • ')} • {restaurant.address}
              </p>
            </div>

            <div className={`flex items-center space-x-5 p-4 rounded-2xl border shadow-xs shrink-0 ${
              isDarkMode ? 'bg-[#0f1b3b] border-blue-900/40 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className="text-center px-1">
                <div className="flex items-center justify-center space-x-1 text-emerald-500 font-extrabold text-sm">
                  <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  <span>{restaurant.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{restaurant.ratingCount} reviews</span>
              </div>
              <div className={`w-px h-8 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <div className="text-center px-1">
                <div className={`flex items-center justify-center space-x-1 font-extrabold text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{restaurant.costForTwo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Navigation Tabs & Filters - Spacious & Airy */}
        <div className={`sticky top-[73px] z-10 px-6 sm:px-8 py-3.5 border-b flex items-center justify-between gap-6 overflow-x-auto transition-colors ${
          isDarkMode ? 'bg-[#0c1630]/95 border-blue-900/40' : 'bg-white/95 border-slate-100'
        }`}>
          <div className="flex items-center space-x-3 overflow-x-auto pb-1 scrollbar-none">
            {restaurant.menu.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  currentCategory === cat.name
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                      : 'bg-slate-100 hover:bg-orange-50 text-slate-700'
                }`}
              >
                {cat.name} <span className="opacity-75 font-normal ml-1">({cat.items.length})</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
              vegOnlyFilter 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                : isDarkMode 
                  ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
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

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:space-y-4">
                    {filteredItems.map((item) => {
                      const qty = getDishQty(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedDishDetail(item);
                            setDetailQuantity(qty > 0 ? qty : 1);
                            setSelectedAddOnIds([]);
                          }}
                          className={`p-3 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-5 group ${
                            isDarkMode 
                              ? 'bg-[#101b3b]/70 border-blue-900/40 hover:border-blue-700/60 text-white shadow-sm' 
                              : 'bg-white border-slate-200 hover:border-orange-300 shadow-sm'
                          }`}
                        >
                          {/* Top image on mobile, left on desktop */}
                          <div className="relative w-full h-28 sm:w-36 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';
                              }}
                            />
                            {item.isBestseller && (
                              <span className="absolute top-2 left-2 sm:hidden bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                                ★ Best
                              </span>
                            )}
                          </div>

                          {/* Item Info */}
                          <div className="space-y-1 sm:space-y-2.5 flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              <div className="hidden sm:flex items-center space-x-2">
                                <span className="w-4 h-4 rounded-xs border flex items-center justify-center p-0.5 bg-white shadow-xs border-slate-300 shrink-0">
                                  <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                                </span>
                                {item.isBestseller && (
                                  <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                                    <Flame className="w-3 h-3" />
                                    <span>Bestseller</span>
                                  </span>
                                )}
                              </div>

                              <h4 className={`text-xs sm:text-lg font-bold sm:font-black group-hover:text-orange-500 transition-colors line-clamp-2 sm:line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {item.name}
                              </h4>

                              <div className="flex items-center space-x-2 font-black text-xs sm:text-sm">
                                <span className="text-orange-600 dark:text-orange-400">${item.price.toFixed(2)}</span>
                                {item.rating && <span className="text-[10px] sm:text-xs text-slate-400 font-medium">★ {item.rating}</span>}
                              </div>

                              <p className={`hidden sm:block text-xs sm:text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                {item.description}
                              </p>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDishDetail(item);
                                setDetailQuantity(qty > 0 ? qty : 1);
                                setSelectedAddOnIds([]);
                              }}
                              className="hidden sm:flex text-xs font-bold text-orange-600 dark:text-orange-400 items-center space-x-1 hover:underline pt-1 cursor-pointer"
                            >
                              <span>View ingredients, nutrition & custom options</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Add button / Qty control */}
                          <div className="w-full shrink-0 pt-1 sm:pt-0 sm:w-36" onClick={(e) => e.stopPropagation()}>
                            {qty === 0 ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAddToCart(item, restaurant);
                                }}
                                className="w-full py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer"
                              >
                                ADD +
                              </button>
                            ) : (
                              <div className="flex items-center justify-between bg-orange-600 text-white px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl shadow-sm font-bold text-xs w-full">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveFromCart(item.id);
                                  }} 
                                  className="p-1 hover:bg-orange-700 rounded cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span>{qty}</span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart(item, restaurant);
                                  }} 
                                  className="p-1 hover:bg-orange-700 rounded cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
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
              <div className="p-2 bg-orange-600 text-white rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-orange-400">{totalCartCount} items in cart</p>
                <p className="text-sm font-black">${totalCartPrice.toFixed(2)} + taxes</p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-orange-600/30 flex items-center space-x-2 cursor-pointer"
            >
              <span>View Cart & Checkout</span>
              <span className="bg-orange-700 px-2 py-0.5 rounded-md">{totalCartCount}</span>
            </button>
          </div>
        )}

      </div>

      {/* Comprehensive Product Details Modal with Real Ingredients, Nutrition & Customizations */}
      {selectedDishDetail && (
        <div className="fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className={`w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border flex flex-col sm:flex-row my-auto h-[80vh] ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Big Dish Photo with Veg badge & Close */}
            <div className="relative w-full sm:w-1/2 h-64 sm:h-full overflow-hidden bg-slate-900 shrink-0">
              <img
                src={selectedDishDetail.image}
                alt={selectedDishDetail.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
                }}
              />
              {/* Soft gradient exclusively at bottom edge for text badge contrast */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
              
              <button
                onClick={() => setSelectedDishDetail(null)}
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 text-slate-800 hover:bg-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer z-10"
                title="Close"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 rounded-xs border flex items-center justify-center p-0.5 bg-white shadow-xs border-slate-300">
                    <span className={`w-2.5 h-2.5 rounded-full ${selectedDishDetail.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded">
                    {selectedDishDetail.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </div>

                {selectedDishDetail.isBestseller && (
                  <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded shadow-xs flex items-center space-x-1">
                    <Flame className="w-3 h-3 fill-slate-950" />
                    <span>Chef's Bestseller</span>
                  </span>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full sm:w-1/2 p-8 overflow-y-auto flex flex-col gap-8">
              
              {/* Product Header & Pricing */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h3 className={`text-3xl font-extrabold tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                    {selectedDishDetail.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedDishDetail.prepTime || '20-25 mins'}</span>
                    <span className="flex items-center gap-1"><Utensils className="w-4 h-4" /> {selectedDishDetail.portion || 'Serves 1-2'}</span>
                  </p>
                </div>
                <div className="text-3xl font-black text-orange-600">
                  ${selectedDishDetail.price.toFixed(2)}
                </div>
              </div>

              <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedDishDetail.description}
              </p>

              {/* Key Ingredients Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedDishDetail.ingredients || [
                    'Aged Basmati Rice', 'Tender Chicken', 'Desi Ghee', 'Caramelized Onions', 'Fresh Mint', 'Spices'
                  ]).map((ing) => (
                    <span key={ing} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-orange-50 text-orange-700'}`}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition & Macro Facts */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Cals', value: selectedDishDetail.nutrition?.calories || 780, color: 'text-amber-500' },
                  { label: 'Prot', value: selectedDishDetail.nutrition?.protein || '42g', color: 'text-emerald-500' },
                  { label: 'Carbs', value: selectedDishDetail.nutrition?.carbs || '86g', color: 'text-blue-500' },
                  { label: 'Fat', value: selectedDishDetail.nutrition?.fat || '28g', color: 'text-rose-500' }
                ].map((n) => (
                  <div key={n.label} className={`p-3 rounded-2xl border text-center ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{n.label}</span>
                    <span className={`text-sm font-black ${n.color}`}>{n.value}</span>
                  </div>
                ))}
              </div>

              {/* Spice Level Selection */}
              <div className="space-y-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Choose Spice Heat:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Mild', 'Medium', 'Extra Spicy'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpiceLevel(level)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        spiceLevel === level
                          ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                          : isDarkMode
                            ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Add-Ons & Extras */}
              {selectedDishDetail.addOns && selectedDishDetail.addOns.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Recommended Add-Ons & Extras:
                    </label>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedDishDetail.addOns.map((addOn) => {
                      const isChecked = selectedAddOnIds.includes(addOn.id);
                      return (
                        <div
                          key={addOn.id}
                          onClick={() => {
                            setSelectedAddOnIds(prev => 
                              prev.includes(addOn.id) ? prev.filter(id => id !== addOn.id) : [...prev, addOn.id]
                            );
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-orange-500/10 border-orange-500 text-orange-600 dark:text-orange-400 font-bold'
                              : isDarkMode
                                ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-orange-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked ? 'bg-orange-600 border-orange-600 text-white' : 'border-slate-400'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-semibold">{addOn.name}</span>
                          </div>
                          <span className="text-xs font-black">+${addOn.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity & Sticky Add to Order Action */}
              <div className={`pt-4 border-t flex items-center justify-between gap-4 ${
                isDarkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className={`flex items-center space-x-3 border px-3 py-1.5 rounded-xl shrink-0 ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button
                    onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                    className="p-1 rounded hover:bg-slate-800/20 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-black text-sm w-5 text-center">{detailQuantity}</span>
                  <button
                    onClick={() => setDetailQuantity(detailQuantity + 1)}
                    className="p-1 rounded hover:bg-slate-800/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {(() => {
                  const basePrice = selectedDishDetail.price;
                  const addOnsPrice = (selectedDishDetail.addOns || [])
                    .filter(a => selectedAddOnIds.includes(a.id))
                    .reduce((sum, a) => sum + a.price, 0);
                  const totalPrice = (basePrice + addOnsPrice) * detailQuantity;

                  return (
                    <button
                      onClick={() => {
                        const currentInCart = getDishQty(selectedDishDetail.id);
                        if (currentInCart === 0) {
                          for (let i = 0; i < detailQuantity; i++) {
                            onAddToCart(selectedDishDetail, restaurant);
                          }
                        } else if (detailQuantity > currentInCart) {
                          for (let i = 0; i < (detailQuantity - currentInCart); i++) {
                            onAddToCart(selectedDishDetail, restaurant);
                          }
                        } else if (detailQuantity < currentInCart) {
                          for (let i = 0; i < (currentInCart - detailQuantity); i++) {
                            onRemoveFromCart(selectedDishDetail.id);
                          }
                        }
                        setSelectedDishDetail(null);
                      }}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider shadow-md shadow-orange-600/30 flex items-center justify-between cursor-pointer transition-all active:scale-98"
                    >
                      <span>{getDishQty(selectedDishDetail.id) > 0 ? 'Update In Order' : 'Add To Order'}</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </button>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
