import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Package, Users, Tractor, DollarSign, Settings, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, orders, farmers, navigate, updateFarmerStatus } = useApp();

  const pendingFarmers = farmers.filter(f => f.verificationStatus === 'pending');
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#163D2A] text-white p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#214E34] px-3 py-1 rounded-full text-xs font-bold text-[#6F9F54]">
            <Shield className="w-4 h-4" /> Administrator Operations Portal
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white">Platform Oversight Dashboard</h1>
          <p className="text-sm text-[#E8EFE3]/80">Managing Telangana direct-to-home agricultural commerce ecosystem.</p>
        </div>

        <button
          onClick={() => navigate('admin/settings')}
          className="bg-[#6F9F54] text-[#163D2A] px-6 py-3 rounded-2xl font-bold text-xs hover:bg-[#82b364] transition flex items-center gap-2"
        >
          <Settings className="w-4 h-4" /> Platform Settings
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#687168] uppercase">Total Gross Volume</span>
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <span className="font-serif font-bold text-3xl text-[#214E34] block">₹{totalRevenue}</span>
          <span className="text-xs text-[#6F9F54]">Across {orders.length} orders</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#687168] uppercase">Farmer Partners</span>
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <Tractor className="w-5 h-5" />
            </div>
          </div>
          <span className="font-serif font-bold text-3xl text-[#242B25] block">{farmers.length}</span>
          <span className="text-xs text-[#687168]">Verified & active growers</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#687168] uppercase">Catalog Products</span>
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <span className="font-serif font-bold text-3xl text-[#242B25] block">{products.length}</span>
          <span className="text-xs text-[#687168]">Active farm listings</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#687168] uppercase">Pending Verifications</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <span className="font-serif font-bold text-3xl text-amber-700 block">{pendingFarmers.length}</span>
          <span className="text-xs text-[#687168]">Farmers awaiting approval</span>
        </div>
      </div>

      {/* Pending Farmers Verification Queue */}
      {pendingFarmers.length > 0 && (
        <div className="bg-white rounded-3xl border border-[#E4E8DF] p-8 space-y-6 shadow-xs">
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Farmer Verification Queue</h3>
          <div className="space-y-4">
            {pendingFarmers.map(farmer => (
              <div key={farmer.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F8F6EE] border border-[#E4E8DF]">
                <div className="flex items-center gap-4">
                  <img src={farmer.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#242B25]">{farmer.name} ({farmer.farmName})</h4>
                    <p className="text-xs text-[#687168]">{farmer.location}, {farmer.district} • {farmer.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateFarmerStatus(farmer.id, 'approved')}
                    className="bg-[#214E34] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#163D2A]"
                  >
                    Approve Farmer
                  </button>
                  <button
                    onClick={() => updateFarmerStatus(farmer.id, 'rejected')}
                    className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('admin/orders')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div>
            <h3 className="font-serif font-bold text-lg text-[#242B25]">Manage All Orders</h3>
            <p className="text-xs text-[#687168]">Track fulfillment across Hyderabad</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>

        <div
          onClick={() => navigate('admin/farmers')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div>
            <h3 className="font-serif font-bold text-lg text-[#242B25]">Farmer Partners</h3>
            <p className="text-xs text-[#687168]">Review verified producer accounts</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>

        <div
          onClick={() => navigate('admin/settings')}
          className="bg-white p-6 rounded-2xl border border-[#E4E8DF] hover:border-[#214E34] transition cursor-pointer flex items-center justify-between shadow-2xs group"
        >
          <div>
            <h3 className="font-serif font-bold text-lg text-[#242B25]">Platform Settings</h3>
            <p className="text-xs text-[#687168]">Announcement banner, delivery fees, pins</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#687168] group-hover:translate-x-1 transition" />
        </div>
      </div>
    </div>
  );
};
