import React, { useState } from 'react';
import { X, CheckCircle2, Bike, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Order } from '../types';
import { useTheme } from '../context/ThemeContext';

interface OrderTrackerModalProps {
  order: Order | null;
  onClose: () => void;
  onAdvanceOrderStatus: (orderId: string) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  onClose,
  onAdvanceOrderStatus
}) => {
  const { isDarkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'driver', text: "Hello! I've picked up your food from the restaurant and am riding to your address." }
  ]);

  if (!order) return null;

  const steps = [
    { key: 'PLACED', title: 'Order Confirmed', desc: 'Restaurant accepted your order' },
    { key: 'PREPARING', title: 'Cooking in Kitchen', desc: 'Chefs are preparing fresh food' },
    { key: 'OUT_FOR_DELIVERY', title: 'Out for Delivery', desc: `${order.driver.name} is on the way` },
    { key: 'DELIVERED', title: 'Delivered', desc: 'Enjoy your hot meal!' }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'PLACED': return 0;
      case 'PREPARING': return 1;
      case 'OUT_FOR_DELIVERY': return 2;
      case 'DELIVERED': return 3;
      default: return 0;
    }
  };

  const currentIdx = getStepIndex(order.status);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    const sent = chatInput;
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'driver', text: `Got it! "${sent}" - See you in 5 mins!` }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className={`rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-black/80' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between pb-4 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div>
            <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Live CraveDrop Delivery Tracking
            </span>
            <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Order #{order.id}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          
          {/* Estimated Arrival Banner */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold text-orange-100 tracking-wider">Estimated Delivery Time</span>
              <h2 className="text-3xl font-black tracking-tight mt-0.5">
                {order.status === 'DELIVERED' ? 'Delivered!' : `${order.etaMinutes} mins`}
              </h2>
              <p className="text-xs text-orange-100 mt-1">From {order.restaurantName}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Bike className="w-8 h-8 text-white animate-bounce" />
            </div>
          </div>

          {/* Live Simulated GPS Map Route */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-black uppercase text-orange-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1"></span>
                <span>Live GPS Satellite Route</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-lg">
                Speed: 38 km/h
              </span>
            </div>

            {/* Stylized Visual Map Track */}
            <div className="relative h-24 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center px-6">
              {/* Route line */}
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1.5 bg-slate-800 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: currentIdx >= 2 ? '78%' : '35%' }}
                />
              </div>

              {/* Restaurant origin pin */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs shadow-md">
                  🏪
                </div>
                <span className="text-[9px] text-slate-400 font-bold mt-1">Kitchen</span>
              </div>

              {/* Moving Scooter Marker */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 z-10 flex flex-col items-center"
                style={{ left: currentIdx >= 2 ? '72%' : '32%' }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-orange-600 font-bold text-xs flex items-center justify-center shadow-lg border-2 border-orange-500 animate-pulse">
                  DEL
                </div>
                <span className="text-[9px] text-emerald-400 font-black mt-1">Rider</span>
              </div>

              {/* Destination home pin */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                  HOME
                </div>
                <span className="text-[9px] text-slate-400 font-bold mt-1">You</span>
              </div>
            </div>

            {/* Food Freshness & Insulated Thermal Bag Status */}
            <div className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-800/60 p-2.5 rounded-xl">
              <span className="font-bold text-amber-300">
                Thermal Insulated Bag: 68°C Hot
              </span>
              <span className="text-slate-400">100% Tamper-Proof Seal</span>
            </div>
          </div>

          <div className="space-y-3 px-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
              Live Delivery Status
            </span>
            <div className={`space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 ${
              isDarkMode ? 'before:bg-slate-800' : 'before:bg-slate-200'
            }`}>
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;
                return (
                  <div key={step.key} className="flex items-start space-x-3 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-black text-xs transition-all ${
                      isCompleted 
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-500/30' 
                        : isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <h5 className={`text-sm font-black ${
                        isCurrent ? 'text-orange-600 dark:text-orange-400' : isCompleted ? (isDarkMode ? 'text-slate-200' : 'text-slate-900') : 'text-slate-500'
                      }`}>
                        {step.title}
                      </h5>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simulate Next Step Button */}
          {order.status !== 'DELIVERED' && (
            <button
              onClick={() => onAdvanceOrderStatus(order.id)}
              className={`w-full font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <span>⚡ Fast-Forward Delivery Simulation</span>
            </button>
          )}

          {/* Driver details card */}
          <div className={`p-4 rounded-2xl flex items-center justify-between border ${
            isDarkMode 
              ? 'bg-slate-950 border-slate-800 text-white' 
              : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-600 text-white font-black rounded-2xl flex items-center justify-center text-xs shadow-md">
                DEL
              </div>
              <div>
                <h5 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.driver.name}</h5>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{order.driver.vehicle} • Rating {order.driver.rating}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-3 rounded-xl border shadow-xs transition-all ${
                  isDarkMode 
                    ? 'bg-slate-900 text-orange-400 border-slate-700 hover:bg-slate-800' 
                    : 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50'
                }`}
                title="Chat with rider"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <a
                href={`tel:${order.driver.phone}`}
                className="p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-md transition-all"
                title="Call rider"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Live Chat drawer */}
          {showChat && (
            <div className={`p-4 rounded-2xl space-y-3 border ${
              isDarkMode 
                ? 'bg-slate-950 border-slate-800 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className={`flex items-center justify-between border-b pb-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Chat with {order.driver.name}</span>
                <button onClick={() => setShowChat(false)} className="text-slate-400 hover:text-orange-500 text-xs font-bold">Close</button>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto text-xs">
                {messages.map((m, idx) => (
                  <div key={idx} className={`p-2.5 rounded-xl max-w-[80%] ${
                    m.sender === 'user' 
                      ? 'bg-orange-600 text-white ml-auto' 
                      : isDarkMode ? 'bg-slate-900 text-slate-200 border border-slate-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {m.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type message to delivery partner..."
                  className={`flex-1 p-2 border rounded-xl text-xs focus:outline-hidden ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <button type="submit" className="bg-orange-600 text-white px-3 py-2 rounded-xl text-xs font-bold">Send</button>
              </form>
            </div>
          )}

          {/* Address */}
          <div className={`p-4 rounded-2xl flex items-start space-x-3 text-xs border ${
            isDarkMode 
              ? 'bg-slate-950/80 border-slate-800 text-slate-300' 
              : 'bg-orange-50/50 border-orange-100 text-slate-800'
          }`}>
            <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <span className={`font-bold block ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Delivery Address</span>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{order.deliveryAddress}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
