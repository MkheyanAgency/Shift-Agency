import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FAQ_DATA } from '../data/FAQData';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function FAQ() {
  const { lang } = useLanguage();
  const [openItem, setOpenItem] = useState('1');

  const toggle = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_DATA.map((item) => ({
      '@type': 'Question',
      'name': lang === 'hy' ? item.questionHy : item.questionEn,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': lang === 'hy' ? item.answerHy : item.answerEn
      }
    }))
  };

  return (
    <div className="pt-28 pb-16">
      <SEOHead
        title={lang === 'hy' ? 'Հաճախ Տրվող Հարցեր (FAQ)' : 'Frequently Asked Questions (FAQ)'}
        description={
          lang === 'hy'
            ? 'Հաճախ տրվող հարցեր Shift Marketing Agency-ի ծառայությունների, SMM արդյունքների, գների, գովազդային բյուջեի և դասընթացների մասին։'
            : 'Frequently asked questions about digital marketing, SMM deliverables, pricing, ad budgets, and course schedules by Shift Agency.'
        }
        schema={faqSchema}
      />
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white max-w-4xl mx-auto leading-tight">
          Հաճախ Տրվող <span className="text-[#b4f846]">Հարցեր</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Պատասխաններ SMM արդյունքների, գովազդային բյուջեների, վեբ ծրագրավորման ժամկետների և ակադեմիայի սերտիֆիկատների մասին։
        </p>
      </section>

      {/* Accordion list */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-24 space-y-3.5">
        {FAQ_DATA.map((item) => {
          const isOpen = openItem === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl glass-panel border transition-all overflow-hidden ${
                isOpen ? 'border-[#b4f846]/40 bg-white/[0.04]' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-base sm:text-lg font-black text-white">
                  {lang === 'hy' ? item.questionHy : item.questionEn}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-[#b4f846]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5"
                  dangerouslySetInnerHTML={{
                    __html: lang === 'hy' ? item.answerHy : item.answerEn
                  }}
                />
              )}
            </div>
          );
        })}
      </section>

      <ContactSection
        title="Չգտա՞ք Ձեզ հուզող հարցի պատասխանը"
        subtitle="Մեր թիմը սիրով կպատասխանի Ձեր բոլոր հարցերին անհատական խորհրդատվության ընթացքում։"
      />
    </div>
  );
}
