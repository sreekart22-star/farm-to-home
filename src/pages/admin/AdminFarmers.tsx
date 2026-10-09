import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Tractor, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminFarmers: React.FC = () => {
  const { farmers, updateFarmerStatus, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('admin-dashboard')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Producers</span>
          <h1 className="font-serif font-bold text-3xl text-[#242B25]">All Farmer Partners ({farmers.length})</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {farmers.map(farmer => (
          <div key={farmer.id} className="bg-white rounded-3xl border border-[#E4E8DF] overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative h-48">
              <img src={farmer.farmImage} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <img src={farmer.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <div className="text-white">
                  <h4 className="font-serif font-bold text-base">{farmer.name}</h4>
                  <span className="text-xs text-[#E8EFE3]">{farmer.farmName}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1 text-xs text-[#687168]">
                <p>📍 {farmer.location}, {farmer.district}</p>
                <p>📞 {farmer.phone}</p>
                <p>✉️ {farmer.email}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E4E8DF]">
                <span className={`text-xs font-bold px-3 py-1 rounded-md capitalize ${
                  farmer.verificationStatus === 'approved' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                }`}>
                  {farmer.verificationStatus}
                </span>

                {farmer.verificationStatus === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateFarmerStatus(farmer.id, 'approved')}
                      className="bg-[#214E34] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateFarmerStatus(farmer.id, 'rejected')}
                      className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
