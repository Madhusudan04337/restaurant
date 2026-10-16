import React, { useState, useMemo } from 'react';
import { 
  Star, 
  Clock, 
  Heart, 
  Flame, 
  Utensils, 
  Plus, 
  Check, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  RotateCcw,
  Tag
} from 'lucide-react';
import { Restaurant, MenuItem } from '../types';
import { RESTAURANTS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface RestaurantListProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onSelectDish?: (dish: MenuItem, restaurant: Restaurant) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  onAddToCart?: (dish: MenuItem, restaurantId?: string, restaurantName?: string) => void;
  likedDishIds?: string[];
  onToggleLike?: (dishId: string) => void;
}

interface TopicSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  categoryTag?: string;
  items: {
    dish: MenuItem;
    restaurant: Restaurant;
  }[];
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  onSelectRestaurant,
  onSelectDish,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onAddToCart,
  likedDishIds,
  onToggleLike
}) => {
  const { isDarkMode } = useTheme();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addedDishIds, setAddedDishIds] = useState<string[]>([]);

  const activeLikedIds = likedDishIds || favorites;

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleLike) {
      onToggleLike(id);
    } else {
      setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    }
  };

  const handleQuickAdd = (dish: MenuItem, restaurant: Restaurant, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(dish, restaurant.id, restaurant.name);
      setAddedDishIds(prev => [...prev, dish.id]);
      setTimeout(() => {
        setAddedDishIds(prev => prev.filter(id => id !== dish.id));
      }, 1500);
    } else if (onSelectDish) {
      onSelectDish(dish, restaurant);
    } else {
      onSelectRestaurant(restaurant);
    }
  };

  // Helper to extract dishes by cuisine or keywords from the RESTAURANTS database
  const getDishesByKeyword = (keywords: string[]) => {
    const list: { dish: MenuItem; restaurant: Restaurant }[] = [];
    RESTAURANTS.forEach(r => {
      r.menu.forEach(cat => {
        cat.items.forEach(item => {
          const matched = keywords.some(k => 
            item.name.toLowerCase().includes(k) || 
            item.category.toLowerCase().includes(k) ||
            r.cuisine.some(c => c.toLowerCase().includes(k))
          );
          if (matched) {
            list.push({ dish: item, restaurant: r });
          }
        });
      });
    });
    return list;
  };

  // Topic sections configured according to the user request:
  // Topic -> Product Horizontal Scrolling -> Topic -> Product Horizontal Scrolling -> Topic -> Product Horizontal Scrolling
  const topicSections: TopicSection[] = useMemo(() => [
    {
      id: 'biryani',
      title: 'Royal Dum Biryanis & Tandoori Grills',
      subtitle: 'Slow-cooked in sealed clay handis with pure saffron, aged basmati & desi ghee',
      icon: '🍗',
      categoryTag: 'biryani',
      items: getDishesByKeyword(['biryani', 'kebab', 'tikka', 'tandoori'])
    },
    {
      id: 'pizza',
      title: 'Woodfired Neapolitan Pizzas & Pastas',
      subtitle: '48-hour slow fermented dough baked in 900°F oakwood fire ovens',
      icon: '🍕',
      categoryTag: 'pizza',
      items: getDishesByKeyword(['pizza', 'margherita', 'pasta', 'fettuccine', 'flatbread', 'carbonara'])
    },
    {
      id: 'burgers',
      title: 'Smashed Gourmet Burgers & Loaded Fries',
      subtitle: 'Hand-pressed patties on toasted brioche with Périgord truffle mayo & aged cheddar',
      icon: '🍔',
      categoryTag: 'burgers',
      items: getDishesByKeyword(['burger', 'smash', 'fries', 'truffle royale', 'sando'])
    },
    {
      id: 'sushi',
      title: 'Japanese Kaiseki, Dragon Rolls & Ramen',
      subtitle: 'Freshly rolled sushi with wild Pacific catch & slow-simmered rich broths',
      icon: '🍣',
      categoryTag: 'sushi',
      items: getDishesByKeyword(['sushi', 'roll', 'ramen', 'sashimi', 'tonkotsu'])
    },
    {
      id: 'healthy',
      title: 'Pure Veg & Plant Superfood Bowls',
      subtitle: '100% vegetarian goodness, farm-to-table organic grains & paneer delicacies',
      icon: '🥗',
      categoryTag: 'healthy',
      items: getDishesByKeyword(['paneer', 'quinoa', 'salad', 'bowl', 'avocado', 'hummus'])
    },
    {
      id: 'desserts',
      title: 'French Patisseries, Artisanal Gelatos & Sweets',
      subtitle: 'Handcrafted desserts, lava soufflés & small-batch Italian gelatos',
      icon: '🍰',
      categoryTag: 'desserts',
      items: getDishesByKeyword(['dessert', 'gelato', 'tiramisu', 'soufflé', 'gulab jamun', 'macaron'])
    }
  ], []);

  // Filter topics based on active search or selectedCategory
  const visibleTopics = useMemo(() => {
    return topicSections.filter(section => {
      // If user selected a specific craving category (e.g. 'biryani', 'pizza')
      if (selectedCategory !== 'all' && section.categoryTag !== selectedCategory) {
        return false;
      }

      // If user typed a search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSection = section.title.toLowerCase().includes(q) || section.subtitle.toLowerCase().includes(q);
        const hasMatchingItems = section.items.some(i => 
          i.dish.name.toLowerCase().includes(q) || 
          i.restaurant.name.toLowerCase().includes(q)
        );
        return matchesSection || hasMatchingItems;
      }

      return section.items.length > 0;
    });
  }, [topicSections, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-12 space-y-8 sm:space-y-12">
      
      {/* Category reset indicator if filtered */}
      {(selectedCategory !== 'all' || searchQuery.trim()) && (
        <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-orange-50/70 border-orange-200 text-slate-900'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="text-orange-500 font-black">Filtered by:</span>
            <span className="bg-orange-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md uppercase">
              {searchQuery ? `Search: "${searchQuery}"` : selectedCategory}
            </span>
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            className="flex items-center space-x-1 text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Show All Topics</span>
          </button>
        </div>
      )}

      {/* TOPIC 0: TOP RATED RESTAURANTS IN DOWNTOWN (Horizontal Scrolling) */}
      {selectedCategory === 'all' && !searchQuery.trim() && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">🌟</span>
                <h3 className={`text-lg sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Top Rated Kitchens in Downtown
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Curated 4.8+ star kitchens with fast doorstep delivery
              </p>
            </div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 hidden sm:inline">
              Swipe to explore &rarr;
            </span>
          </div>

          {/* Horizontal Scrolling Restaurant Cards Track */}
          <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 scroll-smooth scrollbar-none px-0.5">
            {RESTAURANTS.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => onSelectRestaurant(restaurant)}
                className={`w-[78vw] sm:w-[320px] shrink-0 snap-start rounded-2xl overflow-hidden border transition-all cursor-pointer group shadow-xs hover:shadow-lg ${
                  isDarkMode 
                    ? 'bg-[#101b3b] border-blue-900/40 hover:border-blue-700/60 text-white' 
                    : 'bg-white border-slate-200/90 hover:border-orange-200 text-slate-900'
                }`}
              >
                {/* Image */}
                <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {restaurant.discount && (
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/90 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                      {restaurant.discount}
                    </div>
                  )}

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-bold">
                    <span className="truncate max-w-[170px] text-xs sm:text-sm drop-shadow">{restaurant.name}</span>
                    <span className="bg-emerald-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-xs">
                      <Star className="w-3 h-3 fill-white" />
                      <span>{restaurant.rating}</span>
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="truncate max-w-[150px]">{restaurant.cuisine.slice(0, 2).join(' · ')}</span>
                  <span className="text-orange-600 dark:text-orange-400 font-bold flex items-center space-x-1 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{restaurant.deliveryTime}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TOPIC-BY-TOPIC HORIZONTAL SCROLLING LAYOUT */}
      {visibleTopics.map((topic) => {
        // Filter items within topic if searching
        const itemsToDisplay = searchQuery.trim()
          ? topic.items.filter(i => 
              i.dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              i.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : topic.items;

        if (itemsToDisplay.length === 0) return null;

        return (
          <section key={topic.id} className="space-y-3 pt-1">
            
            {/* Topic Header: Title + Subtitle */}
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl">{topic.icon}</span>
                  <h3 className={`text-base sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {topic.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 line-clamp-1">
                  {topic.subtitle}
                </p>
              </div>

              <div className="shrink-0 flex items-center space-x-1 text-xs text-orange-600 dark:text-orange-400 font-bold">
                <span className="hidden xs:inline">Swipe</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Product Horizontal Scrolling Track */}
            <div className="flex gap-3.5 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 scroll-smooth scrollbar-none px-0.5">
              {itemsToDisplay.map(({ dish, restaurant }) => {
                const isFav = activeLikedIds.includes(dish.id);
                const isJustAdded = addedDishIds.includes(dish.id);

                return (
                  <div
                    key={`${topic.id}-${dish.id}`}
                    onClick={() => {
                      if (onSelectDish) {
                        onSelectDish(dish, restaurant);
                      } else {
                        onSelectRestaurant(restaurant);
                      }
                    }}
                    className={`w-[220px] sm:w-[280px] shrink-0 snap-start rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-lg ${
                      isDarkMode 
                        ? 'bg-[#101b3b] border-blue-900/40 hover:border-blue-700/60 text-white' 
                        : 'bg-white border-slate-200/90 hover:border-orange-200 text-slate-900'
                    }`}
                  >
                    {/* Dish Image Box with Veg Tag & Favorite Heart */}
                    <div className="relative w-full h-32 sm:h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2.5 shrink-0">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400';
                        }}
                      />
                      
                      {/* Veg / Non-Veg Indicator */}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs p-1 rounded-sm shadow-xs border border-slate-200">
                        <span className={`block w-2.5 h-2.5 rounded-full ${dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                      </div>

                      {/* Favorite / Like Heart Button */}
                      <button
                        onClick={(e) => toggleFav(dish.id, e)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white backdrop-blur-xs transition-transform active:scale-90 cursor-pointer shadow-xs z-10"
                        title={isFav ? "Remove from Liked Dishes" : "Save to Liked Dishes"}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                      </button>

                      {/* Prep Time pill */}
                      {dish.prepTime && (
                        <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded-md flex items-center space-x-1 shadow-xs">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{dish.prepTime}</span>
                        </div>
                      )}

                      {/* Bestseller Badge */}
                      {dish.isBestseller && (
                        <div className="absolute top-2 right-10 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs uppercase">
                          ★ Best
                        </div>
                      )}
                    </div>

                    {/* Dish Details */}
                    <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 block truncate">
                          {restaurant.name}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-black line-clamp-1 group-hover:text-orange-500 transition-colors ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {dish.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {dish.description}
                        </p>
                      </div>

                      {/* Price & Quick Add Button */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                        <div>
                          <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                            ${dish.price.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleQuickAdd(dish, restaurant, e)}
                          className={`h-7 px-3 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer active:scale-95 shadow-xs ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-orange-600 hover:bg-orange-700 text-white'
                          }`}
                          aria-label={`Add ${dish.name} to cart`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <span>ADD</span>
                              <Plus className="w-3 h-3 stroke-[3]" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </section>
        );
      })}

      {visibleTopics.length === 0 && (
        <div className={`p-8 text-center rounded-2xl border space-y-3 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 mx-auto flex items-center justify-center text-xl">
            🔍
          </div>
          <h4 className="text-sm font-bold">No dishes found in this category</h4>
          <p className="text-xs text-slate-400">Try searching for other cravings or reset filters.</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            Show All Cravings
          </button>
        </div>
      )}

    </div>
  );
};
