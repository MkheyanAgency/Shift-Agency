import React, { useState } from 'react';
import { submitLead } from '../../services/leadsService';
import { sendTelegramLeadNotification } from '../../services/telegramBot';
import { Send, CheckCircle2, Phone, Mail, Clock, Calendar, Sparkles } from 'lucide-react';

export default function ContactSection({ defaultService = 'SMM & Target Ads', title, subtitle }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    budget: '500,000֏ - 1,000,000֏',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.phone) {
      setErrorMsg('Խնդրում ենք լրացնել անունը և հեռախոսահամարը։');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = { ...formData, source: 'Universal Contact Section' };
      await submitLead(payload);
      await sendTelegramLeadNotification(payload);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: defaultService,
        budget: '500,000֏ - 1,000,000֏',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Հայտը չհաջողվեց ուղարկել։ Փորձեք կրկին կամ զանգահարեք մեզ։');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-20 relative overflow-hidden" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Context */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ՍԿՍԵՆՔ ԱՅՍՕՐ</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {title || 'Պատրա՞ստ եք բարձրացնել Ձեր վաճառքները։'}
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {subtitle || 'Լրացրեք հայտը կամ ամրագրեք անվճար 30 րոպեանոց մարքեթինգային աուդիտ։ Մեր ավագ ստրատեգը կուսումնասիրի Ձեր բիզնեսը և կառաջարկի աճի հստակ քայլեր։'}
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[#b4f846]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Արագ արձագանք</p>
                  <p className="text-sm font-bold text-white">Պատասխանում ենք 15 րոպեում</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[#b4f846]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Անվճար Ռազմավարական Զանգ</p>
                  <p className="text-sm font-bold text-white">30 րոպեանոց աուդիտ Zoom / Meet-ով</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[#b4f846]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Էլ․ հասցե</p>
                  <p className="text-sm font-bold text-white">mkheyanagency@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#b4f846]/20 border border-[#b4f846] text-[#b4f846] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(180,248,70,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Շնորհակալություն։ Հայտը Հաջողությամբ Ուղարկվեց ⚡</h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto">
                    Մեր առաջատար մարքեթոլոգը կկապվի Ձեզ հետ նշված հեռախոսահամարով մոտակա 15-30 րոպեի ընթացքում։
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-ghost px-6 py-2.5 rounded-xl text-xs font-bold mt-4"
                  >
                    Ուղարկել Նոր Հայտ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Ձեր Անունը *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Օրինակ՝ Արմեն Սարգսյան"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#b4f846] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Հեռախոսահամար *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="041 88 24 80"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#b4f846] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Էլ․ հասցե (ըստ ցանկության)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="armen@business.am"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#b4f846] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Հետաքրքրող Ուղղությունը
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#12141a] border border-white/10 text-white focus:outline-none focus:border-[#b4f846] transition-colors text-sm"
                      >
                        <option value="SMM & Target Ads">SMM & Թիրախային Գովազդ</option>
                        <option value="SMM Course">Shift Academy SMM Դասընթաց</option>
                        <option value="Branding">Բրենդինգ & Լոգո Դիզայն</option>
                        <option value="Web Development">Վեբ Կայքի Պատրաստում</option>
                        <option value="Creative Content">Վիրուսային Reels & TikTok</option>
                        <option value="Full Marketing">Ամբողջական Մարքեթինգ 360°</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Նախատեսվող Ամսական Բյուջե
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#12141a] border border-white/10 text-white focus:outline-none focus:border-[#b4f846] transition-colors text-sm"
                    >
                      <option value="300,000֏ - 500,000֏">300,000֏ - 500,000֏</option>
                      <option value="500,000֏ - 1,000,000֏">500,000֏ - 1,000,000֏</option>
                      <option value="1,000,000֏ - 2,500,000֏">1,000,000֏ - 2,500,000֏</option>
                      <option value="2,500,000֏+">2,500,000֏+ (Մեծ մասշտաբ)</option>
                      <option value="Course Tuition">Դասընթացի արժեք (Ակադեմիա)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Ձեր Բիզնեսի կամ նախագծի մասին (հակիրճ)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Գրեք Ձեր էջի հղումը կամ խնդիրը, որը ցանկանում եք լուծել..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#b4f846] transition-colors text-sm resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-red-400 text-xs font-semibold">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-neon w-full py-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Ուղարկվում է…</span>
                    ) : (
                      <>
                        <span>ՈՒՂԱՐԿԵԼ ՀԱՅՏԸ & ՍՏԱՆԱԼ ՌԱԶՄԱՎԱՐՈՒԹՅՈՒՆ</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-neutral-500 mt-2">
                    🔒 Ձեր տվյալները գաղտնի են և երբեք չեն փոխանցվում երրորդ անձանց։
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
