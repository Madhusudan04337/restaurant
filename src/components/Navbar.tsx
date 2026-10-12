import React, { useState, useEffect } from 'react';
import { MapPin, Search, ShoppingBag, Sparkles, Clock, ChevronDown, X, Calendar } from 'lucide-react';
import { CartItem, Order } from '../types';

interface NavbarProps {
  location: string;
  setLocation: (loc: string) => void;
  cartItems: CartItem[];
  orders: Order[];
  onOpenCart: () => void;
  onOpenFoodieAi: () => void;
  onOpenOrders: () => void;
  onOpenReservation: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  location,
  setLocation,
  cartItems,
  orders,
  onOpenCart,
  onOpenFoodieAi,
  onOpenOrders,
  onOpenReservation,
  searchQuery,
  setSearchQuery
}) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);
  const [activeNav, setActiveNav] = useState('home');

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const activeOrders = orders.filter(o => o.status !== 'DELIVERED');

  const navLinks = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'restaurants', label: 'Restaurants', href: '#restaurant-list-section' },
    { id: 'feast-estimator', label: 'Party Estimator', href: '#feast-estimator' },
    { id: 'master-chefs', label: 'Chefs', href: '#master-chefs' },
    { id: 'crave-club', label: 'CraveClub', href: '#crave-club' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' }
  ];

  const popularLocations = [
    'Downtown Metro Center',
    'Westside Promenade',
    'East End Residential',
    'Uptown Heights',
    'Green Park Avenue'
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Location */}
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                C
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                  Crave<span className="text-orange-600">Drop</span>
                </span>
                <span className="block text-[9px] font-bold text-orange-600 uppercase tracking-widest">
                  Food & Dining
                </span>
              </div>
            </a>

            {/* Location Selector */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="hidden lg:flex items-center space-x-2 py-1 px-2.5 rounded-xl hover:bg-orange-50 border border-slate-200 hover:border-orange-200 transition-colors text-left"
            >
              <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                    {location}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-500 font-medium">25-30m delivery</span>
              </div>
            </button>
          </div>

          {/* Navigation Links with Scroll-Spy & Active Pill */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveNav(link.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeNav === link.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-orange-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Foodie AI Assistant */}
            <button
              onClick={onOpenFoodieAi}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 transition-all transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Foodie AI</span>
            </button>

            {/* Book Table Button (Like in the video at 00:00 / 00:36!) */}
            <button
              onClick={onOpenReservation}
              className="hidden lg:flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-black shadow-sm transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Table</span>
            </button>

            {/* Orders */}
            <button
              onClick={onOpenOrders}
              className="relative p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center space-x-1 text-xs font-bold"
              title="Your Orders"
            >
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="hidden xl:inline">Orders</span>
              {activeOrders.length > 0 && (
                <span className="bg-orange-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1">
                  {activeOrders.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-1.5 bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-orange-600 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Change Delivery Address</h3>
              <button onClick={() => setShowLocationModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              placeholder="Enter area, street, or city"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold"
            />

            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Popular Areas</span>
              {popularLocations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setTempLocation(loc)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-orange-50 text-xs font-semibold text-slate-700 flex justify-between items-center"
                >
                  <span>{loc}</span>
                  <span className="text-orange-600 font-bold text-[10px]">Select</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setLocation(tempLocation);
                setShowLocationModal(false);
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3 rounded-2xl text-xs uppercase shadow-md shadow-orange-600/30"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
