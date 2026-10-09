import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Trash2 } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, deleteProduct, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('admin-dashboard')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Catalog Oversight</span>
          <h1 className="font-serif font-bold text-3xl text-[#242B25]">All Platform Products ({products.length})</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-3xl border border-[#E4E8DF] overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-square bg-[#F8F6EE]">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-1">
                <span className="text-[10px] text-[#687168] uppercase">By {product.farmerName}</span>
                <h3 className="font-serif font-bold text-base text-[#242B25] line-clamp-1">{product.name}</h3>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="font-bold text-lg text-[#214E34]">₹{product.price}</span>
                  <span className="text-xs text-[#687168]">Per {product.unit}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-[#E4E8DF] mt-4">
              <span className="text-xs text-[#687168]">Stock: {product.stock}</span>
              <button
                onClick={() => deleteProduct(product.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
