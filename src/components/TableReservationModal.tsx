import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Utensils } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { isDarkMode } = useTheme();
  const [fullName, setFullName] = useState('Priya Sharma');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS[0].name);
  const [reservationDate, setReservationDate] = useState('2026-10-14');
  const [guestCount, setGuestCount] = useState('2 Guests');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('8:00 PM');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 border transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-white shadow-black/80' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block">
              DINE-IN RESERVATION
            </span>
            <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Book Your Table</h2>
          </div>
          <button 
            onClick={() => {
              setConfirmed(false);
              onClose();
            }} 
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Table Reserved Successfully!</h3>
              <p className={`text-xs max-w-sm mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Confirmation sent for <strong className={isDarkMode ? 'text-white' : 'text-slate-800'}>{fullName}</strong> at <strong className="text-orange-600 dark:text-orange-400">{selectedRestaurant}</strong> for {guestCount} on {reservationDate} at {selectedTimeSlot}.
              </p>
            </div>
            <div className={`p-3 border rounded-2xl text-xs font-bold ${
              isDarkMode ? 'bg-slate-950 border-orange-500/30 text-orange-400' : 'bg-orange-50 border-orange-200 text-orange-800'
            }`}>
              Booking ID: #CRAVE-TBL-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <button
              onClick={() => {
                setConfirmed(false);
                onClose();
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3.5 rounded-2xl text-xs uppercase"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full mt-1 p-3 border rounded-xl text-xs font-bold focus:outline-hidden focus:border-orange-500 ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Phone Number *</label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={`w-full mt-1 p-3 border rounded-xl text-xs font-bold focus:outline-hidden focus:border-orange-500 ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Select Restaurant *</label>
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className={`w-full mt-1 p-3 border rounded-xl text-xs font-bold focus:outline-hidden focus:border-orange-500 ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-white' 
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                {RESTAURANTS.map((r) => (
                  <option key={r.id} value={r.name} className={isDarkMode ? 'bg-slate-900 text-white' : ''}>
                    {r.name} ({r.cuisine[0]})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Date *</label>
                <input
                  type="date"
                  required
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  className={`w-full mt-1 p-3 border rounded-xl text-xs font-bold focus:outline-hidden focus:border-orange-500 ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-800 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Party Size *</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className={`w-full mt-1 p-3 border rounded-xl text-xs font-bold focus:outline-hidden focus:border-orange-500 ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-800 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option className={isDarkMode ? 'bg-slate-900' : ''}>2 Guests</option>
                  <option className={isDarkMode ? 'bg-slate-900' : ''}>4 Guests</option>
                  <option className={isDarkMode ? 'bg-slate-900' : ''}>6 Guests</option>
                  <option className={isDarkMode ? 'bg-slate-900' : ''}>8+ Guests (VIP Table)</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Time Slot *</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {['12:30 PM', '1:30 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedTimeSlot === slot
                        ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                        : isDarkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-transform active:scale-98"
            >
              Confirm Dine-in Reservation
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
