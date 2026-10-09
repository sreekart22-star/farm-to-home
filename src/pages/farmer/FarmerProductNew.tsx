import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Plus, Sparkles } from 'lucide-react';

export const FarmerProductNew: React.FC = () => {
  const { categories, farmers, currentUser, addProduct, navigate } = useApp();
  const currentFarmer = farmers.find(f => f.email === currentUser?.email) || farmers[0];

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-1');
  const [price, setPrice] = useState(45);
  const [unit, setUnit] = useState('1 kg');
  const [stock, setStock] = useState(100);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('');
  const [storageInstructions, setStorageInstructions] = useState('Store in a cool dry place.');
  const [harvestInfo, setHarvestInfo] = useState('Harvested at dawn today.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    addProduct({
      name,
      categoryId,
      farmerId: currentFarmer.id,
      farmerName: currentFarmer.name,
      price: Number(price),
      unit,
      stock: Number(stock),
      image,
      images: [image],
      description: description || 'Fresh farm produce harvested locally in Telangana.',
      storageInstructions,
      harvestInfo,
      origin: `${currentFarmer.district}, Telangana`,
      isSeasonal: false,
      isFeatured: false,
      available: true
    });

    navigate('farmer/products');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('farmer/products')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Catalog Management</span>
          <h1 className="font-serif font-bold text-3xl text-[#242B25]">Add New Farm Product</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-[#E4E8DF] space-y-6 shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Product Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Organic Country Tomatoes"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Category *</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Unit *</label>
            <input
              type="text"
              required
              placeholder="e.g. 1 kg, 500 g, 1 bunch, 1 litre"
              value={unit}
              onChange={e => setUnit(e.target.value)}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Price in ₹ (INR) *</label>
            <input
              type="number"
              required
              min="1"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Stock Quantity *</label>
            <input
              type="number"
              required
              min="1"
              value={stock}
              onChange={e => setStock(Number(e.target.value))}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Image URL *</label>
          <input
            type="url"
            required
            value={image}
            onChange={e => setImage(e.target.value)}
            className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="Describe the freshness, taste, and cultivation method..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('farmer/products')}
            className="px-6 py-3 rounded-xl text-xs font-semibold text-[#687168]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#214E34] text-white px-8 py-3.5 rounded-xl font-bold text-xs hover:bg-[#163D2A] transition shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};
