import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/common/SEOHead';
import ParticleBackground from '../components/ui/ParticleBackground';
import Ticker from '../components/ui/Ticker';
import PartnersTicker from '../components/ui/PartnersTicker';
import StackingCards from '../components/ui/StackingCards';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import TestimonialsSection from '../components/ui/TestimonialsSection';
import PartnerBadges from '../components/ui/PartnerBadges';
import Calculator from '../components/common/Calculator';
import ContactSection from '../components/common/ContactSection';
import PageTransition from '../components/common/PageTransition';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';
import { SERVICES_DATA } from '../data/ServicesData';
import { CASES_DATA } from '../data/CasesData';
import { TEAM_DATA } from '../data/TeamData';
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Award,
  Sparkles,
  Layers,
  ChevronRight,
  Share2,
  Target,
  Code2,
  Camera
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '../components/common/SocialIcons';

const ICON_MAP = {
  Share2,
  Target,
  Sparkles,
  Code2,
  Camera
};

export default function Home({ onOpenConsultation }) {
  const { t, lang } = useLanguage();

  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Shift Marketing Agency',
      'alternateName': 'Shift Academy',
      'url': 'https://shiftagency.am',
      'logo': 'https://shiftagency.am/assets/shift-logo.png',
      'email': 'mkheyanagency@gmail.com',
      'telephone': ['+37441882480', '+37443882480'],
      'sameAs': [
        'https://instagram.com',
        'https://facebook.com',
        'https://linkedin.com'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://shiftagency.am/#localbusiness',
      'name': 'Shift Marketing Agency',
      'image': 'https://shiftagency.am/assets/shift-logo.png',
      'telephone': ['+37441882480', '+37443882480'],
      'email': 'mkheyanagency@gmail.com',
      'priceRange': '֏֏֏',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Abovyan Center',
        'addressLocality': 'Abovyan',
        'addressCountry': 'AM'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      'name': 'Shift Digital Marketing & SMM Services',
      'description': 'Leading digital marketing agency specializing in SMM, Meta & Google Ads, branding, and high-conversion web development in Armenia.',
      'serviceType': ['SMM', 'Meta Ads', 'Google Ads', 'Branding', 'Web Development']
    }
  ];

  const approachCards = [
    {
      title: lang === 'hy' ? '01. Խորքային Անալիտիկա & Աուդիտ' : '01. Deep Analytics & Market Audit',
      badge: lang === 'hy' ? 'ՔԱՅԼ 01' : 'STEP 01',
      description: lang === 'hy'
        ? 'Նախքան գովազդի 1 դրամ ծախսելը՝ իրականացնում ենք մրցակիցների, թիրախային լսարանի և նախորդ արշավների մանրակրկիտ ուսումնասիրություն։'
        : 'Before spending a single dollar on ads, we perform deep-dive competitor auditing, audience segmentation, and unit economics validation.',
      points: lang === 'hy'
        ? ['Մրցակցային առավելությունների քարտեզագրում', 'Թիրախային լսարանի 4+ պերսոնաների նկարագրություն', 'Նախորդ բյուջեների արտահոսքի բացահայտում']
        : ['Competitor benchmarking & pricing map', 'Creation of 4+ audience buyer personas', 'Ad spend leak identification & baseline KPI setting'],
      metric: lang === 'hy' ? '100% Փաստացի Տվյալներ' : '100% Data-Driven Foundation',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      imageTag: 'ANALYTICS & DATA'
    },
    {
      title: lang === 'hy' ? '02. Վաճառքի Funnel-ի Ստրատեգիա' : '02. Conversion Funnel Strategy',
      badge: lang === 'hy' ? 'ՔԱՅԼ 02' : 'STEP 02',
      description: lang === 'hy'
        ? 'Կառուցում ենք պոտենցիալ հաճախորդի ամբողջական ուղին՝ առաջին հպումից (Reels/Post) մինչև հայտի լրացում և կրկնվող գնում։'
        : 'We architect complete multi-touchpoint customer acquisition funnels, from viral awareness hook to completed checkout.',
      points: lang === 'hy'
        ? ['Կոնվերտացիոն ուղիների (Funnel) ճարտարապետություն', 'Շաբաթական & ամսական KPI թիրախների հաստատում', 'ROAS և CPL կանխատեսումային մոդելավորում']
        : ['Multi-stage acquisition & retargeting framework', 'Weekly & monthly ROAS forecast milestones', 'CRM lead-routing automation protocol'],
      metric: lang === 'hy' ? '3x - 8x Կանխատեսված Շահութաբերություն' : '3x - 8x Projected ROI',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      imageTag: 'FUNNEL STRATEGY'
    },
    {
      title: lang === 'hy' ? '03. Վիրուսային Կրեատիվ & Բրենդինգ' : '03. Viral Creative & Brand Visuals',
      badge: lang === 'hy' ? 'ՔԱՅԼ 03' : 'STEP 03',
      description: lang === 'hy'
        ? 'Ստեղծում ենք ուշադրություն կանգնեցնող վիզուալներ, սցենարներ և տեսահոլովակներ, որոնք դիտվում են հազարավոր անգամներ առանց հոգնեցնելու։'
        : 'We produce thumb-stopping creatives, cinematic Reels, and bold branding that spark emotion and outperform generic corporate ads.',
      points: lang === 'hy'
        ? ['Առաջին 3 վայրկյանի վիրուսային Hook-եր', 'Պրոֆեսիոնալ տեսանկարահանում & դինամիկ մոնտաժ', 'Միասնական ֆիրմային գունապնակ & Brand Book']
        : ['High-converting 3-second hook scripts', 'Studio filming with 4K color grading', 'Consistent aesthetic and typography identity'],
      metric: lang === 'hy' ? '+400% Օրգանիկ Դիտումներ' : '+400% Organic Engagement',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
      imageTag: 'CREATIVE & REELS'
    },
    {
      title: lang === 'hy' ? '04. Գործարկում & Թիրախային Սքեյլինգ' : '04. Launch & Meta Ads Scaling',
      badge: lang === 'hy' ? 'ՔԱՅԼ 04' : 'STEP 04',
      description: lang === 'hy'
        ? 'Մեկնարկում ենք գովազդային արշավները Meta Ads Manager-ում և Google Ads-ում, անցկացնում A/B թեստեր և մասշտաբավորում շահութաբեր հավաքածուները։'
        : 'Deploying high-intent paid campaigns across Meta and Google, iterating rapid A/B experiments, and aggressively scaling winning ad sets.',
      points: lang === 'hy'
        ? ['Advantage+ և CBO ավտոմատացված արշավներ', 'Retargeting լսարաններ՝ լքված զամբյուղների և էջի այցելուների համար', 'Ամենօրյա բյուջեի օպտիմիզացիա']
        : ['Advantage+ algorithmic campaign scaling', 'Hyper-personalized retargeting loops', 'Daily bid management & negative audience filtering'],
      metric: lang === 'hy' ? 'Մինչև 9.2x Փաստացի ROAS' : 'Up to 9.2x Verified ROAS',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      imageTag: 'PAID ADS SCALING'
    },
    {
      title: lang === 'hy' ? '05. Արդյունք & Վաճառքների Կայուն Աճ' : '05. Predictable Revenue Scaling',
      badge: lang === 'hy' ? 'ՔԱՅԼ 05' : 'STEP 05',
      description: lang === 'hy'
        ? 'Տրամադրում ենք թափանցիկ շաբաթական հաշվետվություններ, հետևում ենք իրական վաճառքներին և բիզնեսը տեղափոխում շուկայի առաջատար դիրք։'
        : 'Transparent weekly dashboards, direct lead-to-revenue tracking, and continuous scaling to maintain market dominance.',
      points: lang === 'hy'
        ? ['Շաբաթական օնլայն հաշվետվություններ և կոնսուլտացիա', 'CRM ինտեգրացիա և զանգերի որակի վերահսկում', 'Նոր շուկաների և ապրանքների ընդլայնում']
        : ['Live Looker Studio metrics dashboard', 'Closed-loop CRM revenue attribution', 'Omnichannel geographic market expansion'],
      metric: lang === 'hy' ? '99% Հաճախորդների Գոհունակություն' : '99% Client Retention',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      imageTag: 'REVENUE RESULTS'
    }
  ];

  return (
    <PageTransition>
      <SEOHead
        title={lang === 'hy' ? 'Shift Marketing Agency & Academy — SMM և Թվային Մարքեթինգ' : 'Shift Marketing Agency & Academy — SMM & Digital Growth'}
        description={
          lang === 'hy'
            ? 'Shift Marketing Agency. Մարքեթինգ, որը բիզնեսը վերածում է ճանաչելի բրենդի և իրական վաճառքի ⚡ SMM, թիրախային գովազդ, վեբ մշակում և դասընթացներ։'
            : 'Shift Marketing Agency transforms businesses into high-converting brands with proven SMM, Meta/Google ads, creative content, and accredited courses.'
        }
        keywords="Shift marketing agency, SMM Armenia, SMM dasentac, Target ads Abovyan, branding Armenia, web development Armenia"
        schema={homeSchemas}
      />

      <div className="relative w-full overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <ParticleBackground />

          {/* Ambient radial glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#b4f846]/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#b4f846]/30 text-xs font-black tracking-widest text-[#b4f846] uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#b4f846] shadow-[0_0_8px_#b4f846] animate-pulse" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
            >
              {lang === 'hy' ? (
                <>
                  Մարքեթինգ, որը բիզնեսը վերածում է{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b4f846] via-[#cbfd72] to-[#88e202]">
                    ճանաչելի բրենդի
                  </span>{' '}
                  և իրական վաճառքի ⚡
                </>
              ) : (
                <>
                  Marketing that turns businesses into{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b4f846] via-[#cbfd72] to-[#88e202]">
                    iconic brands
                  </span>{' '}
                  and explosive revenue ⚡
                </>
              )}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal"
            >
              {t.hero.subtext}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button
                onClick={onOpenConsultation}
                className="btn-neon w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-[0.98] transition-transform"
              >
                <span>{t.hero.ctaConsult}</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <Link
                to="/services"
                className="btn-ghost w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-transform"
              >
                <span>{t.hero.ctaServices}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/courses"
                className="px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold text-[#b4f846] border border-[#b4f846]/20 bg-[#b4f846]/5 hover:bg-[#b4f846]/10 transition-colors flex items-center gap-2"
              >
                <span>🎓 {t.hero.ctaCourses}</span>
              </Link>
            </motion.div>

            {/* Results Counters Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto"
            >
              <div className="p-4 rounded-2xl glass-panel border border-white/5 hover:border-[#b4f846]/30 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-[#b4f846] block">50+</span>
                <span className="text-xs text-neutral-400 font-semibold">{t.hero.statsProjects}</span>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-white/5 hover:border-[#b4f846]/30 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-[#b4f846] block">$1.5M+</span>
                <span className="text-xs text-neutral-400 font-semibold">{t.hero.statsSpend}</span>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-white/5 hover:border-[#b4f846]/30 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-[#b4f846] block">99%</span>
                <span className="text-xs text-neutral-400 font-semibold">{t.hero.statsSatisfaction}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Direction Badge Bar Ticker */}
        <Ticker />

        {/* 3. Core Services Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block mb-1">
                CORE CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                Մեր Հիմնական Ծառայությունները
              </h2>
            </div>
            <Link
              to="/services"
              className="text-sm font-bold text-[#b4f846] hover:underline flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Դիտել բոլորը</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.slice(0, 3).map((service) => {
              const IconComponent = ICON_MAP[service.icon] || Sparkles;
              return (
                <StaggerItem key={service.id}>
                  <div className="group relative rounded-3xl glass-panel p-7 glass-panel-hover flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#b4f846]/10 border border-[#b4f846]/30 text-[#b4f846] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                          {service.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#b4f846] transition-colors">
                        {lang === 'hy' ? service.titleHy : service.titleEn}
                      </h3>

                      <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                        {lang === 'hy' ? service.shortDescHy : service.shortDescEn}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        {(lang === 'hy' ? service.featuresHy : service.featuresEn).slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b4f846]" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase block font-bold">Սկսած</span>
                        <span className="text-sm font-black text-white">{service.startingPrice}</span>
                      </div>
                      <Link
                        to={`/services/${service.slug}`}
                        className="p-2.5 rounded-xl bg-white/5 group-hover:bg-[#b4f846] text-neutral-300 group-hover:text-black transition-all"
                        aria-label={`View ${service.titleEn}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* 4. Our Approach Sticky Stacking Cards ("Մեր մոտեցումը") */}
        <section className="py-24 bg-[#07090d] border-y border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block">
                {t.approach.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {t.approach.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
                Մեր ապացուցված 5-քայլ համակարգը, որով ցանկացած բիզնեսի համար կառուցում ենք վաճառքի անկոտրում շարժիչ։
              </p>
            </FadeUp>

            {/* Apple-Style Sticky Stacking Cards */}
            <StackingCards cards={approachCards} />
          </div>
        </section>

        {/* 5. Before/After Case Studies Slider Showcase */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block mb-1">
                PROVEN METRICS & REAL WORK
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                Քեյսեր և Փաստացի Արդյունքներ
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-xs text-neutral-400 max-w-sm">
                Սահեցրեք Before / After սլայդերը՝ տեսնելու բրենդների վիզուալ և ֆինանսական տրանսֆորմացիան։
              </p>
              <Link
                to="/portfolio"
                className="btn-neon px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 self-start whitespace-nowrap min-h-[44px]"
              >
                <span>Բոլոր Քեյսերը</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>

          <ScaleIn>
            <BeforeAfterSlider caseItem={CASES_DATA[0]} />
          </ScaleIn>
        </section>

        {/* 6. Why Us ("Ինչու՞ Մեզ") */}
        <section className="py-20 bg-[#080a0f] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block">
                {t.whyUs.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {t.whyUs.title}
              </h2>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StaggerItem>
                <div className="p-6 rounded-2xl glass-panel space-y-3 border border-white/5 h-full hover:border-[#b4f846]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center font-black">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white">{t.whyUs.card1Title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{t.whyUs.card1Desc}</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-6 rounded-2xl glass-panel space-y-3 border border-white/5 h-full hover:border-[#b4f846]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center font-black">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white">{t.whyUs.card2Title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{t.whyUs.card2Desc}</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-6 rounded-2xl glass-panel space-y-3 border border-white/5 h-full hover:border-[#b4f846]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center font-black">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white">{t.whyUs.card3Title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{t.whyUs.card3Desc}</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-6 rounded-2xl glass-panel space-y-3 border border-white/5 h-full hover:border-[#b4f846]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center font-black">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white">{t.whyUs.card4Title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{t.whyUs.card4Desc}</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* 7. Team Preview with Interactive Flip Photo Cards */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block mb-1">
                THE SQUAD
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Մեր Թիմը</h2>
            </div>
            <Link to="/about" className="text-sm font-bold text-[#b4f846] hover:underline flex items-center gap-1.5">
              <span>Ծանոթանալ ամբողջ թիմին</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_DATA.slice(0, 3).map((member) => (
              <StaggerItem key={member.id}>
                {/* 3D Flip Card Container */}
                <div className="group h-96 [perspective:1000px]">
                  <div className="relative w-full h-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full rounded-3xl glass-panel overflow-hidden border border-white/10 [backface-visibility:hidden]">
                      <img
                        src={member.image}
                        alt={member.nameHy}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/40 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-[10px] font-extrabold uppercase text-[#b4f846] block tracking-wider">
                          {lang === 'hy' ? member.roleHy : member.roleEn}
                        </span>
                        <h3 className="text-xl font-black text-white">{lang === 'hy' ? member.nameHy : member.nameEn}</h3>
                        <p className="text-[11px] text-neutral-400 mt-1">
                          Սավառնեք (Hover) մանրամասների համար ➔
                        </p>
                      </div>
                    </div>

                    {/* Back Side (Flipped) */}
                    <div className="absolute inset-0 w-full h-full rounded-3xl glass-panel bg-[#0d0f14] p-8 border border-[#b4f846]/40 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-[0_0_25px_rgba(180,248,70,0.15)]">
                      <div className="space-y-3">
                        <span className="text-xs font-black uppercase text-[#b4f846]">
                          {lang === 'hy' ? member.roleHy : member.roleEn}
                        </span>
                        <h3 className="text-xl font-black text-white">{lang === 'hy' ? member.nameHy : member.nameEn}</h3>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {lang === 'hy' ? member.bioHy : member.bioEn}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {member.specialties.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                        {member.social.instagram && (
                          <a
                            href={member.social.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#b4f846] text-white hover:text-black transition-colors"
                          >
                            <InstagramIcon className="w-4 h-4" />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#b4f846] text-white hover:text-black transition-colors"
                          >
                            <LinkedinIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* 8. Interactive Marketing Budget & Price Calculator */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <Calculator />
          </FadeUp>
        </section>

        {/* 9. Universal Contact Section */}
        <FadeUp>
          <ContactSection />
        </FadeUp>
      </div>
    </PageTransition>
  );
}
