import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  Heart, 
  Filter, 
  Flame, 
  LayoutGrid, 
  GalleryHorizontal, 
  ChevronDown, 
  SlidersHorizontal, 
  RotateCcw, 
  Utensils, 
  Sparkles 
} from 'lucide-react';
import { Restaurant, MenuItem } from '../types';
import { RESTAURANTS, FOOD_CATEGORIES } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface RestaurantListProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onSelectDish?: (dish: MenuItem, restaurant: Restaurant) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  onSelectRestaurant,
  onSelectDish,
  selectedCategory,
  setSelectedCategory,
  searchQuery
}) => {
  const { isDarkMode } = useTheme();
  const [filterMode, setFilterMode] = useState<string>('all');
  const [sortMode, setSortMode] = useState<'recommended' | 'rating' | 'time'>('recommended');
  const [vegOnly, setVegOnly] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mobileLayout, setMobileLayout] = useState<'full' | 'two-col' | 'peek'>('full');

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const isFilterActive = 
    filterMode !== 'all' || 
    vegOnly || 
    topRated || 
    selectedCategory !== 'all' || 
    sortMode !== 'recommended';

  const resetAllFilters = () => {
    setFilterMode('all');
    setVegOnly(false);
    setTopRated(false);
    setSelectedCategory('all');
    setSortMode('recommended');
  };

  const filteredRestaurants = RESTAURANTS.filter(r => {
    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchCuisine = r.cuisine.some(c => c.toLowerCase().includes(q));
      const matchItem = r.menu.some(m => m.items.some(i => i.name.toLowerCase().includes(q)));
      if (!matchName && !matchCuisine && !matchItem) return false;
    }

    // Cuisine / Category filter
    if (selectedCategory !== 'all') {
      const matchCat = r.cuisine.some(c => c.toLowerCase().includes(selectedCategory.toLowerCase()));
      if (!matchCat) return false;
    }

    // Mobile dropdown filter modes
    if (filterMode === 'veg' && !r.isPureVeg) return false;
    if (filterMode === 'topRated' && r.rating < 4.8) return false;
    if (filterMode === 'fast') {
      const mins = parseInt(r.deliveryTime);
      if (mins > 25) return false;
    }
    if (filterMode === 'offers' && !r.discount) return false;
    if (filterMode === 'veg_top' && (!r.isPureVeg || r.rating < 4.8)) return false;

    // Desktop individual toggles if filterMode is default 'all'
    if (filterMode === 'all') {
      if (vegOnly && !r.isPureVeg) return false;
      if (topRated && r.rating < 4.8) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortMode === 'rating') return b.rating - a.rating;
    if (sortMode === 'time') {
      const aTime = parseInt(a.deliveryTime);
      const bTime = parseInt(b.deliveryTime);
      return aTime - bTime;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-20 space-y-6 sm:space-y-16">
      
      {/* Category Icons Carousel */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              What's on your mind?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore authentic cuisines, royal delicacies & daily cravings
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Scroll to explore &rarr;
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto pt-1 pb-3 scroll-smooth px-1 scrollbar-none">
          {FOOD_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-24 sm:w-28 py-3.5 px-2.5 shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all cursor-pointer text-center select-none group ${
                  isSelected
                    ? 'border-orange-500 bg-orange-600 text-white shadow-md shadow-orange-600/20 font-bold ring-2 ring-orange-500/30'
                    : isDarkMode
                      ? 'border-slate-800 bg-slate-900/90 hover:border-slate-700 text-slate-300 hover:text-white'
                      : 'border-slate-200 bg-white hover:border-orange-300 text-slate-700 hover:text-orange-600 shadow-xs'
                }`}
              >
                <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 shrink-0 border-2 transition-transform duration-300 group-hover:scale-105 ${
                  isSelected ? 'border-white shadow-xs' : isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-orange-100 bg-orange-50'
                }`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xl pointer-events-none -z-10">
                    {cat.icon}
                  </div>
                </div>
                <span className="text-xs font-bold text-center leading-tight truncate w-full px-1">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured & Top Rated Carousel (Shown when unfiltered to give curated highlights) */}
      {selectedCategory === 'all' && !searchQuery.trim() && filterMode === 'all' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Featured & Top Rated Kitchens
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Curated Culinary Picks
            </span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-6 pb-2 scroll-smooth">
            {RESTAURANTS.slice(0, 4).map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => onSelectRestaurant(restaurant)}
                className={`w-[80vw] sm:w-[320px] shrink-0 snap-start rounded-xl overflow-hidden border shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-white' 
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  {restaurant.discount && (
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {restaurant.discount}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                    <span className="truncate max-w-[180px] text-sm">{restaurant.name}</span>
                    <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-md font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-white" />
                      <span>{restaurant.rating}</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                  <span className="truncate max-w-[150px]">{restaurant.cuisine.slice(0, 2).join(' · ')}</span>
                  <span className="text-orange-500 font-bold flex items-center space-x-1 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{restaurant.deliveryTime}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modern, Clean & Unified Filter and Sort Bar */}
      <div className={`p-3 sm:p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3.5 transition-colors ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
      }`}>
        {/* Left Segmented Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center space-x-1 text-slate-400 font-bold text-xs uppercase tracking-wider shrink-0 pr-1 hidden lg:flex">
            <Filter className="w-3.5 h-3.5 text-orange-500" />
            <span>Filter:</span>
          </div>

          <button
            onClick={() => {
              setFilterMode('all');
              setVegOnly(false);
              setTopRated(false);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'all' && !vegOnly && !topRated
                ? 'bg-orange-600 text-white shadow-xs font-bold'
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All
          </button>

          <button
            onClick={() => {
              const next = !vegOnly;
              setVegOnly(next);
              setFilterMode(next ? 'veg' : 'all');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
              vegOnly
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800 border border-slate-700/60' : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Pure Veg</span>
          </button>

          <button
            onClick={() => {
              const next = !topRated;
              setTopRated(next);
              setFilterMode(next ? 'topRated' : 'all');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              topRated
                ? 'bg-orange-600 text-white shadow-xs font-bold'
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800 border border-slate-700/60' : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>4.8+ Top Rated</span>
          </button>

          <button
            onClick={() => {
              const next = filterMode === 'fast' ? 'all' : 'fast';
              setFilterMode(next);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              filterMode === 'fast'
                ? 'bg-orange-600 text-white shadow-xs font-bold'
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800 border border-slate-700/60' : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Clock className="w-3 h-3 text-orange-400" />
            <span>Fast Delivery (&lt;25m)</span>
          </button>

          <button
            onClick={() => {
              const next = filterMode === 'offers' ? 'all' : 'offers';
              setFilterMode(next);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'offers'
                ? 'bg-orange-600 text-white shadow-xs font-bold'
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800 border border-slate-700/60' : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Offers & Deals
          </button>

          {isFilterActive && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-semibold text-orange-500 hover:text-orange-600 px-2 flex items-center space-x-1 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right Sort Control */}
        <div className="flex items-center space-x-3 shrink-0 self-end md:self-auto">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Sort by:</span>
          <div className="relative">
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as any)}
              className={`appearance-none pl-3 pr-8 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer outline-none ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rating</option>
              <option value="time">Fastest Delivery</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Restaurant Cards Container */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              All Restaurants ({filteredRestaurants.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Order directly from top-rated kitchens in your area
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Tap any restaurant to browse full menu
          </span>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className={`rounded-xl p-12 text-center border space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950/60 text-orange-600 rounded-full flex items-center justify-center mx-auto text-xl">
              🔍
            </div>
            <h3 className="text-base font-bold">No restaurants found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any spots matching your filter criteria. Try resetting filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-2 px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-lg shadow-xs hover:bg-orange-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-10">
            {filteredRestaurants.map((restaurant) => {
              const isFav = favorites.includes(restaurant.id);
              return (
                <div
                  key={restaurant.id}
                  onClick={() => onSelectRestaurant(restaurant)}
                  className={`rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1 ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-white' 
                      : 'bg-white border-slate-200/90 text-slate-900 hover:border-orange-200 shadow-xs'
                  }`}
                >
                  {/* Image Header with proportional height */}
                  <div className="relative w-full h-32 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>

                    {/* Discount badge */}
                    {restaurant.discount && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-slate-900/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm truncate max-w-[80%]">
                        {restaurant.discount}
                      </div>
                    )}

                    {/* Favorite button */}
                    <button
                      onClick={(e) => toggleFav(restaurant.id, e)}
                      className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        isFav ? 'bg-rose-500 text-white' : 'bg-white/85 text-slate-700 hover:bg-white shadow-sm'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* Rating pill on image bottom */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-white text-[10px] sm:text-xs font-bold">
                      <div className="flex items-center space-x-1 bg-emerald-600 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold shadow-sm">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <span className="text-[10px] sm:text-xs bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
                        {restaurant.deliveryTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Content with spacious, natural padding and hierarchy */}
                  <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                    <div className="space-y-1">
                      <h3 className={`font-extrabold text-xs sm:text-lg group-hover:text-orange-500 transition-colors line-clamp-1 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {restaurant.name}
                      </h3>
                      <p className="hidden sm:block text-xs text-slate-500 line-clamp-1">
                        {restaurant.cuisine.join(' · ')} · {restaurant.address}
                      </p>

                      {/* Must-try preview tags to directly open food detail modal */}
                      <div className="hidden sm:flex flex-wrap gap-1.5 pt-2">
                        {restaurant.menu[0]?.items.slice(0, 3).map((dish) => (
                          <button
                            key={dish.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectDish) {
                                onSelectDish(dish, restaurant);
                              } else {
                                onSelectRestaurant(restaurant);
                              }
                            }}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border truncate max-w-[190px] sm:max-w-none transition-colors cursor-pointer hover:border-orange-500 hover:text-orange-500 ${
                              isDarkMode 
                                ? 'bg-slate-950/80 border-slate-800 text-orange-400' 
                                : 'bg-orange-50/70 border-orange-200/80 text-orange-700'
                            }`}
                            title={`Tap for details & photo: ${dish.name}`}
                          >
                            {dish.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={`flex items-center justify-between pt-2 sm:pt-3 border-t text-[10px] sm:text-xs shrink-0 ${
                      isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                    }`}>
                      <span className="font-semibold">{restaurant.costForTwo}</span>
                      <span className="text-orange-600 dark:text-orange-400 font-bold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                        <span className="hidden sm:inline">View Full Menu</span>
                        <span className="sm:hidden">Menu</span>
                        <span>&rarr;</span>
                      </span>
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
