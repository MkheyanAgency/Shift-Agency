import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AIWidget from './components/common/AIWidget';
import ErrorBoundary from './components/common/ErrorBoundary';
import Modal from './components/ui/Modal';
import { submitLead } from './services/leadsService';
import { sendTelegramLeadNotification } from './services/telegramBot';
import { CheckCircle2, ArrowRight } from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Quiz from './pages/Quiz';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';

// Admin Panel
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import LeadsManager from './admin/LeadsManager';
import PortfolioManager from './admin/PortfolioManager';
import CoursesManager from './admin/CoursesManager';
import BlogManager from './admin/BlogManager';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: '', phone: '', service: 'General Consultation', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    if (!consultForm.name || !consultForm.phone) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: consultForm.name,
        phone: consultForm.phone,
        service: consultForm.service,
        message: consultForm.note,
        source: 'Global Consultation Modal'
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
    <ErrorBoundary>
      <div className="min-h-screen bg-[#07080a] text-[#f2f4f7] flex flex-col font-sans selection:bg-[#b4f846] selection:text-black">
        {!isAdmin && <Navbar onOpenConsultation={() => setIsConsultModalOpen(true)} />}

        <main className="flex-1">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home onOpenConsultation={() => setIsConsultModalOpen(true)} />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="leads" element={<LeadsManager />} />
              <Route path="cases" element={<PortfolioManager />} />
              <Route path="courses" element={<CoursesManager />} />
              <Route path="blog" element={<BlogManager />} />
            </Route>

            {/* Catch-all fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {!isAdmin && <Footer />}
        {!isAdmin && <AIWidget />}

      {/* Quick Consultation Modal */}
      <Modal
        isOpen={isConsultModalOpen}
        onClose={() => {
          setIsConsultModalOpen(false);
          setIsSubmitted(false);
        }}
        title="Ամրագրել Անվճար Խորհրդատվություն ⚡"
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#b4f846] mx-auto shadow-[0_0_20px_rgba(180,248,70,0.5)]" />
            <h4 className="text-lg font-bold text-white">Շնորհակալություն։ Հայտն Ընդունվեց ⚡</h4>
            <p className="text-xs text-neutral-400">
              Մեր ավագ մասնագետը կկապվի Ձեզ հետ նշված հեռախոսահամարով 15 րոպեի ընթացքում։
            </p>
          </div>
        ) : (
          <form onSubmit={handleConsultSubmit} className="space-y-3.5">
            <p className="text-xs text-neutral-400">
              Մեր ավագ մարքեթոլոգը կուսումնասիրի Ձեր էջերը և կառաջարկի աճի անհատական ծրագիր։
            </p>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Անուն Ազգանուն *</label>
              <input
                type="text"
                required
                value={consultForm.name}
                onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                placeholder="Անուն Ազգանուն"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Հեռախոսահամար *</label>
              <input
                type="tel"
                required
                value={consultForm.phone}
                onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                placeholder="+374 98 000 000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Հետաքրքրող Ուղղությունը</label>
              <select
                value={consultForm.service}
                onChange={(e) => setConsultForm({ ...consultForm, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141a] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              >
                <option value="SMM & Target Ads">SMM & Թիրախային Գովազդ</option>
                <option value="SMM Course">SMM Դասընթաց (15 Դաս)</option>
                <option value="Branding">Բրենդինգ & Լոգո Դիզայն</option>
                <option value="Web Development">Վեբ Կայքի Պատրաստում</option>
                <option value="Creative Content">Վիրուսային Reels / TikTok</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Նշում (ըստ ցանկության)</label>
              <input
                type="text"
                value={consultForm.note}
                onChange={(e) => setConsultForm({ ...consultForm, note: e.target.value })}
                placeholder="Instagram էջի հղում կամ հարց..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isSubmitting ? <span>Ուղարկվում է…</span> : <span>ՍՏԱՆԱԼ ԽՈՐՀՐԴԱՏՎՈՒԹՅՈՒՆ</span>}
            </button>
          </form>
        )}
      </Modal>
    </div>
  </ErrorBoundary>
  );
}
