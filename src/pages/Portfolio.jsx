import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_CASES } from '../data/PortfolioData';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import { ArrowUpRight, TrendingUp, Sparkles, Filter, ChevronRight, BarChart3, CheckCircle2 } from 'lucide-react';

export default function Portfolio() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', labelHy: 'Բոլոր Քեյսերը', labelEn: 'All Cases' },
    { id: 'smm', labelHy: 'SMM & Կոնտենտ', labelEn: 'SMM & Content' },
    { id: 'branding', labelHy: 'Բրենդինգ & Դիզայն', labelEn: 'Branding & Design' },
    { id: 'web', labelHy: 'Վեբ Կայքեր', labelEn: 'Web Development' },
    { id: 'target', labelHy: 'Թիրախային Գովազդ', labelEn: 'Target & Meta Ads' }
  ];

  const filteredCases = activeCategory === 'all'
    ? PORTFOLIO_CASES
    : PORTFOLIO_CASES.filter((c) => c.category === activeCategory);

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Shift Marketing Agency Portfolio',
    'description': 'Real-world marketing case studies, social media growth, web platforms, and ROI transformations by Shift Agency.',
    'itemListElement': PORTFOLIO_CASES.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'CreativeWork',
        'name': lang === 'hy' ? item.titleHy : item.titleEn,
        'description': lang === 'hy' ? item.shortDescHy : item.shortDescEn,
        'url': `https://shiftagency.am/portfolio/${item.slug}`
      }
    }))
  };

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <SEOHead
        title={lang === 'hy' ? 'Պորտֆոլիո և Իրական Քեյսեր' : 'Portfolio & Client Case Studies'}
        description={
          lang === 'hy'
            ? 'Shift Marketing Agency-ի իրականացրած լավագույն նախագծերը, Before/After աճի ցուցանիշները, ROI և վաճառքների բազմապատկումը։'
            : 'Explore proven client case studies, verified Before/After metrics, and high-ROI digital campaigns by Shift Marketing Agency.'
        }
        keywords="Shift portfolio, SMM cases Yerevan, marketing agency Armenia, web development cases, Meta ads results"
        schema={portfolioSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#b4f846]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ԱՊԱՑՈՒՑՎԱԾ ԹՎԵՐ ԵՎ ԻՐԱԿԱՆ ԱՐԴՅՈՒՆՔՆԵՐ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {lang === 'hy' ? 'Մեր Պորտֆոլիոն և Քեյսերը' : 'Our Portfolio & Case Studies'}
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hy'
              ? 'Յուրաքանչյուր նախագիծ մեր թիմի համար յուրահատուկ մարտահրավեր է։ Տեսեք, թե ինչպես ենք փոքր բիզնեսները վերածում շուկայի առաջատարների։'
              : 'Every project is an opportunity to generate verifiable growth. Explore how we scale brands into industry leaders.'}
          </p>

          {/* Quick Aggregate Stats Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Միջին ROAS</span>
              <span className="text-2xl font-black text-[#b4f846]">5.8x</span>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Ընդհանուր Դիտումներ</span>
              <span className="text-2xl font-black text-white">12M+</span>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Ներգրավված Լիդեր</span>
              <span className="text-2xl font-black text-white">4,800+</span>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Գոհունակություն</span>
              <span className="text-2xl font-black text-[#b4f846]">99%</span>
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#b4f846] text-black shadow-[0_0_15px_rgba(180,248,70,0.5)] font-black'
                    : 'glass-panel text-neutral-300 hover:text-white hover:border-white/20'
                }`}
              >
                {lang === 'hy' ? cat.labelHy : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Portfolio Cases Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredCases.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="glass-panel border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#b4f846]/40 transition-colors"
              >
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top info */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
                      {lang === 'hy' ? item.tagHy : item.tagEn}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      Ժամկետ՝ {item.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-[#b4f846] transition-colors">
                      {lang === 'hy' ? item.titleHy : item.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                      {lang === 'hy' ? item.shortDescHy : item.shortDescEn}
                    </p>
                  </div>

                  {/* Interactive Before / After Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase text-neutral-400">
                      <span>Ինտերակտիվ Before / After</span>
                      <span className="text-[#b4f846]">Քաշեք սլայդերը ↔</span>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] relative">
                      <BeforeAfterSlider
                        beforeImage={item.beforeImage}
                        afterImage={item.afterImage}
                        beforeLabel="ՄԻՆՉ ՄԵԶ"
                        afterLabel="SHIFT-ԻՑ ՀԵՏՈ"
                      />
                    </div>
                  </div>

                  {/* Metrics Comparison Box */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block">Մինչ Մեզ</span>
                      <div className="text-xs text-neutral-300">
                        Լսարան՝ <span className="font-bold text-neutral-200">{item.beforeMetrics.followers}</span>
                      </div>
                      <div className="text-xs text-neutral-300">
                        Ամսական Լիդեր՝ <span className="font-bold text-neutral-200">{item.beforeMetrics.leads}</span>
                      </div>
                    </div>
                    <div className="space-y-1 border-l border-white/10 pl-3">
                      <span className="text-[10px] font-bold uppercase text-[#b4f846] block">Shift-ից Հետո ⚡</span>
                      <div className="text-xs text-white">
                        Լսարան՝ <span className="font-black text-[#b4f846]">{item.afterMetrics.followers}</span>
                      </div>
                      <div className="text-xs text-white">
                        Լիդեր՝ <span className="font-black text-[#b4f846]">{item.afterMetrics.leads}</span>
                      </div>
                    </div>
                  </div>

                  {/* Services pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(lang === 'hy' ? item.servicesUsedHy : item.servicesUsedEn).map((srv, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/5 text-neutral-300 border border-white/5">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="p-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">
                    Հաճախորդ՝ <strong className="text-white">{item.clientName}</strong>
                  </span>

                  <Link
                    to={`/portfolio/${item.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-white/5 hover:bg-[#b4f846] hover:text-black text-white transition-all min-h-[44px]"
                  >
                    <span>Դիտել Մանրամասն</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-20">
        <ContactSection />
      </div>
    </div>
  );
}
