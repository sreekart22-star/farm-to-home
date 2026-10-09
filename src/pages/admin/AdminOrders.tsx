import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Package } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('admin-dashboard')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Oversight</span>
          <h1 className="font-serif font-bold text-3xl text-[#242B25]">All Platform Orders ({orders.length})</h1>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-3xl border border-[#E4E8DF] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-xl text-[#214E34]">Order #{order.id}</span>
                <span className="bg-[#E8EFE3] text-[#214E34] text-xs font-bold px-3 py-1 rounded-full capitalize">
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-[#687168]">
                Customer: <strong>{order.customerName}</strong> • Phone: {order.shippingAddress.phone} • Total: ₹{order.total} ({order.paymentMethod})
              </p>
              <p className="text-xs text-[#687168]">
                Address: {order.shippingAddress.houseNo}, {order.shippingAddress.locality}, {order.shippingAddress.city} — {order.shippingAddress.pincode}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={order.status}
                onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                className="bg-[#F8F6EE] border border-[#E4E8DF] text-xs font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#214E34]"
              >
                <option value="placed">Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready_for_dispatch">Ready for Dispatch</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
