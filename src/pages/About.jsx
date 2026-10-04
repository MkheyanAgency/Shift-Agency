import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TEAM_DATA } from '../data/TeamData';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import PageTransition from '../components/common/PageTransition';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';
import { Sparkles, Target, Award, Rocket, CheckCircle2, Send } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '../components/common/SocialIcons';

export default function About() {
  const { lang } = useLanguage();

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': lang === 'hy' ? 'Մեր Մասին & Թիմը — Shift Marketing' : 'About Us & Team — Shift Marketing',
    'description': 'Discover Shift Marketing Agency story, visionary team, core values, and proven digital growth philosophy.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Shift Marketing Agency',
      'url': 'https://shiftagency.am'
    }
  };

  return (
    <PageTransition>
      <SEOHead
        title={lang === 'hy' ? 'Մեր Մասին և Թիմը' : 'About Us & Our Team'}
        description={
          lang === 'hy'
            ? 'Shift Marketing Agency-ի պատմությունը, փիլիսոփայությունը և պրոֆեսիոնալ թիմը՝ SMM մասնագետներ, թիրախոլոգներ, դիզայներներ և վեբ մշակողներ։'
            : 'Get to know Shift Marketing Agency: our mission, values, and talented team of digital strategists, targetologists, and designers in Armenia.'
        }
        keywords="Shift agency team, marketing experts Armenia, Davit Mkheyan, SMM specialists Abovyan"
        schema={aboutSchema}
      />

      <div className="pt-28 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-20">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT SHIFT MARKETING AGENCY</span>
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-black text-white max-w-4xl mx-auto leading-tight">
              Մենք օգնում ենք բրենդներին <span className="text-[#b4f846]">շարժվել առաջ</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Shift-ը ստեղծագործական և թվային performance մարքեթինգի գործակալություն է։ Մենք միավորում ենք ռազմավարությունը, վիրուսային կոնտենտն ու թվային գովազդը՝ Ձեր բիզնեսին շուկայում գերիշխող դիրք ապահովելու համար։
            </p>
          </FadeUp>
        </section>

        {/* History, Mission & Core Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4 h-full hover:border-[#b4f846]/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center font-black">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">Մեր Պատմությունը</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Սկսելով որպես փոքր նվիրյալ ստուդիա՝ Shift-ը վերածվել է լիարժեք 360° գործակալության և ակադեմիայի։ Մենք սպասարկել ենք ավելի քան 50 ընկերությունների Հայաստանում և արտերկրում։
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4 h-full hover:border-[#b4f846]/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center font-black">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">Մեր Առաքելությունը</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Ջնջել անօգուտ «լայքերի» և «գեղեցիկ նկարների» պատրանքը և բիզնեսներին տալ չափելի, վաճառող, իսկական մարքեթինգային աճ։
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4 h-full hover:border-[#b4f846]/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center font-black">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">Մեր Արժեքները</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Բացարձակ թափանցիկություն, անդադար փորձարկումներ, կրեատիվ համարձակություն և հաճախորդի յուրաքանչյուր դրամի նկատմամբ խորը պատասխանատվություն։
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Full Team Roster */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black tracking-widest text-[#b4f846] uppercase block">
              MEET THE EXPERTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Մարդիկ, Ովքեր Կերտում Են Ձեր Հաջողությունը
            </h2>
            <p className="text-xs text-neutral-400">
              SMM մասնագետներ, թիրախային գովազդի վարպետներ, արտ-դիրեկտորներ և վեբ ինժեներներ։
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_DATA.map((member) => (
              <StaggerItem key={member.id}>
                <div className="group h-96 [perspective:1000px]">
                  <div className="relative w-full h-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front */}
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
                        <p className="text-[11px] text-neutral-400 mt-1">Սավառնեք (Hover) մանրամասների համար ➔</p>
                      </div>
                    </div>

                    {/* Back */}
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

        {/* Universal Contact Section */}
        <FadeUp>
          <ContactSection />
        </FadeUp>
      </div>
    </PageTransition>
  );
}
