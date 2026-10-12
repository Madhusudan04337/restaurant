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
  const [filterMode, setFilterMode] = useState<string>('all');
  const [sortMode, setSortMode] = useState<'recommended' | 'rating' | 'time'>('recommended');
  const [vegOnly, setVegOnly] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mobileLayout, setMobileLayout] = useState<'two-col' | 'peek'>('two-col');

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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      
      {/* Category Icons Carousel - EVEN SIZE FOR ALL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-base sm:text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            What's on your mind?
          </h2>
          <span className="text-[10px] sm:text-xs text-slate-400 font-bold hidden sm:inline">
            Scroll to explore cuisines
          </span>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-1 scroll-smooth">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-[84px] h-[84px] sm:w-[98px] sm:h-[98px] shrink-0 flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer text-center select-none ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-2 ring-orange-400 font-black'
                  : isDarkMode
                    ? 'bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300'
                    : 'bg-white hover:bg-orange-50 border border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1 shrink-0">{cat.icon}</span>
              <span className="text-[11px] sm:text-xs font-black text-center leading-tight truncate w-full px-1">
                {cat.name}
              </span>
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

      {/* MOBILE DROPDOWN FILTERS (sm:hidden) */}
      <div className="sm:hidden space-y-2.5 p-3 rounded-2xl border transition-all duration-200 shadow-xs" style={{
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
        borderColor: isDarkMode ? '#1e293b' : '#e2e8f0'
      }}>
        {/* Mobile Header with Layout Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-black">
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
            <span className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>
              Filter & Sort
            </span>
            {isFilterActive && (
              <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                Active
              </span>
            )}
          </div>

          {/* Mobile Layout Switcher: 2-Col vs 1 1/2 Peek */}
          <div className={`flex items-center p-0.5 rounded-lg border ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setMobileLayout('two-col')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center space-x-1 transition-all ${
                mobileLayout === 'two-col' 
                  ? 'bg-orange-600 text-white shadow-xs' 
                  : isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
              title="2-Column Grid"
            >
              <LayoutGrid className="w-3 h-3" />
              <span>2-Col</span>
            </button>
            <button
              onClick={() => setMobileLayout('peek')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center space-x-1 transition-all ${
                mobileLayout === 'peek' 
                  ? 'bg-orange-600 text-white shadow-xs' 
                  : isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
              title="1 1/2 Peek Swipe"
            >
              <GalleryHorizontal className="w-3 h-3" />
              <span>1 ½ Peek</span>
            </button>
          </div>
        </div>

        {/* Dual Responsive Mobile Dropdowns */}
        <div className="grid grid-cols-2 gap-2">
          {/* Dropdown 1: Filter By (Diet & Rating & Delivery) */}
          <div className="relative">
            <Filter className="w-3.5 h-3.5 text-orange-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <select
              value={filterMode}
              onChange={(e) => {
                const val = e.target.value;
                setFilterMode(val);
                if (val === 'veg') { setVegOnly(true); setTopRated(false); }
                else if (val === 'topRated') { setVegOnly(false); setTopRated(true); }
                else if (val === 'veg_top') { setVegOnly(true); setTopRated(true); }
                else if (val === 'all') { setVegOnly(false); setTopRated(false); }
              }}
              className={`w-full appearance-none pl-7 pr-6 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs outline-none ${
                filterMode !== 'all'
                  ? 'border-orange-500 text-orange-500 bg-orange-500/10 font-black ring-1 ring-orange-500/30'
                  : isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              <option value="all">⚡ Filter: All</option>
              <option value="veg">🌱 Pure Veg Only</option>
              <option value="topRated">⭐ Top Rated (4.8+)</option>
              <option value="fast">🚀 Fast (&lt; 25 mins)</option>
              <option value="offers">🏷️ Offers & Deals</option>
              <option value="veg_top">🌱⭐ Veg & Top Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Dropdown 2: Cuisine / Category */}
          <div className="relative">
            <Utensils className="w-3.5 h-3.5 text-orange-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full appearance-none pl-7 pr-6 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs outline-none ${
                selectedCategory !== 'all'
                  ? 'border-orange-500 text-orange-500 bg-orange-500/10 font-black ring-1 ring-orange-500/30'
                  : isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              <option value="all">🍽️ All Cuisines</option>
              {FOOD_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Dropdown 3 & Reset (Sort Bar) */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="relative flex-1">
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as any)}
              className={`w-full appearance-none pl-3 pr-6 py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer outline-none ${
                sortMode !== 'recommended'
                  ? 'border-orange-500/50 text-orange-500 bg-orange-500/5'
                  : isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <option value="recommended">↕️ Sort: Recommended</option>
              <option value="rating">★ Sort: Highest Rating</option>
              <option value="time">⏱️ Sort: Fastest Delivery</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {isFilterActive && (
            <button
              onClick={resetAllFilters}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-500 text-[11px] font-bold hover:bg-orange-500/20 transition-all shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* DESKTOP FILTER BAR (hidden sm:flex) */}
      <div className="hidden sm:flex items-center justify-between gap-3 py-1">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-slate-500 font-bold text-xs uppercase tracking-wider shrink-0 pr-1">
            <Filter className="w-3.5 h-3.5 text-orange-500" />
            <span>Filters:</span>
          </div>

          <button
            onClick={() => {
              const next = !vegOnly;
              setVegOnly(next);
              setFilterMode(next ? 'veg' : 'all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shrink-0 ${
              vegOnly 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : isDarkMode
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Pure Veg</span>
          </button>

          <button
            onClick={() => {
              const next = !topRated;
              setTopRated(next);
              setFilterMode(next ? 'topRated' : 'all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              topRated 
                ? 'bg-orange-600 text-white shadow-sm' 
                : isDarkMode
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            ⭐ 4.8+ Top Rated
          </button>

          <button
            onClick={() => {
              const next = filterMode === 'fast' ? 'all' : 'fast';
              setFilterMode(next);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1 ${
              filterMode === 'fast'
                ? 'bg-orange-600 text-white shadow-sm' 
                : isDarkMode
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3 h-3 text-orange-400" />
            <span>Fast Delivery (&lt; 25m)</span>
          </button>

          {isFilterActive && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-orange-500 hover:underline px-2 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}
        </div>

        {/* Desktop Sort Dropdown */}
        <div className="relative">
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as any)}
            className={`appearance-none pl-3 pr-7 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="recommended">Sort by: Recommended</option>
            <option value="rating">Sort by: Rating (High to Low)</option>
            <option value="time">Sort by: Delivery Time</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
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
            <button
              onClick={resetAllFilters}
              className="mt-2 px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-orange-700"
            >
              Reset Filters
            </button>
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
                  } ${mobileLayout === 'peek' ? 'w-[76vw] sm:w-auto shrink-0 snap-start' : 'w-full h-full'}`}
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
