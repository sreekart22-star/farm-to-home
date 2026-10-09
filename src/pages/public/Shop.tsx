import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import { Search, Filter, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export const Shop: React.FC = () => {
  const { products, categories, farmers } = useApp();

  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || '';
  const initialSearch = urlParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Category
      if (selectedCategory && product.categoryId !== selectedCategory) {
        return false;
      }
      // Farmer
      if (selectedFarmer && product.farmerId !== selectedFarmer) {
        return false;
      }
      // Price
      if (product.price > maxPrice) {
        return false;
      }
      // Stock
      if (inStockOnly && product.stock === 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, searchQuery, selectedCategory, selectedFarmer, maxPrice, inStockOnly, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedFarmer('');
    setMaxPrice(300);
    setInStockOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4E8DF] pb-6">
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block mb-1">
            Direct Farm Catalog
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
            Fresh Produce Shop
          </h1>
          <p className="text-sm text-[#687168] mt-1">
            Showing {filteredProducts.length} authentic farm-harvested products available for delivery.
          </p>
        </div>

        {/* Sort & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search produce..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-white border border-[#E4E8DF] text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#214E34] w-56"
            />
            <Search className="w-4 h-4 text-[#687168] absolute left-3 top-3.5" />
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-white border border-[#E4E8DF] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#214E34] text-[#242B25]"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-[#E4E8DF] h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-[#E4E8DF]">
            <h3 className="font-serif font-bold text-base text-[#242B25] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#214E34]" /> Filters
            </h3>
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-[#687168] hover:text-[#214E34] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#687168]">Category</h4>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                  selectedCategory === '' ? 'bg-[#214E34] text-white font-semibold' : 'text-[#242B25] hover:bg-[#E8EFE3]/50'
                }`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                    selectedCategory === cat.id ? 'bg-[#214E34] text-white font-semibold' : 'text-[#242B25] hover:bg-[#E8EFE3]/50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Farmer */}
          <div className="space-y-3 pt-4 border-t border-[#E4E8DF]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#687168]">Farmer Partner</h4>
            <select
              value={selectedFarmer}
              onChange={e => setSelectedFarmer(e.target.value)}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#214E34]"
            >
              <option value="">All Farmers</option>
              {farmers.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.farmName})</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-3 pt-4 border-t border-[#E4E8DF]">
            <div className="flex justify-between text-xs font-medium text-[#242B25]">
              <span>Max Price</span>
              <span className="font-bold text-[#214E34]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="10"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#214E34]"
            />
          </div>

          {/* Stock toggle */}
          <div className="pt-4 border-t border-[#E4E8DF]">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[#242B25]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded text-[#214E34] focus:ring-[#214E34]"
              />
              <span>In-stock items only</span>
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E4E8DF] p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#E8EFE3] text-[#214E34] rounded-2xl flex items-center justify-center mx-auto text-2xl font-serif">
                🌾
              </div>
              <h3 className="font-serif font-bold text-xl text-[#242B25]">No farm produce found</h3>
              <p className="text-sm text-[#687168] max-w-md mx-auto">
                We couldn't find any products matching your filters. Try resetting filters or searching for something else.
              </p>
              <button
                onClick={clearFilters}
                className="bg-[#214E34] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#163D2A] transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
