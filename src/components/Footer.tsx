import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`hidden sm:block border-t py-8 text-xs ${
      isDarkMode 
        ? 'bg-[#070e22] text-slate-400 border-blue-950/60' 
        : 'bg-slate-100/90 text-slate-600 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand & Guarantee */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            C
          </div>
          <div>
            <span className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Rasora</span>
            <span className="text-[10px] text-slate-500 block">Fast 25-Min Restaurant Delivery</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className={`flex items-center space-x-6 text-xs font-semibold ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <a href="#restaurant-list-section" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Restaurants</a>
          <a href="#feast-estimator" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Party Feast</a>
          <a href="#crave-club" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">CraveClub</a>
          <a href="#reviews" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Reviews</a>
        </div>

        {/* Hygiene Certification & Copyright */}
        <div className="flex items-center space-x-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Certified Food Hygiene Standard</span>
        </div>

      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 mt-4 border-t text-center text-[10px] ${
        isDarkMode ? 'border-slate-900 text-slate-600' : 'border-slate-200/60 text-slate-500'
      }`}>
        © 2026 Rasora Food Delivery & Dining. All rights reserved.
      </div>
    </footer>
  );
};
