import React, { useState } from 'react';
import { Sparkles, X, Utensils, ArrowRight, Loader2 } from 'lucide-react';
import { Restaurant } from '../types';
import { RESTAURANTS } from '../data/mockData';

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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Foodie AI Concierge</h2>
              <p className="text-[10px] text-slate-500">Ask for dishes, cravings & restaurant picks</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
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
              className="w-full p-3.5 bg-orange-50/50 border border-orange-200 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {presetQueries.map((pq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(pq)}
                className="text-[10px] bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-700 font-bold px-2.5 py-1 rounded-lg transition-colors"
              >
                "{pq}"
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:bg-slate-300 text-white font-black py-3 rounded-xl text-xs uppercase shadow-md flex items-center justify-center space-x-2"
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
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-start space-x-2">
              <Utensils className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs text-slate-800 font-medium leading-relaxed">{aiResponse.message}</p>
                {aiResponse.highlightDish && (
                  <p className="text-[11px] font-black text-orange-700">✨ Must Try: {aiResponse.highlightDish}</p>
                )}
              </div>
            </div>

            {aiResponse.recommendedRestaurantIds?.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-orange-200">
                <span className="text-[10px] font-black text-slate-500 uppercase">Recommended Spots</span>
                {RESTAURANTS.filter(r => aiResponse.recommendedRestaurantIds.includes(r.id)).map((rest) => (
                  <div
                    key={rest.id}
                    onClick={() => {
                      onSelectRestaurant(rest);
                      onClose();
                    }}
                    className="bg-white hover:bg-orange-100 p-2.5 rounded-xl border border-orange-200 cursor-pointer flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
                  >
                    <span>{rest.name}</span>
                    <span className="text-[10px] text-orange-600 font-black">View Menu &rarr;</span>
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
