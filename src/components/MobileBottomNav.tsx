import React from 'react';
import { Utensils, Zap, Users, Crown, Bike } from 'lucide-react';
import { Order } from '../types';

export type MobileTab = 'delivery' | 'instamart' | 'feast' | 'dinein' | 'orders';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  setActiveTab: (tab: MobileTab) => void;
  orders: Order[];
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  orders
}) => {
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED').length;

  const tabs: { id: MobileTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'delivery', label: 'Delivery', icon: Utensils },
    { id: 'instamart', label: 'InstaMart', icon: Zap },
    { id: 'feast', label: 'Feast', icon: Users },
    { id: 'dinein', label: 'Dine-In', icon: Crown },
    { id: 'orders', label: 'Orders', icon: Bike, badge: activeOrdersCount }
  ];

  return (
    <nav 
      aria-label="Mobile Navigation" 
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-1.5 px-2 safe-area-pb"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive 
                  ? 'text-orange-600 font-black scale-105' 
                  : 'text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
