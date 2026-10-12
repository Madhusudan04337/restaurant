import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

interface ProfileViewProps {
  location: string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ location }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 bg-slate-950 text-white min-h-screen px-4">
      
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex items-center space-x-5">
        <div className="w-16 h-16 rounded-2xl bg-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center">
          MS
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Madhusudan Sharma</h2>
          <p className="text-xs text-amber-400">Le Palais Gold Gourmet Member</p>
          <div className="flex items-center space-x-2 mt-2 text-xs text-slate-400">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>madhusudan04337@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Delivery Address</h3>
        <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800">{location}</p>
      </div>

    </div>
  );
};
