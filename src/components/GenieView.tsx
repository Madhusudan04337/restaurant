import React, { useState } from 'react';
import { Package, MapPin, CheckCircle2 } from 'lucide-react';

export const GenieView: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [itemDetails, setItemDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !drop) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20">
      
      <div className="bg-amber-600 text-white p-6 rounded-xl space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-700 px-2 py-0.5 rounded">Genie Service</span>
        <h1 className="text-xl font-bold">Pickup & Drop Parcels</h1>
        <p className="text-xs text-amber-100">Send packages, food, or documents anywhere across town instantly.</p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-xl p-8 text-center border border-slate-200 space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Partner Assigned!</h3>
          <p className="text-xs text-slate-600">Alex (Honda Activa • 4.9⭐) is heading to your pickup location.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-orange-600 text-white font-bold px-4 py-2 rounded-lg text-xs"
          >
            Book Another Task
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase">Pickup Location</label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="e.g., Home or office address"
              required
              className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase">Drop Location</label>
            <input
              type="text"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="e.g., Destination address"
              required
              className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase">Item Details</label>
            <textarea
              value={itemDetails}
              onChange={(e) => setItemDetails(e.target.value)}
              placeholder="What are you sending?"
              rows={2}
              required
              className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg text-xs"
          >
            Find Delivery Partner
          </button>
        </form>
      )}

    </div>
  );
};
