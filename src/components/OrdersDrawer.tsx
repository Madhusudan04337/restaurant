import React from 'react';
import { X, Clock, ArrowRight, CheckCircle2, Bike } from 'lucide-react';
import { Order } from '../types';

interface OrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export const OrdersDrawer: React.FC<OrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <h2 className="text-base font-black text-slate-900">Your Orders ({orders.length})</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-20 space-y-2">
              <p className="text-xs font-bold text-slate-800">No active or past orders</p>
              <p className="text-xs text-slate-500">Place an order to track live delivery.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const isDelivered = order.status === 'DELIVERED';
                return (
                  <div
                    key={order.id}
                    onClick={() => {
                      onSelectOrder(order);
                      onClose();
                    }}
                    className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-orange-500 hover:shadow-md cursor-pointer transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isDelivered ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800 animate-pulse'
                      }`}>
                        {order.status === 'DELIVERED' ? 'Delivered' : `Live: ${order.status}`}
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold">#{order.id}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900">{order.restaurantName}</h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {order.items.map(i => `${i.quantity}x ${i.dish.name}`).join(', ')}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Total Paid</span>
                        <span className="font-black text-slate-900">${order.totalAmount.toFixed(2)}</span>
                      </div>

                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-sm">
                        <span>{isDelivered ? 'View Details' : 'Track Live'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
