import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { submitLead } from '../../services/leadsService';
import { sendTelegramLeadNotification } from '../../services/telegramBot';
import { Calculator as CalcIcon, Check, ArrowRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

const SERVICE_OPTIONS = [
  { id: 'smm', nameHy: 'SMM & Կոնտենտ Մենեջմենթ', nameEn: 'SMM & Content Management', basePrice: 250000 },
  { id: 'target', nameHy: 'Թիրախային Գովազդ (Meta & Google)', nameEn: 'Paid Ads (Meta & Google)', basePrice: 200000 },
  { id: 'reels', nameHy: 'Վիրուսային Reels / TikTok Արտադրություն', nameEn: 'Viral Reels & TikTok Production', basePrice: 180000 },
  { id: 'branding', nameHy: 'Բրենդինգ & Լոգո Դիզայն', nameEn: 'Branding & Logo Design', basePrice: 220000 },
  { id: 'web', nameHy: 'Վեբ Կայք & Landing Page', nameEn: 'High-Converting Web & Landing App', basePrice: 350000 }
];

export default function Calculator() {
  const { t } = useLanguage();
  const [adSpend, setAdSpend] = useState(400000);
  const [selectedServices, setSelectedServices] = useState(['smm', 'target']);
  const [goal, setGoal] = useState('sales');

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Dynamic fee calculation
  const servicesBaseSum = selectedServices.reduce((sum, id) => {
    const found = SERVICE_OPTIONS.find((s) => s.id === id);
    return sum + (found ? found.basePrice : 0);
  }, 0);

  // Discount rule for bundling multiple services
  const bundleDiscount = selectedServices.length >= 3 ? 0.85 : selectedServices.length === 2 ? 0.92 : 1.0;
  const estimatedAgencyFee = Math.round(servicesBaseSum * bundleDiscount);

  // Projected Reach & Estimated Leads
  const estimatedReach = Math.round((adSpend / 4) * 2.8);
  const estimatedLeads = Math.round((adSpend / 2400) * (goal === 'sales' ? 1.4 : 1.9));

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    setIsSubmitting(true);
    try {
      const selectedNames = selectedServices
        .map((id) => SERVICE_OPTIONS.find((s) => s.id === id)?.nameHy)
        .filter(Boolean)
        .join(', ');

      const payload = {
        name: clientName,
        phone: clientPhone,
        service: `Calculator: ${selectedNames}`,
        budget: `Ad Spend: ${adSpend.toLocaleString()}֏ | Retainer: ${estimatedAgencyFee.toLocaleString()}֏`,
        message: `Նպատակ: ${goal}, Ակնկալվող լիդեր: ~${estimatedLeads}`,
        source: 'Interactive Calculator'
      };

      await submitLead(payload);
      await sendTelegramLeadNotification(payload);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 relative overflow-hidden" id="calculator">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#b4f846]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20 mb-2">
            <CalcIcon className="w-3.5 h-3.5" />
            <span>ԻՆՏԵՐԱԿՏԻՎ ՀԱՇՎԻՉ</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">{t.calc.title}</h3>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">{t.calc.subtitle}</p>
        </div>
        <div className="text-xs text-neutral-400 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 self-start md:self-auto">
          ⚡ 3+ ծառայության դեպքում՝ <span className="text-[#b4f846] font-bold">15% զեղչ</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Ad Spend Slider */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                {t.calc.budgetLabel}
              </label>
              <span className="text-lg font-black text-[#b4f846]">{adSpend.toLocaleString()} ֏ / ամիս</span>
            </div>
            <input
              type="range"
              min="150000"
              max="2500000"
              step="50000"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full accent-[#b4f846] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 font-semibold">
              <span>150,000֏</span>
              <span>1,000,000֏</span>
              <span>2,500,000֏+</span>
            </div>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
              Գլխավոր Մարքեթինգային Նպատակը
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'sales', label: 'Վաճառքներ & Լիդեր' },
                { id: 'brand', label: 'Բրենդի Ճանաչելիություն' },
                { id: 'traffic', label: 'Կայքի Այցելուներ' }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    goal === g.id
                      ? 'bg-[#b4f846]/15 border-[#b4f846] text-[#b4f846]'
                      : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
              {t.calc.servicesLabel}
            </label>
            <div className="space-y-2">
              {SERVICE_OPTIONS.map((srv) => {
                const checked = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                      checked
                        ? 'bg-[#b4f846]/10 border-[#b4f846]/40 text-white'
                        : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          checked
                            ? 'bg-[#b4f846] border-[#b4f846] text-black'
                            : 'border-neutral-600 bg-transparent'
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-semibold text-white">{srv.nameHy}</span>
                    </div>
                    <span className="text-xs font-bold text-neutral-400">
                      ~{srv.basePrice.toLocaleString()} ֏
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output & Capture Box (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-[#090b0e] border border-[#b4f846]/20 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                {t.calc.estimatedInvestment}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#b4f846]">
                {estimatedAgencyFee.toLocaleString()} ֏ <span className="text-xs text-neutral-400 font-normal">{t.calc.perMonth}</span>
              </span>
            </div>

            {/* Projected Forecast */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Ակնկալվող Ծածկույթ
                </span>
                <span className="text-lg font-black text-white">~{estimatedReach.toLocaleString()}</span>
                <span className="text-[10px] text-neutral-500 block">մարդ / ամիս</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Կանխատեսվող Լիդեր
                </span>
                <span className="text-lg font-black text-[#b4f846]">~{estimatedLeads}</span>
                <span className="text-[10px] text-neutral-500 block">դիմում / ամիս</span>
              </div>
            </div>

            {/* Lead capture within calculator */}
            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-[#b4f846]/10 border border-[#b4f846]/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#b4f846] mx-auto" />
                <p className="text-sm font-bold text-white">Մոդելավորումը պատրաստ է ⚡</p>
                <p className="text-xs text-neutral-400">Մեր ստրատեգը կզանգահարի Ձեզ՝ քննարկելու մանրամասն մեդիա-պլանը։</p>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-3 pt-2">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Ստացեք ամբողջական մեդիա-պլանը Ձեր համար
                </p>
                <input
                  type="text"
                  required
                  placeholder="Ձեր Անունը"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#b4f846]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Հեռախոսահամար (+374)"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#b4f846]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Ուղարկվում է…</span>
                  ) : (
                    <>
                      <span>{t.calc.getProposal}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
