import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLeads } from '../services/leadsService';
import TelegramTestTool from './TelegramTestTool';
import {
  Users,
  TrendingUp,
  Briefcase,
  DollarSign,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads().then((data) => {
      setLeads(data);
      setLoading(false);
    });
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
  const closedLeads = leads.filter((l) => l.status === 'closed').length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Ադմինիստրատիվ Դաշբորդ</h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Իրական ժամանակում մուտքային լիդերի, վաճառքների և արշավների վերլուծություն։
          </p>
        </div>
        <Link
          to="/admin/leads"
          className="btn-neon px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Կառավարել Լիդերը</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
            <span>Ընդհանուր Լիդեր</span>
            <Users className="w-4 h-4 text-[#b4f846]" />
          </div>
          <div className="text-3xl font-black text-white">{totalLeads}</div>
          <p className="text-[11px] text-neutral-500">Բոլոր հարցումները կայքից</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-[#b4f846]/30 bg-[#b4f846]/5 space-y-2">
          <div className="flex items-center justify-between text-[#b4f846] text-xs font-bold uppercase">
            <span>Նոր Հայտեր (New)</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-[#b4f846]">{newLeads}</div>
          <p className="text-[11px] text-neutral-400">Պահանջում են զանգ/պատասխան</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
            <span>Կապ Հաստատված</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">{contactedLeads}</div>
          <p className="text-[11px] text-neutral-500">Բանակցությունների փուլում</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-bold uppercase">
            <span>Հաջողված Գործարքներ</span>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-3xl font-black text-white">{closedLeads}</div>
          <p className="text-[11px] text-neutral-500">Պայմանագիր կնքված</p>
        </div>
      </div>

      {/* Recent Leads Preview */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-white">Վերջին Մուտքային Հայտերը</h3>
          <Link to="/admin/leads" className="text-xs text-[#b4f846] hover:underline font-bold">
            Դիտել բոլորը ({totalLeads})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 font-bold uppercase">
                <th className="pb-3">Անուն</th>
                <th className="pb-3">Հեռախոս</th>
                <th className="pb-3">Ծառայություն</th>
                <th className="pb-3">Կարգավիճակ</th>
                <th className="pb-3">Ամսաթիվ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.slice(0, 5).map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-bold text-white">{l.name}</td>
                  <td className="py-3 text-neutral-300">{l.phone}</td>
                  <td className="py-3 text-neutral-400">{l.service}</td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        l.status === 'new'
                          ? 'bg-[#b4f846]/20 text-[#b4f846] border border-[#b4f846]/30'
                          : l.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3 text-neutral-500">
                    {new Date(l.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Telegram Alert Dispatcher Tester Tool */}
      <TelegramTestTool />
    </div>
  );
}
