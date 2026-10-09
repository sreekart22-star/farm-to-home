import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, Clock, Truck, MapPin, ShieldCheck } from 'lucide-react';

export const OrderDetail: React.FC = () => {
  const { orders, navigate } = useApp();

  const routeParts = window.location.hash.replace('#/', '').split('/');
  const orderId = routeParts[2] || '';

  const order = orders.find(o => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-[#242B25]">Order not found</h2>
        <button onClick={() => navigate('account/orders')} className="bg-[#214E34] text-white px-6 py-3 rounded-xl font-semibold text-sm">
          Return to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('account/orders')} className="p-2 rounded-xl bg-[#E8EFE3] hover:bg-[#d5e2cd] text-[#214E34] transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif font-bold text-3xl text-[#242B25]">Order #{order.id}</h1>
            <span className="bg-[#E8EFE3] text-[#214E34] text-xs font-bold px-3 py-1 rounded-full capitalize">
              {order.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-[#687168] mt-0.5">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Items & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Items */}
          <div className="bg-white rounded-3xl border border-[#E4E8DF] p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-[#242B25] pb-4 border-b border-[#E4E8DF]">
              Order Items ({order.items.length})
            </h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b border-[#E4E8DF] last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <img src={item.productImage} alt="" className="w-16 h-16 rounded-xl object-cover bg-[#F8F6EE]" />
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#242B25]">{item.productName}</h4>
                      <p className="text-xs text-[#687168]">Qty: {item.quantity} × ₹{item.price} / {item.unit}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#214E34]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-3xl border border-[#E4E8DF] p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-[#242B25] pb-4 border-b border-[#E4E8DF]">
              Order Status Timeline
            </h3>
            <div className="space-y-6">
              {order.statusHistory.map((hist, idx) => (
                <div key={idx} className="flex gap-4 items-start relative">
                  {idx < order.statusHistory.length - 1 && (
                    <div className="absolute left-3.5 top-7 w-0.5 h-10 bg-[#E4E8DF]"></div>
                  )}
                  <div className="w-7 h-7 rounded-full bg-[#214E34] text-white flex items-center justify-center shrink-0 z-10">
                    <CheckCircle2 className="w-4 h-4 text-[#6F9F54]" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#242B25] capitalize block">
                      {hist.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs text-[#687168] block">{hist.note}</span>
                    <span className="text-[10px] text-[#687168]/70 block mt-0.5">{new Date(hist.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Address & Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E4E8DF] p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#242B25] pb-3 border-b border-[#E4E8DF]">
              Delivery Address
            </h3>
            <div className="space-y-1 text-xs text-[#687168]">
              <strong className="text-[#242B25] font-bold block text-sm">{order.shippingAddress.name}</strong>
              <p>{order.shippingAddress.houseNo}, {order.shippingAddress.locality}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}</p>
              <p className="pt-2 font-medium text-[#214E34]">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E4E8DF] p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#242B25] pb-3 border-b border-[#E4E8DF]">
              Payment Summary
            </h3>
            <div className="space-y-2 text-xs text-[#687168]">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-semibold text-[#242B25] uppercase">{order.paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status</span>
                <span className="font-semibold text-[#214E34] uppercase">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>₹{order.deliveryCharge}</span>
              </div>
              <div className="pt-3 border-t border-[#E4E8DF] flex justify-between text-sm font-bold text-[#214E34]">
                <span>Total Paid</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
