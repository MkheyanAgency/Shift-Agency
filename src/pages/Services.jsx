import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES_DATA } from '../data/ServicesData';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import Calculator from '../components/common/Calculator';
import PageTransition from '../components/common/PageTransition';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';
import { ArrowRight, Check, Sparkles, Share2, Target, Code2, Camera } from 'lucide-react';

const ICON_MAP = {
  Share2,
  Target,
  Sparkles,
  Code2,
  Camera
};

export default function Services() {
  const { lang } = useLanguage();

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Shift Marketing Agency Services',
    'description': 'Full list of marketing services: SMM, Meta Ads, Google Ads, Branding, and Web Development.',
    'itemListElement': SERVICES_DATA.map((srv, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'item': {
        '@type': 'Service',
        'name': lang === 'hy' ? srv.titleHy : srv.titleEn,
        'description': lang === 'hy' ? srv.shortDescHy : srv.shortDescEn,
        'url': `https://shiftagency.am/services/${srv.slug}`
      }
    }))
  };

  return (
    <PageTransition>
      <SEOHead
        title={lang === 'hy' ? 'Ծառայություններ — SMM, Թիրախային Գովազդ, Բրենդինգ' : 'Marketing Services — SMM, Paid Ads, Branding'}
        description={
          lang === 'hy'
            ? 'Shift Marketing Agency-ի պրոֆեսիոնալ ծառայությունները՝ SMM առաջխաղացում, Meta և Google թիրախային գովազդ, վեբ կայքերի պատրաստում և վիրուսային Reels։'
            : 'Professional marketing services in Armenia: Full-cycle SMM, high-ROAS Meta & Google PPC ads, branding, and conversion-focused web design.'
        }
        keywords="SMM Abovyan, Meta Ads Armenia, branding Abovyan, website development Armenia, targetologist Abovyan"
        schema={servicesSchema}
      />

      <div className="pt-28 pb-16">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-20">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR SERVICES</span>
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-black text-white max-w-4xl mx-auto leading-tight">
              Ծառայություններ, Որոնք <span className="text-[#b4f846]">Գեներացնում Են Վաճառք</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Ընտրեք Ձեր բիզնեսի համար անհրաժեշտ մարքեթինգային ուղղությունը կամ համադրեք մի քանիսը՝ առավելագույն արդյունքի համար։
            </p>
          </FadeUp>
        </section>

        {/* Services List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mb-24">
          {SERVICES_DATA.map((srv, idx) => {
            const Icon = ICON_MAP[srv.icon] || Sparkles;
            const isEven = idx % 2 === 0;

            return (
              <FadeUp key={srv.id} delay={idx * 0.08}>
                <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 hover:border-[#b4f846]/30 transition-all overflow-hidden">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Visual Cover (5 cols) */}
                    <div className={`lg:col-span-5 relative rounded-2xl overflow-hidden h-[300px] sm:h-[350px] border border-white/10 ${!isEven ? 'lg:order-2' : ''}`}>
                      <img
                        src={srv.heroImage}
                        alt={srv.titleHy}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#b4f846] text-black">
                          {srv.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold text-white bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                        <span>Ակնկալվող ցուցանիշ՝</span>
                        <span className="text-[#b4f846] font-black">{srv.metrics}</span>
                      </div>
                    </div>

                    {/* Content (7 cols) */}
                    <div className={`lg:col-span-7 space-y-4 ${!isEven ? 'lg:order-1' : ''}`}>
                      <div className="w-12 h-12 rounded-2xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        {lang === 'hy' ? srv.titleHy : srv.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {lang === 'hy' ? srv.shortDescHy : srv.shortDescEn}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {(lang === 'hy' ? srv.featuresHy : srv.featuresEn).slice(0, 4).map((f, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                            <Check className="w-4 h-4 text-[#b4f846] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase block font-bold">Արժեքը</span>
                          <span className="text-lg font-black text-[#b4f846]">{srv.startingPrice}</span>
                        </div>

                        <Link
                          to={`/services/${srv.slug}`}
                          className="btn-neon px-6 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:scale-[1.03] transition-transform"
                        >
                          <span>ԴԻՏԵԼ ՓԱԹԵԹՆԵՐԸ & ՄԱՆՐԱՄԱՍՆԵՐԸ</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </section>

        {/* Live Calculator */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FadeUp>
            <Calculator />
          </FadeUp>
        </section>

        <FadeUp>
          <ContactSection />
        </FadeUp>
      </div>
    </PageTransition>
  );
}
