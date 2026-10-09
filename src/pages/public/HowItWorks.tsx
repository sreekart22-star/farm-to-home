import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, ShoppingBag, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">
          Transparent Farm Supply Chain
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#242B25]">
          From Telangana Soil to Your Family Table
        </h1>
        <p className="text-sm sm:text-base text-[#687168] leading-relaxed">
          Farm to Home eliminates multiple layers of middlemen, ensuring fair compensation for dedicated farmers and freshest, pesticide-safe produce for conscious households.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center font-serif font-bold text-2xl">
            1
          </div>
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Sustainable Cultivation & Harvest</h3>
          <p className="text-sm text-[#687168] leading-relaxed">
            Our partner farmers in Shamshabad, Medchal, and Vikarabad grow vegetables, fruits, and grains using water-efficient drip irrigation and organic composting methods.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center font-serif font-bold text-2xl">
            2
          </div>
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Direct Sorting & Quality Check</h3>
          <p className="text-sm text-[#687168] leading-relaxed">
            Produce is harvested at dawn, transported directly to our Hyderabad fulfillment hubs, and hand-sorted to remove damaged items.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center font-serif font-bold text-2xl">
            3
          </div>
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Rapid Doorstep Delivery</h3>
          <p className="text-sm text-[#687168] leading-relaxed">
            Packed neatly in eco-friendly packaging, your order is delivered to your doorstep within 24 hours of harvest.
          </p>
        </div>
      </div>

      <div className="bg-[#163D2A] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl">Ready to taste the difference of fresh farm produce?</h2>
        <button
          onClick={() => navigate('shop')}
          className="bg-[#6F9F54] text-[#163D2A] px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#82b364] transition inline-flex items-center gap-2"
        >
          <span>Shop Fresh Produce Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
