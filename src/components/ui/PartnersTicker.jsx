import React from 'react';
import { PARTNERS_DATA } from '../../data/PartnersData';

export default function PartnersTicker() {
  return (
    <div className="w-full py-8 border-y border-white/5 bg-[#090b0e]/70 relative overflow-hidden select-none">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07080a] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
          ՎՍՏԱՀՎԱԾ Է ՀԱՅԱՍՏԱՆԻ ԵՎ ՄԻՋԱԶԳԱՅԻՆ 50+ ԱՌԱՋԱՏԱՐ ԲՐԵՆԴՆԵՐԻ ԿՈՂՄԻՑ
        </span>
      </div>

      <div className="animate-marquee flex items-center gap-12 text-sm sm:text-base font-extrabold text-neutral-300">
        {[...PARTNERS_DATA, ...PARTNERS_DATA, ...PARTNERS_DATA].map((partner, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-panel border border-white/5 shrink-0 hover:border-[#b4f846]/40 hover:text-white transition-all cursor-default"
          >
            <span>{partner.logo}</span>
            <span className="text-[10px] uppercase font-bold text-neutral-500 px-2 py-0.5 rounded bg-white/5">
              {partner.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
