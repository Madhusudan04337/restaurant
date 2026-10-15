import React, { useState, useEffect } from 'react';
import { Restaurant, MenuItem, CartItem, Order } from './types';
import { RESTAURANTS, FEAST_OPTIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { RestaurantList } from './components/RestaurantList';
import { FeastEstimator } from './components/FeastEstimator';
import { ExpressGroceryQuickBar } from './components/ExpressGroceryQuickBar';
import { InstamartMobileView } from './components/InstamartMobileView';
import { DineInView } from './components/DineInView';
import { MasterChefsSection } from './components/MasterChefsSection';
import { CulinaryStorySection } from './components/CulinaryStorySection';
import { CraveClubMembership } from './components/CraveClubMembership';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';
import { MobileBottomNav, MobileTab } from './components/MobileBottomNav';
import { MobileCartBar } from './components/MobileCartBar';
import { RestaurantMenuModal } from './components/RestaurantMenuModal';
import { TableReservationModal } from './components/TableReservationModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { OrdersDrawer } from './components/OrdersDrawer';
import { FoodieAiModal } from './components/FoodieAiModal';
import { ProfileView } from './components/ProfileView';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { UserAccountPage } from './components/UserAccountPage';
import { Bike, Clock, ArrowRight, X } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { isDarkMode } = useTheme();
  const [location, setLocation] = useState('Downtown Metro Center');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileTab, setMobileTab] = useState<MobileTab>('delivery');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '849201',
      items: [
        {
          dish: {
            id: 'item-201',
            name: 'Authentic Margherita di Bufala',
            description: 'San Marzano tomatoes, fresh mozzarella',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            category: 'Pizza'
          },
          restaurantId: 'rest-2',
          restaurantName: 'Bella Napoli Woodfired Pizza',
          quantity: 2
        }
      ],
      restaurantId: 'rest-2',
      restaurantName: 'Bella Napoli Woodfired Pizza',
      totalAmount: 36.50,
      status: 'OUT_FOR_DELIVERY',
      createdAt: '12:45 PM',
      deliveryAddress: 'Downtown Metro Center',
      etaMinutes: 14,
      driver: {
        name: 'Alex Johnson',
        phone: '+1 (555) 234-5678',
        vehicle: 'Honda Activa (NY-4921)',
        rating: 4.9
      }
    }
  ]);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [initialDishToOpen, setInitialDishToOpen] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFoodieAiOpen, setIsFoodieAiOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationVenueName, setReservationVenueName] = useState<string | undefined>(undefined);
  const [likedDishIds, setLikedDishIds] = useState<string[]>(['item-101', 'item-201', 'item-301']);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);

  const handleToggleLike = (dishId: string) => {
    setLikedDishIds(prev => prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId]);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; avatar: string } | null>({
    name: 'Default User',
    email: 'user@example.com',
    avatar: 'DU'
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register' | 'account'>('home');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  useEffect(() => {
    if (currentView === 'home' && scrollTarget) {
      const attemptScroll = (attemptsLeft = 6) => {
        if (scrollTarget === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setScrollTarget(null);
          return;
        }
        const el = document.querySelector(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setScrollTarget(null);
        } else if (attemptsLeft > 0) {
          setTimeout(() => attemptScroll(attemptsLeft - 1), 80);
        } else {
          setScrollTarget(null);
        }
      };
      const timer = setTimeout(() => attemptScroll(), 50);
      return () => clearTimeout(timer);
    }
  }, [currentView, scrollTarget, mobileTab]);

  const handleSelectDish = (dish: MenuItem, restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setInitialDishToOpen(dish);
  };

  // Add individual dish to cart
  const handleAddToCart = (dish: MenuItem, restaurantId?: string, restaurantName?: string) => {
    setCartItems(prev => {
      const restId = restaurantId || selectedRestaurant?.id || prev[0]?.restaurantId || 'rest-1';
      const restName = restaurantName || selectedRestaurant?.name || prev[0]?.restaurantName || 'Selected Restaurant';

      const existingIndex = prev.findIndex(ci => ci.dish.id === dish.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + 1
        };
        return copy;
      } else {
        return [...prev, {
          dish,
          restaurantId: restId,
          restaurantName: restName,
          quantity: 1
        }];
      }
    });
  };

  // Add multiple feast dishes from FeastEstimator
  const handleAddFeastToCart = (items: typeof FEAST_OPTIONS) => {
    setCartItems(prev => {
      const copy = [...prev];
      items.forEach(feastItem => {
        const existingIdx = copy.findIndex(ci => ci.dish.id === feastItem.id);
        const menuItem: MenuItem = {
          id: feastItem.id,
          name: feastItem.name,
          category: feastItem.category,
          price: feastItem.price,
          description: 'Selected from Party Feast Estimator',
          image: feastItem.image,
          isVeg: feastItem.category !== 'Mains' || feastItem.name.includes('Paneer') || feastItem.name.includes('Pizza'),
          calories: feastItem.calories,
          prepTime: `${feastItem.prepMins} mins`
        };

        if (existingIdx > -1) {
          copy[existingIdx].quantity += 1;
        } else {
          copy.push({
            dish: menuItem,
            restaurantId: 'rest-1',
            restaurantName: 'Rasora Party Kitchen',
            quantity: 1
          });
        }
      });
      return copy;
    });
  };

  // Remove dish from cart
  const handleRemoveFromCart = (dishId: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.dish.id === dishId);
      if (existingIndex > -1) {
        const item = prev[existingIndex];
        if (item.quantity > 1) {
          const copy = [...prev];
          copy[existingIndex] = { ...item, quantity: item.quantity - 1 };
          return copy;
        } else {
          return prev.filter(ci => ci.dish.id !== dishId);
        }
      }
      return prev;
    });
  };

  // Checkout and place order
  const handleCheckout = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setTrackedOrder(newOrder);
  };

  // Advance delivery simulation status
  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      if (o.status === 'PLACED') return { ...o, status: 'PREPARING', etaMinutes: 20 };
      if (o.status === 'PREPARING') return { ...o, status: 'OUT_FOR_DELIVERY', etaMinutes: 10 };
      if (o.status === 'OUT_FOR_DELIVERY') return { ...o, status: 'DELIVERED', etaMinutes: 0 };
      return o;
    }));

    if (trackedOrder && trackedOrder.id === orderId) {
      setTrackedOrder(prev => {
        if (!prev) return null;
        if (prev.status === 'PLACED') return { ...prev, status: 'PREPARING', etaMinutes: 20 };
        if (prev.status === 'PREPARING') return { ...prev, status: 'OUT_FOR_DELIVERY', etaMinutes: 10 };
        if (prev.status === 'OUT_FOR_DELIVERY') return { ...prev, status: 'DELIVERED', etaMinutes: 0 };
        return prev;
      });
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-orange-500 selection:text-white relative pb-20 sm:pb-0 overflow-x-hidden ${
      currentView !== 'login' && currentView !== 'register' ? 'pt-[110px] sm:pt-[124px]' : ''
    } ${
      isDarkMode ? 'bg-[#0b1329] text-slate-100' : 'bg-[#faf8f5] text-slate-900'
    }`}>
      
      {/* Sticky Top Header */}
      {currentView !== 'login' && currentView !== 'register' && (
        <Navbar
          location={location}
          setLocation={setLocation}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onOpenLogin={() => setCurrentView('login')}
          onOpenRegister={() => setCurrentView('register')}
          onOpenProfile={() => setCurrentView('account')}
          onNavigateHome={() => setCurrentView('home')}
          onSelectNav={(id) => {
            setCurrentView('home');
            if (id === 'restaurants') {
              setMobileTab('delivery');
              setScrollTarget('#restaurant-list-section');
            } else if (id === 'feast-estimator') {
              setMobileTab('feast');
              setScrollTarget('#feast-estimator');
            } else if (id === 'master-chefs') {
              setMobileTab('delivery');
              setScrollTarget('#master-chefs');
            } else if (id === 'crave-club') {
              setMobileTab('delivery');
              setScrollTarget('#crave-club');
            } else if (id === 'reviews') {
              setMobileTab('delivery');
              setScrollTarget('#reviews');
            } else {
              setMobileTab('delivery');
              setScrollTarget('#');
            }
          }}
        />
      )}

      {/* Dedicated Sign In Page */}
      {currentView === 'login' && (
        <LoginPage
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            setIsLoggedIn(true);
            setCurrentView('home');
          }}
          onNavigateRegister={() => setCurrentView('register')}
          onBackToHome={() => setCurrentView('home')}
        />
      )}

      {/* Dedicated Register Page */}
      {currentView === 'register' && (
        <RegisterPage
          onRegisterSuccess={(u) => {
            setCurrentUser(u);
            setIsLoggedIn(true);
            setCurrentView('home');
          }}
          onNavigateLogin={() => setCurrentView('login')}
          onBackToHome={() => setCurrentView('home')}
        />
      )}

      {/* Dedicated User Account Page */}
      {currentView === 'account' && (
        <UserAccountPage
          currentUser={currentUser}
          location={location}
          setLocation={setLocation}
          orders={orders}
          likedDishIds={likedDishIds}
          onToggleLike={handleToggleLike}
          onAddToCart={handleAddToCart}
          onSignOut={() => {
            setIsLoggedIn(false);
            setCurrentUser(null);
            setCurrentView('home');
          }}
          onBackToHome={() => setCurrentView('home')}
        />
      )}

      {/* Home View */}
      {currentView === 'home' && (
        <>
      <div className="sm:hidden w-full pb-24">
        {mobileTab === 'delivery' && (
          <div className="space-y-3">
            <HeroSection
              location={location}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
              onOpenFoodieAi={() => setIsFoodieAiOpen(true)}
            />
            <MarqueeTicker />
            <div id="restaurant-list-section">
              <RestaurantList
                onSelectRestaurant={(restaurant) => {
                  setSelectedRestaurant(restaurant);
                  setInitialDishToOpen(null);
                }}
                onSelectDish={handleSelectDish}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onAddToCart={handleAddToCart}
                likedDishIds={likedDishIds}
                onToggleLike={handleToggleLike}
              />
            </div>
          </div>
        )}

        {mobileTab === 'instamart' && (
          <div className="py-2.5 px-3 max-w-lg mx-auto">
            <InstamartMobileView
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onOpenCart={() => setIsCartOpen(true)}
              location={location}
            />
          </div>
        )}

        {mobileTab === 'feast' && (
          <div id="feast-estimator" className="w-full">
            <FeastEstimator onAddFeastToCart={handleAddFeastToCart} />
          </div>
        )}

        {mobileTab === 'dinein' && (
          <div className="w-full px-2 sm:px-4">
            <DineInView
              onOpenReservation={(venueName) => {
                setReservationVenueName(venueName);
                setIsReservationOpen(true);
              }}
              onSelectRestaurant={(restaurant) => {
                setSelectedRestaurant(restaurant);
                setInitialDishToOpen(null);
              }}
              location={location}
            />
          </div>
        )}

        {mobileTab === 'orders' && (
          <div className="py-4 px-3 max-w-lg mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Your Orders ({orders.length})
                </h2>
                <p className="text-xs text-slate-400">Live order status and previous history</p>
              </div>
              <span className="text-xs text-orange-600 dark:text-orange-400 font-bold">
                {orders.filter(o => o.status !== 'DELIVERED').length} Active
              </span>
            </div>

            {orders.length === 0 ? (
              <div className={`text-center py-12 rounded-xl border p-6 space-y-3 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <Bike className="w-10 h-10 text-orange-500 mx-auto" />
                <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  No active orders right now
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Order from top restaurants to track live GPS delivery.
                </p>
                <button
                  onClick={() => setMobileTab('delivery')}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  Browse Food
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {orders.map((order) => {
                  const isDelivered = order.status === 'DELIVERED';
                  return (
                    <div
                      key={order.id}
                      onClick={() => setTrackedOrder(order)}
                      className={`rounded-xl p-4 border shadow-xs hover:border-orange-500/50 cursor-pointer space-y-3 transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 text-white hover:border-orange-500/40' 
                          : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          isDelivered 
                            ? isDarkMode ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/60' : 'bg-emerald-100 text-emerald-800'
                            : isDarkMode ? 'bg-orange-950/70 text-orange-400 border border-orange-800/60 animate-pulse' : 'bg-orange-100 text-orange-800 animate-pulse'
                        }`}>
                          {isDelivered ? 'Delivered' : `Live: ${order.status}`}
                        </span>
                        <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                          #{order.id}
                        </span>
                      </div>

                      <div>
                        <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {order.restaurantName}
                        </h4>
                        <p className={`text-xs truncate mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {order.items.map(i => `${i.quantity}x ${i.dish.name}`).join(', ')}
                        </p>
                      </div>

                      <div className={`pt-2.5 border-t flex items-center justify-between text-xs ${
                        isDarkMode ? 'border-slate-800' : 'border-slate-100'
                      }`}>
                        <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          ${order.totalAmount.toFixed(2)}
                        </span>
                        <button className="bg-orange-600 text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1 shadow-xs">
                          <span>{isDelivered ? 'View Receipt' : 'Live GPS Track'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DESKTOP EXPERIENCE: Full-Bleed Fluid Luxury Layout */}
      <main className="hidden sm:block w-full">
        {/* Full-bleed, Big Hero Section */}
        <HeroSection
          location={location}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            const el = document.getElementById('restaurant-list-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenFoodieAi={() => setIsFoodieAiOpen(true)}
        />

        {/* Smooth Looping Marquee Ticker Banner */}
        <MarqueeTicker />

        {/* 10-Minute Munchies & Late Night Essentials Quick Bar */}
        <ExpressGroceryQuickBar onAddToCart={(dish, rId, rName) => handleAddToCart(dish, rId, rName)} />

        {/* Restaurant discovery and filtering section */}
        <div id="restaurant-list-section">
          <RestaurantList
            onSelectRestaurant={(restaurant) => {
              setSelectedRestaurant(restaurant);
              setInitialDishToOpen(null);
            }}
            onSelectDish={handleSelectDish}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            likedDishIds={likedDishIds}
            onToggleLike={handleToggleLike}
          />
        </div>

        {/* Interactive Feast & Party Estimator */}
        <div id="feast-estimator">
          <FeastEstimator onAddFeastToCart={handleAddFeastToCart} />
        </div>

        {/* Master Chefs & Culinary Artisans Showcase */}
        <div id="master-chefs">
          <MasterChefsSection onSelectRestaurant={(restaurant) => setSelectedRestaurant(restaurant)} />
        </div>

        {/* Immersive Culinary Storytelling Section */}
        <CulinaryStorySection />

        {/* CraveClub VIP Membership Pass */}
        <div id="crave-club">
          <CraveClubMembership />
        </div>

        {/* Animated Client Stories & Reviews Carousel */}
        <div id="reviews">
          <ReviewsCarousel />
        </div>

        {/* Clean, compact Footer on desktop */}
        <Footer />
      </main>

      {/* MOBILE ONLY: Native Bottom Navigation Tab Bar */}
      <MobileBottomNav
        activeTab={mobileTab}
        setActiveTab={setMobileTab}
        orders={orders}
      />

      {/* MOBILE ONLY: Sticky Floating Cart Bar */}
      <MobileCartBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating Quick Action Dock on Right Edge (Desktop only) */}
      <FloatingDock
        cartItems={cartItems}
        orders={orders}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFoodieAi={() => setIsFoodieAiOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Restaurant Menu Modal */}
      <RestaurantMenuModal
        restaurant={selectedRestaurant}
        initialDish={initialDishToOpen}
        onClose={() => {
          setSelectedRestaurant(null);
          setInitialDishToOpen(null);
        }}
        cartItems={cartItems}
        onAddToCart={(dish, rest) => handleAddToCart(dish, rest.id, rest.name)}
        onRemoveFromCart={handleRemoveFromCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Dine-In Table Booking Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => {
          setIsReservationOpen(false);
          setReservationVenueName(undefined);
        }}
        initialRestaurantName={reservationVenueName}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAddToCart={(dish, rId, rName) => handleAddToCart(dish, rId, rName)}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
        onCheckout={handleCheckout}
        location={location}
      />

      {/* Orders List Drawer */}
      <OrdersDrawer
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onSelectOrder={(order) => setTrackedOrder(order)}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        order={trackedOrder}
        onClose={() => setTrackedOrder(null)}
        onAdvanceOrderStatus={handleAdvanceOrderStatus}
      />

      {/* Foodie AI Concierge Modal */}
      <FoodieAiModal
        isOpen={isFoodieAiOpen}
        onClose={() => setIsFoodieAiOpen(false)}
        onSelectRestaurant={(restaurant) => {
          setSelectedRestaurant(restaurant);
          setIsFoodieAiOpen(false);
        }}
      />
        </>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black">Welcome Back</h3>
              <button onClick={() => setIsLoginOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
              setCurrentUser({ name: 'Madhusudan Sharma', email: 'madhusudan04337@gmail.com', avatar: 'MS' });
              setIsLoginOpen(false);
            }} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                <input type="email" required defaultValue="madhusudan04337@gmail.com" className="w-full mt-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Password</label>
                <input type="password" required defaultValue="••••••••" className="w-full mt-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
              </div>
              <button type="submit" className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30">
                Sign In
              </button>
            </form>
            <div className="text-center text-xs text-slate-400">
              Don't have an account?{' '}
              <button onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} className="text-orange-400 font-bold hover:underline">
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black">Create Rasora Account</h3>
              <button onClick={() => setIsRegisterOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
              setCurrentUser({ name: 'New Foodie', email: 'foodie@cravedrop.com', avatar: 'NF' });
              setIsRegisterOpen(false);
            }} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                <input type="text" required placeholder="John Doe" className="w-full mt-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                <input type="email" required placeholder="john@example.com" className="w-full mt-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Password</label>
                <input type="password" required placeholder="••••••••" className="w-full mt-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
              </div>
              <button type="submit" className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30">
                Register & Join
              </button>
            </form>
            <div className="text-center text-xs text-slate-400">
              Already have an account?{' '}
              <button onClick={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }} className="text-orange-400 font-bold hover:underline">
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-black">User Profile & Account</h3>
              <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <ProfileView location={location} />

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentUser(null);
                  setIsProfileOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/20"
              >
                Sign Out
              </button>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
