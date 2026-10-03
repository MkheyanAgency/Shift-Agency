import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { COURSES_DATA } from '../data/CoursesData';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import { GraduationCap, ArrowRight, CheckCircle2, Clock, Users, Award, Sparkles } from 'lucide-react';

export default function Courses() {
  const { lang } = useLanguage();

  const coursesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Shift Marketing Academy Courses',
    'description': 'Practical SMM and digital marketing courses with live agency projects and certification.',
    'itemListElement': COURSES_DATA.map((c, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'item': {
        '@type': 'Course',
        'name': lang === 'hy' ? c.titleHy : c.titleEn,
        'description': lang === 'hy' ? c.shortDescHy : c.shortDescEn,
        'provider': {
          '@type': 'Organization',
          'name': 'Shift Marketing Academy',
          'sameAs': 'https://shiftagency.am'
        },
        'url': `https://shiftagency.am/courses/${c.slug}`
      }
    }))
  };

  return (
    <div className="pt-28 pb-16">
      <SEOHead
        title={lang === 'hy' ? 'SMM Դասընթացներ & Ակադեմիա' : 'SMM Courses & Academy'}
        description={
          lang === 'hy'
            ? 'Shift Marketing Academy. Գործնական SMM դասընթաց (15 դաս), Meta Ads Manager պրակտիկա, քննություն և աշխատանքի հնարավորություն գործակալությունում։'
            : 'Master modern SMM with Shift Marketing Academy. 15 intensive practical lessons, live ad campaigns, certification, and agency internship.'
        }
        keywords="SMM dasntac Yerevan, SMM daser, marketing course Armenia, Meta ads course, SMM sertifikat"
        schema={coursesSchema}
      />
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-20">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>SHIFT MARKETING ACADEMY</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white max-w-4xl mx-auto leading-tight">
          Դարձի՛ր Շուկայի Ամենապահանջված <span className="text-[#b4f846]">SMM Մասնագետը</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Գործնական դասընթացներ՝ իրական նախագծերով, Meta Ads Manager-ի խորացված պրակտիկայով և ավարտական քննությամբ։ Սովորեք նրանցից, ովքեր ամեն օր ղեկավարում են հաջողված արշավներ։
        </p>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mb-24">
        {COURSES_DATA.map((course) => (
          <div
            key={course.id}
            className="rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 hover:border-[#b4f846]/30 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image & Quick Info (5 cols) */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[300px] sm:h-[360px] border border-white/10">
                <img
                  src={course.heroImage}
                  alt={course.titleHy}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#b4f846] text-black">
                    {course.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs font-bold text-white">
                  <span>Մնացել է՝</span>
                  <span className="text-[#b4f846] font-black">{course.seatsLeft} ազատ տեղ</span>
                </div>
              </div>

              {/* Course Details (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-neutral-400">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    {course.tagHy}
                  </span>
                  <span>•</span>
                  <span>{course.durationHy}</span>
                  <span>•</span>
                  <span>{course.formatHy}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {lang === 'hy' ? course.titleHy : course.titleEn}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {lang === 'hy' ? course.shortDescHy : course.shortDescEn}
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Դուք կստանաք՝
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b4f846]" />
                      <span>15 Գործնական Դաս + Քննություն</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b4f846]" />
                      <span>Անհատական Պորտֆոլիո և CV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b4f846]" />
                      <span>Meta Ads Manager-ի Կիրառում</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b4f846]" />
                      <span>Պաշտոնական Ավարտական Սերտիֆիկատ</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs line-through text-neutral-500 font-semibold block">
                      {course.originalPrice}
                    </span>
                    <span className="text-2xl font-black text-[#b4f846]">{course.price}</span>
                  </div>

                  <Link
                    to={`/courses/${course.slug}`}
                    className="btn-neon px-6 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2"
                  >
                    <span>ԴԻՏԵԼ ԴԱՍԱՑՈՒՑԱԿԸ & ԳՐԱՆՑՎԵԼ</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <ContactSection
        title="Հարցե՞ր ունեք դասընթացների վերաբերյալ"
        subtitle="Թողեք Ձեր հեռախոսահամարը, և մեր ուսումնական համակարգողը կպատասխանի բոլոր հարցերին ու կուղարկի մանրամասն սիլաբուսը։"
        defaultService="SMM Course"
      />
    </div>
  );
}
