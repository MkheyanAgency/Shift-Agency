import React, { useState, useEffect } from 'react';
import { fetchLeads, updateLeadStatus, deleteLead } from '../services/leadsService';
import Modal from '../components/ui/Modal';
import {
  Users,
  Search,
  Filter,
  Trash2,
  Eye,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Download
} from 'lucide-react';

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLead, setActiveLead] = useState(null);

  const loadLeads = async () => {
    setLoading(true);
    const data = await fetchLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleExportCSV = () => {
    if (!leads.length) {
      alert('Արտահանման համար տվյալներ չկան։');
      return;
    }

    const headers = ['ID', 'Անուն', 'Հեռախոս', 'Էլ. հասցե', 'Ծառայություն', 'Բյուջե', 'Հաղորդագրություն', 'Կարգավիճակ', 'Աղբյուր', 'Ստեղծվել է'];
    const rows = leads.map((l) => [
      `"${l.id || ''}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.status || 'new'}"`,
      `"${l.source || 'Website'}"`,
      `"${l.createdAt || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `shift_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateLeadStatus(id, newStatus);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (activeLead && activeLead.id === id) {
      setActiveLead((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Վստա՞հ եք, որ ցանկանում եք հեռացնել այս հայտը։')) return;
    await deleteLead(id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (activeLead && activeLead.id === id) {
      setActiveLead(null);
    }
  };

  const filtered = leads.filter((l) => {
    const matchesFilter = filterStatus === 'all' || l.status === filterStatus;
    const matchesSearch =
      (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.phone || '').includes(searchTerm) ||
      (l.service || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Լիդերի & Հայտերի Կառավարում</h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Բոլոր հարցումները կայքի ձևերից, քվիզից, հաշվիչից և AI չատբոտից։
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="btn-neon px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Արտահանել CSV (Excel)</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'Բոլորը' },
            { id: 'new', label: 'Նոր (New)' },
            { id: 'contacted', label: 'Կապ Հաստատված' },
            { id: 'closed', label: 'Գործարք Կնքված' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterStatus(btn.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                filterStatus === btn.id
                  ? 'bg-[#b4f846] text-black border-[#b4f846]'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Որոնել անուն, հեռախոս..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#b4f846]"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-neutral-400 font-bold uppercase tracking-wider">
                <th className="p-4">Անուն</th>
                <th className="p-4">Հեռախոս</th>
                <th className="p-4">Ծառայություն</th>
                <th className="p-4">Բյուջե</th>
                <th className="p-4">Կարգավիճակ</th>
                <th className="p-4">Աղբյուր</th>
                <th className="p-4 text-right">Գործողություններ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-neutral-500">
                    Հայտեր չեն գտնվել։
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-white">{l.name}</td>
                    <td className="p-4 text-neutral-300 font-mono">{l.phone}</td>
                    <td className="p-4 text-neutral-300 max-w-[200px] truncate">{l.service}</td>
                    <td className="p-4 text-neutral-400">{l.budget || '—'}</td>
                    <td className="p-4">
                      <select
                        value={l.status}
                        onChange={(e) => handleStatusChange(l.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase border bg-[#101217] cursor-pointer focus:outline-none ${
                          l.status === 'new'
                            ? 'text-[#b4f846] border-[#b4f846]/40'
                            : l.status === 'contacted'
                            ? 'text-blue-400 border-blue-500/40'
                            : 'text-green-400 border-green-500/40'
                        }`}
                      >
                        <option value="new">NEW (ՆՈՐ)</option>
                        <option value="contacted">CONTACTED (ԿԱՊ ՎԵՐՑՎԱԾ)</option>
                        <option value="closed">CLOSED (ԿՆՔՎԱԾ)</option>
                      </select>
                    </td>
                    <td className="p-4 text-neutral-400">{l.source || 'Website'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setActiveLead(l)}
                        className="p-1.5 rounded-lg bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                        title="Մանրամասներ"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Հեռացնել"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {activeLead && (
        <Modal
          isOpen={!!activeLead}
          onClose={() => setActiveLead(null)}
          title={`Հայտի Մանրամասներ: ${activeLead.name}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Հեռախոս՝</span>
                <a href={`tel:${activeLead.phone}`} className="font-bold text-[#b4f846] underline">
                  {activeLead.phone}
                </a>
              </div>
              {activeLead.email && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Էլ․ հասցե՝</span>
                  <span className="font-bold text-white">{activeLead.email}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-500">Ծառայություն՝</span>
                <span className="font-bold text-white">{activeLead.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Բյուջե՝</span>
                <span className="font-bold text-white">{activeLead.budget || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Աղբյուր՝</span>
                <span className="text-neutral-300">{activeLead.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Ստացման ժամանակ՝</span>
                <span className="text-neutral-300">
                  {new Date(activeLead.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {activeLead.message && (
              <div>
                <span className="text-neutral-400 font-bold block mb-1">
                  Հաղորդագրություն / Նշում՝
                </span>
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white whitespace-pre-wrap leading-relaxed">
                  {activeLead.message}
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-neutral-400 font-bold">Կարգավիճակ՝</span>
              <select
                value={activeLead.status}
                onChange={(e) => handleStatusChange(activeLead.id, e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#12141a] border border-white/10 text-white text-xs"
              >
                <option value="new">NEW (Նոր)</option>
                <option value="contacted">CONTACTED (Կապ հաստատված)</option>
                <option value="closed">CLOSED (Գործարք կնքված)</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
