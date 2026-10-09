import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Address } from '../../types';
import { ShieldCheck, MapPin, Truck, CreditCard, Banknote, ArrowRight } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, cartSubtotal, cartTotal, settings, addresses, addAddress, placeOrder, navigate, showToast } = useApp();

  const [selectedAddrId, setSelectedAddrId] = useState<string>(addresses[0]?.id || '');
  const [showNewAddrForm, setShowNewAddrForm] = useState(addresses.length === 0);

  // New address form state
  const [newName, setNewName] = useState('Ananya Sharma');
  const [newPhone, setNewPhone] = useState('+91 98123 45678');
  const [newHouseNo, setNewHouseNo] = useState('Flat 402, Lotus Towers');
  const [newLocality, setNewLocality] = useState('Gachibowli');
  const [newCity, setNewCity] = useState('Hyderabad');
  const [newState, setNewState] = useState('Telangana');
  const [newPincode, setNewPincode] = useState('500032');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online_razorpay'>('online_razorpay');

  if (cart.length === 0) {
    navigate('cart');
    return null;
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    let targetAddr: Address;

    if (showNewAddrForm || addresses.length === 0) {
      if (!newPincode || !newHouseNo || !newName || !newPhone) {
        showToast('Please fill in all required delivery address fields', 'error');
        return;
      }
      if (!settings.serviceablePincodes.includes(newPincode)) {
        showToast(`Sorry, delivery is currently not available for PIN code ${newPincode}. Try 500032, 500081, 500084, etc.`, 'error');
        return;
      }
      targetAddr = {
        id: 'addr-' + Date.now(),
        name: newName,
        phone: newPhone,
        houseNo: newHouseNo,
        locality: newLocality,
        city: newCity,
        state: newState,
        pincode: newPincode,
        isDefault: true
      };
      addAddress(targetAddr);
    } else {
      const found = addresses.find(a => a.id === selectedAddrId);
      if (!found) {
        showToast('Please select a delivery address', 'error');
        return;
      }
      if (!settings.serviceablePincodes.includes(found.pincode)) {
        showToast(`Delivery not available for PIN code ${found.pincode}`, 'error');
        return;
      }
      targetAddr = found;
    }

    try {
      const order = placeOrder(targetAddr, paymentMethod, instructions);
      navigate(`account/orders/${order.id}`);
    } catch (err: any) {
      // Error handled inside placeOrder
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block mb-1">
          Secure Checkout
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
          Complete Your Order
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Address & Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* Delivery Address Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E8DF] space-y-6 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-[#242B25] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#214E34]" /> Delivery Address (Telangana)
            </h3>

            {addresses.length > 0 && !showNewAddrForm && (
              <div className="space-y-4">
                {addresses.map(addr => (
                  <label
                    key={addr.id}
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition ${
                      selectedAddrId === addr.id ? 'border-[#214E34] bg-[#E8EFE3]/30' : 'border-[#E4E8DF] hover:border-[#6F9F54]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddrId === addr.id}
                            onChange={() => setSelectedAddrId(addr.id)}
                            className="accent-[#214E34]"
                          />
                          <span className="font-bold text-[#242B25] text-sm">{addr.name}</span>
                          <span className="text-xs bg-[#E8EFE3] text-[#214E34] px-2 py-0.5 rounded font-medium">{addr.phone}</span>
                        </div>
                        <p className="text-xs text-[#687168] pl-5">
                          {addr.houseNo}, {addr.locality}, {addr.city}, {addr.state} — PIN: {addr.pincode}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}

                <button
                  type="button"
                  onClick={() => setShowNewAddrForm(true)}
                  className="text-xs font-semibold text-[#214E34] hover:underline pt-2 block"
                >
                  + Add a new delivery address
                </button>
              </div>
            )}

            {(showNewAddrForm || addresses.length === 0) && (
              <div className="space-y-4 pt-4 border-t border-[#E4E8DF]">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-[#242B25]">New Delivery Address</h4>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewAddrForm(false)}
                      className="text-xs text-[#687168] hover:text-[#214E34]"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#687168] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#687168] mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={newPhone}
                      onChange={e => setNewPhone(e.target.value)}
                      className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#687168] mb-1">House / Flat No., Apartment *</label>
                  <input
                    type="text"
                    required
                    value={newHouseNo}
                    onChange={e => setNewHouseNo(e.target.value)}
                    className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#687168] mb-1">Locality *</label>
                    <input
                      type="text"
                      required
                      value={newLocality}
                      onChange={e => setNewLocality(e.target.value)}
                      className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#687168] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={e => setNewCity(e.target.value)}
                      className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#687168] mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={newPincode}
                      onChange={e => setNewPincode(e.target.value)}
                      className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
                      placeholder="e.g. 500032"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-[#687168]">Supported service PIN codes: 500081, 500032, 500084, 500008, 500034, etc.</p>
              </div>
            )}
          </div>

          {/* Delivery Instructions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E8DF] space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-[#242B25] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#214E34]" /> Delivery Instructions (Optional)
            </h3>
            <textarea
              rows={2}
              placeholder="e.g. Leave with security guard, ring doorbell upon arrival"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
            ></textarea>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E8DF] space-y-6 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-[#242B25] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#214E34]" /> Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.enableOnlinePayment && (
                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'online_razorpay' ? 'border-[#214E34] bg-[#E8EFE3]/30' : 'border-[#E4E8DF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'online_razorpay'}
                    onChange={() => setPaymentMethod('online_razorpay')}
                    className="accent-[#214E34]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#242B25] block">Online Payment</span>
                    <span className="text-xs text-[#687168]">UPI, Cards, NetBanking (Razorpay)</span>
                  </div>
                </label>
              )}

              {settings.enableCod && (
                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'cod' ? 'border-[#214E34] bg-[#E8EFE3]/30' : 'border-[#E4E8DF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#214E34]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#242B25] block">Cash on Delivery (COD)</span>
                    <span className="text-xs text-[#687168]">Pay upon doorstep arrival</span>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E4E8DF] p-6 sm:p-8 space-y-6 shadow-xs sticky top-28">
            <h3 className="font-serif font-bold text-xl text-[#242B25] pb-4 border-b border-[#E4E8DF]">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-[#F8F6EE]" />
                    <div>
                      <span className="font-medium text-[#242B25] line-clamp-1">{item.product.name}</span>
                      <span className="text-xs text-[#687168]">Qty: {item.quantity} × ₹{item.product.price}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#214E34]">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E4E8DF] text-sm text-[#687168]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#242B25]">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-semibold text-[#242B25]">
                  {cartSubtotal >= settings.freeDeliveryThreshold ? 'FREE' : `₹${settings.deliveryFee}`}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E4E8DF] flex justify-between text-lg font-bold text-[#214E34]">
                <span>Total Payable</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <div className="bg-[#E8EFE3]/50 p-4 rounded-xl text-xs text-[#242B25] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#214E34] shrink-0" />
              <span>Prices verified on server. Guaranteed farm freshness.</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#214E34] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#163D2A] transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>Place Order Securely</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
