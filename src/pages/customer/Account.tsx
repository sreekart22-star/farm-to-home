import React from 'react';
import { useApp } from '../../context/AppContext';
import { Package, MapPin, Heart, User, LogOut, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

export const Account: React.FC = () => {
  const { currentUser, orders, wishlist, addresses, logout, navigate } = useApp();

  const userOrders = orders.filter(o => o.customerId === currentUser?.id || o.customerName === currentUser?.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E4E8DF] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#214E34] text-white flex items-center justify-center font-serif font-bold text-3xl shadow-md">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="bg-[#E8EFE3] text-[#214E34] text-xs font-bold px-3 py-1 rounded-md inline-block">
              Customer Account
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#242B25]">{currentUser?.name || 'Ananya Sharma'}</h1>
            <p className="text-xs text-[#687168]">{currentUser?.email || 'ananya.sharma@example.com'} • {currentUser?.phone || '+91 98123 45678'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-50 text-red-700 border border-red-200 px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-red-100 transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('account/orders')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#242B25]">My Orders</h3>
              <p className="text-xs text-[#687168]">{userOrders.length} orders placed</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>

        <div
          onClick={() => navigate('wishlist')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#242B25]">My Wishlist</h3>
              <p className="text-xs text-[#687168]">{wishlist.length} saved products</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>

        <div
          onClick={() => navigate('account/addresses')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#242B25]">Saved Addresses</h3>
              <p className="text-xs text-[#687168]">{addresses.length} delivery locations</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-2xl text-[#242B25]">Recent Orders</h2>
          <button onClick={() => navigate('account/orders')} className="text-xs font-semibold text-[#214E34] hover:underline">
            View All Orders
          </button>
        </div>

        {userOrders.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-[#E4E8DF] text-center text-[#687168]">
            No orders placed yet. Start shopping fresh farm produce today!
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.slice(0, 3).map(order => (
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
                    Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items • Total: ₹{order.total}
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
    </div>
  );
};
