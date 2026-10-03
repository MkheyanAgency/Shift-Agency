import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  BookOpen,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function AdminLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Դաշբորդ & Վերլուծություն', icon: LayoutDashboard },
    { to: '/admin/leads', label: 'Լիդեր & Հայտեր', icon: Users },
    { to: '/admin/cases', label: 'Քեյսեր & Պորտֆոլիո', icon: Briefcase },
    { to: '/admin/courses', label: 'Դասընթացներ', icon: GraduationCap },
    { to: '/admin/blog', label: 'Բլոգ & Հոդվածներ', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-[#07080a] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0c10] border-b md:border-b-0 md:border-r border-white/10 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-block">
              <img
                src="/assets/shift-logo.png"
                alt="Shift Agency"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/shift_sev-removebg-preview.png';
                }}
              />
            </Link>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
              Admin
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#b4f846] text-black shadow-[0_0_15px_rgba(180,248,70,0.4)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3 mt-6">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-neutral-400 hover:text-white px-2 py-1.5"
          >
            <span>Բացել Կայքը</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between px-2 pt-2">
            <div>
              <p className="text-xs font-bold text-white">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-neutral-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/5 text-neutral-400 hover:text-red-400 hover:bg-white/10 transition-colors"
              title="Ելք համակարգից"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
