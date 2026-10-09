import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Package, CheckCircle2 } from 'lucide-react';

export const FarmerOrders: React.FC = () => {
  const { orders, farmers, currentUser, updateOrderStatus, navigate } = useApp();
  const currentFarmer = farmers.find(f => f.email === currentUser?.email) || farmers[0];

  const farmerOrders = orders.filter(o =>
    o.items.some(i => i.farmerId === currentFarmer.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('farmer-dashboard')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Fulfilment</span>
          <h1 className="font-serif font-bold text-3xl text-[#242B25]">Customer Orders ({farmerOrders.length})</h1>
        </div>
      </div>

      {farmerOrders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#E4E8DF] text-center text-[#687168]">
          No orders received for your produce yet.
        </div>
      ) : (
        <div className="space-y-6">
          {farmerOrders.map(order => {
            const farmerItems = order.items.filter(i => i.farmerId === currentFarmer.id);
            return (
              <div key={order.id} className="bg-white rounded-3xl border border-[#E4E8DF] p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4E8DF]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-xl text-[#214E34]">Order #{order.id}</span>
                      <span className="bg-[#E8EFE3] text-[#214E34] text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-[#687168] mt-1">Customer: {order.customerName} • Phone: {order.shippingAddress.phone}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                      className="bg-[#F8F6EE] border border-[#E4E8DF] text-xs font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#214E34]"
                    >
                      <option value="placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready_for_dispatch">Ready for Dispatch</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#687168]">Your Produce in this Order:</h4>
                  {farmerItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm bg-[#F8F6EE] p-3.5 rounded-xl">
                      <span className="font-medium text-[#242B25]">{item.productName} (Qty: {item.quantity} {item.unit})</span>
                      <span className="font-bold text-[#214E34]">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-xs text-[#687168]">
                  <strong>Delivery Address:</strong> {order.shippingAddress.houseNo}, {order.shippingAddress.locality}, {order.shippingAddress.city} — {order.shippingAddress.pincode}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
