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
    <section id="crave-club" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>PRIVILEGED VIP MEMBERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            CraveClub VIP Passes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Elevate your culinary journey with unlimited free deliveries, VIP priority kitchen preparation, exclusive secret menus, and flat dining bill discounts.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                billingCycle === 'annual' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-md">SAVE 25%</span>
            </button>
          </div>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
            const isHighlight = tier.highlight;

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -6 }}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  isHighlight
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-orange-500 shadow-2xl shadow-orange-600/20'
                    : 'bg-slate-900/80 border border-slate-800'
                }`}
              >
                {/* Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                    isHighlight ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tier.badge}
                  </span>
                  {isHighlight && <Sparkles className="w-5 h-5 text-amber-400" />}
                </div>

                {/* Plan Title & Price */}
                <div className="space-y-3 pb-6 border-b border-slate-800">
                  <h3 className="text-xl sm:text-2xl font-black text-white">{tier.name}</h3>
                  <p className="text-xs text-slate-400">{tier.subtitle}</p>

                  <div className="flex items-baseline space-x-1 pt-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">${price.toFixed(2)}</span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <span className="text-[10px] text-emerald-400 font-bold block">
                      Billed annually ($&zwj;{(price * 12).toFixed(2)}/yr)
                    </span>
                  )}
                </div>

                {/* Feature checklist */}
                <div className="py-6 space-y-3.5 flex-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Privileges Included:</span>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs text-slate-200">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isHighlight ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'
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
                    className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all transform active:scale-95 shadow-lg ${
                      isHighlight
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-orange-600/30'
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
