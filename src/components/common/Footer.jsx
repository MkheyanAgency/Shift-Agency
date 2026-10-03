import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Phone, MapPin, Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon, TelegramIcon } from './SocialIcons';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050608] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b4f846]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/assets/shift-logo.png"
                alt="Shift Marketing Agency"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/shift_sev-removebg-preview.png';
                }}
              />
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              «Մարքեթինգ, որը բիզնեսը վերածում է ճանաչելի բրենդի և իրական վաճառքի ⚡»
            </p>
            <p className="text-xs text-neutral-500 max-w-sm">
              SMM • Բրենդինգ • Վիրուսային Կոնտենտ • Վեբ Ծրագրավորում • Meta & Google Ads • 15 Դաս SMM Դասընթաց
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-neutral-300 hover:text-[#b4f846] hover:border-[#b4f846]/40 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-neutral-300 hover:text-[#b4f846] hover:border-[#b4f846]/40 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-neutral-300 hover:text-[#b4f846] hover:border-[#b4f846]/40 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-neutral-300 hover:text-[#b4f846] hover:border-[#b4f846]/40 transition-all"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-widest uppercase text-white/50">Էջեր</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-[#b4f846] transition-colors">Գլխավոր</Link></li>
              <li><Link to="/about" className="hover:text-[#b4f846] transition-colors">Մեր մասին & Թիմ</Link></li>
              <li><Link to="/services" className="hover:text-[#b4f846] transition-colors">Ծառայություններ</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#b4f846] transition-colors">Պորտֆոլիո & Քեյսեր</Link></li>
              <li><Link to="/courses" className="hover:text-[#b4f846] transition-colors">SMM Դասընթացներ</Link></li>
              <li><Link to="/quiz" className="hover:text-[#b4f846] transition-colors">Ինտերակտիվ Քվիզ</Link></li>
              <li><Link to="/blog" className="hover:text-[#b4f846] transition-colors">Բլոգ & Հոդվածներ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-widest uppercase text-white/50">Ուղղություններ</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/services/smm" className="hover:text-[#b4f846] transition-colors">SMM & Սոցցանցեր</Link></li>
              <li><Link to="/services/target-ads" className="hover:text-[#b4f846] transition-colors">Թիրախային Գովազդ</Link></li>
              <li><Link to="/services/branding" className="hover:text-[#b4f846] transition-colors">Բրենդինգ & Լոգո</Link></li>
              <li><Link to="/services/web-dev" className="hover:text-[#b4f846] transition-colors">Վեբ Ծրագրավորում</Link></li>
              <li><Link to="/services/creative-content" className="hover:text-[#b4f846] transition-colors">Reels & Տեսարտադրություն</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-widest uppercase text-white/50">Կապ Մեզ Հետ</h4>
            <div className="space-y-2.5 text-sm text-neutral-400">
              <a href="mailto:mkheyanagency@gmail.com" className="flex items-center gap-2 hover:text-[#b4f846] transition-colors">
                <Mail className="w-4 h-4 text-[#b4f846] shrink-0" />
                <span>mkheyanagency@gmail.com</span>
              </a>
              <a href="tel:+37498000000" className="flex items-center gap-2 hover:text-[#b4f846] transition-colors">
                <Phone className="w-4 h-4 text-[#b4f846] shrink-0" />
                <span>+374 (98) 00-00-00</span>
              </a>
              <div className="flex items-start gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 text-[#b4f846] shrink-0 mt-0.5" />
                <span>Երևան, Հայաստան</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
                  <span className="w-2 h-2 rounded-full bg-[#b4f846] animate-pulse" />
                  <span>Ընդունում ենք նոր հայտեր</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} Shift Marketing Agency. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-white transition-colors">Հարց ու պատասխան</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Գրանցում</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Գաղտնիություն</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
