import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import {
  ShoppingBag,
  Heart,
  Star,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Minus,
  Plus
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist, navigate } = useApp();

  // Extract slug from activeRoute e.g., 'product/farm-fresh-hybrid-tomatoes'
  const routeParts = window.location.hash.replace('#/', '').split('/');
  const slug = routeParts[1] || '';

  const product = products.find(p => p.slug === slug) || products[0];
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-[#242B25]">Product not found</h2>
        <button
          onClick={() => navigate('shop')}
          className="bg-[#214E34] text-white px-6 py-3 rounded-xl font-semibold text-sm"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb */}
      <div className="text-xs text-[#687168] flex items-center gap-2">
        <button onClick={() => navigate('home')} className="hover:text-[#214E34]">Home</button>
        <span>/</span>
        <button onClick={() => navigate('shop')} className="hover:text-[#214E34]">Shop</button>
        <span>/</span>
        <span className="text-[#242B25] font-semibold">{product.name}</span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="bg-[#F8F6EE] rounded-3xl overflow-hidden border border-[#E4E8DF] aspect-square">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    (selectedImage || product.image) === img ? 'border-[#214E34]' : 'border-[#E4E8DF]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-[#E8EFE3] text-[#214E34] text-xs font-bold px-3 py-1 rounded-md">
                Verified Farmer Source
              </span>
              <div className="flex items-center gap-1 text-amber-600 text-sm font-semibold">
                <Star className="w-4 h-4 fill-current text-amber-500" /> 4.8 (142 reviews)
              </div>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">{product.name}</h1>
            <p className="text-sm text-[#687168] mt-1 flex items-center gap-1">
              Cultivated by <span className="font-semibold text-[#214E34]">{product.farmerName}</span> ({product.origin})
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-serif font-bold text-3xl text-[#214E34]">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-[#687168] line-through">₹{product.originalPrice}</span>
            )}
            <span className="text-xs bg-[#E4E8DF] text-[#242B25] px-2.5 py-1 rounded-md font-medium">
              Per {product.unit}
            </span>
          </div>

          <p className="text-sm text-[#687168] leading-relaxed">
            {product.description}
          </p>

          <div className="bg-[#F8F6EE] p-5 rounded-2xl border border-[#E4E8DF] space-y-3">
            <div className="flex items-center gap-3 text-xs text-[#242B25]">
              <CheckCircle2 className="w-4 h-4 text-[#6F9F54]" />
              <span><strong>Harvest Info:</strong> {product.harvestInfo || 'Harvested recently'}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#242B25]">
              <ShieldCheck className="w-4 h-4 text-[#6F9F54]" />
              <span><strong>Storage:</strong> {product.storageInstructions}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#242B25]">
              <Truck className="w-4 h-4 text-[#6F9F54]" />
              <span><strong>Delivery:</strong> Available for Hyderabad & Secunderabad PIN codes</span>
            </div>
          </div>

          {/* Quantity & Cart Actions */}
          <div className="space-y-4 pt-4 border-t border-[#E4E8DF]">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#687168]">Quantity</span>
              <div className="flex items-center border border-[#E4E8DF] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-[#E8EFE3] transition text-[#242B25]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-sm text-[#242B25]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-[#E8EFE3] transition text-[#242B25]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-[#687168]">({product.stock} units in stock)</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={!product.available || product.stock === 0}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg ${
                  product.available && product.stock > 0
                    ? 'bg-[#214E34] text-white hover:bg-[#163D2A]'
                    : 'bg-[#E4E8DF] text-[#687168] cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{product.stock === 0 ? 'Sold Out' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-2xl border transition ${
                  wishlisted
                    ? 'bg-[#214E34] text-white border-[#214E34]'
                    : 'bg-white text-[#242B25] border-[#E4E8DF] hover:bg-[#E8EFE3]'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-[#E4E8DF]">
          <h3 className="font-serif font-bold text-2xl text-[#242B25]">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
