import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bike, Flame, Menu as MenuIcon, Search, Sparkles } from 'lucide-react';
import { RESTAURANTS, FEAST_OPTIONS } from './data/mockData';
import { CartItem, MenuItem, Restaurant } from './types';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { RestaurantList } from './components/RestaurantList';
import { ExpressGroceryQuickBar } from './components/ExpressGroceryQuickBar';
import { FeastEstimator } from './components/FeastEstimator';
import { MasterChefsSection } from './components/MasterChefsSection';
import { CulinaryStorySection } from './components/CulinaryStorySection';
import { CraveClubMembership } from './components/CraveClubMembership';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { Footer } from './components/Footer';
import { useTheme } from './context/ThemeContext';

const sectionVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

export default function App() {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedDishIds, setLikedDishIds] = useState<string[]>(['item-101', 'item-201', 'item-301']);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!scrollTarget) return;
    const timer = window.setTimeout(() => {
      const target = scrollTarget === '#' ? document.documentElement : document.querySelector(scrollTarget);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setScrollTarget(null);
    }, 50);
    return () => window.clearTimeout(timer);
  }, [scrollTarget]);

  const handleToggleLike = (dishId: string) => {
    setLikedDishIds((prev) => (prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]));
  };

  const handleAddToCart = (dish: MenuItem, restaurantId?: string, restaurantName?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], quantity: copy[existingIndex].quantity + 1 };
        return copy;
      }

      return [
        ...prev,
        {
          dish,
          restaurantId: restaurantId || selectedRestaurant?.id || 'rest-1',
          restaurantName: restaurantName || selectedRestaurant?.name || 'Selected Restaurant',
          quantity: 1
        }
      ];
    });
  };

  const handleAddFeastToCart = (items: typeof FEAST_OPTIONS) => {
    items.forEach((item) => {
      handleAddToCart(
        {
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          description: 'Selected from the feast estimator',
          image: item.image,
          isVeg: item.category !== 'Mains',
          calories: item.calories,
          prepTime: `${item.prepMins} mins`
        },
        'rest-1',
        'Rasora Party Kitchen'
      );
    });
  };

  const sectionClass = `rounded-3xl border ${isDarkMode ? 'bg-[#0f1b3b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} shadow-xl overflow-hidden`;

  return (
    <div className={`min-h-screen overflow-x-hidden ${isDarkMode ? 'bg-[#0b1329] text-slate-100' : 'bg-[#faf8f5] text-slate-900'}`}>
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDarkMode ? 'bg-[#0b1329]/80 border-slate-800' : 'bg-[#faf8f5]/85 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Flame className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-black">CraveDrop</div>
              <div className="text-sm sm:text-base font-black truncate">Food & Quick Delivery</div>
            </div>
          </div>
          <button
            onClick={() => setScrollTarget('#restaurant-list-section')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-600/25 hover:-translate-y-0.5 transition-all"
          >
            Browse food
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScrollTarget('#restaurant-list-section')}
            className="sm:hidden w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center"
            aria-label="Browse food"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="pb-20 sm:pb-0">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <HeroSection
            location="Downtown Metro Center"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setScrollTarget('#restaurant-list-section');
            }}
            onOpenFoodieAi={() => setScrollTarget('#crave-club')}
          />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
        >
          <MarqueeTicker />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
        >
          <ExpressGroceryQuickBar onAddToCart={handleAddToCart} />
        </motion.section>

        <motion.section
          id="restaurant-list-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <RestaurantList
            onSelectRestaurant={(restaurant) => setSelectedRestaurant(restaurant)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            likedDishIds={likedDishIds}
            onToggleLike={handleToggleLike}
          />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
        >
          <FeastEstimator onAddFeastToCart={handleAddFeastToCart} />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.14 }}
        >
          <MasterChefsSection onSelectRestaurant={(restaurant) => setSelectedRestaurant(restaurant)} />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.16 }}
        >
          <CulinaryStorySection />
        </motion.section>

        <motion.section
          id="crave-club"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }}
        >
          <CraveClubMembership />
        </motion.section>

        <motion.section
          id="reviews"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          <ReviewsCarousel />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.22 }}
        >
          <Footer />
        </motion.section>
      </main>

      <div className="fixed bottom-4 right-4 z-50 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl px-3 py-2 shadow-xl">
        <Sparkles className="w-4 h-4 text-orange-500" />
        <span className="text-xs font-bold">{cartItems.length} items in cart</span>
        <button
          onClick={() => setScrollTarget('#restaurant-list-section')}
          className="ml-1 inline-flex items-center gap-1 rounded-full bg-slate-950 dark:bg-white dark:text-slate-950 text-white px-3 py-1 text-xs font-bold"
        >
          <Search className="w-3.5 h-3.5" />
          Search
        </button>
      </div>

      {selectedRestaurant && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-slate-950/90 text-white text-xs sm:text-sm shadow-2xl backdrop-blur-md border border-white/10">
          Viewing {selectedRestaurant.name}
        </div>
      )}
    </div>
  );
}
