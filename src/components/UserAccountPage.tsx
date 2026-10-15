import React, { useState, useMemo } from 'react';
import {
  User,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  LogOut,
  ArrowLeft,
  Award,
  LocateFixed,
  Loader2,
  CheckCircle2,
  Heart,
  Plus,
  Check,
  Clock,
  Sparkles,
  ExternalLink,
  Flame,
  Utensils
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Order, MenuItem, Restaurant } from '../types';
import { RESTAURANTS } from '../data/mockData';

interface UserAccountPageProps {
  currentUser: { name: string; email: string; avatar: string } | null;
  location: string;
  setLocation: (loc: string) => void;
  orders: Order[];
  likedDishIds?: string[];
  onToggleLike?: (dishId: string) => void;
  onAddToCart?: (dish: MenuItem, restaurantId: string, restaurantName: string) => void;
  onSignOut: () => void;
  onBackToHome: () => void;
}

type TabId = 'profile' | 'favorites' | 'orders' | 'addresses' | 'membership' | 'settings';

export const UserAccountPage: React.FC<UserAccountPageProps> = ({
  currentUser,
  location,
  setLocation,
  orders,
  likedDishIds = ['item-101', 'item-201', 'item-301'],
  onToggleLike,
  onAddToCart,
  onSignOut,
  onBackToHome,
}) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [savedLocationInput, setSavedLocationInput] = useState(location);
  const [successSaved, setSuccessSaved] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);
  const [addedDishIds, setAddedDishIds] = useState<string[]>([]);

  // Collect all dishes with their parent restaurant across mock database
  const allDishesWithRestaurant = useMemo(() => {
    const list: { dish: MenuItem; restaurant: Restaurant }[] = [];
    RESTAURANTS.forEach(r => {
      r.menu.forEach(cat => {
        cat.items.forEach(item => {
          list.push({ dish: item, restaurant: r });
        });
      });
    });
    return list;
  }, []);

  // Filter dishes that the user has liked
  const likedDishes = useMemo(() => {
    return allDishesWithRestaurant.filter(d => likedDishIds.includes(d.dish.id));
  }, [allDishesWithRestaurant, likedDishIds]);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(savedLocationInput);
    setSuccessSaved(true);
    setTimeout(() => setSuccessSaved(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleQuickAdd = (dish: MenuItem, restaurant: Restaurant) => {
    if (onAddToCart) {
      onAddToCart(dish, restaurant.id, restaurant.name);
      setAddedDishIds(prev => [...prev, dish.id]);
      setTimeout(() => {
        setAddedDishIds(prev => prev.filter(id => id !== dish.id));
      }, 1500);
    }
  };

  const tabs: { id: TabId; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'favorites', label: 'Liked Dishes', icon: Heart, badge: likedDishIds.length },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: orders.length },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'membership', label: 'CraveClub', icon: Award },
    { id: 'settings', label: 'Settings', icon: ShieldCheck },
  ];

  // Theme-aware styles with high-contrast font scale
  const cardBg = isDarkMode ? 'bg-[#101b3b] border-blue-900/40 text-white' : 'bg-white border-stone-200/90 shadow-sm';
  const innerCardBg = isDarkMode ? 'bg-[#0b1329]/90 border-blue-900/30' : 'bg-[#faf8f5] border-stone-200/80';
  const labelClass = 'block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5';
  const inputClass = `w-full px-3.5 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
    isDarkMode 
      ? 'bg-[#0b1329] border-blue-900/40 text-white placeholder-blue-300/40 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30' 
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
  }`;

  return (
    <div
      className={`min-h-[100dvh] py-6 sm:py-10 px-3.5 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDarkMode ? 'bg-[#0b1329] text-white' : 'bg-[#faf8f5] text-slate-900'
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <button
            onClick={onBackToHome}
            aria-label="Back to Marketplace"
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Marketplace</span>
          </button>

          <button
            onClick={onSignOut}
            aria-label="Sign Out"
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* User Profile Card Banner */}
        <div className={`p-5 sm:p-7 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5 ${cardBg}`}>
          
          {/* Avatar Box */}
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-orange-600/30">
            {currentUser?.avatar && currentUser.avatar !== 'DU' ? currentUser.avatar : (currentUser?.name || 'User').slice(0, 2).toUpperCase()}
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {currentUser?.name || 'Default User'}
              </h1>
              <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                Gold Member
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {currentUser?.email || 'user@example.com'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold">
              <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
                <span>{orders.length} Orders Placed</span>
              </span>

              <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>{likedDishIds.length} Liked Dishes</span>
              </span>

              <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>1,450 CravePoints</span>
              </span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs: Horizontal Scrollable on Mobile, Grid on Desktop */}
        <nav
          aria-label="Account sections"
          className="flex sm:grid sm:grid-cols-6 overflow-x-auto pb-2 gap-2.5 scrollbar-none"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`shrink-0 sm:shrink flex items-center sm:flex-col items-center justify-center gap-2 sm:gap-1.5 py-3 px-4 sm:px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-600 shadow-md shadow-orange-600/25 font-black'
                    : isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-orange-200 hover:bg-orange-50/50 shadow-xs'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.id === 'favorites' ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`absolute -top-1.5 -right-2.5 text-[9px] font-black px-1.5 py-0.2 rounded-full leading-tight ${
                      isActive ? 'bg-white text-orange-600' : 'bg-orange-600 text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="whitespace-nowrap sm:truncate sm:w-full sm:text-center">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* TAB 1: PROFILE / PERSONAL INFO */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className={`p-5 sm:p-8 rounded-3xl border space-y-6 ${cardBg}`}>
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Personal Information
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Manage your name, contact details, and account preferences
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="acc-name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="acc-name"
                  type="text"
                  defaultValue={currentUser?.name || 'Default User'}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="acc-email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="acc-email"
                  type="email"
                  defaultValue={currentUser?.email || 'user@example.com'}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="acc-phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="acc-phone"
                  type="tel"
                  defaultValue="+1 (555) 382-9102"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="acc-since" className={labelClass}>
                  Member Since
                </label>
                <input
                  id="acc-since"
                  type="text"
                  disabled
                  defaultValue="October 2024 (Gold VIP Tier)"
                  className={`${inputClass} opacity-80 cursor-not-allowed ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-100'}`}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-medium">
                Your personal details are encrypted and never shared with third parties.
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {profileSaved && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Changes saved!</span>
                  </span>
                )}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-600/30 transition-all cursor-pointer active:scale-95"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: LIKED PRODUCTS / FAVORITES */}
        {activeTab === 'favorites' && (
          <div className={`p-5 sm:p-8 rounded-3xl border space-y-6 ${cardBg}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    Liked Dishes &amp; Favorites ({likedDishes.length})
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Your hand-picked gourmet selections. Easily reorder anytime with one tap.
                </p>
              </div>

              {likedDishes.length > 0 && (
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                  {likedDishes.length} Items Saved
                </span>
              )}
            </div>

            {likedDishes.length === 0 ? (
              <div className={`p-10 text-center rounded-2xl border space-y-4 ${innerCardBg}`}>
                <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center">
                  <Heart className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black">No Liked Dishes Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Tap the heart icon on any dish or kitchen while browsing to save your favorite cravings here.
                  </p>
                </div>
                <button
                  onClick={onBackToHome}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Explore Dishes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {likedDishes.map(({ dish, restaurant }) => {
                  const isJustAdded = addedDishIds.includes(dish.id);

                  return (
                    <div
                      key={dish.id}
                      className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group ${innerCardBg} hover:border-orange-300 dark:hover:border-slate-700 shadow-xs`}
                    >
                      {/* Image Box */}
                      <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400';
                          }}
                        />

                        {/* Unlike Button */}
                        <button
                          onClick={() => onToggleLike && onToggleLike(dish.id)}
                          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-rose-500 backdrop-blur-xs transition-transform active:scale-90 cursor-pointer shadow-xs"
                          title="Remove from favorites"
                        >
                          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        </button>

                        {/* Veg / Non-Veg Indicator */}
                        <div className="absolute top-2.5 left-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-1 rounded-md shadow-xs border border-slate-200 dark:border-slate-700">
                          <span className={`block w-2.5 h-2.5 rounded-full ${dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        </div>

                        {/* Prep Time */}
                        {dish.prepTime && (
                          <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-xs">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>{dish.prepTime}</span>
                          </div>
                        )}
                      </div>

                      {/* Content & Action */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block truncate">
                            {restaurant.name}
                          </span>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                            {dish.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                            {dish.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            ${dish.price.toFixed(2)}
                          </span>

                          <button
                            onClick={() => handleQuickAdd(dish, restaurant)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shadow-xs ${
                              isJustAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-orange-600 hover:bg-orange-700 text-white'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <span>ADD</span>
                                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className={`p-5 sm:p-8 rounded-3xl border space-y-6 ${cardBg}`}>
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Your Gourmet Orders ({orders.length})
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Track live preparation, delivery status, and view past receipts
              </p>
            </div>

            <div className="space-y-3.5">
              {orders.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">
                  No orders placed yet. Explore restaurants and order now!
                </p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${innerCardBg}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-orange-600 dark:text-orange-400">
                          Order #{order.id}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                            order.status === 'DELIVERED'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 animate-pulse'
                          }`}
                        >
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h4 className="text-sm font-black mt-1 text-slate-900 dark:text-white">
                        {order.restaurantName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {order.items.map((i) => `${i.quantity}x ${i.dish.name}`).join(', ')}
                      </p>
                    </div>

                    <div className="w-full sm:w-auto flex sm:block justify-between items-center sm:text-right pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                      <span className="text-base font-black text-slate-900 dark:text-white">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                      <p className="text-[11px] text-slate-400">{order.createdAt}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: ADDRESSES & LIVE GPS */}
        {activeTab === 'addresses' && (
          <div className={`p-5 sm:p-8 rounded-3xl border space-y-6 ${cardBg}`}>
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Delivery Addresses
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Set your primary doorstep location or detect your real-time GPS coordinates
              </p>
            </div>

            <div className="space-y-4 max-w-xl">
              <div>
                <label htmlFor="acc-address" className={labelClass}>
                  Primary Delivery Address
                </label>
                <form onSubmit={handleSaveAddress} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center w-full">
                    <div className="relative flex-1 min-w-0">
                      <MapPin className="w-4 h-4 text-orange-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="acc-address"
                        type="text"
                        value={savedLocationInput}
                        onChange={(e) => setSavedLocationInput(e.target.value)}
                        className={`${inputClass} pl-10`}
                        placeholder="Enter your street, neighborhood, or city"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-600/30 whitespace-nowrap cursor-pointer transition-all active:scale-95"
                    >
                      Update Address
                    </button>
                  </div>

                  {/* Live GPS Detection button */}
                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={isLocating}
                      onClick={() => {
                        if (!navigator.geolocation) {
                          setGpsMessage('Geolocation is not supported by your browser.');
                          return;
                        }
                        setIsLocating(true);
                        setGpsMessage('Detecting your GPS location...');

                        navigator.geolocation.getCurrentPosition(
                          async (pos) => {
                            const { latitude, longitude } = pos.coords;
                            try {
                              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`, { headers: { 'Accept': 'application/json' } });
                              if (res.ok) {
                                const data = await res.json();
                                const addr = data.address || {};
                                const city = addr.suburb || addr.neighbourhood || addr.city || addr.town || 'Downtown';
                                const state = addr.state || addr.country || '';
                                const locName = `${city}${state ? `, ${state}` : ''}`;
                                setSavedLocationInput(locName);
                                setLocation(locName);
                                setGpsMessage(`Live GPS location updated: ${locName}`);
                              } else {
                                throw new Error();
                              }
                            } catch {
                              const coord = `GPS: Near ${latitude.toFixed(2)}°N, ${Math.abs(longitude).toFixed(2)}°W`;
                              setSavedLocationInput(coord);
                              setLocation(coord);
                              setGpsMessage(`GPS coordinates updated: ${coord}`);
                            } finally {
                              setIsLocating(false);
                              setTimeout(() => setGpsMessage(null), 3000);
                            }
                          },
                          () => {
                            setIsLocating(false);
                            setGpsMessage('Unable to access location. Please check browser permissions.');
                            setTimeout(() => setGpsMessage(null), 3500);
                          },
                          { enableHighAccuracy: true, timeout: 8000 }
                        );
                      }}
                      className={`inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-950 border-slate-700 hover:border-orange-500 text-slate-200'
                          : 'bg-orange-50/70 border-orange-200 hover:bg-orange-100 text-orange-900'
                      }`}
                    >
                      {isLocating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                          <span>Detecting live GPS...</span>
                        </>
                      ) : (
                        <>
                          <LocateFixed className="w-4 h-4 text-orange-500" />
                          <span>Detect Live Location (GPS)</span>
                        </>
                      )}
                    </button>

                    {gpsMessage && (
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {gpsMessage}
                      </p>
                    )}
                  </div>
                </form>

                {successSaved && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-bold" role="status">
                    ✓ Address updated successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CRAVECLUB MEMBERSHIP */}
        {activeTab === 'membership' && (
          <div
            className={`p-5 sm:p-8 rounded-3xl border space-y-6 ${cardBg}`}
          >
            <div className="flex items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
              <div className="min-w-0">
                <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  VIP TIER STATUS
                </span>
                <h3 className="text-lg sm:text-2xl font-serif font-black mt-1 text-slate-900 dark:text-white">
                  CraveClub Gold Gourmet Pass
                </h3>
              </div>
              <Award className="w-10 h-10 text-amber-500 shrink-0" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border ${innerCardBg}`}>
                <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  Free Express Delivery
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Zero delivery fee on all orders above $15 from any gourmet kitchen.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${innerCardBg}`}>
                <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  2x CravePoints Multiplier
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Earn double rewards on every single order for instant checkout discounts.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${innerCardBg}`}>
                <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  Priority Table Reservations
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Instant guaranteed bookings and 20% off total bills on Dine-In.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className={`p-5 sm:p-8 rounded-3xl border space-y-6 ${cardBg}`}>
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Account Security &amp; Notifications
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Manage notifications, two-factor authentication, and security preferences
              </p>
            </div>

            <div className="space-y-3.5 max-w-xl">
              <label
                className={`flex items-center justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition-colors ${innerCardBg} hover:border-orange-300 dark:hover:border-slate-700`}
              >
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold block text-slate-900 dark:text-white">
                    Push Notifications for Order Updates
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                    Receive instant alerts when the chef starts cooking or driver nears your doorstep
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="shrink-0 rounded-md accent-orange-600 w-5 h-5 cursor-pointer"
                />
              </label>

              <label
                className={`flex items-center justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition-colors ${innerCardBg} hover:border-orange-300 dark:hover:border-slate-700`}
              >
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold block text-slate-900 dark:text-white">
                    Two-Factor Authentication (2FA)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                    Require SMS or authenticator code verification on new logins
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="shrink-0 rounded-md accent-orange-600 w-5 h-5 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};