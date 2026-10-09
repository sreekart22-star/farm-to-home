import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, navigate } = useApp();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block mb-1">
          Saved Favorites
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
          My Wishlist ({wishlistedProducts.length})
        </h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E4E8DF] p-16 text-center space-y-4">
          <Heart className="w-16 h-16 text-[#687168] mx-auto" />
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Your wishlist is empty</h3>
          <p className="text-sm text-[#687168]">Heart your favorite farm produce to keep track of them here.</p>
          <button
            onClick={() => navigate('shop')}
            className="bg-[#214E34] text-white px-6 py-3 rounded-xl font-semibold text-sm"
          >
            Explore Shop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
