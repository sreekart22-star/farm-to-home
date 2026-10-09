import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">
          Direct Harvest Categories
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#242B25]">
          Explore Our Pure Categories
        </h1>
        <p className="text-sm sm:text-base text-[#687168]">
          Every category is sourced directly from verified farming communities across Telangana without artificial intermediaries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => navigate(`shop?category=${cat.id}`)}
            className="bg-white rounded-3xl border border-[#E4E8DF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
          >
            <div className="relative h-56 overflow-hidden bg-[#F8F6EE]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <span className="text-xs bg-[#6F9F54] text-[#163D2A] px-2.5 py-1 rounded-md font-bold mb-2 inline-block">
                  {cat.itemCount || 3} Varieties
                </span>
                <h3 className="font-serif font-bold text-2xl">{cat.name}</h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-[#687168] leading-relaxed">
                {cat.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[#E4E8DF] text-xs font-bold text-[#214E34]">
                <span>Browse {cat.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
