import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitLead } from '../services/leadsService';
import { sendTelegramLeadNotification } from '../services/telegramBot';
import SEOHead from '../components/common/SEOHead';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '../components/common/SocialIcons';

export default function Contact() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'SMM & Target Ads',
    budget: '500,000֏ - 1,000,000֏',
    callSlot: '15:00 - 16:00',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        source: 'Contact Page & Scheduler'
      };
      await submitLead(payload);
      await sendTelegramLeadNotification(payload);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Shift Marketing Agency Contact',
    'description': 'Contact Shift Marketing Agency in Yerevan for free consultation, SMM proposals, and academy registration.',
    'mainEntity': {
      '@type': 'LocalBusiness',
      'name': 'Shift Marketing Agency',
      'telephone': '+37498000000',
      'email': 'mkheyanagency@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Yerevan',
        'addressCountry': 'AM'
      }
    }
  };

  return (
    <div className="pt-28 pb-20">
      <SEOHead
        title={lang === 'hy' ? 'Կապ & Գրանցում — Shift Marketing' : 'Contact & Consultation'}
        description={
          lang === 'hy'
            ? 'Կապ հաստատեք Shift Marketing Agency-ի հետ։ Ամրագրեք անվճար ստրատեգիական զանգ, գրանցվեք SMM դասընթացին կամ այցելեք մեր գրասենյակ Երևանում։'
            : 'Contact Shift Marketing Agency in Yerevan. Book a free 30-minute growth strategy call or register for the SMM Academy today.'
        }
        schema={contactSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Կապ Հաստատեք <span className="text-[#b4f846]">Shift Թիմի Հետ</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Պատրա՞ստ եք սկսել կամ ունեք հարցեր։ Ամրագրեք անվճար ստրատեգիական զանգ կամ ուղարկեք հաղորդագրություն։
          </p>
        </section>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Coordinates & Live Call Scheduler */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              <h3 className="text-xl font-black text-white">Պաշտոնական Կոնտակտներ</h3>

              <div className="space-y-4 text-sm text-neutral-300">
                <a
                  href="tel:+37498000000"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#b4f846]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">Հեռախոս</span>
                    <span className="font-bold text-white">+374 (98) 00-00-00</span>
                  </div>
                </a>

                <a
                  href="mailto:mkheyanagency@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#b4f846]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">Էլ․ հասցե</span>
                    <span className="font-bold text-white">mkheyanagency@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#b4f846]/10 text-[#b4f846] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">Գրասենյակ</span>
                    <span className="font-bold text-white">Երևան, Հայաստան</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                  Սոցիալական Հարթակներ
                </span>
                <div className="flex gap-2.5">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl glass-panel text-white hover:text-[#b4f846] transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl glass-panel text-white hover:text-[#b4f846] transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl glass-panel text-white hover:text-[#b4f846] transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Live Call Scheduler Badge */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#b4f846]/15 via-transparent to-transparent border border-[#b4f846]/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#b4f846]">
                <Calendar className="w-4 h-4" />
                <span>Live Call Scheduler</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Նախընտրո՞ւմ եք անմիջապես ամրագրել Zoom զանգ։ Լրացրեք աջ կողմի ձևը՝ ընտրելով Ձեզ հարմար ժամային սլոտը։
              </p>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-[#b4f846] mx-auto shadow-[0_0_30px_rgba(180,248,70,0.5)]" />
                  <h3 className="text-2xl font-black text-white">Շնորհակալություն։ Հայտն Ընդունված Է ⚡</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
                    Մենք կկապվենք Ձեզ հետ նշված հեռախոսահամարով և կհաստատենք Ձեր նախընտրած ժամային սլոտը։
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="btn-ghost px-6 py-2.5 rounded-xl text-xs font-bold mt-4"
                  >
                    Ուղարկել Այլ Հարցում
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    Ամրագրել Անվճար Խորհրդատվություն
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 uppercase tracking-wider">
                        Անուն *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Արման Պետրոսյան"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#b4f846]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 uppercase tracking-wider">
                        Հեռախոսահամար *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+374 98 000 000"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#b4f846]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 uppercase tracking-wider">
                        Էլ․ հասցե
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="arman@business.am"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#b4f846]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 uppercase tracking-wider">
                        Ծառայություն
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#12141a] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
                      >
                        <option value="SMM & Target Ads">SMM & Թիրախային Գովազդ</option>
                        <option value="SMM Course">Shift Academy SMM Դասընթաց</option>
                        <option value="Branding">Բրենդինգ & Լոգո</option>
                        <option value="Web Development">Վեբ Ծրագրավորում</option>
                        <option value="Creative Content">Վիրուսային Reels / TikTok</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 uppercase tracking-wider">
                        Նախընտրած Զանգի Ժամ (Call Slot)
                      </label>
                      <select
                        value={formData.callSlot}
                        onChange={(e) => setFormData({ ...formData, callSlot: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#12141a] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
                      >
                        <option value="11:00 - 12:00">11:00 - 12:00</option>
                        <option value="13:00 - 14:00">13:00 - 14:00</option>
                        <option value="15:00 - 16:00">15:00 - 16:00</option>
                        <option value="17:00 - 18:00">17:00 - 18:00</option>
                        <option value="19:00 - 20:00">19:00 - 20:00</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 uppercase tracking-wider">
                        Նախատեսվող Բյուջե
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#12141a] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
                      >
                        <option value="300,000֏ - 500,000֏">300,000֏ - 500,000֏</option>
                        <option value="500,000֏ - 1,000,000֏">500,000֏ - 1,000,000֏</option>
                        <option value="1,000,000֏ - 2,500,000֏">1,000,000֏ - 2,500,000֏</option>
                        <option value="2,500,000֏+">2,500,000֏+ (Մեծ մասշտաբ)</option>
                        <option value="Course Tuition">Դասընթացի արժեք</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1 uppercase tracking-wider">
                      Հարց կամ Նշում
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Կիսվեք Ձեր նպատակներով կամ հարցերով..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#b4f846] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-neon w-full py-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isSubmitting ? <span>Ամրագրվում է…</span> : <span>ՀԱՍՏԱՏԵԼ & ԱՄՐԱԳՐԵԼ ԶԱՆԳԸ</span>}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="rounded-3xl overflow-hidden glass-panel border border-white/10 p-2">
          <iframe
            title="Yerevan Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97561.43900350993!2d44.4371492!3d40.1533693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5b%3A0x3d1479ae87da526a!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2sam!4v1700000000000!5m2!1sen!2sam"
            className="w-full h-80 rounded-2xl border-0 grayscale invert contrast-125 opacity-80"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
