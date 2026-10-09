import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, Mail, Phone, MapPin, ArrowRight, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Successfully subscribed to Farm to Home seasonal updates!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#163D2A] text-[#F8F6EE] pt-16 pb-12 border-t border-[#214E34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 mb-12 border-b border-[#214E34]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#214E34] flex items-center justify-center text-[#6F9F54]">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">Directly From Farms</h4>
              <p className="text-xs text-[#E8EFE3]/80 mt-0.5">Sourced straight from certified local Telangana farmers.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#214E34] flex items-center justify-center text-[#6F9F54]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">Fair Farmer Pricing</h4>
              <p className="text-xs text-[#E8EFE3]/80 mt-0.5">Farmers earn fair compensation without middlemen margins.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#214E34] flex items-center justify-center text-[#6F9F54]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">Quality Checked Daily</h4>
              <p className="text-xs text-[#E8EFE3]/80 mt-0.5">Hand-sorted, washed, and delivered fresh to your doorstep.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#214E34]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#6F9F54] flex items-center justify-center text-[#163D2A]">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-2xl text-white">Farm to Home</span>
            </div>
            <p className="text-sm text-[#E8EFE3]/90 leading-relaxed pr-6">
              Fresh From the Farm. Delivered to Your Door. Empowering farmers and nourishing families across Hyderabad and Telangana with transparent, farm-fresh food.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#E8EFE3]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6F9F54] shrink-0" />
                <span>Shamshabad & Gachibowli Distribution Hubs, Hyderabad</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6F9F54] shrink-0" />
                <span>+91 (040) 2345 6789 / Support Helpline</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6F9F54] shrink-0" />
                <span>support@farmtohome.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-[#6F9F54]">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#E8EFE3]/80">
              <li><button onClick={() => navigate('shop')} className="hover:text-white transition">Shop Fresh Produce</button></li>
              <li><button onClick={() => navigate('categories')} className="hover:text-white transition">Categories</button></li>
              <li><button onClick={() => navigate('farmers')} className="hover:text-white transition">Our Farmer Partners</button></li>
              <li><button onClick={() => navigate('how-it-works')} className="hover:text-white transition">How It Works</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-white transition">About Our Mission</button></li>
            </ul>
          </div>

          {/* Customer & Farmer */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-[#6F9F54]">Account & Portal</h4>
            <ul className="space-y-2.5 text-sm text-[#E8EFE3]/80">
              <li><button onClick={() => navigate('account')} className="hover:text-white transition">Customer Dashboard</button></li>
              <li><button onClick={() => navigate('account/orders')} className="hover:text-white transition">My Orders</button></li>
              <li><button onClick={() => navigate('farmer-dashboard')} className="hover:text-white transition">Farmer Partner Login</button></li>
              <li><button onClick={() => navigate('admin-dashboard')} className="hover:text-white transition">Admin Portal</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-white transition">Help & Contact</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-[#6F9F54]">Seasonal Updates</h4>
            <p className="text-xs text-[#E8EFE3]/80">Subscribe for harvest alerts, seasonal fruits, and farmer stories.</p>
            {subscribed ? (
              <div className="bg-[#214E34] text-[#6F9F54] p-3 rounded-xl text-xs font-semibold">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#214E34] border border-[#214E34] text-xs text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#6F9F54] placeholder-[#E8EFE3]/50"
                />
                <button
                  type="submit"
                  className="w-full bg-[#6F9F54] text-[#163D2A] font-bold text-xs py-2.5 rounded-xl hover:bg-[#82b364] transition flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8EFE3]/60 gap-4">
          <p>© 2026 Farm to Home Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate('privacy')} className="hover:text-white transition">Privacy Policy</button>
            <button onClick={() => navigate('terms')} className="hover:text-white transition">Terms of Service</button>
            <button onClick={() => navigate('shipping-policy')} className="hover:text-white transition">Shipping Policy</button>
            <button onClick={() => navigate('refund-policy')} className="hover:text-white transition">Refund Policy</button>
            <button onClick={() => navigate('faq')} className="hover:text-white transition">FAQ</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
