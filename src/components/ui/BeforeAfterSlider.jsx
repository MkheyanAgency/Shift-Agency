import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, TrendingUp, Users, Target, DollarSign } from 'lucide-react';

export default function BeforeAfterSlider({ caseItem }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full rounded-2xl glass-panel p-5 md:p-8 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20 mb-2">
            {caseItem.tagHy}
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white">{caseItem.titleHy}</h3>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">{caseItem.shortDescHy}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 self-start md:self-auto">
          <ArrowLeftRight className="w-4 h-4 text-[#b4f846]" />
          <span>Սահեցրեք համեմատելու համար</span>
        </div>
      </div>

      {/* Visual Image Slider */}
      <div
        ref={containerRef}
        className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/10"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerUp}
      >
        {/* After Image (Background, Full) */}
        <img
          src={caseItem.afterImage}
          alt="After optimization"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#b4f846]/40 text-xs font-extrabold text-[#b4f846] z-10 flex items-center gap-1.5 shadow-lg">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>ԱՐԴՅՈՒՆՔ (AFTER)</span>
        </div>

        {/* Before Image (Clipped Layer) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={caseItem.beforeImage}
            alt="Before optimization"
            className="absolute inset-0 w-full h-full object-cover grayscale-[30%] brightness-75 max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 text-xs font-bold text-neutral-300 z-10 shadow-lg">
            <span>ՄԻՆՉԵՎ (BEFORE)</span>
          </div>
        </div>

        {/* Slider Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#b4f846] cursor-ew-resize z-20 shadow-[0_0_15px_#b4f846]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#07080a] border-2 border-[#b4f846] shadow-[0_0_20px_rgba(180,248,70,0.8)] flex items-center justify-center text-[#b4f846]">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Metrics Comparison Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-6">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Users className="w-3.5 h-3.5 text-[#b4f846]" />
            <span>Հետևորդներ</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs line-through text-neutral-500">{caseItem.beforeMetrics.followers}</span>
            <span className="text-base md:text-lg font-black text-white">{caseItem.afterMetrics.followers}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Target className="w-3.5 h-3.5 text-[#b4f846]" />
            <span>Ամսական Ծածկույթ</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs line-through text-neutral-500">{caseItem.beforeMetrics.reach}</span>
            <span className="text-base md:text-lg font-black text-[#b4f846]">{caseItem.afterMetrics.reach}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#b4f846]" />
            <span>Լիդեր / Վաճառք</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs line-through text-neutral-500">{caseItem.beforeMetrics.leads}</span>
            <span className="text-base md:text-lg font-black text-white">{caseItem.afterMetrics.leads}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <DollarSign className="w-3.5 h-3.5 text-[#b4f846]" />
            <span>ROAS / Եկամտաբերություն</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs line-through text-neutral-500">{caseItem.beforeMetrics.roas}</span>
            <span className="text-base md:text-lg font-black text-[#b4f846]">{caseItem.afterMetrics.roas}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
