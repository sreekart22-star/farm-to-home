import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white font-medium text-sm ${
          toast.type === 'error'
            ? 'bg-red-700'
            : toast.type === 'info'
            ? 'bg-[#163D2A]'
            : 'bg-[#214E34]'
        }`}
      >
        {toast.type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-red-200 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-5 h-5 text-emerald-200 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-[#6F9F54] shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
