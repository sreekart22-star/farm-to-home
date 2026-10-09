import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, DollarSign, ShieldCheck, Download } from 'lucide-react';

export const FarmerEarnings: React.FC = () => {
  const { orders, farmers, currentUser, navigate } = useApp();
  const currentFarmer = farmers.find(f => f.email === currentUser?.email) || farmers[0];

  const farmerOrders = orders.filter(o =>
    o.items.some(i => i.farmerId === currentFarmer.id)
  );

  const grossSales = farmerOrders.reduce((sum, ord) => {
    const relevant = ord.items.filter(i => i.farmerId === currentFarmer.id);
    return sum + relevant.reduce((s, i) => s + i.price * i.quantity, 0);
  }, 0);

  const platformFee = Math.round(grossSales * 0.05); // 5% community sustainability fee
  const netEarnings = grossSales - platformFee;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('farmer-dashboard')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Financials</span>
          <h1 className="font-serif font-bold text-3xl text-[#242B25]">Earnings & Payout Summary</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <span className="text-xs font-bold text-[#687168] uppercase">Gross Sales</span>
          <span className="font-serif font-bold text-3xl text-[#242B25] block">₹{grossSales}</span>
          <span className="text-xs text-[#687168]">Total customer order value</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#E4E8DF] shadow-xs space-y-2">
          <span className="text-xs font-bold text-[#687168] uppercase">Platform Fee (5%)</span>
          <span className="font-serif font-bold text-3xl text-amber-700 block">₹{platformFee}</span>
          <span className="text-xs text-[#687168]">Logistics & cold chain support</span>
        </div>
        <div className="bg-[#163D2A] text-white p-6 rounded-3xl shadow-xl space-y-2">
          <span className="text-xs font-bold text-[#6F9F54] uppercase">Net Earnings</span>
          <span className="font-serif font-bold text-3xl text-white block">₹{netEarnings}</span>
          <span className="text-xs text-[#E8EFE3]/80">Transferred to bank weekly</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E4E8DF] p-8 space-y-6 shadow-xs">
        <h3 className="font-serif font-bold text-xl text-[#242B25]">Bank Payout Details</h3>
        <div className="bg-[#F8F6EE] p-5 rounded-2xl space-y-2 text-sm text-[#242B25]">
          <p><strong>Bank Account:</strong> State Bank of India — A/C ending in ****4821</p>
          <p><strong>IFSC Code:</strong> SBIN0002145</p>
          <p><strong>Registered Name:</strong> {currentFarmer.name}</p>
          <span className="text-xs text-[#6F9F54] font-semibold flex items-center gap-1 pt-2">
            <ShieldCheck className="w-4 h-4" /> Direct NEFT/IMPS settlement active
          </span>
        </div>
      </div>
    </div>
  );
};
