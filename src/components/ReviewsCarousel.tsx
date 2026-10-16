import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { applyImageFallback } from '../utils/imageFallback';

export const ReviewsCarousel: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

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
      className={`py-8 sm:py-24 border-b ${
        isDarkMode ? 'bg-[#091126] border-blue-900/40 text-white' : 'bg-[#faf8f5] border-stone-200/80 text-slate-900'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 text-center">
        
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
            FOODIE LOVE & STORIES
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Loved by 50,000+ Foodies
          </h2>
          <p className={`text-xs sm:text-sm font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Genuine impressions from food lovers ordering daily across the city.
          </p>
        </div>

        {/* Carousel Card */}
        <div className={`rounded-xl sm:rounded-2xl p-6 sm:p-10 shadow-lg border relative min-h-[250px] flex flex-col justify-between ${
          isDarkMode ? 'bg-[#0f1b3b] border-blue-900/40 text-white shadow-blue-950/40' : 'bg-white border-stone-200 text-slate-900 shadow-sm'
        }`}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Stars */}
              <div className="flex justify-center space-x-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Quote */}
              <p className={`text-sm sm:text-base italic font-normal leading-relaxed max-w-2xl mx-auto ${
                isDarkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                "{current.comment}"
              </p>

              {/* Author & dish loved */}
              <div className="flex items-center justify-center space-x-3.5 pt-2">
                <img 
                  src={current.avatar} 
                  alt={current.author} 
                  className="w-11 h-11 rounded-full object-cover border border-orange-500 shadow-xs"
                  onError={applyImageFallback}
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
          <div className="flex items-center justify-center space-x-4 pt-6">
            <button
              onClick={prevReview}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
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
