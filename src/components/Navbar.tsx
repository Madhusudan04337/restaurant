import React, { useState } from 'react';
import { MapPin, Search, ShoppingBag, Sparkles, Clock, ChevronDown, X, Calendar, Sun, Moon, ArrowRight } from 'lucide-react';
import { CartItem, Order } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  location: string;
  setLocation: (loc: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isLoggedIn: boolean;
  currentUser: { name: string; email: string; avatar: string } | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  location,
  setLocation,
  searchQuery,
  setSearchQuery,
  isLoggedIn,
  currentUser,
  onOpenLogin,
  onOpenRegister,
  onOpenProfile
}) => {
  const { isDarkMode } = useTheme();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);
  const [activeNav, setActiveNav] = useState('home');

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
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-950/90 border-slate-800/80 text-white shadow-2xl shadow-black/40' 
        : 'bg-white/90 border-slate-200/80 text-slate-900 shadow-sm'
    }`}>
      {/* Top Utility Announcement Ticker */}
      <div className={`hidden sm:block py-1.5 px-4 text-center text-xs font-medium border-b transition-colors ${
        isDarkMode ? 'bg-orange-950/30 border-orange-900/30 text-orange-300' : 'bg-orange-50/80 border-orange-100 text-orange-900'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span>⚡ Free Express Delivery on orders over $30 · Use code <strong className="font-bold underline">CRAVE20</strong> for 20% off</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <button onClick={() => setShowLocationModal(true)} className="hover:underline flex items-center space-x-1 font-semibold text-orange-600 dark:text-orange-400">
              <MapPin className="w-3 h-3" />
              <span>Deliver to: {location}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Location Dropdown */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                C
              </div>
              <div className="text-left">
                <span className={`text-xl font-black tracking-tight transition-colors ${
                  isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-slate-900 group-hover:text-orange-600'
                }`}>
                  Crave<span className="text-orange-600">Drop</span>
                </span>
                <span className="block text-[8px] font-extrabold text-orange-500 uppercase tracking-widest leading-none">
                  Gourmet Marketplace
                </span>
              </div>
            </a>

            {/* Location Selector Button */}
            <button
              onClick={() => setShowLocationModal(true)}
              className={`hidden md:flex items-center space-x-2 py-1.5 px-3 rounded-xl border transition-all text-left ${
                isDarkMode 
                  ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 hover:border-slate-700' 
                  : 'bg-slate-50 border-slate-200/80 hover:bg-orange-50/50 hover:border-orange-200'
              }`}
            >
              <div className="p-1 rounded-lg bg-orange-500/10 text-orange-500">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className={`text-xs font-bold truncate max-w-[140px] ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {location}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Est. 25-30 min</span>
              </div>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveNav(link.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                  activeNav === link.id
                    ? isDarkMode 
                      ? 'text-orange-400 font-bold bg-orange-500/10' 
                      : 'text-orange-600 font-bold bg-orange-50'
                    : isDarkMode 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900/50' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth & User Profile Buttons */}
          <div className="flex items-center space-x-2">
            {isLoggedIn && currentUser ? (
              <button
                onClick={onOpenProfile}
                className={`flex items-center space-x-2 py-1.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-white hover:border-orange-500' 
                    : 'bg-orange-50 border-orange-200 text-slate-900 hover:border-orange-400'
                }`}
                title="View User Profile"
              >
                <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center text-[10px] font-black">
                  {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{currentUser.name}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenLogin}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={onOpenRegister}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20 transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border ${
            isDarkMode 
              ? 'bg-slate-900 text-white border-slate-800' 
              : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black">Change Delivery Address</h3>
              <button onClick={() => setShowLocationModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              placeholder="Enter area, street, or city"
              className={`w-full p-3 border rounded-xl text-xs font-semibold ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Popular Areas</span>
              {popularLocations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setTempLocation(loc)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold flex justify-between items-center transition-colors ${
                    isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-orange-50 text-slate-700'
                  }`}
                >
                  <span>{loc}</span>
                  <span className="text-orange-500 font-bold text-[10px]">Select</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setLocation(tempLocation);
                setShowLocationModal(false);
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-orange-600/30"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
