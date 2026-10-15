import React, { useState } from 'react';
import { Crown, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const CraveClubMembership: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activePlan, setActivePlan] = useState<string>('gold');
  const [joinedSuccess, setJoinedSuccess] = useState<string | null>(null);

  const tiers = [
    {
      id: 'silver',
      name: 'Silver Foodie',
      subtitle: 'For regular weekend food lovers',
      monthlyPrice: 9.99,
      annualPrice: 7.49,
      badge: 'Popular for Solo',
      features: [
        'Free Delivery on orders above $20',
        'Extra 10% OFF at 1,500+ restaurants',
        'Standard customer support queue',
        'Zero surge fees on rainy days'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Gourmet',
      subtitle: 'The quintessential VIP dining pass',
      monthlyPrice: 19.99,
      annualPrice: 14.99,
      badge: 'Most Loved • Best Value',
      highlight: true,
      features: [
        'Unlimited FREE Delivery on ALL orders (no minimum)',
        'Up to 30% FLAT discount on dining & delivery',
        'VIP Priority Kitchen Queue (5-10m faster delivery)',
        'Complimentary dessert or mocktail on dine-in',
        'Dedicated 24/7 VIP Concierge hotline'
      ]
    },
    {
      id: 'platinum',
      name: 'Black Platinum',
      subtitle: 'Ultra-exclusive fine dining privileges',
      monthlyPrice: 39.99,
      annualPrice: 29.99,
      badge: 'Michelin Privileges',
      features: [
        'All Gold Gourmet benefits included',
        'Personal Dedicated Butler Delivery Rider',
        'Guaranteed table reservations at Michelin venues',
        'Private Chef on-demand booking discounts',
        'Exclusive invitations to secret tasting events'
      ]
    }
  ];

  const handleJoin = (planName: string) => {
    setJoinedSuccess(planName);
    setTimeout(() => setJoinedSuccess(null), 3000);
  };

  return (
    <section 
      id="crave-club" 
      className={`py-8 sm:py-20 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#0b1329] via-[#0e1938] to-[#0b1329] text-white' 
          : 'bg-[#faf8f5] text-slate-900'
      }`}
    >
      {/* Background gradients */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none transition-opacity ${
        isDarkMode ? 'bg-orange-600/10' : 'bg-gradient-to-br from-amber-200/25 to-orange-200/20'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs">
            <span className={isDarkMode ? 'text-amber-400 bg-amber-950/60 border-amber-800/60' : 'text-amber-800 bg-amber-100 border-amber-200'}>
              👑 PRIVILEGED VIP MEMBERSHIP
            </span>
          </div>

          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            CraveClub VIP Passes
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed max-w-xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Elevate your dining journey with unlimited free deliveries, priority kitchen prep, exclusive secret menus, and flat dining bill discounts.
          </p>

          {/* Billing Cycle Toggle */}
          <div className={`inline-flex items-center p-1 rounded-2xl border transition-colors mt-3 shadow-xs ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-100'
          }`}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' 
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                billingCycle === 'annual' 
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-md">SAVE 25%</span>
            </button>
          </div>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
            const isHighlight = tier.highlight;

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -4 }}
                className={`rounded-2xl p-5 sm:p-7 flex flex-col justify-between transition-all relative border shadow-lg ${
                  isHighlight
                    ? isDarkMode
                      ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-orange-500 shadow-orange-600/15'
                      : 'bg-gradient-to-b from-white via-orange-50/20 to-white border-orange-400 shadow-orange-500/10'
                    : isDarkMode
                      ? 'bg-slate-900/80 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                    isHighlight ? 'bg-orange-600 text-white shadow-xs' : isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {tier.badge}
                  </span>
                  {isHighlight && <Sparkles className="w-4 h-4 text-amber-500" />}
                </div>

                {/* Plan Title & Price */}
                <div className={`space-y-2 pb-5 border-b ${
                  isDarkMode ? 'border-slate-800' : 'border-orange-100'
                }`}>
                  <h3 className={`text-xl sm:text-2xl font-serif font-black ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>{tier.name}</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{tier.subtitle}</p>

                  <div className="flex items-baseline space-x-1 pt-2">
                    <span className={`text-3xl sm:text-4xl font-black ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>${price.toFixed(2)}</span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                      Billed annually (${(price * 12).toFixed(2)}/yr)
                    </span>
                  )}
                </div>

                {/* Feature checklist */}
                <div className="py-5 space-y-3 flex-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider block ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Privileges Included:
                  </span>
                  {tier.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-start space-x-2.5 text-xs font-semibold ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isHighlight 
                          ? 'bg-orange-600 text-white shadow-xs' 
                          : isDarkMode 
                            ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                            : 'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button
                    onClick={() => handleJoin(tier.name)}
                    className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all transform active:scale-98 shadow-md cursor-pointer ${
                      isHighlight
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-orange-600/30'
                        : isDarkMode
                          ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                          : 'bg-slate-900 hover:bg-orange-600 text-white border border-slate-900 shadow-sm'
                    }`}
                  >
                    {joinedSuccess === tier.name ? (
                      <span className="text-emerald-300">✓ Welcome to {tier.name}!</span>
                    ) : (
                      <span>Join {tier.name}</span>
                    )}
                  </button>
                  <p className={`text-[10px] text-center mt-2 ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Cancel anytime with 1 click
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
