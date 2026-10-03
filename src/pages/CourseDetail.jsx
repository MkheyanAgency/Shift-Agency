import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { COURSES_DATA } from '../data/CoursesData';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import Modal from '../components/ui/Modal';
import { submitLead } from '../services/leadsService';
import { sendTelegramLeadNotification } from '../services/telegramBot';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  MapPin,
  Award,
  Users,
  Send,
  Sparkles
} from 'lucide-react';

export default function CourseDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const course = COURSES_DATA.find((c) => c.slug === slug) || COURSES_DATA[0];

  const [openLesson, setOpenLesson] = useState('01');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const [enrollForm, setEnrollForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredTime: 'evening',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleLesson = (num) => {
    setOpenLesson((prev) => (prev === num ? null : num));
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    if (!enrollForm.name || !enrollForm.phone) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: enrollForm.name,
        phone: enrollForm.phone,
        email: enrollForm.email,
        service: `Course Enrollment: ${course.titleHy}`,
        budget: course.price,
        message: `Նախընտրած ժամ: ${enrollForm.preferredTime} | Նշում: ${enrollForm.note}`,
        source: 'Course Detail Page'
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

  const courseTitle = lang === 'hy' ? course.titleHy : course.titleEn;
  const courseDesc = lang === 'hy' ? course.shortDescHy : course.shortDescEn;

  const courseSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': courseTitle,
      'description': courseDesc,
      'provider': {
        '@type': 'Organization',
        'name': 'Shift Marketing Academy',
        'sameAs': 'https://shiftagency.am'
      },
      'offers': {
        '@type': 'Offer',
        'price': course.price.replace(/[^0-9]/g, '') || '0',
        'priceCurrency': 'AMD'
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
          'name': 'Courses',
          'item': 'https://shiftagency.am/courses'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': courseTitle,
          'item': `https://shiftagency.am/courses/${course.slug}`
        }
      ]
    }
  ];

  return (
    <div className="pt-28 pb-16">
      <SEOHead
        title={courseTitle}
        description={courseDesc}
        ogImage={course.heroImage}
        schema={courseSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-[#b4f846] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Վերադառնալ Դասընթացների Ցանկին</span>
        </Link>

        {/* Hero Card */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 sm:p-12 mb-16">
          <div className="absolute inset-0 z-0">
            <img
              src={course.heroImage}
              alt={course.titleHy}
              className="w-full h-full object-cover opacity-20 filter blur-xs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#b4f846] text-black">
                {course.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-neutral-300">
                {course.tagHy}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {lang === 'hy' ? course.titleHy : course.titleEn}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {lang === 'hy' ? course.shortDescHy : course.shortDescEn}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Տևողություն</span>
                <span className="text-xs sm:text-sm font-bold text-white">{course.durationHy}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Ձևաչափ</span>
                <span className="text-xs sm:text-sm font-bold text-white">{course.formatHy}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Մակարդակ</span>
                <span className="text-xs sm:text-sm font-bold text-white">{course.levelHy}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Ազատ տեղեր</span>
                <span className="text-xs sm:text-sm font-bold text-[#b4f846]">{course.seatsLeft} տեղ</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsEnrollModalOpen(true)}
                className="btn-neon px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer"
              >
                <span>ԱՄՐԱԳՐԵԼ ՏԵՂԸ ({course.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-neutral-500 line-through">
                Նախկին գին՝ {course.originalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Target Audience: Ում համար է */}
        <div className="mb-20">
          <div className="mb-6">
            <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block mb-1">
              AUDIENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Ու՞մ Համար Է Այս Դասընթացը</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(lang === 'hy' ? course.targetAudienceHy : course.targetAudienceEn).map((aud, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl glass-panel border border-white/10 flex items-start gap-3 hover:border-[#b4f846]/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#b4f846] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-neutral-200 leading-relaxed">{aud}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus Accordion: Դասընթացի ծրագիր */}
        <div className="mb-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block mb-1">
                COMPREHENSIVE SYLLABUS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Դասընթացի Ծրագիր ({course.syllabus.length} Թեմա)
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              Սեղմեք յուրաքանչյուր դասի վրա՝ մանրամասները տեսնելու համար։
            </p>
          </div>

          <div className="space-y-3">
            {course.syllabus.map((item) => {
              const isOpen = openLesson === item.num;
              return (
                <div
                  key={item.num}
                  className={`rounded-2xl glass-panel border transition-all overflow-hidden ${
                    isOpen ? 'border-[#b4f846]/40 bg-white/[0.04]' : 'border-white/10'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleLesson(item.num)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-lg bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/30 flex items-center justify-center font-black text-xs shrink-0">
                        {item.num}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {lang === 'hy' ? item.titleHy : item.titleEn}
                      </h4>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-[#b4f846]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5">
                      {lang === 'hy' ? item.descHy : item.descEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ContactSection
        title="Ցանկանո՞ւմ եք միանալ հաջորդ խմբին"
        subtitle="Տեղերը խստորեն սահմանափակ են՝ որակյալ անհատական մենթորություն ապահովելու համար։"
        defaultService="SMM Course"
      />

      {/* Enrollment Modal */}
      <Modal
        isOpen={isEnrollModalOpen}
        onClose={() => {
          setIsEnrollModalOpen(false);
          setSubmitted(false);
        }}
        title={`Գրանցում «${course.titleHy}» Դասընթացին`}
      >
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#b4f846] mx-auto" />
            <h4 className="text-lg font-bold text-white">Տեղը նախնական ամրագրված է ⚡</h4>
            <p className="text-xs text-neutral-400">
              Շուտով Ձեզ կզանգահարի մեր ակադեմիայի համակարգողը՝ ժամանակացույցն ու պայմանները հաստատելու համար։
            </p>
          </div>
        ) : (
          <form onSubmit={handleEnrollSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Անուն Ազգանուն *</label>
              <input
                type="text"
                required
                value={enrollForm.name}
                onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                placeholder="Անի Հակոբյան"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Հեռախոսահամար *</label>
              <input
                type="tel"
                required
                value={enrollForm.phone}
                onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                placeholder="+374 98 000 000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Էլ․ հասցե</label>
              <input
                type="email"
                value={enrollForm.email}
                onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                placeholder="ani@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Նախընտրելի Ժամ</label>
              <select
                value={enrollForm.preferredTime}
                onChange={(e) => setEnrollForm({ ...enrollForm, preferredTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141a] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              >
                <option value="morning">Առավոտյան (11:00 - 13:00)</option>
                <option value="evening">Երեկոյան (19:00 - 21:00)</option>
                <option value="weekend">Շաբաթ / Կիրակի</option>
                <option value="flexible">Ճկուն եմ</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isSubmitting ? <span>Ուղարկվում է…</span> : <span>ԱՄՐԱԳՐԵԼ ՏԵՂԸ ({course.price})</span>}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
