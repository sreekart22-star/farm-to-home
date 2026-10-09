import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, ArrowRight, Lock, Mail, User, Phone, Tractor } from 'lucide-react';

export const Register: React.FC = () => {
  const { register, navigate } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'farmer'>('customer');
  const [farmName, setFarmName] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) return;
    register(name, email, phone, role, role === 'farmer' ? farmName : undefined);
    navigate(role === 'farmer' ? 'farmer-dashboard' : 'home');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E4E8DF] shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#6F9F54] flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-3xl text-[#242B25]">Create Account</h2>
          <p className="text-xs text-[#687168]">Join Farm to Home as a customer or farmer partner</p>
        </div>

        <div className="flex bg-[#F8F6EE] p-1.5 rounded-2xl border border-[#E4E8DF]">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              role === 'customer' ? 'bg-[#214E34] text-white shadow-sm' : 'text-[#687168] hover:text-[#242B25]'
            }`}
          >
            Customer Account
          </button>
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
              role === 'farmer' ? 'bg-[#214E34] text-white shadow-sm' : 'text-[#687168] hover:text-[#242B25]'
            }`}
          >
            <Tractor className="w-3.5 h-3.5" /> Farmer Partner
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-1.5">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ramesh Reddy"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
              />
              <User className="w-4 h-4 text-[#687168] absolute left-3.5 top-3" />
            </div>
          </div>

          {role === 'farmer' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-1.5">Farm Name</label>
              <input
                type="text"
                required
                placeholder="Shamshabad Green Acres"
                value={farmName}
                onChange={e => setFarmName(e.target.value)}
                className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="ramesh@farmtohome.in"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
              />
              <Mail className="w-4 h-4 text-[#687168] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-1.5">Mobile Phone</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+91 98480 12345"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
              />
              <Phone className="w-4 h-4 text-[#687168] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#214E34]"
              />
              <Lock className="w-4 h-4 text-[#687168] absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#214E34] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#163D2A] transition shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            <span>Create {role === 'farmer' ? 'Farmer' : 'Customer'} Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#E4E8DF] text-xs text-[#687168]">
          Already have an account?{' '}
          <button onClick={() => navigate('login')} className="text-[#214E34] font-bold hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
