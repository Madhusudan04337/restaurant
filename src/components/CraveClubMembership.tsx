import React, { useState } from 'react';
import { Crown, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const CraveClubMembership: React.FC = () => {
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
    <section id="crave-club" className="py-8 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>PRIVILEGED VIP MEMBERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            CraveClub VIP Passes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Elevate your culinary journey with unlimited free deliveries, VIP priority kitchen preparation, exclusive secret menus, and flat dining bill discounts.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-orange-600 text-white shadow-xs font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                billingCycle === 'annual' ? 'bg-orange-600 text-white shadow-xs font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-md">SAVE 25%</span>
            </button>
          </div>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
            const isHighlight = tier.highlight;

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -4 }}
                className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  isHighlight
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border border-orange-500 shadow-xl shadow-orange-600/15'
                    : 'bg-slate-900/80 border border-slate-800'
                }`}
              >
                {/* Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    isHighlight ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tier.badge}
                  </span>
                  {isHighlight && <Sparkles className="w-4 h-4 text-amber-400" />}
                </div>

                {/* Plan Title & Price */}
                <div className="space-y-2 pb-5 border-b border-slate-800">
                  <h3 className="text-xl sm:text-2xl font-black text-white">{tier.name}</h3>
                  <p className="text-xs text-slate-400 font-normal">{tier.subtitle}</p>

                  <div className="flex items-baseline space-x-1 pt-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">${price.toFixed(2)}</span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <span className="text-[10px] text-emerald-400 font-semibold block">
                      Billed annually (${(price * 12).toFixed(2)}/yr)
                    </span>
                  )}
                </div>

                {/* Feature checklist */}
                <div className="py-5 space-y-3 flex-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Privileges Included:</span>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isHighlight ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-relaxed font-normal">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button
                    onClick={() => handleJoin(tier.name)}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all transform active:scale-98 shadow-md cursor-pointer ${
                      isHighlight
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-orange-600/25'
                        : 'bg-white hover:bg-orange-50 text-slate-900'
                    }`}
                  >
                    {joinedSuccess === tier.name ? (
                      <span className="text-emerald-300">✓ Welcome to {tier.name}!</span>
                    ) : (
                      <span>Join {tier.name}</span>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2">Cancel anytime with 1 click</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
