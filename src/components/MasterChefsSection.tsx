import React, { useState } from 'react';
import { Award, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANTS } from '../data/mockData';
import { Restaurant } from '../types';
import { useTheme } from '../context/ThemeContext';

interface MasterChefsSectionProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const MasterChefsSection: React.FC<MasterChefsSectionProps> = ({ onSelectRestaurant }) => {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const chefs = [
    {
      id: 'chef-1',
      name: 'Chef Antoine Laurent',
      title: 'Executive French & Truffle Curator',
      experience: '18 Years Experience',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600',
      restaurantId: 'rest-3',
      signatureDish: 'The Truffle Royale Smashed Burger',
      bio: 'Trained at Le Cordon Bleu Paris. Renowned for elevating street classics with black Périgord winter truffles and house-fermented brioche.'
    },
    {
      id: 'chef-2',
      name: 'Ustad Kareem Khan',
      title: 'Royal Dum Biryani Custodian',
      experience: '24 Years Experience',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=600',
      restaurantId: 'rest-1',
      signatureDish: 'Hyderabadi Chicken Dum Biryani',
      bio: 'Custodian of 4th-generation royal Mughal spice blends. Masters the ancient slow-coal clay handi technique with Kashmiri saffron.'
    },
    {
      id: 'chef-3',
      name: 'Pizzaiolo Marco Bellini',
      title: 'Naples Certified Master Pizzaiolo',
      experience: '15 Years Experience',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=600',
      restaurantId: 'rest-2',
      signatureDish: 'Margherita di Bufala',
      bio: 'Born in Campania, Italy. Ferments artisan sourdough for 48 hours and bakes in a 900°F oakwood fire oven for an authentic leopard crust.'
    },
    {
      id: 'chef-4',
      name: 'Chef Kenji Sato',
      title: 'Omakase & Kaiseki Sushi Master',
      experience: '20 Years Experience',
      image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&q=80&w=600',
      restaurantId: 'rest-4',
      signatureDish: 'Dragon Roll & Tonkotsu Ramen',
      bio: 'Slices wild-caught Pacific bluefin tuna flown in daily from Toyosu Market, paired with seasoned Akazu red rice vinegar.'
    }
  ];

  const prevChef = () => {
    setCurrentIndex((prev) => (prev === 0 ? chefs.length - 1 : prev - 1));
  };

  const nextChef = () => {
    setCurrentIndex((prev) => (prev === chefs.length - 1 ? 0 : prev + 1));
  };

  const currentChef = chefs[currentIndex];

  const handleChefClick = (restaurantId: string) => {
    const matched = RESTAURANTS.find(r => r.id === restaurantId);
    if (matched) {
      onSelectRestaurant(matched);
    }
  };

  return (
    <section 
      id="master-chefs" 
      className={`py-8 sm:py-24 border-b transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
            THE CULINARY ARTISANS
          </span>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Meet Our Master Chefs
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Visionary culinary artists dedicated to fresh ingredients, authentic traditions, and unforgettable dining delivered directly to your doorstep.
          </p>
        </div>

        {/* Carousel Container */}
        <div className={`rounded-2xl sm:rounded-3xl border overflow-hidden shadow-xl transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            
            {/* Left: Chef Image with Experience Badge */}
            <div className="lg:col-span-5 relative bg-slate-100 dark:bg-slate-800 min-h-[300px] lg:min-h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentChef.id}
                  src={currentChef.image}
                  alt={currentChef.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center space-x-1.5 shadow-md">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{currentChef.experience}</span>
              </div>
            </div>

            {/* Right: Chef Info & Controls */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChef.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      {currentChef.title}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {currentChef.name}
                    </h3>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed font-normal ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {currentChef.bio}
                  </p>

                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-orange-50/60 border-orange-100'}`}>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-0.5">
                      Signature Creation
                    </span>
                    <span className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {currentChef.signatureDish}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action and Navigation Controls */}
              <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => handleChefClick(currentChef.restaurantId)}
                  className={`w-full font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 active:scale-98 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-orange-600 hover:bg-orange-500 text-white' 
                      : 'bg-slate-900 hover:bg-orange-600 text-white'
                  }`}
                >
                  <span>Taste Chef's Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Arrows and Dots */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {chefs.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          currentIndex === idx 
                            ? 'bg-orange-600 w-8' 
                            : isDarkMode ? 'bg-slate-800 w-2.5 hover:bg-slate-700' : 'bg-slate-200 w-2.5 hover:bg-slate-300'
                        }`}
                        aria-label={`Go to chef ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevChef}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isDarkMode 
                          ? 'border-slate-800 bg-slate-800 hover:bg-slate-700 text-white' 
                          : 'border-slate-200 bg-white hover:bg-orange-50 hover:text-orange-600 text-slate-700'
                      }`}
                      aria-label="Previous chef"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextChef}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isDarkMode 
                          ? 'border-slate-800 bg-slate-800 hover:bg-slate-700 text-white' 
                          : 'border-slate-200 bg-white hover:bg-orange-50 hover:text-orange-600 text-slate-700'
                      }`}
                      aria-label="Next chef"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
