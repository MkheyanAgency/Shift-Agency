import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../../data/PartnersData';
import Modal from './Modal';
import { Play, Star, TrendingUp, Sparkles, Quote, Video } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export default function TestimonialsSection() {
  const [activeReel, setActiveReel] = useState(null);

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeUp className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CLIENT VOICES & VIDEO REELS</span>
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Ինչ Են Ասում Մեր Գործընկերներն Ու Ուսանողները
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Կարծիքներ, տեսանյութեր և իրական բիզնես արդյունքներ՝ փաստերով։
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS_DATA.map((item) => (
          <StaggerItem key={item.id}>
            <div className="rounded-3xl glass-panel p-7 border border-white/10 hover:border-[#b4f846]/30 transition-all flex flex-col justify-between h-full space-y-6">
              {/* Top Reel Preview Card */}
              <div
                onClick={() => setActiveReel(item)}
                className="relative rounded-2xl overflow-hidden h-48 border border-white/10 group cursor-pointer"
              >
                <img
                  src={item.videoReel.thumbnail}
                  alt={item.videoReel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#b4f846] text-black flex items-center justify-center shadow-[0_0_20px_#b4f846] group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    <Video className="w-3.5 h-3.5 text-[#b4f846]" />
                    <span>{item.videoReel.title}</span>
                  </span>
                  <span className="text-[11px] text-[#b4f846] bg-black/70 px-2 py-0.5 rounded">
                    {item.videoReel.views}
                  </span>
                </div>
              </div>

              {/* Quote & Author Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
                    {item.growth}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  «{item.content}»
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#b4f846]/40"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{item.author}</h4>
                    <p className="text-[11px] text-neutral-400">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Video Reel Play Modal */}
      {activeReel && (
        <Modal
          isOpen={!!activeReel}
          onClose={() => setActiveReel(null)}
          title={`Վիդեո Կարծիք: ${activeReel.author}`}
        >
          <div className="space-y-4 text-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-[460px] mx-auto bg-black border border-white/10">
              <img
                src={activeReel.videoReel.thumbnail}
                alt={activeReel.videoReel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#b4f846] text-black flex items-center justify-center shadow-[0_0_25px_#b4f846] mb-4">
                  <Play className="w-6 h-6 fill-black ml-0.5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{activeReel.videoReel.title}</h4>
                <p className="text-xs text-neutral-300 max-w-xs leading-relaxed">
                  «{activeReel.content}»
                </p>
                <span className="mt-4 text-[10px] uppercase font-bold text-[#b4f846] bg-black/70 px-3 py-1 rounded-full border border-[#b4f846]/30">
                  {activeReel.growth}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
