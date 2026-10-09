import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Leaf,
  Users,
  Award,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const Home: React.FC = () => {
  const { products, categories, farmers, navigate } = useApp();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const seasonalProducts = products.filter(p => p.isSeasonal).slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#163D2A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80"
            alt="Farm background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#214E34] border border-[#6F9F54]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#6F9F54]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct From Telangana Farms to Your Kitchen</span>
            </div>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
              Good Food Begins at the <span className="text-[#6F9F54]">Farm.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#E8EFE3]/90 max-w-xl leading-relaxed">
              Discover fresh fruits, crisp vegetables, traditional grains, and pure dairy sourced directly from trusted local farmers and delivered with care.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('shop')}
                className="bg-[#6F9F54] text-[#163D2A] px-7 py-4 rounded-2xl font-bold text-sm hover:bg-[#82b364] transition shadow-lg flex items-center gap-2"
              >
                <span>Shop Fresh Produce</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('farmers')}
                className="bg-white/10 backdrop-md text-white border border-white/20 px-6 py-4 rounded-2xl font-semibold text-sm hover:bg-white/20 transition"
              >
                Meet Our Farmers
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-white block">100%</span>
                <span className="text-xs text-[#E8EFE3]/70 font-medium">Traceable Origins</span>
              </div>
              <div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-white block">24h</span>
                <span className="text-xs text-[#E8EFE3]/70 font-medium">Harvest to Doorstep</span>
              </div>
              <div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-white block">₹0</span>
                <span className="text-xs text-[#E8EFE3]/70 font-medium">Middlemen Margins</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-2 bg-[#6F9F54]/20 rounded-3xl blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                alt="Fresh vegetables basket"
                className="relative rounded-3xl shadow-2xl object-cover aspect-[4/5] w-full border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block mb-1">
              Pure Categories
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
              Explore Farm Harvests
            </h2>
          </div>
          <button
            onClick={() => navigate('categories')}
            className="text-sm font-semibold text-[#214E34] hover:text-[#6F9F54] transition flex items-center gap-1.5"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigate(`shop?category=${cat.id}`)}
              className="bg-white rounded-2xl p-4 border border-[#E4E8DF] hover:border-[#214E34] hover:shadow-xl transition-all duration-300 cursor-pointer group text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 bg-[#F8F6EE] border border-[#E4E8DF] group-hover:scale-105 transition">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#242B25] group-hover:text-[#214E34] transition">
                {cat.name}
              </h3>
              <span className="text-xs text-[#687168] mt-1">{cat.itemCount || 3} items</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block mb-1">
              Freshly Harvested
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
              Featured Farm Produce
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="text-sm font-semibold text-[#214E34] hover:text-[#6F9F54] transition flex items-center gap-1.5"
          >
            <span>Browse Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Our Farmer Partners */}
      <section className="bg-[#E8EFE3]/50 py-16 border-y border-[#E4E8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#214E34] uppercase tracking-widest block mb-1">
                The Hands That Feed Us
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
                Meet Our Farmer Partners
              </h2>
            </div>
            <button
              onClick={() => navigate('farmers')}
              className="text-sm font-semibold text-[#214E34] hover:text-[#6F9F54] transition flex items-center gap-1.5"
            >
              <span>View All Farmers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {farmers.map(farmer => (
              <div
                key={farmer.id}
                onClick={() => navigate(`farmers/${farmer.id}`)}
                className="bg-white rounded-3xl border border-[#E4E8DF] overflow-hidden shadow-xs hover:shadow-xl transition cursor-pointer group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
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
                      className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-white text-base">{farmer.name}</h4>
                      <span className="text-xs text-[#E8EFE3] block">{farmer.farmName}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#687168] line-clamp-2 leading-relaxed">
                    {farmer.bio}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E4E8DF] text-xs font-medium text-[#214E34]">
                    <span>📍 {farmer.district} District</span>
                    <span className="bg-[#E8EFE3] px-2.5 py-1 rounded-md">Verified Partner</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">
            Simple & Transparent
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
            How Farm to Home Works
          </h2>
          <p className="text-sm text-[#687168]">
            We bridge the gap between conscientious households and hard-working farmers through a direct, transparent supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] text-center space-y-4 relative shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#E8EFE3] text-[#214E34] font-serif font-bold text-2xl flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-serif font-bold text-xl text-[#242B25]">Farmers Grow & List</h3>
            <p className="text-sm text-[#687168] leading-relaxed">
              Local farmers harvest seasonal produce at peak ripeness and list their daily yields directly on our platform.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] text-center space-y-4 relative shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#E8EFE3] text-[#214E34] font-serif font-bold text-2xl flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-serif font-bold text-xl text-[#242B25]">You Order Direct</h3>
            <p className="text-sm text-[#687168] leading-relaxed">
              Browse fresh vegetables, fruits, and essentials, choose your delivery slot, and place your order securely.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E4E8DF] text-center space-y-4 relative shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#E8EFE3] text-[#214E34] font-serif font-bold text-2xl flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-serif font-bold text-xl text-[#242B25]">Delivered Fresh</h3>
            <p className="text-sm text-[#687168] leading-relaxed">
              We collect fresh produce from farm hubs and deliver it to your doorstep within 24 hours of harvest.
            </p>
          </div>
        </div>
      </section>

      {/* Seasonal Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#214E34] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
            <Leaf className="w-96 h-96" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="bg-[#6F9F54] text-[#163D2A] text-xs font-bold px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">
              Season Special
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
              Taste the Authentic Sweetness of Alphonso Mangoes
            </h2>
            <p className="text-sm sm:text-base text-[#E8EFE3]/90 leading-relaxed">
              Directly harvested from Medchal heritage orchards without chemical ripening. Pre-book your crate today for guaranteed farm freshness.
            </p>
            <button
              onClick={() => navigate('shop')}
              className="bg-[#6F9F54] text-[#163D2A] px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#82b364] transition shadow-lg inline-flex items-center gap-2"
            >
              <span>Explore Seasonal Harvest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
