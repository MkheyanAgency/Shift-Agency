import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ onOpenConsultation }) {
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Exact navigation links as specified by user
  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/services', label: t.nav.services },
    { to: '/portfolio', label: t.nav.portfolio || 'Պորտֆոլիո' },
    { to: '/courses', label: t.nav.courses },
    { to: '/faq', label: t.nav.faq },
    { to: '/blog', label: t.nav.blog },
    { to: '/contact', label: t.nav.contact }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-3 shadow-2xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/assets/shift-logo.png"
            alt="Shift Marketing Agency"
            className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/shift_sev-removebg-preview.png';
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  active
                    ? 'text-[#050505] font-extrabold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#b4f846] rounded-full shadow-[0_0_14px_rgba(180,248,70,0.6)] z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions - strictly WITHOUT admin icon */}
        <div className="hidden sm:flex items-center gap-2.5">
          <ThemeToggle />
          <LanguageToggle />

          <button
            onClick={onOpenConsultation}
            className="btn-neon px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98] transition-transform ml-1"
          >
            <span>{t.nav.bookCall}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer - strictly WITHOUT admin link */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-white/10 px-5 py-6 mt-3 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between ${
                  isActive(link.to)
                    ? 'bg-[#b4f846] text-[#050505]'
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {isActive(link.to) && <span className="w-2 h-2 rounded-full bg-black" />}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="btn-neon w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
            >
              <span>{t.nav.bookCall}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
