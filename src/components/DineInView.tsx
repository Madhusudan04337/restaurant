import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  Star, 
  MapPin, 
  ArrowRight, 
  Check, 
  Utensils, 
  Wine, 
  Flame, 
  Percent, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import { Restaurant } from '../types';
import { useTheme } from '../context/ThemeContext';
import { MasterChefsSection } from './MasterChefsSection';
import { CraveClubMembership } from './CraveClubMembership';

interface DineInViewProps {
  onOpenReservation: (restaurantName?: string) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  location: string;
}

export const DineInView: React.FC<DineInViewProps> = ({
  onOpenReservation,
  onSelectRestaurant,
  location
}) => {
  const { isDarkMode } = useTheme();

  // Quick Table Finder State
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('8:00 PM');
  const [selectedGuests, setSelectedGuests] = useState('2 Guests');
  const [selectedMood, setSelectedMood] = useState('all');

  // Mood filter definitions
  const moods = [
    { id: 'all', label: 'All Dining Venues', icon: '🍽️' },
    { id: 'fine', label: 'Fine Dining & Luxury', icon: '🌟' },
    { id: 'rooftop', label: 'Rooftop Cityscape', icon: '🌆' },
    { id: 'romantic', label: 'Romantic Candlelight', icon: '🕯️' },
    { id: 'woodfired', label: 'Woodfired & Wine', icon: '🍕' },
    { id: 'casual', label: 'Vibrant Lounges', icon: '🥂' }
  ];

  // Enriched venue data for Dine-In experience
  const dineInVenues = useMemo(() => {
    return RESTAURANTS.map((r, idx) => {
      const ambiances = [
        ['Rooftop Seating', 'Live Sitar & Tabla Fri-Sat', 'Valet Parking', 'Royal Clay Oven'],
        ['Romantic Candlelight', 'Woodfired Oak Oven', 'Sommelier Wine List', 'Outdoor Patio'],
        ['Gourmet Bistro', 'Craft Beer on Tap', 'Late Night Vinyl Music', 'Pet-Friendly Terrace'],
        ['Kaiseki Omakase Counter', 'Private Dining Booths', 'Sake Flight Tasting', 'Zen Garden View'],
        ['Sunlit Botanical Glasshouse', 'Organic Cold Bar', 'Artisanal Mocktails', 'Garden Terrace'],
        ['Chic Parisian Bistro', 'Outdoor Street Tables', 'Artisanal Espresso Bar', 'French Bakery Aisle']
      ][idx % 6];

      const dineInOffers = [
        'Flat 25% OFF with CraveClub Gold',
        'Complimentary Bottle of Wine for Tables of 4+',
        'Flat 20% OFF on Total Bill + Free Dessert',
        'Chef Complimentary Amuse-Bouche on Booking',
        'Flat 15% OFF + Free Artisan Cold Press',
        'Complimentary Macaron Tasting Platter'
      ][idx % 6];

      const moodsMatched = [
        ['all', 'fine', 'romantic'],
        ['all', 'woodfired', 'romantic', 'rooftop'],
        ['all', 'casual', 'rooftop'],
        ['all', 'fine', 'romantic'],
        ['all', 'casual'],
        ['all', 'romantic', 'casual']
      ][idx % 6];

      return {
        ...r,
        ambiances,
        dineInOffer: dineInOffers,
        moodsMatched,
        availableSlots: ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:15 PM'],
        tablesRemaining: [3, 2, 5, 1, 4, 2][idx % 6]
      };
    });
  }, []);

  const filteredVenues = useMemo(() => {
    if (selectedMood === 'all') return dineInVenues;
    return dineInVenues.filter(v => v.moodsMatched.includes(selectedMood));
  }, [dineInVenues, selectedMood]);

  return (
    <div className="space-y-8 sm:space-y-14 pb-16">
      
      {/* 1. Fluid Luxury Hero with Ambient Gradients (No poster cutout!) */}
      <section className={`relative pt-5 pb-8 sm:py-14 px-3 sm:px-6 rounded-3xl overflow-hidden transition-colors duration-300 border ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#0f1b3b] via-[#0b1329] to-[#0b1329] border-blue-900/40 text-white' 
          : 'bg-gradient-to-b from-orange-50/80 via-amber-50/30 to-[#faf8f5] border-stone-200/80 text-slate-900'
      }`}>
        {/* Soft background ambient glow */}
        <div className={`absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none ${
          isDarkMode ? 'bg-orange-600/10' : 'bg-orange-300/25'
        }`} />
        <div className={`absolute bottom-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none ${
          isDarkMode ? 'bg-amber-600/10' : 'bg-amber-200/20'
        }`} />

        <div className="max-w-4xl mx-auto space-y-5 text-center relative z-10">
          
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-xs border">
            <span className={isDarkMode ? 'text-amber-400 bg-amber-950/60 border-amber-800/60' : 'text-amber-800 bg-amber-100 border-amber-200'}>
              ✨ VIP TABLE RESERVATIONS & DINING PASSES
            </span>
          </div>

          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Reserve Your Prime Table
          </h1>

          <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Skip waiting lines, unlock instant dining confirmation, and save up to 30% on your total dining bill with CraveClub VIP privileges.
          </p>

          {/* Quick Interactive Table Booking Bar */}
          <div className={`p-3 sm:p-4 rounded-2xl border transition-all mt-6 max-w-3xl mx-auto text-left shadow-lg ${
            isDarkMode 
              ? 'bg-slate-950/90 border-slate-800 shadow-black/40' 
              : 'bg-white/95 border-orange-200/80 shadow-orange-500/5'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-3 items-center">
              
              {/* Date */}
              <div className={`p-2.5 rounded-xl border flex items-center space-x-2.5 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-900 dark:text-white"
                  >
                    <option value="Today" className="dark:bg-slate-900">Today, Oct 14</option>
                    <option value="Tomorrow" className="dark:bg-slate-900">Tomorrow, Oct 15</option>
                    <option value="Friday" className="dark:bg-slate-900">This Friday</option>
                    <option value="Saturday" className="dark:bg-slate-900">This Saturday</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className={`p-2.5 rounded-xl border flex items-center space-x-2.5 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <Users className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Guests</span>
                  <select
                    value={selectedGuests}
                    onChange={(e) => setSelectedGuests(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-900 dark:text-white"
                  >
                    <option value="1 Guest" className="dark:bg-slate-900">1 Guest (Solo)</option>
                    <option value="2 Guests" className="dark:bg-slate-900">2 Guests (Couple)</option>
                    <option value="4 Guests" className="dark:bg-slate-900">4 Guests (Family)</option>
                    <option value="6+ Guests" className="dark:bg-slate-900">6+ Guests (Party)</option>
                  </select>
                </div>
              </div>

              {/* Time */}
              <div className={`p-2.5 rounded-xl border flex items-center space-x-2.5 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Slot</span>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-900 dark:text-white"
                  >
                    <option value="7:00 PM" className="dark:bg-slate-900">7:00 PM</option>
                    <option value="7:30 PM" className="dark:bg-slate-900">7:30 PM</option>
                    <option value="8:00 PM" className="dark:bg-slate-900">8:00 PM</option>
                    <option value="8:30 PM" className="dark:bg-slate-900">8:30 PM</option>
                    <option value="9:00 PM" className="dark:bg-slate-900">9:00 PM</option>
                  </select>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onOpenReservation()}
                className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-orange-600/30 flex items-center justify-center space-x-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <span>Book Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 2. Dining Experience Mood Filters */}
      <section className="space-y-3 px-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Browse by Dining Experience
            </h3>
            <p className="text-xs text-slate-500 font-medium">Curated table settings tailored to your occasion</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {moods.map((m) => {
            const active = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 border cursor-pointer ${
                  active 
                    ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/25 font-black' 
                    : isDarkMode 
                      ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-orange-200 shadow-xs'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Curated Dine-In Venues Grid */}
      <section className="space-y-4 px-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Premier Dine-In Kitchens ({filteredVenues.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Verified top-rated establishments offering instant table reservation confirmation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group shadow-sm hover:shadow-xl ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-white hover:border-slate-700' 
                  : 'bg-white border-slate-200/90 text-slate-900 hover:border-orange-200'
              }`}
            >
              {/* Venue Cover Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <img
                  src={venue.image}
                  alt={venue.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Rating Badge */}
                <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-xs font-black px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>{venue.rating}</span>
                  <span className="text-[10px] opacity-80 font-normal">({venue.ratingCount})</span>
                </div>

                {/* Tables Remaining Badge */}
                <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-xs">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>{venue.tablesRemaining} tables left tonight</span>
                </div>

                {/* Cost For Two & Address */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="drop-shadow truncate max-w-[180px]">{venue.costForTwo}</span>
                  <span className="text-[11px] opacity-90 drop-shadow truncate">{venue.address}</span>
                </div>
              </div>

              {/* Details & Offers */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`text-base sm:text-lg font-black group-hover:text-orange-500 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {venue.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {venue.cuisine.join(' · ')}
                  </p>
                </div>

                {/* Ambiance tags */}
                <div className="flex flex-wrap gap-1.5">
                  {venue.ambiances.map((amb, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-300' 
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {amb}
                    </span>
                  ))}
                </div>

                {/* CraveClub Exclusive Dine-In Discount Banner */}
                <div className={`p-2.5 rounded-xl border flex items-center space-x-2 text-xs font-bold ${
                  isDarkMode 
                    ? 'bg-orange-950/40 border-orange-900/50 text-orange-300' 
                    : 'bg-orange-50 border-orange-200 text-orange-900'
                }`}>
                  <Percent className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="line-clamp-1">{venue.dineInOffer}</span>
                </div>

                {/* Available Slots */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Fast Slots for {selectedDate}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {venue.availableSlots.map((slot, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => onOpenReservation(venue.name)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          slot === selectedTime 
                            ? 'bg-orange-600 text-white border-orange-600 shadow-xs' 
                            : isDarkMode 
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-orange-500' 
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-orange-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Reserve Table & Explore Menu */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onOpenReservation(venue.name)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs transition-all flex items-center justify-center space-x-1 cursor-pointer active:scale-98"
                  >
                    <span>Reserve Table</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectRestaurant(venue)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isDarkMode 
                        ? 'border-slate-700 hover:bg-slate-800 text-slate-200' 
                        : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    View Menu
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Auto-scrolling Culinary Artisans Carousel */}
      <section className="space-y-2">
        <MasterChefsSection onSelectRestaurant={onSelectRestaurant} />
      </section>

      {/* 5. CraveClub VIP Dining Privileges */}
      <section className="space-y-2">
        <CraveClubMembership />
      </section>

    </div>
  );
};
