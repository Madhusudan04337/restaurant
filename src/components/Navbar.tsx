import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  Clock, 
  ChevronDown, 
  X, 
  Calendar, 
  Sun, 
  Moon, 
  ArrowRight,
  Navigation,
  LocateFixed,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
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
  const { isDarkMode, toggleTheme } = useTheme();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);
  const [activeNav, setActiveNav] = useState('home');
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    'Green Park Avenue',
    'Financial District Plaza',
    'Tech Hub South Bay'
  ];

  const handleDetectLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus({
        message: 'Geolocation is not supported by your browser.',
        type: 'error'
      });
      return;
    }

    setIsLocating(true);
    setLocationStatus({
      message: 'Accessing GPS satellites & locating...',
      type: 'info'
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt reverse geocoding via OpenStreetMap Nominatim
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            { 
              signal: controller.signal,
              headers: {
                'Accept': 'application/json'
              }
            }
          );
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const addr = data.address || {};
            const resolvedCity = 
              addr.neighbourhood || 
              addr.suburb || 
              addr.residential ||
              addr.city_district || 
              addr.city || 
              addr.town || 
              addr.village || 
              addr.county;

            const stateOrCountry = addr.state || addr.country || '';
            const formatted = resolvedCity 
              ? `${resolvedCity}${stateOrCountry ? `, ${stateOrCountry}` : ''}`
              : `Current Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`;

            setLocation(formatted);
            setTempLocation(formatted);
            setLocationStatus({
              message: `Live Location Detected: ${formatted}`,
              type: 'success'
            });
            setTimeout(() => {
              setShowLocationModal(false);
              setLocationStatus(null);
            }, 1200);
          } else {
            throw new Error('Nominatim returned error');
          }
        } catch {
          // Fallback to high-accuracy coordinates
          const coordinateStr = `GPS: Near ${latitude.toFixed(2)}°N, ${Math.abs(longitude).toFixed(2)}°W`;
          setLocation(coordinateStr);
          setTempLocation(coordinateStr);
          setLocationStatus({
            message: `Detected coordinates: ${coordinateStr}`,
            type: 'success'
          });
          setTimeout(() => {
            setShowLocationModal(false);
            setLocationStatus(null);
          }, 1200);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus({
            message: 'Location permission was denied. Please allow location access in your browser settings.',
            type: 'error'
          });
        } else if (error.code === error.TIMEOUT) {
          setLocationStatus({
            message: 'Location request timed out. Please select from popular areas below.',
            type: 'error'
          });
        } else {
          setLocationStatus({
            message: 'Unable to retrieve your location. Please choose from popular areas.',
            type: 'error'
          });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b ${
      isScrolled ? 'backdrop-blur-xl shadow-xl' : 'backdrop-blur-md shadow-xs'
    } ${
      isDarkMode 
        ? 'bg-[#0b1329] border-blue-900/40 text-white shadow-blue-950/60' 
        : 'bg-white border-slate-200/80 text-slate-900'
    }`}>
      {/* Top Utility Announcement Ticker - collapses on scroll */}
      <div className={`overflow-hidden transition-all duration-300 ${
        isScrolled ? 'max-h-0 opacity-0 py-0 border-none' : 'max-h-12 opacity-100 py-1.5 border-b'
      } ${
        isDarkMode ? 'bg-[#0f1b3b] border-blue-900/30 text-amber-200' : 'bg-orange-50/90 border-orange-100 text-orange-900'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 truncate min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0"></span>
            <span className="truncate text-[11px] sm:text-xs">
              ⚡ Free Express Delivery on orders over $30 · Code <strong className="font-bold underline">CRAVE20</strong>
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] shrink-0">
            <button 
              onClick={() => {
                setShowLocationModal(true);
                setLocationStatus(null);
              }} 
              className="hover:underline flex items-center space-x-1 font-bold text-orange-600 dark:text-orange-400 cursor-pointer"
              title="Click to detect or change delivery location"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-[200px]">Deliver: {location}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-18 gap-2 sm:gap-4">
          
          {/* Logo & Mobile Location Trigger */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8 min-w-0">
            <a href="#" className="flex items-center space-x-2 shrink-0 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform">
                C
              </div>
              <div className="text-left hidden xs:block">
                <span className={`text-base sm:text-xl font-black tracking-tight transition-colors ${
                  isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-slate-900 group-hover:text-orange-600'
                }`}>
                  Crave<span className="text-orange-600">Drop</span>
                </span>
                <span className="block text-[8px] font-extrabold text-orange-500 uppercase tracking-widest leading-none">
                  Gourmet Marketplace
                </span>
              </div>
            </a>

            {/* Location Selector Button (Adaptive: both mobile and desktop) */}
            <button
              onClick={() => {
                setShowLocationModal(true);
                setLocationStatus(null);
              }}
              className={`flex items-center space-x-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl border text-left cursor-pointer shrink-0 max-w-[140px] xs:max-w-[180px] sm:max-w-xs ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:bg-slate-800 hover:border-slate-700' 
                  : 'bg-slate-50 border-slate-200/90 hover:bg-orange-50/50 hover:border-orange-300'
              }`}
              title="Change or detect live location"
            >
              <div className="p-1 rounded-lg bg-orange-500/10 text-orange-500 shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1">
                  <span className={`text-[11px] sm:text-xs font-bold truncate ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {location}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium hidden sm:block">
                  Live GPS · 25-30m
                </span>
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  activeNav === link.id
                    ? isDarkMode 
                      ? 'text-orange-400 font-bold bg-orange-500/10' 
                      : 'text-orange-600 font-bold bg-orange-50'
                    : isDarkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle & Auth / Profile Buttons - Guaranteed Mobile Visibility */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* 1-Click Instant Theme Toggle: Sun (Dark Mode) <-> Moon (Light Mode) */}
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to Sunlit Light mode' : 'Switch to Midnight Dark mode'}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border cursor-pointer active:scale-90 shadow-xs group ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800 hover:border-amber-400/50' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-orange-50 hover:border-orange-300 shadow-sm'
              }`}
              title={isDarkMode ? 'Switch to Sunlit Light Theme' : 'Switch to Midnight Dark Theme'}
            >
              <span>
                {isDarkMode ? (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-slate-700 text-slate-700" />
                )}
              </span>
            </button>

            {isLoggedIn && currentUser ? (
              <button
                onClick={onOpenProfile}
                className={`flex items-center space-x-1.5 sm:space-x-2 py-1.5 px-2 sm:px-3 rounded-xl border text-xs font-bold cursor-pointer ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-white hover:border-orange-500' 
                    : 'bg-orange-50 border-orange-200 text-slate-900 hover:border-orange-400'
                }`}
                title="View Account Profile"
              >
                <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-xs">
                  {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[110px] truncate">{currentUser.name}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={onOpenLogin}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'text-slate-200 hover:text-white hover:bg-slate-900 border border-transparent' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={onOpenRegister}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-600/20 transition-all cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Geolocation & Delivery Address Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 border animate-in fade-in zoom-in-95 duration-200 ${
            isDarkMode 
              ? 'bg-slate-900 text-white border-slate-800 shadow-black/80' 
              : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/40 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <h3 className="text-base font-black">Choose Delivery Location</h3>
              </div>
              <button 
                onClick={() => {
                  setShowLocationModal(false);
                  setLocationStatus(null);
                }} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* LIVE GPS LOCATION DETECT BUTTON - Hero Action */}
            <div className="space-y-2">
              <button
                onClick={handleDetectLiveLocation}
                disabled={isLocating}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-600/30 flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer disabled:opacity-75"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Detecting GPS Location...</span>
                  </>
                ) : (
                  <>
                    <LocateFixed className="w-4 h-4 text-amber-200 animate-pulse" />
                    <span>Detect Live Location (GPS)</span>
                  </>
                )}
              </button>

              {/* Status Alert Message */}
              {locationStatus && (
                <div className={`p-2.5 rounded-xl text-xs flex items-start space-x-2 font-medium ${
                  locationStatus.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : locationStatus.type === 'error'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20'
                }`}>
                  {locationStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{locationStatus.message}</span>
                </div>
              )}
            </div>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className={`px-2 text-[10px] font-bold uppercase tracking-wider absolute ${
                isDarkMode ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400'
              }`}>
                or enter manually
              </span>
            </div>

            {/* Manual input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                placeholder="Search area, landmark or street"
                className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500 ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Popular Locations */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Popular Service Hubs
              </span>
              <div className="max-h-44 overflow-y-auto space-y-1 pr-1 scrollbar-none">
                {popularLocations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setTempLocation(loc);
                      setLocation(loc);
                      setShowLocationModal(false);
                      setLocationStatus(null);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs font-semibold flex justify-between items-center transition-colors cursor-pointer ${
                      isDarkMode 
                        ? 'hover:bg-slate-800 text-slate-200' 
                        : 'hover:bg-orange-50 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{loc}</span>
                    </span>
                    <span className="text-orange-500 font-bold text-[10px]">Select</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (tempLocation.trim()) {
                  setLocation(tempLocation.trim());
                  setShowLocationModal(false);
                  setLocationStatus(null);
                }
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
