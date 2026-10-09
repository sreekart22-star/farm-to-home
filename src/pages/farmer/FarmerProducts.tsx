import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, Edit, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const FarmerProducts: React.FC = () => {
  const { products, farmers, currentUser, deleteProduct, updateProduct, navigate } = useApp();

  const currentFarmer = farmers.find(f => f.email === currentUser?.email) || farmers[0];
  const farmerProducts = products.filter(p => p.farmerId === currentFarmer.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-[#E4E8DF] pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('farmer-dashboard')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Inventory Catalog</span>
            <h1 className="font-serif font-bold text-3xl text-[#242B25]">My Farm Products ({farmerProducts.length})</h1>
          </div>
        </div>

        <button
          onClick={() => navigate('farmer/products/new')}
          className="bg-[#214E34] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-[#163D2A] transition"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {farmerProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#E4E8DF] text-center space-y-4">
          <p className="text-sm text-[#687168]">You have not added any products yet.</p>
          <button
            onClick={() => navigate('farmer/products/new')}
            className="bg-[#214E34] text-white px-6 py-3 rounded-xl font-semibold text-sm"
          >
            Add Your First Produce
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerProducts.map(product => (
            <div key={product.id} className="bg-white rounded-3xl border border-[#E4E8DF] overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-video bg-[#F8F6EE]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold text-white ${
                    product.available && product.stock > 0 ? 'bg-[#214E34]' : 'bg-red-700'
                  }`}>
                    {product.available && product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-lg text-[#242B25]">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-base text-[#214E34]">₹{product.price}</span>
                    <span className="text-xs text-[#687168]">Per {product.unit}</span>
                  </div>
                  <p className="text-xs text-[#687168] line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-[#E4E8DF] mt-4">
                <button
                  onClick={() => updateProduct(product.id, { available: !product.available })}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                    product.available ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  {product.available ? 'Active' : 'Paused'}
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
