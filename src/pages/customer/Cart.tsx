import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartSubtotal, cartTotal, settings, navigate } = useApp();

  const freeDeliveryDiff = Math.max(0, settings.freeDeliveryThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / settings.freeDeliveryThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#E8EFE3] text-[#214E34] rounded-3xl flex items-center justify-center mx-auto text-3xl font-serif">
          🛒
        </div>
        <h2 className="font-serif font-bold text-3xl text-[#242B25]">Your shopping cart is empty</h2>
        <p className="text-sm text-[#687168] max-w-md mx-auto">
          Explore our fresh harvest catalog and add farm-fresh vegetables, fruits, and dairy to your cart.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="bg-[#214E34] text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#163D2A] transition shadow-lg inline-flex items-center gap-2"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-[#E4E8DF] pb-6">
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block mb-1">
            Review Selection
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
            Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-700 hover:text-red-900 transition flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      {/* Free delivery progress */}
      <div className="bg-[#E8EFE3]/60 border border-[#E4E8DF] p-4 rounded-2xl space-y-2">
        <div className="flex justify-between text-xs font-medium text-[#242B25]">
          <span>
            {freeDeliveryDiff === 0
              ? '🎉 You qualify for FREE doorstep delivery!'
              : `Add ₹${freeDeliveryDiff} more for FREE delivery!`}
          </span>
          <span className="font-bold text-[#214E34]">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-[#E4E8DF] h-2 rounded-full overflow-hidden">
          <div className="bg-[#214E34] h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl border border-[#E4E8DF] p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-5 shadow-2xs"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#F8F6EE] shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] text-[#687168] uppercase font-semibold">Farmer: {item.product.farmerName}</span>
                <h3 className="font-serif font-bold text-base text-[#242B25]">{item.product.name}</h3>
                <span className="text-xs text-[#687168] block mt-0.5">Per {item.product.unit}</span>
              </div>

              <div className="flex items-center border border-[#E4E8DF] rounded-xl overflow-hidden bg-[#F8F6EE]">
                <button
                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                  className="p-2.5 hover:bg-[#E8EFE3] transition text-[#242B25]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-bold text-sm text-[#242B25]">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                  className="p-2.5 hover:bg-[#E8EFE3] transition text-[#242B25]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right">
                <span className="font-serif font-bold text-lg text-[#214E34] block">
                  ₹{item.product.price * item.quantity}
                </span>
                <span className="text-[10px] text-[#687168]">₹{item.product.price} / {item.product.unit}</span>
              </div>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-3xl border border-[#E4E8DF] p-6 sm:p-8 space-y-6 h-fit shadow-xs">
          <h3 className="font-serif font-bold text-xl text-[#242B25] pb-4 border-b border-[#E4E8DF]">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-[#687168]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#242B25]">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="font-semibold text-[#242B25]">
                {cartSubtotal >= settings.freeDeliveryThreshold ? (
                  <span className="text-[#6F9F54]">FREE</span>
                ) : (
                  `₹${settings.deliveryFee}`
                )}
              </span>
            </div>
            <div className="pt-3 border-t border-[#E4E8DF] flex justify-between text-base font-bold text-[#214E34]">
              <span>Estimated Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>

          <div className="bg-[#E8EFE3]/50 p-4 rounded-xl text-xs text-[#242B25] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#214E34] shrink-0" />
            <span>Secure Checkout with 100% farm freshness guarantee.</span>
          </div>

          <button
            onClick={() => navigate('checkout')}
            className="w-full bg-[#214E34] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#163D2A] transition shadow-lg flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
