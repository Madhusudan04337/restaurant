import React from 'react';
import { Zap, Clock, Plus, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ExpressGroceryQuickBarProps {
  onAddToCart: (dish: MenuItem, restaurantId: string, restaurantName: string) => void;
}

export const ExpressGroceryQuickBar: React.FC<ExpressGroceryQuickBarProps> = ({ onAddToCart }) => {
  const { isDarkMode } = useTheme();

  const quickItems = [
    {
      id: 'mart-1',
      name: 'Cold Pressed Alphonso Mango Juice (500ml)',
      category: 'Beverages',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400',
      description: '100% pure organic mango pulp, no added sugars.',
      time: '10 mins'
    },
    {
      id: 'mart-2',
      name: 'Artisan Dark Chocolate Gelato Tub (450g)',
      category: 'Desserts',
      price: 7.50,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400',
      description: 'Belgian 70% cocoa with salted fudge swirls.',
      time: '8 mins'
    },
    {
      id: 'mart-3',
      name: 'Freshly Baked Garlic Butter Baguette',
      category: 'Bakery',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
      description: 'Warm, crispy crust with herb butter filling.',
      time: '10 mins'
    },
    {
      id: 'mart-4',
      name: 'Black Truffle Gourmet Potato Crisps',
      category: 'Snacks',
      price: 4.50,
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400',
      description: 'Hand-cooked kettle chips seasoned with summer truffles.',
      time: '7 mins'
    }
  ];

  const handleAdd = (item: typeof quickItems[0]) => {
    const dish: MenuItem = {
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: item.image,
      isVeg: true,
      prepTime: item.time
    };
    onAddToCart(dish, 'instamart', 'CraveMart Express (10 Mins)');
  };

  return (
    <section className={`py-10 sm:py-12 border-y transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800 text-white' 
        : 'bg-amber-50/70 border-amber-200/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className={`text-base sm:text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  CraveMart 10-Minute Express
                </h3>
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Lightning Fast
                </span>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Late night munchies, artisanal beverages, bakery and gourmet snacks delivered in 10 minutes.
              </p>
            </div>
          </div>
          <span className={`text-xs font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
            ⚡ 1,200+ Express Delivery Partners Active
          </span>
        </div>

        {/* Quick Items 1 1/2 Horizontal Peek Carousel on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible scroll-smooth">
          {quickItems.map((item) => (
            <div
              key={item.id}
              className={`w-[72vw] sm:w-auto shrink-0 snap-start rounded-2xl p-3.5 border transition-all flex items-center justify-between gap-3 shadow-xs hover:shadow-md ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 hover:border-amber-500/40 text-white' 
                  : 'bg-white border-amber-200/80 hover:border-amber-300 text-slate-900'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-0.5">
                <span className={`text-[10px] font-black uppercase flex items-center space-x-0.5 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>{item.time}</span>
                </span>
                <h4 className={`text-xs font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {item.name}
                </h4>
                <p className="text-xs font-black text-orange-600 dark:text-orange-400">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => handleAdd(item)}
                className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-xs shrink-0 transition-transform active:scale-95"
                title="Add to cart"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
