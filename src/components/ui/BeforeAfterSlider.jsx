import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, TrendingUp, Users, Target, DollarSign, Image as ImageIcon } from 'lucide-react';

export default function BeforeAfterSlider({
  caseItem,
  beforeImage,
  afterImage,
  beforeLabel = 'ՄԻՆՉԵՎ (BEFORE)',
  afterLabel = 'ԱՐԴՅՈՒՆՔ (AFTER)',
  className = ''
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  // Normalize image sources from either supported interface
  const actualBeforeImage =
    beforeImage ||
    caseItem?.beforeImage ||
    '/shift_sev-removebg-preview.png';

  const actualAfterImage =
    afterImage ||
    caseItem?.afterImage ||
    '/shift_sev-removebg-preview.png';

  const actualBeforeLabel = beforeLabel || 'ՄԻՆՉԵՎ (BEFORE)';
  const actualAfterLabel = afterLabel || 'ԱՐԴՅՈՒՆՔ (AFTER)';

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const hasMetrics = caseItem && caseItem.beforeMetrics && caseItem.afterMetrics;

  return (
    <div className={`w-full ${className}`}>
      {/* If full caseItem was provided, display optional header */}
      {caseItem && (caseItem.titleHy || caseItem.tagHy) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            {caseItem.tagHy && (
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20 mb-2">
                {caseItem.tagHy}
              </span>
            )}
            {caseItem.titleHy && (
              <h3 className="text-xl md:text-2xl font-black text-white">{caseItem.titleHy}</h3>
            )}
            {caseItem.shortDescHy && (
              <p className="text-sm text-neutral-400 mt-1 max-w-xl">{caseItem.shortDescHy}</p>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 self-start md:self-auto">
            <ArrowLeftRight className="w-4 h-4 text-[#b4f846]" />
            <span>Սահեցրեք համեմատելու համար</span>
          </div>
        </div>
      )}

      {/* Visual Image Slider */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px] rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/10 bg-[#0c0d12]"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerUp}
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before/After image comparison slider"
      >
        {/* After Image (Background, Full) */}
        <img
          src={actualAfterImage}
          alt="After optimization"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/shift_sev-removebg-preview.png';
          }}
        />
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[#b4f846]/40 text-[11px] font-extrabold text-[#b4f846] z-10 flex items-center gap-1.5 shadow-lg pointer-events-none">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{actualAfterLabel}</span>
        </div>

        {/* Before Image (Clipped Layer) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={actualBeforeImage}
            alt="Before optimization"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover grayscale-[35%] brightness-75 max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/shift_sev-removebg-preview.png';
            }}
          />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-[11px] font-bold text-neutral-300 z-10 shadow-lg pointer-events-none">
            <span>{actualBeforeLabel}</span>
          </div>
        </div>

        {/* Slider Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#b4f846] cursor-ew-resize z-20 shadow-[0_0_15px_#b4f846] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#07080a] border-2 border-[#b4f846] shadow-[0_0_20px_rgba(180,248,70,0.85)] flex items-center justify-center text-[#b4f846]">
            <ArrowLeftRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </div>
        </div>
      </div>

      {/* Metrics Comparison Matrix (Only when full caseItem is passed) */}
      {hasMetrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-6">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
              <Users className="w-3.5 h-3.5 text-[#b4f846]" />
              <span>Հետևորդներ</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs line-through text-neutral-500">
                {caseItem.beforeMetrics?.followers || '—'}
              </span>
              <span className="text-base md:text-lg font-black text-white">
                {caseItem.afterMetrics?.followers || '—'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
              <Target className="w-3.5 h-3.5 text-[#b4f846]" />
              <span>Ամսական Ծածկույթ</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs line-through text-neutral-500">
                {caseItem.beforeMetrics?.reach || '—'}
              </span>
              <span className="text-base md:text-lg font-black text-[#b4f846]">
                {caseItem.afterMetrics?.reach || '—'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#b4f846]" />
              <span>Լիդեր / Վաճառք</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs line-through text-neutral-500">
                {caseItem.beforeMetrics?.leads || '—'}
              </span>
              <span className="text-base md:text-lg font-black text-white">
                {caseItem.afterMetrics?.leads || '—'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-[#b4f846]" />
              <span>ROAS / Եկամտաբերություն</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs line-through text-neutral-500">
                {caseItem.beforeMetrics?.roas || '—'}
              </span>
              <span className="text-base md:text-lg font-black text-[#b4f846]">
                {caseItem.afterMetrics?.roas || '—'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
