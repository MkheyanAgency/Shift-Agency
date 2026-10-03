import React from 'react';

const ITEMS = [
  '📈 SMM & Social Growth',
  '⚡ Branding & Visual Identity',
  '🎬 Viral Reels & TikTok Production',
  '💻 Modern Web & App Development',
  '🎯 Target Ads (Meta & Google PPC)',
  '🎓 Shift Academy SMM Courses',
  '🚀 4.8x Average Client ROAS',
  '✨ Creative Copywriting & Storytelling'
];

export default function Ticker() {
  return (
    <div className="w-full bg-[#101319] border-y border-white/10 py-3.5 overflow-hidden relative select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#07080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#07080a] to-transparent z-10 pointer-events-none" />
      
      <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-extrabold tracking-widest uppercase text-white/90">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span className="hover:text-[#b4f846] transition-colors">{item}</span>
            <span className="text-[#b4f846] opacity-75 font-black">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
