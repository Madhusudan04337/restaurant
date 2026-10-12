import React, { useState } from 'react';
import { Star, Clock, Heart, Filter, Flame } from 'lucide-react';
import { Restaurant } from '../types';
import { RESTAURANTS, FOOD_CATEGORIES } from '../data/mockData';

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
  const [vegOnly, setVegOnly] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Category Icons Carousel */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          What's on your mind?
        </h2>
        <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-none">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center p-3.5 rounded-2xl shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-105'
                  : 'bg-white hover:bg-orange-50 border border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-3xl mb-1">{cat.icon}</span>
              <span className="text-xs font-black whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center space-x-3 overflow-x-auto py-1">
        <div className="flex items-center space-x-1.5 text-slate-500 font-bold text-xs uppercase tracking-wider shrink-0 pr-2">
          <Filter className="w-4 h-4 text-orange-600" />
          <span>Filters:</span>
        </div>

        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
            vegOnly ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Pure Veg</span>
        </button>

        <button
          onClick={() => setTopRated(!topRated)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            topRated ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          ⭐ Rating 4.8+
        </button>

        {(vegOnly || topRated || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setVegOnly(false);
              setTopRated(false);
              setSelectedCategory('all');
            }}
            className="text-xs font-bold text-orange-600 hover:underline px-2"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Restaurant Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Restaurants with online food delivery ({filteredRestaurants.length})
          </h2>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900">No restaurants found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any spots matching your filter criteria. Try resetting filters or search for another dish.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredRestaurants.map((restaurant) => {
              const isFav = favorites.includes(restaurant.id);
              return (
                <div
                  key={restaurant.id}
                  onClick={() => onSelectRestaurant(restaurant)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                    {/* Discount badge */}
                    {restaurant.discount && (
                      <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                        {restaurant.discount}
                      </div>
                    )}

                    {/* Favorite button */}
                    <button
                      onClick={(e) => toggleFav(restaurant.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isFav ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* Offer badge at bottom of image */}
                    {restaurant.offer && (
                      <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md">
                        <Flame className="w-3 h-3" />
                        <span>{restaurant.offer}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {restaurant.cuisine.join(', ')}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {restaurant.address}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-1 rounded-xl">
                        <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                        <span>{restaurant.rating}</span>
                        <span className="text-[10px] font-normal text-slate-500">({restaurant.ratingCount})</span>
                      </div>

                      <div className="flex items-center space-x-1 text-slate-600 font-bold">
                        <Clock className="w-3.5 h-3.5 text-orange-600" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>

                      <span className="text-slate-400 font-medium">{restaurant.costForTwo}</span>
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
