import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES_DATA } from '../data/ServicesData';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import Calculator from '../components/common/Calculator';
import Modal from '../components/ui/Modal';
import PageTransition from '../components/common/PageTransition';
import { FadeUp } from '../components/common/ScrollReveal';
import { submitLead } from '../services/leadsService';
import { sendTelegramLeadNotification } from '../services/telegramBot';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const service = SERVICES_DATA.find((s) => s.slug === slug) || SERVICES_DATA[0];

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: bookingForm.name,
        phone: bookingForm.phone,
        email: bookingForm.email,
        service: `${service.titleHy} (${selectedPackage ? selectedPackage.nameHy : 'Custom'})`,
        budget: selectedPackage ? selectedPackage.price : 'Standard',
        message: bookingForm.message,
        source: 'Service Detail Page'
      };
      await submitLead(payload);
      await sendTelegramLeadNotification(payload);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTitle = lang === 'hy' ? service.titleHy : service.titleEn;
  const serviceDesc = lang === 'hy' ? service.shortDescHy : service.shortDescEn;

  const detailSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': serviceTitle,
      'description': serviceDesc,
      'provider': {
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
          'name': 'Services',
          'item': 'https://shiftagency.am/services'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': serviceTitle,
          'item': `https://shiftagency.am/services/${service.slug}`
        }
      ]
    }
  ];

  return (
    <PageTransition>
      <SEOHead
        title={serviceTitle}
        description={serviceDesc}
        ogImage={service.heroImage}
        schema={detailSchema}
      />

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-[#b4f846] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Վերադառնալ Բոլոր Ծառայություններին</span>
          </Link>

          {/* Hero Visual Showcase */}
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 sm:p-12 mb-16">
              <div className="absolute inset-0 z-0">
                <img
                  src={service.heroImage}
                  alt={service.titleHy}
                  className="w-full h-full object-cover opacity-25 filter blur-xs"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/90 to-transparent" />
              </div>

              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#b4f846] text-black">
                  {service.badge}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  {lang === 'hy' ? service.titleHy : service.titleEn}
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {lang === 'hy' ? service.shortDescHy : service.shortDescEn}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-neon px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer hover:scale-[1.03] transition-transform"
                  >
                    <span>ՊԱՏՎԻՐԵԼ ԾԱՌԱՅՈՒԹՅՈՒՆԸ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="text-xs text-neutral-400 font-semibold bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                    Միջին ցուցանիշ՝ <span className="text-[#b4f846] font-black">{service.metrics}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

        {/* Interactive Checklist: Ինչ է ներառում */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block mb-1">
              INCLUSIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Ի՞նչ Է Ներառում Ծառայությունը</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(lang === 'hy' ? service.featuresHy : service.featuresEn).map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl glass-panel border border-white/10 flex items-start gap-3.5 hover:border-[#b4f846]/40 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#b4f846] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-white leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Steps: Մեր աշխատանքի փուլերը */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block mb-1">
              STEP-BY-STEP PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Աշխատանքի Փուլերը</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(lang === 'hy' ? service.workflowHy : service.workflowEn).map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                <span className="text-2xl font-black text-[#b4f846]">{step.step}</span>
                <h3 className="text-lg font-black text-white">{step.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Packages */}
        <div className="mb-20">
          <div className="mb-8 text-center max-w-xl mx-auto">
            <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block mb-1">
              TRANSPARENT PACKAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Ընտրեք Ձեր Փաթեթը</h2>
            <p className="text-xs text-neutral-400 mt-1">Բոլոր փաթեթները ներառում են մեր թիմի լիարժեք սպասարկումը։</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl glass-panel border transition-all flex flex-col justify-between ${
                  pkg.popular
                    ? 'border-[#b4f846] shadow-[0_0_30px_rgba(180,248,70,0.15)] relative'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#b4f846] text-black">
                    ԱՄԵՆԱՊԱՀԱՆՋՎԱԾ
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-black text-white mb-2">
                    {lang === 'hy' ? pkg.nameHy : pkg.nameEn}
                  </h3>
                  <div className="text-3xl font-black text-[#b4f846] mb-4">
                    {pkg.price} <span className="text-xs text-neutral-400 font-normal">/ ամիս</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed pb-6 border-b border-white/10">
                    {lang === 'hy' ? pkg.postsHy : pkg.postsEn}
                  </p>
                </div>

                <button
                  onClick={() => handlePackageClick(pkg)}
                  className={`w-full py-3.5 rounded-xl text-xs font-black mt-6 transition-all cursor-pointer ${
                    pkg.popular
                      ? 'btn-neon'
                      : 'btn-ghost'
                  }`}
                >
                  ԸՆՏՐԵԼ ԱՅՍ ՓԱԹԵԹԸ
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator for custom estimates */}
        <div className="mb-20">
          <Calculator />
        </div>
      </div>

      <ContactSection defaultService={service.titleHy} />

      {/* Booking Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSubmitted(false);
        }}
        title={selectedPackage ? `Պատվիրել «${selectedPackage.nameHy}» Փաթեթը` : `Պատվիրել ${service.titleHy}`}
      >
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#b4f846] mx-auto" />
            <h4 className="text-lg font-bold text-white">Հայտը հաջողությամբ ընդունվեց ⚡</h4>
            <p className="text-xs text-neutral-400">Մեր մասնագետը կկապվի Ձեզ հետ նշված հեռախոսահամարով։</p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Ձեր Անունը *</label>
              <input
                type="text"
                required
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                placeholder="Անուն Ազգանուն"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Հեռախոսահամար *</label>
              <input
                type="tel"
                required
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                placeholder="041 88 24 80"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Էլ․ հասցե (ըստ ցանկության)</label>
              <input
                type="email"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                placeholder="name@business.am"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Մեկնաբանություն</label>
              <textarea
                value={bookingForm.message}
                onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                rows={2}
                placeholder="Նշեք Ձեր էջը կամ ցանկությունը..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isSubmitting ? <span>Ուղարկվում է…</span> : <span>ՀԱՍՏԱՏԵԼ ՊԱՏՎԵՐԸ</span>}
            </button>
          </form>
        )}
      </Modal>
    </div>
  </PageTransition>
  );
}
