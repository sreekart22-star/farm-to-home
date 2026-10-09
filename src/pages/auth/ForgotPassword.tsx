import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { showToast, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    showToast('Password reset instructions sent to your email.');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E4E8DF] shadow-xl space-y-6">
        <button onClick={() => navigate('login')} className="flex items-center gap-1.5 text-xs text-[#214E34] font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#6F9F54] flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-3xl text-[#242B25]">Reset Password</h2>
          <p className="text-xs text-[#687168]">Enter your email address and we'll send you reset instructions.</p>
        </div>

        {sent ? (
          <div className="bg-[#E8EFE3] p-5 rounded-2xl text-center space-y-3">
            <div className="w-10 h-10 bg-[#214E34] text-white rounded-full flex items-center justify-center mx-auto">✓</div>
            <p className="text-xs text-[#214E34] font-medium">Reset link sent to <strong>{email}</strong>. Check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="ananya@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
                />
                <Mail className="w-4 h-4 text-[#687168] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#214E34] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#163D2A] transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>Send Reset Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
