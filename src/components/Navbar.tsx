import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sprout,
  User,
  MapPin,
  ChevronDown,
  Shield,
  Tractor
} from 'lucide-react';
import { RoleSwitcherBar } from './RoleSwitcherBar';

export const Navbar: React.FC = () => {
  const {
    activeRoute,
    navigate,
    cartItemCount,
    wishlist,
    currentRole,
    currentUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationModal, setLocationModal] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState('500032 (Gachibowli)');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6EE] border-b border-[#E4E8DF] shadow-xs">
      <RoleSwitcherBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-xl bg-[#214E34] flex items-center justify-center text-white shadow-md group-hover:bg-[#163D2A] transition">
                <Sprout className="w-6 h-6 text-[#6F9F54]" />
              </div>
              <div>
                <span className="font-bold text-xl sm:text-2xl text-[#214E34] tracking-tight font-serif block">
                  Farm to Home
                </span>
                <span className="text-[10px] text-[#687168] tracking-widest uppercase block font-medium">
                  Direct From Telangana Farms
                </span>
              </div>
            </button>

            {/* Location Selector */}
            <button
              onClick={() => setLocationModal(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs text-[#242B25] bg-white border border-[#E4E8DF] px-3 py-2 rounded-lg hover:border-[#6F9F54] transition shadow-2xs"
            >
              <MapPin className="w-4 h-4 text-[#214E34]" />
              <div className="text-left">
                <span className="text-[10px] text-[#687168] block">Deliver to</span>
                <span className="font-semibold text-[#214E34] truncate max-w-[140px] block">
                  {selectedPincode}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#687168] ml-1" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => navigate('home')}
              className={`text-sm font-medium transition hover:text-[#214E34] ${
                activeRoute === 'home' ? 'text-[#214E34] font-semibold border-b-2 border-[#214E34] pb-1' : 'text-[#687168]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('shop')}
              className={`text-sm font-medium transition hover:text-[#214E34] ${
                activeRoute === 'shop' ? 'text-[#214E34] font-semibold border-b-2 border-[#214E34] pb-1' : 'text-[#687168]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => navigate('categories')}
              className={`text-sm font-medium transition hover:text-[#214E34] ${
                activeRoute === 'categories' ? 'text-[#214E34] font-semibold border-b-2 border-[#214E34] pb-1' : 'text-[#687168]'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => navigate('farmers')}
              className={`text-sm font-medium transition hover:text-[#214E34] ${
                activeRoute === 'farmers' ? 'text-[#214E34] font-semibold border-b-2 border-[#214E34] pb-1' : 'text-[#687168]'
              }`}
            >
              Our Farmers
            </button>
            <button
              onClick={() => navigate('how-it-works')}
              className={`text-sm font-medium transition hover:text-[#214E34] ${
                activeRoute === 'how-it-works' ? 'text-[#214E34] font-semibold border-b-2 border-[#214E34] pb-1' : 'text-[#687168]'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => navigate('about')}
              className={`text-sm font-medium transition hover:text-[#214E34] ${
                activeRoute === 'about' ? 'text-[#214E34] font-semibold border-b-2 border-[#214E34] pb-1' : 'text-[#687168]'
              }`}
            >
              About
            </button>
          </nav>

          {/* Search, Wishlist, Cart, Account */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden xl:flex items-center relative">
              <input
                type="text"
                placeholder="Search tomatoes, rice, milk..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-52 bg-white border border-[#E4E8DF] text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-[#214E34] transition text-[#242B25] placeholder-[#687168]"
              />
              <Search className="w-4 h-4 text-[#687168] absolute left-3 top-3" />
            </form>

            {/* Wishlist */}
            <button
              onClick={() => navigate('wishlist')}
              className="relative p-2.5 rounded-full hover:bg-[#E8EFE3] text-[#242B25] transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#214E34] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('cart')}
              className="relative flex items-center gap-2 bg-[#214E34] text-white px-4 py-2.5 rounded-xl hover:bg-[#163D2A] transition shadow-sm font-medium text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-[#6F9F54] text-[#242B25] text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Account / Portal Link */}
            {currentRole === 'farmer' ? (
              <button
                onClick={() => navigate('farmer-dashboard')}
                className="hidden sm:flex items-center gap-1.5 bg-[#E8EFE3] text-[#214E34] px-3 py-2 rounded-lg font-medium text-xs hover:bg-[#214E34] hover:text-white transition"
              >
                <Tractor className="w-4 h-4" /> Farmer Portal
              </button>
            ) : currentRole === 'admin' ? (
              <button
                onClick={() => navigate('admin-dashboard')}
                className="hidden sm:flex items-center gap-1.5 bg-[#E8EFE3] text-[#214E34] px-3 py-2 rounded-lg font-medium text-xs hover:bg-[#214E34] hover:text-white transition"
              >
                <Shield className="w-4 h-4" /> Admin
              </button>
            ) : (
              <button
                onClick={() => navigate(currentUser ? 'account' : 'login')}
                className="p-2.5 rounded-full hover:bg-[#E8EFE3] text-[#242B25] transition"
                title="Account"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#242B25] hover:bg-[#E8EFE3]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E4E8DF] px-6 py-5 space-y-4 shadow-lg animate-fadeIn">
          <form onSubmit={handleSearch} className="flex items-center relative mb-4">
            <input
              type="text"
              placeholder="Search fresh farm produce..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F6EE] border border-[#E4E8DF] text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#214E34]"
            />
            <Search className="w-4 h-4 text-[#687168] absolute left-3 top-3.5" />
          </form>

          <div className="flex flex-col space-y-3 font-medium text-[#242B25]">
            <button
              onClick={() => { navigate('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#214E34] transition"
            >
              Home
            </button>
            <button
              onClick={() => { navigate('shop'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#214E34] transition"
            >
              Shop All Products
            </button>
            <button
              onClick={() => { navigate('categories'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#214E34] transition"
            >
              Categories
            </button>
            <button
              onClick={() => { navigate('farmers'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#214E34] transition"
            >
              Our Farmers
            </button>
            <button
              onClick={() => { navigate('how-it-works'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#214E34] transition"
            >
              How It Works
            </button>
            <button
              onClick={() => { navigate('about'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#214E34] transition"
            >
              About Us
            </button>
            <button
              onClick={() => { navigate('contact'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#214E34] transition"
            >
              Contact Support
            </button>

            <div className="pt-4 border-t border-[#E4E8DF] flex gap-2">
              <button
                onClick={() => { navigate('account'); setMobileMenuOpen(false); }}
                className="flex-1 bg-[#E8EFE3] text-[#214E34] py-2.5 rounded-lg text-center font-semibold text-sm"
              >
                My Account
              </button>
              {currentRole === 'farmer' && (
                <button
                  onClick={() => { navigate('farmer-dashboard'); setMobileMenuOpen(false); }}
                  className="flex-1 bg-[#214E34] text-white py-2.5 rounded-lg text-center font-semibold text-sm"
                >
                  Farmer Portal
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {locationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#214E34]">Choose Delivery Location</h3>
              <button onClick={() => setLocationModal(false)} className="p-1.5 rounded-lg hover:bg-[#E8EFE3]">
                <X className="w-5 h-5 text-[#687168]" />
              </button>
            </div>
            <p className="text-sm text-[#687168]">
              We deliver direct from Telangana farms to doorsteps across Hyderabad and Secunderabad.
            </p>
            <div className="space-y-2">
              {[
                { pincode: '500032', area: 'Gachibowli, Hitec City' },
                { pincode: '500081', area: 'Madhapur, Raidurg' },
                { pincode: '500084', area: 'Kondapur, Financial District' },
                { pincode: '500008', area: 'Banjara Hills, Jubilee Hills' },
                { pincode: '500034', area: 'Kukatpally, Miyapur' }
              ].map(loc => (
                <button
                  key={loc.pincode}
                  onClick={() => {
                    setSelectedPincode(`${loc.pincode} (${loc.area.split(',')[0]})`);
                    setLocationModal(false);
                  }}
                  className="w-full text-left p-3 rounded-xl border border-[#E4E8DF] hover:border-[#214E34] hover:bg-[#E8EFE3]/40 transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-[#242B25] block text-sm">{loc.area}</span>
                    <span className="text-xs text-[#687168]">PIN Code: {loc.pincode}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#214E34] bg-[#E8EFE3] px-2.5 py-1 rounded-md">
                    Deliverable
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
