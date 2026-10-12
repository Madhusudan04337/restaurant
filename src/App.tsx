import React, { useState } from 'react';
import { Restaurant, MenuItem, CartItem, Order } from './types';
import { RESTAURANTS, FEAST_OPTIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { RestaurantList } from './components/RestaurantList';
import { FeastEstimator } from './components/FeastEstimator';
import { ExpressGroceryQuickBar } from './components/ExpressGroceryQuickBar';
import { MasterChefsSection } from './components/MasterChefsSection';
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
import { Bike, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { isDarkMode } = useTheme();
  const [location, setLocation] = useState('Downtown Metro Center');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileTab, setMobileTab] = useState<MobileTab>('delivery');

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      dish: {
        id: 'item-101',
        name: 'Hyderabadi Chicken Dum Biryani',
        description: 'Fragrant basmati rice layered with marinated chicken',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
        isVeg: false,
        category: 'Biryani'
      },
      restaurantId: 'rest-1',
      restaurantName: 'The Royal Biryani & Kebabs',
      quantity: 1
    }
  ]);

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFoodieAiOpen, setIsFoodieAiOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);

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
            restaurantName: 'CraveDrop Party Kitchen',
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
    <div className={`min-h-screen font-sans selection:bg-orange-500 selection:text-white relative pb-20 sm:pb-0 overflow-x-hidden transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Sticky Top Header */}
      <Navbar
        location={location}
        setLocation={setLocation}
        cartItems={cartItems}
        orders={orders}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFoodieAi={() => setIsFoodieAiOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* MOBILE EXPERIENCE: Tab-based Ergonomic View (Eliminates Endless Doom-Scrolling!) */}
      <div className="sm:hidden w-full">
        {mobileTab === 'delivery' && (
          <div className="space-y-4">
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
                onSelectRestaurant={(restaurant) => setSelectedRestaurant(restaurant)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        )}

        {mobileTab === 'instamart' && (
          <div className="py-4 px-2 space-y-4">
            <div className="p-4 bg-orange-600 text-white rounded-2xl shadow-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-200">10-MINUTE STORE</span>
              <h2 className="text-xl font-black">CraveMart Express</h2>
              <p className="text-xs text-orange-100">Midnight snacks, artisanal desserts & cold brews delivered in 10 minutes.</p>
            </div>
            <ExpressGroceryQuickBar onAddToCart={(dish, rId, rName) => handleAddToCart(dish, rId, rName)} />
          </div>
        )}

        {mobileTab === 'feast' && (
          <div className="py-2">
            <FeastEstimator onAddFeastToCart={handleAddFeastToCart} />
          </div>
        )}

        {mobileTab === 'dinein' && (
          <div className="space-y-6 pb-6">
            <div className="p-4 bg-slate-900 text-white rounded-b-3xl text-center space-y-2 border-b border-slate-800">
              <span className="text-[10px] font-black uppercase text-amber-400">VIP DINING PRIVILEGES</span>
              <h2 className="text-xl font-black">Table Booking & CraveClub</h2>
              <button
                onClick={() => setIsReservationOpen(true)}
                className="mt-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase shadow-md active:scale-95 transition-transform"
              >
                Reserve a Table Now
              </button>
            </div>
            <CraveClubMembership />
            <MasterChefsSection onSelectRestaurant={(restaurant) => setSelectedRestaurant(restaurant)} />
          </div>
        )}

        {mobileTab === 'orders' && (
          <div className="py-6 px-4 max-w-lg mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Your Orders ({orders.length})
              </h2>
              <span className="text-xs text-orange-600 dark:text-orange-400 font-bold">
                {orders.filter(o => o.status !== 'DELIVERED').length} Active
              </span>
            </div>

            {orders.length === 0 ? (
              <div className={`text-center py-16 rounded-3xl border p-6 space-y-2 ${
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
                  className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Browse Food
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => {
                  const isDelivered = order.status === 'DELIVERED';
                  return (
                    <div
                      key={order.id}
                      onClick={() => setTrackedOrder(order)}
                      className={`rounded-2xl p-4 border shadow-xs hover:border-orange-500 cursor-pointer space-y-3 transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 text-white hover:border-orange-500/40' 
                          : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          isDelivered 
                            ? isDarkMode ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/60' : 'bg-emerald-100 text-emerald-800'
                            : isDarkMode ? 'bg-orange-950/70 text-orange-400 border border-orange-800/60 animate-pulse' : 'bg-orange-100 text-orange-800 animate-pulse'
                        }`}>
                          {isDelivered ? 'Delivered' : `Live: ${order.status}`}
                        </span>
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
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

                      <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                        isDarkMode ? 'border-slate-800' : 'border-slate-100'
                      }`}>
                        <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          ${order.totalAmount.toFixed(2)}
                        </span>
                        <button className="bg-orange-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-xs">
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
            onSelectRestaurant={(restaurant) => setSelectedRestaurant(restaurant)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
          />
        </div>

        {/* Interactive Feast & Party Estimator */}
        <FeastEstimator onAddFeastToCart={handleAddFeastToCart} />

        {/* Master Chefs & Culinary Artisans Showcase */}
        <MasterChefsSection onSelectRestaurant={(restaurant) => setSelectedRestaurant(restaurant)} />

        {/* CraveClub VIP Membership Pass */}
        <CraveClubMembership />

        {/* Animated Client Stories & Reviews Carousel */}
        <ReviewsCarousel />

        {/* Clean, compact Footer on desktop */}
        <Footer />
      </main>

      {/* MOBILE ONLY: Native Bottom Navigation Tab Bar (Swiggy/Zomato App Style) */}
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
        onClose={() => setSelectedRestaurant(null)}
        cartItems={cartItems}
        onAddToCart={(dish, rest) => handleAddToCart(dish, rest.id, rest.name)}
        onRemoveFromCart={handleRemoveFromCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Dine-In Table Booking Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
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
    </div>
  );
}
