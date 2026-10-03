import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#b4f846]/30 text-xs font-bold text-white transition-all"
      title="Փոխել լեզուն / Switch Language"
    >
      <Globe className="w-3.5 h-3.5 text-[#b4f846]" />
      <span>{lang.toUpperCase()}</span>
    </button>
  );
}
