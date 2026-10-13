import React, { useState } from 'react';
import {
  User,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  LogOut,
  ArrowLeft,
  Award,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Order } from '../types';

interface UserAccountPageProps {
  currentUser: { name: string; email: string; avatar: string } | null;
  location: string;
  setLocation: (loc: string) => void;
  orders: Order[];
  onSignOut: () => void;
  onBackToHome: () => void;
}

type TabId = 'profile' | 'orders' | 'addresses' | 'membership' | 'settings';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'membership', label: 'CraveClub', icon: Award },
  { id: 'settings', label: 'Settings', icon: ShieldCheck },
];

export const UserAccountPage: React.FC<UserAccountPageProps> = ({
  currentUser,
  location,
  setLocation,
  orders,
  onSignOut,
  onBackToHome,
}) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [savedLocationInput, setSavedLocationInput] = useState(location);
  const [successSaved, setSuccessSaved] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(savedLocationInput);
    setSuccessSaved(true);
    setTimeout(() => setSuccessSaved(false), 2000);
  };

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  // Shared theme-aware class helpers
  const borderSoft = isDarkMode ? 'border-slate-800' : 'border-slate-200';
  const card = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const innerCard = isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200';
  const inputBase = `w-full mt-1 p-3 min-h-[44px] rounded-xl border text-base sm:text-xs font-bold ${
    isDarkMode
      ? 'bg-slate-950 border-slate-800 text-white'
      : 'bg-slate-50 border-slate-200 text-slate-900'
  }`;
  const labelBase = 'text-[11px] font-extrabold uppercase text-slate-400';

  return (
    <div
      className={`min-h-[100dvh] py-6 sm:py-8 px-4 sm:px-6 lg:px-8 transition-colors ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Header Navigation */}
        <div className={`flex items-center justify-between gap-3 border-b pb-4 ${borderSoft}`}>
          <button
            onClick={onBackToHome}
            aria-label="Back to Marketplace"
            className={`flex items-center gap-2 px-4 min-h-[44px] rounded-xl text-xs font-bold border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to Marketplace</span>
          </button>

          <button
            onClick={onSignOut}
            aria-label="Sign Out"
            className="flex items-center gap-2 px-4 min-h-[44px] rounded-xl text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* User Card Banner */}
        <div
          className={`p-5 sm:p-8 rounded-3xl border shadow-xl flex items-center gap-4 sm:gap-5 transition-colors ${card}`}
        >
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-orange-600/30">
            {currentUser?.avatar || 'MS'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-black break-words">
                {currentUser?.name || 'Madhusudan Sharma'}
              </h1>
              <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                GOLD MEMBER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 truncate">
              {currentUser?.email || 'madhusudan04337@gmail.com'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>{orders.length} Orders Placed</span>
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>1,450 CravePoints</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation: own row, horizontally scrollable on mobile, labels always visible */}
        {/* Section switcher: no scrolling, no fixed bar. 3 columns on phones, inline row on larger screens */}
        <nav
          aria-label="Account sections"
          className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 min-h-[56px] sm:min-h-[44px] rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : isDarkMode
                    ? 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Content Panels */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'profile' && (
            <div className={`p-5 sm:p-8 rounded-2xl border space-y-6 ${card}`}>
              <h3 className={`text-base font-black border-b pb-3 ${borderSoft}`}>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="acc-name" className={labelBase}>
                    Full Name
                  </label>
                  <input
                    id="acc-name"
                    type="text"
                    defaultValue={currentUser?.name || 'Madhusudan Sharma'}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="acc-email" className={labelBase}>
                    Email Address
                  </label>
                  <input
                    id="acc-email"
                    type="email"
                    defaultValue={currentUser?.email || 'madhusudan04337@gmail.com'}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="acc-phone" className={labelBase}>
                    Phone Number
                  </label>
                  <input
                    id="acc-phone"
                    type="tel"
                    defaultValue="+1 (555) 382-9102"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="acc-since" className={labelBase}>
                    Member Since
                  </label>
                  <input
                    id="acc-since"
                    type="text"
                    disabled
                    defaultValue="October 2024"
                    className={`${inputBase} opacity-75 ${
                      isDarkMode ? 'text-slate-400' : 'bg-slate-100 text-slate-600'
                    }`}
                  />
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4">
                {profileSaved && (
                  <p className="text-[12px] text-emerald-400 font-bold text-center sm:text-right">
                    ✓ Profile changes saved!
                  </p>
                )}
                <button
                  onClick={handleSaveProfile}
                  className="w-full sm:w-auto px-6 min-h-[44px] bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/30 transition-all"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className={`p-5 sm:p-8 rounded-2xl border space-y-6 ${card}`}>
              <h3 className={`text-base font-black border-b pb-3 ${borderSoft}`}>
                Your Gourmet Orders
              </h3>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">
                    No orders placed yet. Explore restaurants and order now!
                  </p>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 ${innerCard}`}
                    >
                      <div className="min-w-0 w-full sm:w-auto">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black text-orange-500">
                            Order #{order.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              order.status === 'DELIVERED'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold mt-1 break-words">
                          {order.restaurantName}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 break-words">
                          {order.items.map((i) => `${i.quantity}x ${i.dish.name}`).join(', ')}
                        </p>
                      </div>
                      <div
                        className={`w-full sm:w-auto flex sm:block justify-between items-center sm:text-right pt-3 sm:pt-0 border-t sm:border-t-0 ${borderSoft}`}
                      >
                        <span className="text-sm font-black">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                        <p className="text-[11px] text-slate-500">{order.createdAt}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className={`p-5 sm:p-8 rounded-2xl border space-y-6 ${card}`}>
              <h3 className={`text-base font-black border-b pb-3 ${borderSoft}`}>
                Delivery Addresses
              </h3>
              <form onSubmit={handleSaveAddress} className="space-y-4 max-w-xl">
                <div>
                  <label htmlFor="acc-address" className={labelBase}>
                    Primary Delivery Location
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 mt-1">
                    <input
                      id="acc-address"
                      type="text"
                      value={savedLocationInput}
                      onChange={(e) => setSavedLocationInput(e.target.value)}
                      className={`${inputBase} mt-0 flex-1 min-w-0`}
                    />
                    <button
                      type="submit"
                      className="px-5 min-h-[44px] bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/30 whitespace-nowrap"
                    >
                      Update Address
                    </button>
                  </div>
                  {successSaved && (
                    <p className="text-[12px] text-emerald-400 mt-2 font-bold" role="status">
                      ✓ Address updated successfully!
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}

          {activeTab === 'membership' && (
            <div
              className={`p-5 sm:p-8 rounded-2xl border space-y-6 bg-gradient-to-br ${
                isDarkMode
                  ? 'from-amber-950/30 to-slate-900 border-amber-900/40'
                  : 'from-amber-50 to-white border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
                <div className="min-w-0">
                  <span className="text-[11px] font-black text-amber-500 uppercase tracking-widest">
                    VIP TIER
                  </span>
                  <h3 className="text-base sm:text-lg font-black mt-1 break-words">
                    CraveClub Gold Gourmet Membership
                  </h3>
                </div>
                <Award className="w-9 h-9 sm:w-10 sm:h-10 text-amber-500 shrink-0" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl border ${innerCard}`}>
                  <span className="text-xs font-bold text-amber-400">Free Express Delivery</span>
                  <p className="text-[12px] text-slate-400 mt-1">
                    Zero delivery fee on all orders above $15.
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${innerCard}`}>
                  <span className="text-xs font-bold text-amber-400">2x CravePoints</span>
                  <p className="text-[12px] text-slate-400 mt-1">
                    Earn double reward points on every gourmet dish.
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${innerCard}`}>
                  <span className="text-xs font-bold text-amber-400">Priority Table Booking</span>
                  <p className="text-[12px] text-slate-400 mt-1">
                    Instant VIP reservations at partner fine-dining venues.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={`p-5 sm:p-8 rounded-2xl border space-y-6 ${card}`}>
              <h3 className={`text-base font-black border-b pb-3 ${borderSoft}`}>
                Account Security &amp; Notifications
              </h3>
              <div className="space-y-4">
                <label
                  className={`flex items-center justify-between gap-4 p-4 min-h-[44px] rounded-xl border cursor-pointer transition-colors ${borderSoft} ${
                    isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold block">
                      Push Notifications for Order Updates
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Get instant alerts when driver arrives with your order
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="shrink-0 rounded accent-orange-600 w-5 h-5"
                  />
                </label>
                <label
                  className={`flex items-center justify-between gap-4 p-4 min-h-[44px] rounded-xl border cursor-pointer transition-colors ${borderSoft} ${
                    isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold block">Two-Factor Authentication (2FA)</span>
                    <span className="text-[11px] text-slate-400">
                      Secure your account with SMS verification codes
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    className="shrink-0 rounded accent-orange-600 w-5 h-5"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};