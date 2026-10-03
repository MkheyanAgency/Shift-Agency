import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function StackingCardItem({ card, index, totalCards, progress, range, targetScale }) {
  const containerRef = useRef(null);
  
  // Transform scale and brightness as scroll reaches each card
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.75]);
  const brightness = useTransform(progress, range, [1, 0.85]);

  return (
    <div
      ref={containerRef}
      className="sticky top-28 sm:top-32 flex items-center justify-center mb-8 last:mb-0"
      style={{
        zIndex: index + 10
      }}
    >
      <motion.div
        style={{
          scale,
          filter: `brightness(${brightness})`,
          top: `calc(10px + ${index * 24}px)`
        }}
        className="w-full max-w-5xl rounded-3xl p-6 sm:p-10 bg-[#0d0f14] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden transition-colors"
      >
        {/* Glow ambient accent behind card */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: card.accentColor || '#b4f846' }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text content (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/30 flex items-center justify-center font-black text-sm">
                0{index + 1}
              </span>
              <span className="text-xs font-black tracking-widest uppercase text-neutral-400">
                {card.badge || `ՓՈՒԼ 0${index + 1}`}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {card.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {card.description}
            </p>

            {card.points && (
              <ul className="space-y-2 pt-2">
                {card.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b4f846] mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}

            {card.metric && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-bold text-[#b4f846] mt-2">
                <span className="w-2 h-2 rounded-full bg-[#b4f846] animate-pulse" />
                <span>{card.metric}</span>
              </div>
            )}
          </div>

          {/* Visual column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 group">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {card.imageTag && (
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white border border-white/20 backdrop-blur-md">
                  {card.imageTag}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function StackingCards({ cards }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} className="relative w-full py-6">
      {cards.map((card, index) => {
        const targetScale = 1 - (cards.length - index) * 0.04;
        const range = [index * (1 / cards.length), 1];
        return (
          <StackingCardItem
            key={index}
            card={card}
            index={index}
            totalCards={cards.length}
            progress={scrollYProgress}
            range={range}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
