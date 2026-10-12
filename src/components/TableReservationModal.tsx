import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Utensils } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [fullName, setFullName] = useState('Priya Sharma');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS[0].name);
  const [reservationDate, setReservationDate] = useState('2026-10-14');
  const [guestCount, setGuestCount] = useState('2 Guests');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('8:00 PM');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const timeSlots = ['12:30 PM', '1:30 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 block">
              DINE-IN RESERVATION
            </span>
            <h2 className="text-xl font-black text-slate-900">Book Your Table</h2>
          </div>
          <button 
            onClick={() => {
              setConfirmed(false);
              onClose();
            }} 
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Table Reserved Successfully!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Confirmation sent for <strong className="text-slate-800">{fullName}</strong> at <strong className="text-orange-600">{selectedRestaurant}</strong> for {guestCount} on {reservationDate} at {selectedTimeSlot}.
              </p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl text-xs font-bold text-orange-800">
              Booking ID: #CRAVE-TBL-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <button
              onClick={() => {
                setConfirmed(false);
                onClose();
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 rounded-2xl text-xs uppercase"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase">Select Restaurant *</label>
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
              >
                {RESTAURANTS.map((r) => (
                  <option key={r.id} value={r.name}>{r.name} ({r.cuisine[0]})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Date *</label>
                <input
                  type="date"
                  required
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Party Size *</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                >
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8+ Party Group</option>
                </select>
              </div>
            </div>

            {/* Time Slot Buttons */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1.5">
                Choose Time Slot *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                      selectedTimeSlot === slot
                        ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all mt-2"
            >
              Confirm Table Reservation
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
