import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Star, ShieldCheck, MapPin } from 'lucide-react';

export const FarmersPage: React.FC = () => {
  const { farmers, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">
          Transparent Partnership
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#242B25]">
          Meet Our Farmer Partners
        </h1>
        <p className="text-sm sm:text-base text-[#687168]">
          We work shoulder-to-shoulder with dedicated farmers across Telangana who practice sustainable, natural agriculture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {farmers.map(farmer => (
          <div
            key={farmer.id}
            onClick={() => navigate(`farmers/${farmer.id}`)}
            className="bg-white rounded-3xl border border-[#E4E8DF] overflow-hidden shadow-xs hover:shadow-xl transition cursor-pointer group flex flex-col"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={farmer.farmImage}
                alt={farmer.farmName}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-md"
                />
                <div>
                  <h4 className="font-serif font-bold text-white text-lg">{farmer.name}</h4>
                  <span className="text-xs text-[#E8EFE3] block">{farmer.farmName}</span>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-xs sm:text-sm text-[#687168] leading-relaxed">
                {farmer.bio}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#E4E8DF]">
                <div className="flex items-center justify-between text-xs text-[#687168]">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#214E34]" /> {farmer.district} District</span>
                  <span className="flex items-center gap-1 font-semibold text-[#242B25]">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> {farmer.rating} ({farmer.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-[#E8EFE3] text-[#214E34] text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Partner
                  </span>
                  <span className="text-xs font-bold text-[#214E34] flex items-center gap-1">
                    View Profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
