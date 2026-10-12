import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="hidden sm:block bg-slate-950 text-slate-400 border-t border-slate-800/80 py-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand & Guarantee */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-sm">
            C
          </div>
          <div>
            <span className="font-black text-white text-sm">CraveDrop</span>
            <span className="text-[10px] text-slate-500 block">Fast 25-Min Restaurant Delivery</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex items-center space-x-6 text-xs font-semibold text-slate-400">
          <a href="#restaurant-list-section" className="hover:text-white transition-colors">Restaurants</a>
          <a href="#feast-estimator" className="hover:text-white transition-colors">Party Feast</a>
          <a href="#crave-club" className="hover:text-white transition-colors">CraveClub</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
        </div>

        {/* Hygiene Certification & Copyright */}
        <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Certified Food Hygiene Standard</span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 mt-4 border-t border-slate-900 text-center text-[10px] text-slate-600">
        © 2026 CraveDrop Food Delivery & Dining. All rights reserved.
      </div>
    </footer>
  );
};
