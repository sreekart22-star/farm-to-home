import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useApp();
  return (
    <div className="bg-[#163D2A] text-[#F8F6EE] px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-inner text-center">
      <Sparkles className="w-4 h-4 text-[#6F9F54] animate-pulse shrink-0" />
      <span>{settings.announcementText}</span>
    </div>
  );
};
