import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Save, Settings as SettingsIcon } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, navigate } = useApp();

  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [deliveryFee, setDeliveryFee] = useState(settings.deliveryFee);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(settings.freeDeliveryThreshold);
  const [enableCod, setEnableCod] = useState(settings.enableCod);
  const [enableOnlinePayment, setEnableOnlinePayment] = useState(settings.enableOnlinePayment);
  const [pincodeInput, setPincodeInput] = useState(settings.serviceablePincodes.join(', '));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceablePincodes = pincodeInput.split(',').map(s => s.trim()).filter(Boolean);
    updateSettings({
      announcementText,
      deliveryFee: Number(deliveryFee),
      freeDeliveryThreshold: Number(freeDeliveryThreshold),
      enableCod,
      enableOnlinePayment,
      serviceablePincodes
    });
    navigate('admin-dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('admin-dashboard')} className="p-2 rounded-xl bg-[#E8EFE3] text-[#214E34]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">Configuration</span>
          <h1 className="font-serif font-bold text-3xl text-[#242B25]">Platform Settings</h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-[#E4E8DF] space-y-6 shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Announcement Bar Text</label>
          <input
            type="text"
            required
            value={announcementText}
            onChange={e => setAnnouncementText(e.target.value)}
            className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Delivery Fee (₹)</label>
            <input
              type="number"
              required
              min="0"
              value={deliveryFee}
              onChange={e => setDeliveryFee(Number(e.target.value))}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Free Delivery Threshold (₹)</label>
            <input
              type="number"
              required
              min="0"
              value={freeDeliveryThreshold}
              onChange={e => setFreeDeliveryThreshold(Number(e.target.value))}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Serviceable PIN Codes (comma separated)</label>
          <input
            type="text"
            required
            value={pincodeInput}
            onChange={e => setPincodeInput(e.target.value)}
            className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
          />
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#242B25]">
            <input
              type="checkbox"
              checked={enableCod}
              onChange={e => setEnableCod(e.target.checked)}
              className="rounded text-[#214E34]"
            />
            <span>Enable Cash on Delivery (COD)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#242B25]">
            <input
              type="checkbox"
              checked={enableOnlinePayment}
              onChange={e => setEnableOnlinePayment(e.target.checked)}
              className="rounded text-[#214E34]"
            />
            <span>Enable Online Razorpay Payment Simulation</span>
          </label>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="submit"
            className="bg-[#214E34] text-white px-8 py-3.5 rounded-xl font-bold text-xs hover:bg-[#163D2A] transition shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
