import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitLead } from '../services/leadsService';
import { sendTelegramLeadNotification } from '../services/telegramBot';
import SEOHead from '../components/common/SEOHead';
import { HelpCircle, ArrowRight, ArrowLeft, Check, Sparkles, CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    titleHy: 'Ի՞նչ ոլորտում է գործում Ձեր բիզնեսը',
    optionsHy: [
      { text: 'Ռեստորաններ / Սրճարաններ / Հյուրընկալություն', icon: '🍽️' },
      { text: 'E-commerce / Օնլայն խանութ / Մանրածախ վաճառք', icon: '🛍️' },
      { text: 'Անշարժ գույք / Շինարարություն', icon: '🏢' },
      { text: 'Բժշկություն / Կոսմետոլոգիա / Գեղեցկություն', icon: '✨' },
      { text: 'B2B Ծառայություններ / IT / Խորհրդատվություն', icon: '💼' },
      { text: 'Այլ ոլորտ', icon: '🚀' }
    ]
  },
  {
    id: 2,
    titleHy: 'Ո՞րն է Ձեր գլխավոր մարքեթինգային խնդիրը այս պահին',
    optionsHy: [
      { text: 'Քիչ են վաճառքները և հարցումները (լիդերը)', icon: '📉' },
      { text: 'Էջը կա, բայց չկա ակտիվություն և օրգանիկ դիտումներ', icon: '💤' },
      { text: 'Չունենք պրոֆեսիոնալ վիդեո-կոնտենտ (Reels / TikTok)', icon: '🎬' },
      { text: 'Գովազդ ենք միացնում, բայց գումարը վատնվում է (ցածր ROAS)', icon: '💸' },
      { text: 'Չունենք ժամանակակից կայք, որը կընդունի պատվերներ', icon: '💻' }
    ]
  },
  {
    id: 3,
    titleHy: 'Ամսական որքա՞ն գովազդային բյուջե եք պատրաստ ներդնել',
    optionsHy: [
      { text: '200,000֏ - 400,000֏ (Սկսնակ փուլ)', icon: '🌱' },
      { text: '400,000֏ - 800,000֏ (Ակտիվ աճ)', icon: '🚀' },
      { text: '800,000֏ - 1,500,000֏ (Մասշտաբավորում)', icon: '🔥' },
      { text: '1,500,000֏+ (Առաջատար դիրք շուկայում)', icon: '👑' }
    ]
  },
  {
    id: 4,
    titleHy: 'Ի՞նչ ժամկետում եք ցանկանում սկսել աշխատանքները',
    optionsHy: [
      { text: 'Անմիջապես (այս շաբաթ)', icon: '⚡' },
      { text: '1-2 շաբաթվա ընթացքում', icon: '📅' },
      { text: 'Հաջորդ ամսվանից', icon: '⏳' },
      { text: 'Դեռ ուսումնասիրում եմ շուկան', icon: '🔍' }
    ]
  }
];

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', email: '', pageUrl: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSelectOption = (optionText) => {
    setAnswers((prev) => ({ ...prev, [QUESTIONS[currentStep].id]: optionText }));
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(QUESTIONS.length); // Lead capture step
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!leadInfo.name || !leadInfo.phone) return;

    setIsSubmitting(true);
    try {
      const summaryText = Object.entries(answers)
        .map(([qId, ans]) => `Q${qId}: ${ans}`)
        .join(' | ');

      const payload = {
        name: leadInfo.name,
        phone: leadInfo.phone,
        email: leadInfo.email,
        service: 'Quiz Lead: Custom Strategy',
        budget: answers[3] || '—',
        message: `Էջ: ${leadInfo.pageUrl || '—'} | Պատասխաններ: ${summaryText}`,
        source: 'Interactive 4-Step Quiz'
      };

      await submitLead(payload);
      await sendTelegramLeadNotification(payload);
      setIsDone(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = Math.round(((currentStep + 1) / (QUESTIONS.length + 1)) * 100);

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Shift Marketing Strategy Quiz',
    'applicationCategory': 'BusinessApplication',
    'description': 'Find the right marketing strategy and estimated budget for your business in 4 quick questions.',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'AMD'
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-[85vh] flex items-center">
      <SEOHead
        title={lang === 'hy' ? 'Ինտերակտիվ Քվիզ — Գտիր Քո Մարքեթինգային Ռազմավարությունը' : 'Interactive Marketing Quiz'}
        description={
          lang === 'hy'
            ? 'Պատասխանեք 4 պարզ հարցի և իմացեք, թե ինչպիսի մարքեթինգային ռազմավարություն և բյուջե է անհրաժեշտ Ձեր բիզնեսի թռիչքային աճի համար։'
            : 'Take the 4-step Shift marketing audit quiz to discover the optimal growth strategy and ad channels for your business.'
        }
        schema={quizSchema}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full">
        {/* Progress Bar */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-400">
            <span>ՔԱՅԼ {Math.min(currentStep + 1, 5)} / 5</span>
            <span className="text-[#b4f846]">{progressPercent}% Լրացված է</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[#b4f846] transition-all duration-300 shadow-[0_0_12px_#b4f846]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
          {isDone ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#b4f846]/20 border border-[#b4f846] text-[#b4f846] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(180,248,70,0.5)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Անհատական Ստրատեգիան Ձևավորված Է ⚡
              </h2>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Շնորհակալություն հարցմանը մասնակցելու համար։ Մեր ավագ ստրատեգը վերլուծում է Ձեր պատասխանները և կզանգահարի 15 րոպեի ընթացքում՝ Ձեր բիզնեսի հստակ քայլերով։
              </p>
            </div>
          ) : currentStep < QUESTIONS.length ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-[#b4f846]">
                  Հարց {currentStep + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {QUESTIONS[currentStep].titleHy}
                </h3>
              </div>

              <div className="space-y-2.5">
                {QUESTIONS[currentStep].optionsHy.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.text)}
                    className="w-full p-4 rounded-2xl glass-panel border border-white/10 hover:border-[#b4f846]/60 hover:bg-[#b4f846]/10 text-left transition-all flex items-center gap-3.5 group cursor-pointer"
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <span className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Նախորդ Հարցը</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Final Lead Capture Step */
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-[#b4f846]">
                  ՎԵՐՋԻՆ ՔԱՅԼ
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Որտե՞ղ Ուղարկենք Ձեր Բիզնեսի Անհատական Ստրատեգիան
                </h3>
                <p className="text-xs text-neutral-400">
                  Լրացրեք կոնտակտները, և մենք կտրամադրենք նաև անվճար 30 րոպեանոց մարքեթինգային աուդիտ։
                </p>
              </div>

              <form onSubmit={handleFinalSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Ձեր Անունը *</label>
                  <input
                    type="text"
                    required
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    placeholder="Անուն Ազգանուն"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Հեռախոսահամար *</label>
                  <input
                    type="tel"
                    required
                    value={leadInfo.phone}
                    onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                    placeholder="+374 98 000 000"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Էլ․ հասցե</label>
                  <input
                    type="email"
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    placeholder="example@mail.am"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Instagram էջի կամ կայքի հղումը
                  </label>
                  <input
                    type="text"
                    value={leadInfo.pageUrl}
                    onChange={(e) => setLeadInfo({ ...leadInfo, pageUrl: e.target.value })}
                    placeholder="@your_brand կամ https://..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(QUESTIONS.length - 1)}
                    className="text-xs font-bold text-neutral-400 hover:text-white"
                  >
                    Հետ
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-neon px-8 py-3.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? <span>Ուղարկվում է…</span> : <span>ՍՏԱՆԱԼ ՌԱԶՄԱՎԱՐՈՒԹՅՈՒՆԸ</span>}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
