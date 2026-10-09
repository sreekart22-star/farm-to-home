import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Shield, Tractor, User, LogOut } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { currentRole, setCurrentRole, currentUser, logout, navigate } = useApp();

  return (
    <div className="bg-[#214E34]/10 border-b border-[#214E34]/20 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 text-[#242B25]">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#214E34] flex items-center gap-1">
          <UserCheck className="w-3.5 h-3.5" /> Portal Mode:
        </span>
        <span className="bg-[#214E34] text-white px-2 py-0.5 rounded-full font-medium capitalize">
          {currentRole} {currentUser ? `(${currentUser.name})` : ''}
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[#687168] hidden sm:inline">Switch Role:</span>
        <button
          onClick={() => {
            setCurrentRole('customer');
            navigate('home');
          }}
          className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
            currentRole === 'customer'
              ? 'bg-[#214E34] text-white shadow-sm'
              : 'bg-white text-[#214E34] border border-[#214E34]/30 hover:bg-[#E8EFE3]'
          }`}
        >
          <User className="w-3 h-3" /> Customer
        </button>

        <button
          onClick={() => {
            setCurrentRole('farmer');
            navigate('farmer-dashboard');
          }}
          className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
            currentRole === 'farmer'
              ? 'bg-[#214E34] text-white shadow-sm'
              : 'bg-white text-[#214E34] border border-[#214E34]/30 hover:bg-[#E8EFE3]'
          }`}
        >
          <Tractor className="w-3 h-3" /> Farmer Portal
        </button>

        <button
          onClick={() => {
            setCurrentRole('admin');
            navigate('admin-dashboard');
          }}
          className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
            currentRole === 'admin'
              ? 'bg-[#214E34] text-white shadow-sm'
              : 'bg-white text-[#214E34] border border-[#214E34]/30 hover:bg-[#E8EFE3]'
          }`}
        >
          <Shield className="w-3 h-3" /> Admin Portal
        </button>

        {currentUser && (
          <button
            onClick={logout}
            className="text-red-700 bg-white border border-red-200 px-2.5 py-1 rounded hover:bg-red-50 flex items-center gap-1 ml-2"
          >
            <LogOut className="w-3 h-3" /> Logout
          </button>
        )}
      </div>
    </div>
  );
};
