import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Clock, 
  Plus, 
  Minus, 
  Search, 
  Star, 
  ChevronDown, 
  X, 
  CheckCircle2,
  Sparkles,
  Flame,
  Filter
} from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { useTheme } from '../context/ThemeContext';

export interface InstamartProduct {
  id: string;
  name: string;
  weight: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPct?: number;
  image: string;
  description: string;
  timeMins: number;
  badge?: string;
  isVeg: boolean;
  isBestseller?: boolean;
}

interface InstamartMobileViewProps {
  cartItems: CartItem[];
  onAddToCart: (dish: MenuItem, restaurantId: string, restaurantName: string) => void;
  onRemoveFromCart: (dishId: string) => void;
  onOpenCart: () => void;
  location: string;
}

// Categories mirroring the exact card design in the provided screenshot
const INSTAMART_CATEGORIES = [
  { 
    id: 'all', 
    name: 'All', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=240' 
  },
  { 
    id: 'munchies', 
    name: 'Munchies', 
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=240' 
  },
  { 
    id: 'drinks', 
    name: 'Cold Drinks', 
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=240' 
  },
  { 
    id: 'sweets', 
    name: 'Ice Creams', 
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=240' 
  },
  { 
    id: 'bakery', 
    name: 'Bakery', 
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=240' 
  },
  { 
    id: 'instant', 
    name: 'Instant Food', 
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=240' 
  },
  { 
    id: 'dairy', 
    name: 'Dairy & Eggs', 
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=240' 
  }
];

const INSTAMART_PRODUCTS: InstamartProduct[] = [
  // Munchies & Chips
  {
    id: 'mart-1',
    name: 'Black Truffle Gourmet Kettle Chips',
    weight: '150g pack',
    category: 'munchies',
    price: 3.49,
    originalPrice: 4.99,
    discountPct: 30,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400',
    description: 'Slow-cooked golden potato chips tossed in aromatic European black summer truffles.',
    timeMins: 8,
    badge: '30% OFF',
    isVeg: true,
    isBestseller: true
  },
  {
    id: 'mart-2',
    name: 'Mexican Jalapeño & Aged Cheddar Nachos',
    weight: '200g bag',
    category: 'munchies',
    price: 3.75,
    originalPrice: 4.25,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=400',
    description: 'Stone-ground yellow corn nachos seasoned with fiery pickled jalapeño & cheddar.',
    timeMins: 7,
    isVeg: true,
    isBestseller: false
  },
  {
    id: 'mart-3',
    name: 'Roasted Peri Peri Jumbo Cashews',
    weight: '100g pouch',
    category: 'munchies',
    price: 4.95,
    originalPrice: 5.50,
    image: 'https://images.unsplash.com/photo-1536591375315-1b836814041b?auto=format&fit=crop&q=80&w=400',
    description: 'Slow-roasted premium cashews dusted in smoky African bird’s eye chili spice.',
    timeMins: 8,
    badge: 'HOT',
    isVeg: true,
    isBestseller: true
  },

  // Cold Drinks
  {
    id: 'mart-4',
    name: 'Cold Pressed Alphonso Mango Nectar',
    weight: '500ml bottle',
    category: 'drinks',
    price: 4.49,
    originalPrice: 5.25,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400',
    description: '100% pure organic Ratnagiri mango pulp, cold pressed fresh with zero preservatives.',
    timeMins: 8,
    badge: 'CHILLED',
    isVeg: true,
    isBestseller: true
  },
  {
    id: 'mart-5',
    name: 'Nitro Brew Colombian Cold Coffee',
    weight: '250ml slim can',
    category: 'drinks',
    price: 3.99,
    originalPrice: 4.50,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400',
    description: '18-hour cold steeped single-origin Arabica infused with nitrogen for a creamy velvety head.',
    timeMins: 7,
    isVeg: true
  },
  {
    id: 'mart-6',
    name: 'Sicilian Blood Orange Sparkling Soda',
    weight: '330ml bottle',
    category: 'drinks',
    price: 2.75,
    originalPrice: 3.25,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
    description: 'Effervescent mineral water with tart Italian blood orange juice and raw cane sugar.',
    timeMins: 8,
    isVeg: true
  },

  // Sweets & Ice Cream
  {
    id: 'mart-7',
    name: 'Artisan Dark Chocolate Gelato Tub',
    weight: '450g tub',
    category: 'sweets',
    price: 5.99,
    originalPrice: 7.99,
    discountPct: 25,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400',
    description: '70% Belgian dark cocoa churned with salted caramel ripple and chocolate pearls.',
    timeMins: 9,
    badge: 'FROZEN',
    isVeg: true,
    isBestseller: true
  },
  {
    id: 'mart-8',
    name: 'Royal Pistachio Kulfi Gelato Bar',
    weight: 'Pack of 3 bars',
    category: 'sweets',
    price: 5.50,
    originalPrice: 6.50,
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=400',
    description: 'Traditional slow-reduced whole milk kulfi loaded with roasted Iranian green pistachios.',
    timeMins: 9,
    isVeg: true
  },

  // Bakery
  {
    id: 'mart-9',
    name: 'Garlic Herb Butter Stuffed Baguette',
    weight: '1 warm baguette',
    category: 'bakery',
    price: 3.89,
    originalPrice: 4.50,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    description: 'Crusty artisan bread scored and packed with melted garlic, parsley, and sea salt butter.',
    timeMins: 9,
    badge: 'FRESH BAKE',
    isVeg: true,
    isBestseller: true
  },
  {
    id: 'mart-10',
    name: 'French Butter Croissants (2-Pack)',
    weight: '2 golden croissants',
    category: 'bakery',
    price: 4.80,
    originalPrice: 5.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400',
    description: 'Flaky 64-layer laminated French croissants, oven-crisped with Normandy churned butter.',
    timeMins: 10,
    isVeg: true
  },

  // Instant Food
  {
    id: 'mart-11',
    name: 'Korean Buldak Spicy Four Cheese Ramen',
    weight: '140g bowl cup',
    category: 'instant',
    price: 3.29,
    originalPrice: 3.80,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400',
    description: 'Chewy thick noodles in fiery gochujang sauce smothered with melted mozzarella & gouda.',
    timeMins: 8,
    badge: 'SPICY',
    isVeg: false,
    isBestseller: true
  },
  {
    id: 'mart-12',
    name: 'Greek Vanilla Bean Organic Yogurt Tub',
    weight: '400g tub',
    category: 'dairy',
    price: 4.20,
    originalPrice: 4.80,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    description: 'Triple-strained whole milk Greek yogurt with Madagascar bourbon vanilla bean specks.',
    timeMins: 8,
    isVeg: true
  }
];

