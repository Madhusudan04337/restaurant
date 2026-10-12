import React from 'react';
import { Award, Star, Flame, Utensils, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANTS } from '../data/mockData';
import { Restaurant } from '../types';

interface MasterChefsSectionProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const MasterChefsSection: React.FC<MasterChefsSectionProps> = ({ onSelectRestaurant }) => {
  const chefs = [
    {
      id: 'chef-1',
      name: 'Chef Antoine Laurent',
      title: 'Executive French & Truffle Curator',
      experience: '18 Years Experience',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400',
      restaurantId: 'rest-3',
      signatureDish: 'The Truffle Royale Smashed Burger',
      bio: 'Trained at Le Cordon Bleu Paris. Renowned for elevating street classics with black Périgord winter truffles and house-fermented brioche.'
    },
    {
      id: 'chef-2',
      name: 'Ustad Kareem Khan',
      title: 'Royal Dum Biryani Custodian',
      experience: '24 Years Experience',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=400',
      restaurantId: 'rest-1',
      signatureDish: 'Hyderabadi Chicken Dum Biryani',
      bio: 'Custodian of 4th-generation royal Mughal spice blends. Masters the ancient slow-coal clay handi technique with Kashmiri saffron.'
    },
    {
      id: 'chef-3',
      name: 'Pizzaiolo Marco Bellini',
      title: 'Naples Certified Master Pizzaiolo',
      experience: '15 Years Experience',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=400',
      restaurantId: 'rest-2',
      signatureDish: 'Margherita di Bufala',
      bio: 'Born in Campania, Italy. Ferments artisan sourdough for 48 hours and bakes in a 900°F oakwood fire oven for an authentic leopard crust.'
    },
    {
      id: 'chef-4',
      name: 'Chef Kenji Sato',
      title: 'Omakase & Kaiseki Sushi Master',
      experience: '20 Years Experience',
      image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&q=80&w=400',
      restaurantId: 'rest-4',
      signatureDish: 'Dragon Roll & Tonkotsu Ramen',
      bio: 'Slices wild-caught Pacific bluefin tuna flown in daily from Toyosu Market, paired with seasoned Akazu red rice vinegar.'
    }
  ];

  const handleChefClick = (restaurantId: string) => {
    const matched = RESTAURANTS.find(r => r.id === restaurantId);
    if (matched) {
      onSelectRestaurant(matched);
    }
  };

  return (
    <section id="master-chefs" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-orange-600">
            THE CULINARY ARTISANS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Meet Our Master Chefs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Visionary culinary artists dedicated to fresh ingredients, authentic traditions, and unforgettable dining delivered directly to your doorstep.
          </p>
        </div>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                {/* Photo with experience badge */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center space-x-1 shadow-md">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{chef.experience}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                      {chef.name}
                    </h3>
                    <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mt-0.5">
                      {chef.title}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {chef.bio}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Signature Creation:</span>
                    <span className="text-xs font-bold text-slate-800">{chef.signatureDish}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleChefClick(chef.restaurantId)}
                  className="w-full bg-slate-900 hover:bg-orange-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-1.5"
                >
                  <span>Taste Chef's Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
