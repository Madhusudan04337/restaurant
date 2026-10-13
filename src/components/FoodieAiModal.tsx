import React, { useState } from 'react';
import { Sparkles, X, Utensils, ArrowRight, Loader2 } from 'lucide-react';
import { Restaurant } from '../types';
import { RESTAURANTS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface FoodieAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const FoodieAiModal: React.FC<FoodieAiModalProps> = ({
  isOpen,
  onClose,
  onSelectRestaurant
}) => {
  const { isDarkMode } = useTheme();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{
    message: string;
    recommendedRestaurantIds: string[];
    highlightDish: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleAskFoodie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/gemini/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          restaurants: RESTAURANTS.map(r => ({
            id: r.id,
            name: r.name,
            cuisine: r.cuisine,
            rating: r.rating,
            items: r.menu.flatMap(m => m.items.map(i => i.name))
          }))
        })
      });
      const data = await res.json();
      setAiResponse(data);
    } catch (err) {
      console.error(err);
      setAiResponse({
        message: "I recommend checking out The Royal Biryani & Kebabs for authentic dum biryani or Bella Napoli for hot woodfired pizzas!",
        recommendedRestaurantIds: ['rest-1', 'rest-2'],
        highlightDish: 'Hyderabadi Chicken Dum Biryani'
      });
    } finally {
      setLoading(false);
    }
  };

  const presetQueries = [
    "What's the best biryani place with 30-min delivery?",
    "Recommend something spicy and high protein under $18",
    "Cheesy woodfired pizza for a Friday movie night",
    "Healthy vegan salad or bowl under 450 calories"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className={`rounded-xl sm:rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 border transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-white shadow-black/80' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h2 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Foodie AI Concierge</h2>
              <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Ask for dishes, cravings & restaurant picks</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleAskFoodie} className="space-y-3">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you in the mood for? e.g. 'I want spicy chicken with garlic naan'"
              rows={2}
              className={`w-full p-3 border rounded-lg text-xs font-semibold focus:outline-hidden ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-orange-500' 
                  : 'bg-orange-50/40 border-orange-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-orange-500'
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {presetQueries.map((pq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(pq)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-750 text-slate-300' 
                    : 'bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-700'
                }`}
              >
                "{pq}"
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow-sm flex items-center justify-center space-x-2 transition-transform active:scale-98 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Finding Best Dishes...</span>
              </>
            ) : (
              <>
                <span>Get Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Output */}
        {aiResponse && (
          <div className={`border rounded-xl p-4 space-y-3 ${
            isDarkMode 
              ? 'bg-slate-950/80 border-slate-800 text-slate-200' 
              : 'bg-orange-50 border-orange-200 text-slate-800'
          }`}>
            <div className="flex items-start space-x-2">
              <Utensils className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className={`text-xs font-medium leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {aiResponse.message}
                </p>
                {aiResponse.highlightDish && (
                  <p className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
                    Must Try: {aiResponse.highlightDish}
                  </p>
                )}
              </div>
            </div>

            {aiResponse.recommendedRestaurantIds?.length > 0 && (
              <div className={`space-y-1.5 pt-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-orange-200'}`}>
                <span className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Recommended Spots
                </span>
                {RESTAURANTS.filter(r => aiResponse.recommendedRestaurantIds.includes(r.id)).map((rest) => (
                  <div
                    key={rest.id}
                    onClick={() => {
                      onSelectRestaurant(rest);
                      onClose();
                    }}
                    className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between text-xs font-semibold transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-white' 
                        : 'bg-white hover:bg-orange-100 border-orange-200 text-slate-800'
                    }`}
                  >
                    <span>{rest.name}</span>
                    <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold">View Menu &rarr;</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