export const InstamartMobileView: React.FC<InstamartMobileViewProps> = ({
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
  location
}) => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterTopRated, setFilterTopRated] = useState(false);
  const [filterFastDelivery, setFilterFastDelivery] = useState(false);
  const [sortOption, setSortOption] = useState<'recommended' | 'rating' | 'priceAsc'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart quantity lookup for direct stepper
  const getItemQty = (productId: string) => {
    const found = cartItems.find(item => item.dish.id === productId);
    return found ? found.quantity : 0;
  };

  const handleProductAdd = (product: InstamartProduct) => {
    const menuItem: MenuItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      isVeg: product.isVeg,
      prepTime: `${product.timeMins} mins`
    };
    onAddToCart(menuItem, 'crave-mart', 'CraveMart Express (10 Mins)');
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return INSTAMART_PRODUCTS.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchCat) return false;
      }

      // Category Card
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Filter chips
      if (filterVegOnly && !p.isVeg) return false;
      if (filterTopRated && !p.isBestseller) return false;
      if (filterFastDelivery && p.timeMins > 8) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'priceAsc') return a.price - b.price;
      if (sortOption === 'rating') {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, filterVegOnly, filterTopRated, filterFastDelivery, sortOption]);

  const martCartItems = cartItems.filter(i => i.restaurantId === 'crave-mart');
  const martCartTotal = martCartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);

  return (
    <div className="space-y-4 pb-20 select-none">
      
      {/* 1. Header Title & Subtitle - EXACTLY matching the uploaded design */}
      <div className="space-y-1 pt-1">
        <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          What's on your mind?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Explore 10-minute snacks, fresh bakery, cold drinks & essentials
        </p>
      </div>

      {/* 2. Category Cards in Horizontal Carousel (Exact design from uploaded image.png) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none px-0.5">
        {INSTAMART_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-24 sm:w-28 py-3.5 px-2.5 shrink-0 flex flex-col items-center justify-center rounded-2xl border transition-all cursor-pointer text-center select-none group ${
                isSelected
                  ? 'border-orange-500 bg-orange-600 text-white shadow-md shadow-orange-600/30 font-black'
                  : isDarkMode
                    ? 'border-slate-800 bg-slate-900/90 text-slate-200 hover:border-slate-700'
                    : 'border-slate-200/90 bg-white text-slate-800 hover:border-orange-200 shadow-xs'
              }`}
            >
              {/* Circular image with white border ring when selected */}
              <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 shrink-0 border-2 transition-transform duration-300 group-hover:scale-105 ${
                isSelected 
                  ? 'border-white shadow-xs' 
                  : isDarkMode 
                    ? 'border-slate-700 bg-slate-800' 
                    : 'border-slate-200 bg-slate-100'
              }`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=240';
                  }}
                />
              </div>

              {/* Label */}
              <span className={`text-xs font-bold leading-tight truncate w-full px-1 ${
                isSelected ? 'text-white font-black' : isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Rounded Filter Bar Card - EXACTLY matching the uploaded image */}
      <div className={`p-3 sm:p-4 rounded-2xl border flex flex-col space-y-3 transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
      }`}>
        {/* Top Row: Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          {/* All Pill */}
          <button
            onClick={() => {
              setFilterVegOnly(false);
              setFilterTopRated(false);
              setFilterFastDelivery(false);
              setSelectedCategory('all');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              !filterVegOnly && !filterTopRated && !filterFastDelivery && selectedCategory === 'all'
                ? 'bg-orange-600 text-white shadow-xs'
                : isDarkMode 
                  ? 'text-slate-300 hover:bg-slate-800 border border-slate-700/60' 
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All
          </button>

          {/* Pure Veg Pill with green dot */}
          <button
            onClick={() => setFilterVegOnly(!filterVegOnly)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer border ${
              filterVegOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
                : isDarkMode 
                  ? 'border-slate-700/60 text-slate-300 hover:bg-slate-800' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Pure Veg</span>
          </button>

          {/* 4.8+ Top Rated Pill with gold star */}
          <button
            onClick={() => setFilterTopRated(!filterTopRated)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer border ${
              filterTopRated
                ? 'bg-orange-600 text-white border-orange-600 shadow-xs font-bold'
                : isDarkMode 
                  ? 'border-slate-700/60 text-slate-300 hover:bg-slate-800' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>4.8+ Top Rated</span>
          </button>

          {/* Fast Delivery Clock Pill */}
          <button
            onClick={() => setFilterFastDelivery(!filterFastDelivery)}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer border ${
              filterFastDelivery
                ? 'bg-orange-600 text-white border-orange-600 shadow-xs font-bold'
                : isDarkMode 
                  ? 'border-slate-700/60 text-slate-300 hover:bg-slate-800' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Under 8 Mins"
          >
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span className="hidden sm:inline">&lt;8 Mins</span>
          </button>
        </div>

        {/* Bottom Row: Sort Dropdown */}
        <div className="flex items-center justify-end pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className={`appearance-none pl-3.5 pr-8 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer outline-none ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-slate-200'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Top Rated First</option>
              <option value="priceAsc">Price: Low to High</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. Section Title Header - Matching "All Restaurants (1)" from uploaded image */}
      <div className="space-y-0.5 pt-1">
        <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          All Essentials ({filteredProducts.length})
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          Delivered in 8-10 minutes from your local CraveMart dark store
        </p>
      </div>

      {/* 5. Products Grid (Dense 2-column mobile layout with direct cart controls) */}
      {filteredProducts.length === 0 ? (
        <div className={`p-8 text-center rounded-2xl border space-y-3 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 mx-auto flex items-center justify-center text-xl">
            🔍
          </div>
          <h4 className="text-sm font-bold">No essentials found</h4>
          <p className="text-xs text-slate-400">Try resetting filters to browse all items.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setFilterVegOnly(false);
              setFilterTopRated(false);
              setFilterFastDelivery(false);
            }}
            className="px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {filteredProducts.map((product) => {
            const qty = getItemQty(product.id);

            return (
              <div
                key={product.id}
                className={`rounded-2xl p-2.5 sm:p-3 border flex flex-col justify-between transition-all group ${
                  isDarkMode 
                    ? 'bg-[#101b3b] border-blue-900/40 hover:border-blue-700/60 text-white shadow-xs' 
                    : 'bg-white border-slate-200/90 hover:border-orange-200 text-slate-900 shadow-xs'
                }`}
              >
                {/* Product Image Box */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300';
                    }}
                  />

                  {/* Delivery time badge */}
                  <div className="absolute top-1.5 left-1.5 bg-slate-950/85 backdrop-blur-xs text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded-md flex items-center space-x-0.5 shadow-xs">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{product.timeMins}m</span>
                  </div>

                  {/* Discount / Badge */}
                  {product.badge && (
                    <div className="absolute top-1.5 right-1.5 bg-orange-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs uppercase">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                      {product.weight}
                    </span>
                    <h4 className={`text-xs font-black line-clamp-2 leading-snug ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {product.name}
                    </h4>
                  </div>

                  {/* Price Row & Direct Cart Action Button */}
                  <div className="pt-2 flex items-center justify-between gap-1.5">
                    <div>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Direct Stepper or Add Button */}
                    <div className="shrink-0">
                      {qty === 0 ? (
                        <button
                          onClick={() => handleProductAdd(product)}
                          className="h-7 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-[11px] font-black uppercase tracking-wider shadow-xs transition-transform active:scale-95 flex items-center space-x-0.5 cursor-pointer"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <span>ADD</span>
                          <Plus className="w-3 h-3 stroke-[3]" />
                        </button>
                      ) : (
                        <div className="h-7 flex items-center bg-orange-600 text-white rounded-lg px-1 shadow-xs font-black text-xs space-x-1.5">
                          <button
                            onClick={() => onRemoveFromCart(product.id)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-orange-700 rounded cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-3 text-center text-[11px]">{qty}</span>
                          <button
                            onClick={() => handleProductAdd(product)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-orange-700 rounded cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
