import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const ReviewsCarousel: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section 
      id="reviews" 
      className={`py-16 border-b transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        
        <div className="space-y-1">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
            FOODIE LOVE & STORIES
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Loved by 50,000+ Foodies
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Genuine impressions from food lovers ordering daily across the city.
          </p>
        </div>

        {/* Carousel Card */}
        <div className={`rounded-3xl p-6 sm:p-12 shadow-xl border relative min-h-[260px] flex flex-col justify-between transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-black/30' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
        }`}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Stars */}
              <div className="flex justify-center space-x-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Quote */}
              <p className={`text-sm sm:text-base italic font-medium leading-relaxed max-w-2xl mx-auto ${
                isDarkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                "{current.comment}"
              </p>

              {/* Author & dish loved */}
              <div className="flex items-center justify-center space-x-4 pt-2">
                <img 
                  src={current.avatar} 
                  alt={current.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shadow-md"
                />
                <div className="text-left">
                  <div className="flex items-center space-x-1.5">
                    <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {current.author}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {current.location}
                  </p>
                  <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold">
                    Favorite: {current.dishLoved}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 pt-8">
            <button
              onClick={prevReview}
              className={`p-2 rounded-full border transition-colors ${
                isDarkMode 
                  ? 'border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white' 
                  : 'border-slate-200 hover:bg-orange-50 hover:text-orange-600 text-slate-600'
              }`}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === idx 
                      ? 'bg-orange-600 w-6' 
                      : isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className={`p-2 rounded-full border transition-colors ${
                isDarkMode 
                  ? 'border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white' 
                  : 'border-slate-200 hover:bg-orange-50 hover:text-orange-600 text-slate-600'
              }`}
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
