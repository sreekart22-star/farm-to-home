import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import { MapPin, ShieldCheck, Star, Calendar, Mail, Phone } from 'lucide-react';

export const FarmerDetail: React.FC = () => {
  const { farmers, products, navigate } = useApp();

  const routeParts = window.location.hash.replace('#/', '').split('/');
  const farmerId = routeParts[1] || 'farmer-1';

  const farmer = farmers.find(f => f.id === farmerId) || farmers[0];
  const farmerProducts = products.filter(p => p.farmerId === farmer.id);

  if (!farmer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-[#242B25]">Farmer not found</h2>
        <button onClick={() => navigate('farmers')} className="bg-[#214E34] text-white px-6 py-3 rounded-xl font-semibold text-sm">
          Return to Farmers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Farmer Hero Profile */}
      <div className="bg-white rounded-3xl border border-[#E4E8DF] overflow-hidden shadow-sm">
        <div className="relative h-64 sm:h-80">
          <img src={farmer.farmImage} alt={farmer.farmName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="text-white space-y-1">
                <span className="bg-[#6F9F54] text-[#163D2A] text-xs font-bold px-3 py-1 rounded-md inline-block">
                  Verified Farmer Partner
                </span>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl">{farmer.name}</h1>
                <p className="text-sm text-[#E8EFE3]">{farmer.farmName}</p>
              </div>
            </div>
            <div className="bg-white/90 backdrop-md px-4 py-2.5 rounded-xl text-xs font-semibold text-[#214E34] flex items-center gap-2">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              <span>{farmer.rating} Rating ({farmer.reviewCount} customer reviews)</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F8F6EE]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E8DF] flex items-center justify-center text-[#214E34]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#687168] block uppercase">Location</span>
              <span className="font-semibold text-sm text-[#242B25]">{farmer.location}, {farmer.district}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E8DF] flex items-center justify-center text-[#214E34]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#687168] block uppercase">Partner Since</span>
              <span className="font-semibold text-sm text-[#242B25]">{farmer.joinedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E8DF] flex items-center justify-center text-[#214E34]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#687168] block uppercase">Verification Status</span>
              <span className="font-semibold text-sm text-[#214E34] capitalize">{farmer.verificationStatus}</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 border-t border-[#E4E8DF] space-y-3">
          <h3 className="font-serif font-bold text-lg text-[#242B25]">About {farmer.name}'s Farm</h3>
          <p className="text-sm text-[#687168] leading-relaxed max-w-4xl">{farmer.bio}</p>
        </div>
      </div>

      {/* Farmer Products */}
      <div className="space-y-6">
        <h2 className="font-serif font-bold text-2xl text-[#242B25]">
          Fresh Produce from {farmer.name} ({farmerProducts.length})
        </h2>

        {farmerProducts.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-[#E4E8DF] text-center text-[#687168]">
            No active products listed by this farmer currently. Check back soon for seasonal harvests!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {farmerProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
