import React, { useState } from 'react';
import { Star, Clock, Heart, Filter, Flame, LayoutGrid, GalleryHorizontal } from 'lucide-react';
import { Restaurant } from '../types';
import { RESTAURANTS, FOOD_CATEGORIES } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface RestaurantListProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  onSelectRestaurant,
  selectedCategory,
  setSelectedCategory,
  searchQuery
}) => {
  const { isDarkMode } = useTheme();
  const [vegOnly, setVegOnly] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mobileLayout, setMobileLayout] = useState<'two-col' | 'peek'>('two-col');

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredRestaurants = RESTAURANTS.filter(r => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchCuisine = r.cuisine.some(c => c.toLowerCase().includes(q));
      const matchItem = r.menu.some(m => m.items.some(i => i.name.toLowerCase().includes(q)));
      if (!matchName && !matchCuisine && !matchItem) return false;
    }

    if (selectedCategory !== 'all') {
      const matchCat = r.cuisine.some(c => c.toLowerCase().includes(selectedCategory.toLowerCase()));
      if (!matchCat) return false;
    }

    if (vegOnly && !r.isPureVeg) return false;
    if (topRated && r.rating < 4.8) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Category Icons Carousel */}
      <div className="space-y-3">
        <h2 className={`text-lg sm:text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          What's on your mind?
        </h2>
        <div className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto pb-1 scroll-smooth">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center p-2.5 sm:p-3.5 rounded-2xl shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-105'
                  : isDarkMode
                    ? 'bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300'
                    : 'bg-white hover:bg-orange-50 border border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-0.5">{cat.icon}</span>
              <span className="text-[11px] sm:text-xs font-black whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1 1/2 Peek Horizontal Carousel for Top Picks on Mobile */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <h3 className={`text-sm sm:text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Featured & Top Rated (Swipe ➔)
            </h3>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden sm:inline">
            1 1/2 Peek View
          </span>
        </div>

        {/* 1.5 Peek Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 scroll-smooth">
          {RESTAURANTS.slice(0, 4).map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => onSelectRestaurant(restaurant)}
              className={`w-[76vw] sm:w-[320px] shrink-0 snap-start rounded-2xl sm:rounded-3xl overflow-hidden border shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                {restaurant.discount && (
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                    {restaurant.discount}
                  </div>
                )}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-bold">
                  <span className="truncate max-w-[170px]">{restaurant.name}</span>
                  <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-black">
                    ★ {restaurant.rating}
                  </span>
                </div>
              </div>

              <div className="p-3 sm:p-4 flex items-center justify-between text-[11px] font-bold">
                <span className="truncate max-w-[140px] text-slate-400">{restaurant.cuisine[0]} • {restaurant.cuisine[1] || ''}</span>
                <span className="text-orange-500 font-extrabold flex items-center space-x-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{restaurant.deliveryTime}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Chips Bar with Mobile View Switcher */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto py-1">
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center space-x-1 text-slate-500 font-bold text-xs uppercase tracking-wider shrink-0 pr-1">
            <Filter className="w-3.5 h-3.5 text-orange-500" />
            <span className="hidden sm:inline">Filters:</span>
          </div>

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shrink-0 ${
              vegOnly 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : isDarkMode
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Veg</span>
          </button>

          <button
            onClick={() => setTopRated(!topRated)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              topRated 
                ? 'bg-orange-600 text-white shadow-sm' 
                : isDarkMode
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            ⭐ 4.8+
          </button>

          {(vegOnly || topRated || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setVegOnly(false);
                setTopRated(false);
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-orange-500 hover:underline px-1 shrink-0"
            >
              Reset
            </button>
          )}
        </div>

        {/* Mobile Layout Switcher */}
        <div className={`flex items-center p-1 rounded-xl shrink-0 sm:hidden border ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setMobileLayout('two-col')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
              mobileLayout === 'two-col' 
                ? 'bg-orange-600 text-white shadow-xs' 
                : isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
            title="2-Column Grid"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="text-[10px]">2-Col</span>
          </button>

          <button
            onClick={() => setMobileLayout('peek')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
              mobileLayout === 'peek' 
                ? 'bg-orange-600 text-white shadow-xs' 
                : isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
            title="1 1/2 Peek Swipe"
          >
            <GalleryHorizontal className="w-3.5 h-3.5" />
            <span className="text-[10px]">1 ½ Peek</span>
          </button>
        </div>
      </div>

      {/* Restaurant Cards Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-base sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            All Restaurants ({filteredRestaurants.length})
          </h2>
          <span className="text-[11px] text-slate-500 font-bold hidden sm:inline">Tap any restaurant to view dishes</span>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className={`rounded-3xl p-12 text-center border space-y-3 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto text-xl">
              🔍
            </div>
            <h3 className="text-base font-bold">No restaurants found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any spots matching your filter criteria. Try resetting filters.
            </p>
          </div>
        ) : (
          <div
            className={
              mobileLayout === 'peek'
                ? 'flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible scroll-smooth'
                : 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8'
            }
          >
            {filteredRestaurants.map((restaurant) => {
              const isFav = favorites.includes(restaurant.id);
              return (
                <div
                  key={restaurant.id}
                  onClick={() => onSelectRestaurant(restaurant)}
                  className={`rounded-2xl sm:rounded-3xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1 ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-800 hover:border-orange-500/40 text-white' 
                      : 'bg-white border-slate-200 text-slate-900'
                  } ${mobileLayout === 'peek' ? 'w-[76vw] sm:w-auto shrink-0 snap-start' : 'w-full'}`}
                >
                  {/* Image Header */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                    {/* Discount badge */}
                    {restaurant.discount && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-slate-900/85 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg uppercase tracking-wider shadow-md truncate max-w-[80%]">
                        {restaurant.discount}
                      </div>
                    )}

                    {/* Favorite button */}
                    <button
                      onClick={(e) => toggleFav(restaurant.id, e)}
                      className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors ${
                        isFav ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* Rating pill on image bottom */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-bold">
                      <div className="flex items-center space-x-1 bg-emerald-600 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-black">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <span className="text-[10px] sm:text-xs bg-slate-900/80 px-1.5 py-0.5 rounded backdrop-blur-xs">
                        {restaurant.deliveryTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-1.5 sm:space-y-3">
                    <div>
                      <h3 className={`text-xs sm:text-base font-black group-hover:text-orange-500 transition-colors truncate ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {restaurant.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-400 truncate mt-0.5">
                        {restaurant.cuisine.join(', ')}
                      </p>
                    </div>

                    <div className={`flex items-center justify-between pt-1.5 sm:pt-3 border-t text-[10px] sm:text-xs ${
                      isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                    }`}>
                      <span className="truncate">{restaurant.costForTwo}</span>
                      <span className="text-orange-500 font-bold shrink-0">View Menu &rarr;</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
