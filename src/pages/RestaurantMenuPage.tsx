import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Flame } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const RestaurantMenuPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId);
  const { isDarkMode } = useTheme();

  const [activeCategory, setActiveCategory] = useState<string>(restaurant ? restaurant.menu[0]?.name : '');
  const [vegOnly, setVegOnly] = useState(false);

  if (!restaurant) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#0c1630] text-white' : 'bg-white text-slate-900'}`}>
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-black">Restaurant not found</h1>
          <button onClick={() => navigate('/')} className="text-orange-600 font-bold hover:underline">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const currentCategory = activeCategory || restaurant.menu[0]?.name;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0b1329] text-white' : 'bg-[#faf8f5] text-slate-900'}`}>
      {/* Top Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-md px-6 py-4 border-b flex items-center justify-between ${
        isDarkMode ? 'bg-[#0b1329]/95 border-blue-900/40' : 'bg-white/95 border-slate-200'
      }`}>
        <button
          onClick={() => navigate('/')}
          className={`flex items-center space-x-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' 
              : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurants</span>
        </button>

        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
          Rasora Dining
        </span>
      </div>

      <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6">
        {/* Restaurant Header */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          isDarkMode ? 'bg-[#101b3b] border-blue-900/40 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-600 mb-1 block">
                Featured Kitchen
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                {restaurant.name}
              </h1>
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {restaurant.cuisine.join(' • ')} • {restaurant.address}
              </p>
            </div>

            <div className={`flex items-center space-x-4 p-3 rounded-2xl border ${
              isDarkMode ? 'bg-[#0a1128] border-blue-900/30' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="text-center px-2">
                <div className="flex items-center space-x-1 text-emerald-500 font-extrabold text-sm">
                  <Star className="w-4 h-4 fill-emerald-500" />
                  <span>{restaurant.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{restaurant.ratingCount}</span>
              </div>
              <div className="w-px h-7 bg-slate-300 dark:bg-slate-700" />
              <div className="text-center px-2">
                <div className="flex items-center space-x-1 font-extrabold text-sm text-orange-500">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{restaurant.costForTwo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Navigation & Veg Filter */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {restaurant.menu.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  currentCategory === cat.name
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'
                }`}
              >
                {cat.name} ({cat.items.length})
              </button>
            ))}
          </div>

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center space-x-2 ${
              vegOnly
                ? 'bg-emerald-600 text-white'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                  : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Veg Only</span>
          </button>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {restaurant.menu
            .filter(cat => cat.name === currentCategory)
            .map((cat) => {
              const items = cat.items.filter(item => (!vegOnly || item.isVeg));
              return (
                <div key={cat.name} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group ${
                          isDarkMode 
                            ? 'bg-[#101b3b]/80 border-blue-900/40 hover:border-orange-500/40 text-white' 
                            : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-md text-slate-900'
                        }`}
                      >
                        {/* Dish Image */}
                        <div className="relative w-full h-44 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 shadow-xs">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';
                            }}
                          />
                          <div className="absolute top-2.5 left-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs p-1 rounded-md shadow-xs border border-slate-200 dark:border-slate-700">
                            <span className={`block w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          </div>
                          {item.isBestseller && (
                            <span className="absolute top-2.5 right-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm flex items-center space-x-1">
                              <Flame className="w-3 h-3 fill-slate-950" />
                              <span>Bestseller</span>
                            </span>
                          )}
                        </div>

                        {/* Dish Details */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <h4 className={`text-base sm:text-lg font-bold tracking-tight ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {item.name}
                          </h4>

                          <div className="flex items-center space-x-3 text-sm">
                            <span className="font-extrabold text-orange-600 dark:text-orange-400 text-base">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.rating && (
                              <span className="flex items-center space-x-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                                <Star className="w-3 h-3 fill-amber-500" />
                                <span>{item.rating}</span>
                              </span>
                            )}
                            {item.portion && (
                              <span className="text-xs text-slate-400 font-medium">
                                • {item.portion}
                              </span>
                            )}
                          </div>

                          <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-600'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
