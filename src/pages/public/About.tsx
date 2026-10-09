import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, ShieldCheck, HeartHandshake, Leaf, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">
            Our Mission & Story
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#242B25] leading-tight">
            Empowering Farmers. Nourishing Families.
          </h1>
          <p className="text-sm sm:text-base text-[#687168] leading-relaxed">
            Farm to Home was founded in Hyderabad with a singular vision: to restore transparency to the food supply chain. By connecting households directly with agricultural producers in Telangana, we ensure fair incomes for farmers and chemical-free, fresh produce for families.
          </p>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => navigate('shop')}
              className="bg-[#214E34] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#163D2A] transition shadow-md"
            >
              Explore Shop
            </button>
            <button
              onClick={() => navigate('farmers')}
              className="bg-[#E8EFE3] text-[#214E34] px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#d5e2cd] transition"
            >
              Meet Our Farmers
            </button>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1595974482597-4f6c8f706346?auto=format&fit=crop&w=800&q=80"
            alt="Indian farm field"
            className="rounded-3xl shadow-2xl object-cover aspect-[4/3] w-full border border-[#E4E8DF]"
          />
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Absolute Transparency</h3>
          <p className="text-sm text-[#687168] leading-relaxed">
            Every product label clearly states the farmer's name, farm location, and harvest timestamp. No hidden mysteries.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Fair Compensation</h3>
          <p className="text-sm text-[#687168] leading-relaxed">
            Farmers set their fair pricing parameters. By removing middlemen, farmers earn up to 40% more than traditional mandis.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3] text-[#214E34] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Sustainability First</h3>
          <p className="text-sm text-[#687168] leading-relaxed">
            Promoting water conservation, soil health restoration, and plastic-free doorstep delivery packaging across Hyderabad.
          </p>
        </div>
      </div>
    </div>
  );
};
