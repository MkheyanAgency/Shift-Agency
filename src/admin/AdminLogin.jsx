import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.error || 'Սխալ մուտքանուն կամ գաղտնաբառ։');
      }
    } catch {
      setError('Մուտքը ձախողվեց։ Խնդրում ենք կրկին փորձել։');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl relative">
        <div className="text-center space-y-3 mb-8">
          <img
            src="/assets/shift-logo.png"
            alt="Shift Marketing Agency"
            className="h-10 mx-auto w-auto object-contain mb-2"
            onError={(e) => {
              e.currentTarget.src = '/shift_sev-removebg-preview.png';
            }}
          />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE ADMIN ACCESS</span>
          </div>
          <h2 className="text-2xl font-black text-white">Shift Admin Panel</h2>
          <p className="text-xs text-neutral-400">
            Ադմինիստրատիվ համակարգ՝ լիդերի, քեյսերի և բովանդակության կառավարման համար։
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase">
              Էլ․ հասցե
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shiftagency.am"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase">
              Գաղտնաբառ
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-neon w-full py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>ՍՏՈՒԳՎՈՒՄ Է…</span>
              </>
            ) : (
              <>
                <span>ՄՈՒՏՔ ԳՈՐԾԵԼ</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-neutral-500">
            Անվտանգ մուտքը պաշտպանված է սերվերային նույնականացմամբ։
          </p>
        </div>
      </div>
    </div>
  );
}
