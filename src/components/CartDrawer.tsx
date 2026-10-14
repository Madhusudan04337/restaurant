import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Tag, ArrowRight, CheckCircle2, Bike } from 'lucide-react';
import { CartItem, Order, MenuItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (dish: MenuItem, restaurantId: string, restaurantName: string) => void;
  onRemoveFromCart: (dishId: string) => void;
  onClearCart: () => void;
  onCheckout: (order: Order) => void;
  location: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onCheckout,
  location
}) => {
  const { isDarkMode } = useTheme();
  const [coupon, setCoupon] = useState('CRAVE50');
  const [couponApplied, setCouponApplied] = useState(false);
  const [tip, setTip] = useState(2.00);
  const [deliveryInstruction, setDeliveryInstruction] = useState('Leave at door');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, i) => acc + (i.dish.price * i.quantity), 0);
  const deliveryFee = subtotal > 25 ? 0 : 2.99;
  const taxes = subtotal * 0.08;
  const discount = couponApplied ? Math.min(subtotal * 0.5, 10) : 0;
  const total = Math.max(0, subtotal + deliveryFee + taxes + tip - discount);

  const restaurantName = cartItems[0]?.restaurantName || 'Selected Restaurant';
  const restaurantId = cartItems[0]?.restaurantId || 'rest-1';

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'CRAVE50' || coupon.trim().toUpperCase() === 'BITE50') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try CRAVE50');
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      items: [...cartItems],
      restaurantId,
      restaurantName,
      totalAmount: total,
      status: 'PLACED',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryAddress: location,
      etaMinutes: 26,
      driver: {
        name: 'Alex Johnson',
        phone: '+1 (555) 234-5678',
        vehicle: 'Honda Activa (NY-4921)',
        rating: 4.9
      }
    };

    onCheckout(newOrder);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div className={`w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-l border-slate-800 text-white shadow-black/80' 
          : 'bg-white border-l border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <div>
              <h2 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Your Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
              <p className={`text-[10px] font-bold truncate max-w-[200px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                From {restaurantName}
              </p>
            </div>
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

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                🛒
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Your cart is empty
              </h3>
              <p className={`text-xs max-w-xs mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Discover mouthwatering dishes from top restaurants and add them to your cart.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Itemized list */}
              <div className="space-y-3">
                {cartItems.map((cartItem) => (
                  <div 
                    key={cartItem.dish.id} 
                    className={`flex items-center justify-between py-3 border-b ${
                      isDarkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
                      <img 
                        src={cartItem.dish.image} 
                        alt={cartItem.dish.name} 
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover shrink-0" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200';
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {cartItem.dish.name}
                        </h4>
                        <p className="text-xs font-black text-orange-600 dark:text-orange-400">
                          ${cartItem.dish.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-orange-600 text-white px-1.5 py-1 rounded-xl text-xs font-bold shrink-0 shadow-xs">
                      <button 
                        onClick={() => onRemoveFromCart(cartItem.dish.id)} 
                        className="w-7 h-7 flex items-center justify-center hover:bg-orange-700 rounded-lg cursor-pointer transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center font-black">{cartItem.quantity}</span>
                      <button 
                        onClick={() => onAddToCart(cartItem.dish, cartItem.restaurantId, cartItem.restaurantName)} 
                        className="w-7 h-7 flex items-center justify-center hover:bg-orange-700 rounded-lg cursor-pointer transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code section */}
              <div className="pt-2 space-y-1.5">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon (CRAVE50)"
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs font-bold uppercase tracking-wider ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-orange-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-orange-500'
                      }`}
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-emerald-500 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>50% discount applied! You saved ${discount.toFixed(2)}</span>
                  </p>
                )}
              </div>

              {/* Delivery Instruction */}
              <div className="pt-2 space-y-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Delivery Instruction
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Leave at door', 'Ring doorbell', 'Call me'].map((inst) => (
                    <button
                      key={inst}
                      onClick={() => setDeliveryInstruction(inst)}
                      className={`p-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                        deliveryInstruction === inst 
                          ? isDarkMode 
                            ? 'bg-orange-950/60 border-orange-500 text-orange-300' 
                            : 'bg-orange-50 border-orange-500 text-orange-700'
                          : isDarkMode 
                            ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {inst}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tip Selection */}
              <div className="pt-2 space-y-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Delivery Partner Tip
                </label>
                <div className="flex space-x-2">
                  {[1.00, 2.00, 5.00].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTip(t)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        tip === t 
                          ? 'bg-orange-600 border-orange-600 text-white shadow-xs' 
                          : isDarkMode
                            ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      ${t.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill Details */}
              <div className={`p-4 rounded-xl space-y-2 text-xs pt-4 border ${
                isDarkMode 
                  ? 'bg-slate-950/80 border-slate-800 text-slate-300' 
                  : 'bg-slate-50 border-slate-100 text-slate-600'
              }`}>
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-500">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Restaurant Packing</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Tip</span>
                  <span>${tip.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-500 font-bold">
                    <span>Coupon Discount (CRAVE50)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className={`pt-2 border-t flex justify-between font-black text-sm ${
                  isDarkMode ? 'border-slate-800 text-white' : 'border-slate-200 text-slate-900'
                }`}>
                  <span>To Pay</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Checkout Footer */}
        {cartItems.length > 0 && (
          <div className={`p-4 sm:p-5 border-t space-y-3 ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
          }`}>
            <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="truncate">Delivering to <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>{location}</strong></span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-orange-600/30 uppercase text-xs tracking-wider flex items-center justify-center space-x-2 active:scale-98 transition-transform cursor-pointer"
            >
              <span>Place Order • ${total.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
