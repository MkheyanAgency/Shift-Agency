import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PORTFOLIO_CASES } from '../data/PortfolioData';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import Modal from '../components/ui/Modal';
import { submitLead } from '../services/leadsService';
import { sendTelegramLeadNotification } from '../services/telegramBot';
import {
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Quote,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  Target
} from 'lucide-react';

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find by slug or id
  const caseItem = PORTFOLIO_CASES.find((c) => c.slug === id || c.id === id);

  if (!caseItem) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Քեյսը չի գտնվել</h2>
        <p className="text-neutral-400 text-sm">Հնարավոր է հղումը փոխվել է կամ ջնջվել։</p>
        <Link to="/portfolio" className="btn-neon px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Վերադառնալ Պորտֆոլիո</span>
        </Link>
      </div>
    );
  }

  const title = lang === 'hy' ? caseItem.titleHy : caseItem.titleEn;
  const shortDesc = lang === 'hy' ? caseItem.shortDescHy : caseItem.shortDescEn;

  // JSON-LD Schema
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': title,
      'headline': title,
      'description': shortDesc,
      'image': caseItem.heroImage,
      'creator': {
        '@type': 'Organization',
        'name': 'Shift Marketing Agency',
        'url': 'https://shiftagency.am'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://shiftagency.am/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Portfolio',
          'item': 'https://shiftagency.am/portfolio'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': title,
          'item': `https://shiftagency.am/portfolio/${caseItem.slug}`
        }
      ]
    }
  ];

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setIsSubmitting(true);
    try {
      const payload = {
        name: formName,
        phone: formPhone,
        service: `Similar Project to ${caseItem.clientName}`,
        message: `User wants results like ${caseItem.titleHy}`,
        source: `Portfolio Case Detail (${caseItem.slug})`
      };
      await submitLead(payload);
      await sendTelegramLeadNotification(payload);
      setFormSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <SEOHead
        title={`${title} — Քեյս և Արդյունքներ`}
        description={shortDesc}
        ogImage={caseItem.heroImage}
        ogType="article"
        schema={schema}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Link to="/" className="hover:text-white transition-colors">Գլխավոր</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/portfolio" className="hover:text-white transition-colors">Պորտֆոլիո</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#b4f846] font-semibold truncate">{caseItem.clientName}</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
              {lang === 'hy' ? caseItem.tagHy : caseItem.tagEn}
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>Աշխատանքի տևողություն՝ {caseItem.duration}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            {shortDesc}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-neon px-6 py-3 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 min-h-[44px]"
            >
              <span>Ստանալ Նմանատիպ Արդյունք ⚡</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link
              to="/portfolio"
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold glass-panel text-white hover:border-white/30 flex items-center gap-2 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Բոլոր Քեյսերը</span>
            </Link>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {caseItem.statsSummary.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl glass-panel border border-white/10 space-y-1">
              <span className="text-xs font-bold text-neutral-400 uppercase block">
                {lang === 'hy' ? stat.labelHy : stat.labelEn}
              </span>
              <span className="text-3xl font-black text-[#b4f846]">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Interactive Before & After Visual Slider */}
        <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Ինտերակտիվ Before & After Համեմատություն
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Շարժեք սլայդերը՝ տեսնելու բրենդի վիզուալ կերպարանափոխությունը
              </p>
            </div>
            <div className="text-xs font-bold text-[#b4f846] flex items-center gap-1.5 self-start">
              <Sparkles className="w-4 h-4" />
              <span>Իրական արդյունքներ</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 relative">
            <BeforeAfterSlider
              beforeImage={caseItem.beforeImage}
              afterImage={caseItem.afterImage}
              beforeLabel="ՄԻՆՉ SHIFT-Ը"
              afterLabel="SHIFT-ԻՑ ՀԵՏՈ"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-xs font-black uppercase text-neutral-400 block">Մինչ Shift Agency-ն</span>
              <div className="text-xs text-neutral-300">
                • Լսարան՝ <strong>{caseItem.beforeMetrics.followers}</strong>
              </div>
              <div className="text-xs text-neutral-300">
                • Ամսական դիտումներ՝ <strong>{caseItem.beforeMetrics.reach}</strong>
              </div>
              <div className="text-xs text-neutral-300">
                • Լիդեր / Ամրագրումներ՝ <strong>{caseItem.beforeMetrics.leads}</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#b4f846]/5 border border-[#b4f846]/20 space-y-2">
              <span className="text-xs font-black uppercase text-[#b4f846] block">Shift-ից Հետո ⚡</span>
              <div className="text-xs text-white">
                • Լսարան՝ <strong className="text-[#b4f846]">{caseItem.afterMetrics.followers}</strong>
              </div>
              <div className="text-xs text-white">
                • Ամսական դիտումներ՝ <strong className="text-[#b4f846]">{caseItem.afterMetrics.reach}</strong>
              </div>
              <div className="text-xs text-white">
                • Լիդեր / Ամրագրումներ՝ <strong className="text-[#b4f846]">{caseItem.afterMetrics.leads}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Challenge & Strategy breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Խնդիրը & Մարտահրավերը</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
              {lang === 'hy' ? caseItem.challengeHy : caseItem.challengeEn}
            </p>
          </div>

          <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Մեր Ռազմավարությունը & Լուծումը</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
              {lang === 'hy' ? caseItem.strategyHy : caseItem.strategyEn}
            </p>
          </div>
        </div>

        {/* Client Review Quote */}
        {caseItem.clientReview && (
          <div className="glass-panel border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/5">
              <Quote className="w-24 h-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <p className="text-lg sm:text-xl text-neutral-200 italic font-medium leading-relaxed max-w-3xl">
                {lang === 'hy' ? caseItem.clientReview.quoteHy : caseItem.clientReview.quoteEn}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={caseItem.clientReview.avatar}
                  alt={caseItem.clientReview.author}
                  className="w-12 h-12 rounded-full object-cover border border-[#b4f846]"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{caseItem.clientReview.author}</h4>
                  <p className="text-xs text-neutral-400">{caseItem.clientReview.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Gallery */}
        {caseItem.gallery && (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-white">Նախագծի Պատկերասրահ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseItem.gallery.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 group">
                  <img
                    src={img}
                    alt={`${caseItem.clientName} gallery ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0d0f14] via-[#141720] to-[#0d0f14] border border-[#b4f846]/30 text-center space-y-6 shadow-[0_0_50px_rgba(180,248,70,0.1)]">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Ցանկանո՞ւմ եք նույնպիսի արդյունքներ Ձեր բիզնեսի համար
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Մեր թիմը կկատարի Ձեր ոլորտի անվճար աուդիտ և կներկայացնի աճի մանրամասն պլան։
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-neon px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black inline-flex items-center gap-2 min-h-[44px]"
          >
            <span>Ամրագրել Անվճար Ստրատեգիական Քննարկում</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal for consultation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormSent(false);
        }}
        title={`Հայտ՝ ${caseItem.clientName} Քեյսի Օրինակով`}
      >
        {formSent ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#b4f846] mx-auto" />
            <h4 className="text-lg font-bold text-white">Հայտն ընդունված է ⚡</h4>
            <p className="text-xs text-neutral-400">
              Մեր մարքեթինգային տնօրենը կկապվի Ձեզ հետ 15 րոպեի ընթացքում։
            </p>
          </div>
        ) : (
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <p className="text-xs text-neutral-400">
              Նշեք Ձեր տվյալները, և մենք կպատրաստենք հարմարեցված առաջարկ Ձեր բիզնեսի համար։
            </p>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Անուն Ազգանուն *</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Անուն Ազգանուն"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846] min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Հեռախոսահամար *</label>
              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="+374 98 000 000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846] min-h-[44px]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 min-h-[44px]"
            >
              {isSubmitting ? <span>Ուղարկվում է...</span> : <span>ՈՒՂԱՐԿԵԼ ՀԱՅՏԸ</span>}
            </button>
          </form>
        )}
      </Modal>

      <div className="mt-20">
        <ContactSection />
      </div>
    </div>
  );
}
