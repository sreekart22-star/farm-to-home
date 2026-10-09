import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tractor, Package, DollarSign, AlertTriangle, Plus, ChevronRight, CheckCircle2 } from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { products, orders, farmers, currentUser, navigate } = useApp();

  const currentFarmer = farmers.find(f => f.email === currentUser?.email) || farmers[0];
  const farmerProducts = products.filter(p => p.farmerId === currentFarmer.id);
  const lowStockProducts = farmerProducts.filter(p => p.stock < 20);

  // Orders containing this farmer's products
  const farmerOrders = orders.filter(o =>
    o.items.some(item => item.farmerId === currentFarmer.id)
  );

  const totalEarnings = farmerOrders.reduce((sum, ord) => {
    const relevantItems = ord.items.filter(i => i.farmerId === currentFarmer.id);
    return sum + relevantItems.reduce((s, i) => s + i.price * i.quantity, 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#163D2A] text-white p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <img
            src={currentFarmer.avatar}
            alt={currentFarmer.name}
            className="w-20 h-20 rounded-2xl border-2 border-[#6F9F54] object-cover shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#6F9F54] text-[#163D2A] text-xs font-bold px-3 py-0.5 rounded-full uppercase">
                Farmer Partner Portal
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">{currentFarmer.name} ({currentFarmer.farmName})</h1>
            <p className="text-xs text-[#E8EFE3]/80">📍 {currentFarmer.location}, {currentFarmer.district} District, Telangana</p>
          </div>
        </div>

        <button
          onClick={() => navigate('farmer/products/new')}
          className="bg-[#6F9F54] text-[#163D2A] px-6 py-3.5 rounded-2xl font-bold text-xs hover:bg-[#82b364] transition shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Produce
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#687168] uppercase">Active Products</span>
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <span className="font-serif font-bold text-3xl text-[#242B25] block">{farmerProducts.length}</span>
          <span className="text-xs text-[#6F9F54] font-medium">Listed in Telangana catalog</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#687168] uppercase">Gross Sales Value</span>
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <span className="font-serif font-bold text-3xl text-[#214E34] block">₹{totalEarnings}</span>
          <span className="text-xs text-[#687168]">From {farmerOrders.length} customer orders</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#687168] uppercase">Pending Orders</span>
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <Tractor className="w-5 h-5" />
            </div>
          </div>
          <span className="font-serif font-bold text-3xl text-[#242B25] block">
            {farmerOrders.filter(o => o.status === 'placed' || o.status === 'confirmed').length}
          </span>
          <span className="text-xs text-[#687168]">Awaiting preparation & dispatch</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#687168] uppercase">Low Stock Alerts</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <span className="font-serif font-bold text-3xl text-amber-700 block">{lowStockProducts.length}</span>
          <span className="text-xs text-[#687168]">Items require restock soon</span>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('farmer/products')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div>
            <h3 className="font-serif font-bold text-lg text-[#242B25]">Manage Products</h3>
            <p className="text-xs text-[#687168]">Update prices, stock, and availability</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>

        <div
          onClick={() => navigate('farmer/orders')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div>
            <h3 className="font-serif font-bold text-lg text-[#242B25]">Farmer Orders</h3>
            <p className="text-xs text-[#687168]">Fulfill orders containing your produce</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>

        <div
          onClick={() => navigate('farmer/earnings')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div>
            <h3 className="font-serif font-bold text-lg text-[#242B25]">Earnings & Payouts</h3>
            <p className="text-xs text-[#687168]">Direct bank transfers & net revenue</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>
      </div>
    </div>
  );
};
