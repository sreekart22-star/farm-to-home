import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, ArrowRight, Lock, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('home');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E4E8DF] shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#6F9F54] flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-3xl text-[#242B25]">Welcome Back</h2>
          <p className="text-xs text-[#687168]">Sign in to access your Farm to Home account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
              />
              <Mail className="w-4 h-4 text-[#687168] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
              />
              <Lock className="w-4 h-4 text-[#687168] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#687168]">
              <input type="checkbox" className="rounded text-[#214E34]" /> Remember me
            </label>
            <button type="button" onClick={() => navigate('forgot-password')} className="text-[#214E34] font-semibold hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#214E34] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#163D2A] transition shadow-lg flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#E4E8DF] text-xs text-[#687168]">
          Don't have an account?{' '}
          <button onClick={() => navigate('register')} className="text-[#214E34] font-bold hover:underline">
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};
