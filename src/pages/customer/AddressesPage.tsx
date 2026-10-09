import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Plus, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';

export const AddressesPage: React.FC = () => {
  const { addresses, addAddress, removeAddress, setDefaultAddress, navigate } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');
  const [pincode, setPincode] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !houseNo || !pincode) return;
    addAddress({
      name,
      phone,
      houseNo,
      locality,
      city,
      state,
      pincode,
      isDefault: addresses.length === 0
    });
    setName('');
    setPhone('');
    setHouseNo('');
    setLocality('');
    setPincode('');
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('account')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Saved Locations</span>
            <h1 className="font-serif font-bold text-3xl text-[#242B25]">Delivery Addresses</h1>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#214E34] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E8DF] space-y-4 shadow-sm">
          <h3 className="font-serif font-bold text-xl text-[#242B25]">Add New Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} className="bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm" />
            <input type="tel" placeholder="Mobile Number" required value={phone} onChange={e => setPhone(e.target.value)} className="bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm" />
          </div>
          <input type="text" placeholder="House / Flat No., Apartment" required value={houseNo} onChange={e => setHouseNo(e.target.value)} className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" placeholder="Locality" required value={locality} onChange={e => setLocality(e.target.value)} className="bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm" />
            <input type="text" placeholder="City" required value={city} onChange={e => setCity(e.target.value)} className="bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm" />
            <input type="text" placeholder="PIN Code (e.g. 500032)" required value={pincode} onChange={e => setPincode(e.target.value)} className="bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#687168]">Cancel</button>
            <button type="submit" className="bg-[#214E34] text-white px-6 py-2.5 rounded-xl text-xs font-bold">Save Address</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white p-6 rounded-2xl border border-[#E4E8DF] flex items-center justify-between shadow-2xs">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#242B25] text-base">{addr.name}</span>
                {addr.isDefault && (
                  <span className="bg-[#E8EFE3] text-[#214E34] text-[10px] font-bold px-2.5 py-0.5 rounded-full">Default</span>
                )}
              </div>
              <p className="text-xs text-[#687168]">{addr.houseNo}, {addr.locality}, {addr.city}, {addr.state} — PIN: {addr.pincode}</p>
              <p className="text-xs text-[#214E34] font-medium">Phone: {addr.phone}</p>
            </div>

            <div className="flex items-center gap-3">
              {!addr.isDefault && (
                <button
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-xs font-semibold text-[#214E34] hover:underline"
                >
                  Set Default
                </button>
              )}
              <button
                onClick={() => removeAddress(addr.id)}
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
