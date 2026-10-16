import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const RestaurantMenuPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId);
  const { isDarkMode } = useTheme();

  const [activeCategory, setActiveCategory] = useState<string>(restaurant ? restaurant.menu[0]?.name : '');

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
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0c1630] text-white' : 'bg-white text-slate-900'}`}>
      <div className={`sticky top-0 z-20 backdrop-blur-md px-6 py-4 border-b flex items-center justify-between ${
        isDarkMode ? 'bg-[#0c1630]/95 border-blue-900/40' : 'bg-white/95 border-slate-100'
      }`}>
        <button
          onClick={() => navigate('/')}
          className={`flex items-center space-x-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' 
              : 'bg-slate-100 text-slate-700 hover:bg-orange-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurants</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6 sm:p-10">
        <h1 className={`text-4xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{restaurant.name}</h1>
        <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{restaurant.cuisine.join(' • ')} • {restaurant.address}</p>

        {/* Menu Navigation */}
        <div className="flex items-center space-x-3 mb-8 overflow-x-auto pb-2">
            {restaurant.menu.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4.5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  currentCategory === cat.name
                    ? 'bg-orange-600 text-white'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-slate-100 text-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
        </div>

        {/* Items */}
        <div className="space-y-6">
            {restaurant.menu.map((cat) => (
                <div key={cat.name} className="mb-8">
                    <h2 className="text-xl font-bold mb-4">{cat.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cat.items.map((item) => (
                            <div key={item.id} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                                <h4 className="font-bold">{item.name}</h4>
                                <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
