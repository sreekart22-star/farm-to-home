import React from 'react';
import { useApp } from '../../context/AppContext';
import { Package, ChevronRight, ArrowLeft } from 'lucide-react';

export const OrdersList: React.FC = () => {
  const { orders, currentUser, navigate } = useApp();
  const userOrders = orders.filter(o => o.customerId === currentUser?.id || o.customerName === currentUser?.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('account')} className="p-2 rounded-xl bg-[#E8EFE3] hover:bg-[#d5e2cd] text-[#214E34] transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block mb-0.5">Order History</span>
          <h1 className="font-serif font-bold text-3xl text-[#242B25]">All Orders ({userOrders.length})</h1>
        </div>
      </div>

      {userOrders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#E4E8DF] text-center space-y-4">
          <Package className="w-12 h-12 text-[#687168] mx-auto" />
          <h3 className="font-serif font-bold text-xl text-[#242B25]">No orders found</h3>
          <button onClick={() => navigate('shop')} className="bg-[#214E34] text-white px-6 py-3 rounded-xl font-semibold text-sm">
            Shop Fresh Produce
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map(order => (
            <div
              key={order.id}
              onClick={() => navigate(`account/orders/${order.id}`)}
              className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#214E34] text-base">{order.id}</span>
                  <span className="bg-[#E8EFE3] text-[#214E34] text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-[#687168]">
                  Placed on {new Date(order.createdAt).toLocaleString()} • {order.items.length} items • Total: ₹{order.total}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#214E34]">View Details</span>
                <ChevronRight className="w-4 h-4 text-[#214E34]" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
