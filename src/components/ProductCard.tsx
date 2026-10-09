import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Heart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigate } = useApp();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-2xl border border-[#E4E8DF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image Container */}
      <div className="relative aspect-square bg-[#F8F6EE] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
          }}
        />
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition shadow-sm ${
            wishlisted
              ? 'bg-[#214E34] text-white'
              : 'bg-white/80 text-[#242B25] hover:bg-white'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isSeasonal && (
            <span className="bg-[#6F9F54] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs">
              Seasonal Fresh
            </span>
          )}
          {product.stock <= 15 && product.stock > 0 && (
            <span className="bg-amber-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#687168] mb-1.5">
            <span>By {product.farmerName}</span>
            <span className="flex items-center gap-1 text-[#214E34] font-medium">
              <Star className="w-3 h-3 fill-current text-amber-500" /> 4.8
            </span>
          </div>

          <h3
            onClick={() => navigate(`product/${product.slug}`)}
            className="font-serif font-bold text-base text-[#242B25] hover:text-[#214E34] cursor-pointer line-clamp-1 transition"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#687168] mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E4E8DF] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg text-[#214E34]">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#687168] line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-[#687168] font-medium block">Per {product.unit}</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.available || product.stock === 0}
            className={`px-3.5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition ${
              product.available && product.stock > 0
                ? 'bg-[#214E34] text-white hover:bg-[#163D2A] shadow-sm'
                : 'bg-[#E4E8DF] text-[#687168] cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.stock === 0 ? 'Sold Out' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
