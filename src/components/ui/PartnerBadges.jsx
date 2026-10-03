import React from 'react';
import { OFFICIAL_BADGES } from '../../data/PartnersData';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import { FadeUp } from '../common/ScrollReveal';

export default function PartnerBadges() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeUp>
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-[#090b0f]/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#b4f846] flex items-center justify-center md:justify-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CERTIFIED EXPERTISE</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Պաշտոնական Գործընկերության Հավաստագրեր
              </h3>
              <p className="text-xs text-neutral-400">
                Մեր մասնագետները հավաստագրված են համաշխարհային առաջատար հարթակների կողմից։
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {OFFICIAL_BADGES.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-sm text-[#b4f846]">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{b.name}</h4>
                    <p className="text-[10px] text-neutral-400">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
