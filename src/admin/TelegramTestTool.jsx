import React, { useState } from 'react';
import { sendTelegramLeadNotification } from '../services/telegramBot';
import { Send, CheckCircle2, AlertCircle, Bot, Sparkles, RefreshCw } from 'lucide-react';

export default function TelegramTestTool() {
  const [testLead, setTestLead] = useState({
    name: 'Դավիթ Թեստային',
    phone: '+374 98 765432',
    email: 'test@shiftagency.am',
    service: 'SMM & Target Ads (Թեստ)',
    budget: '500,000֏ / ամիս',
    message: 'Սա ադմին պանելից ուղարկված թեստային ծանուցում է՝ Telegram Bot-ի աշխատանքը ստուգելու համար։',
    source: 'Admin Telegram Tester'
  });

  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [responseLog, setResponseLog] = useState(null);

  const handleSendTest = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setResponseLog(null);

    try {
      const result = await sendTelegramLeadNotification(testLead);
      setStatus('success');
      setResponseLog({
        timestamp: new Date().toLocaleTimeString(),
        message: 'Ծանուցումը հաջողությամբ գեներացվեց և ուղարկվեց Telegram Bot ինտեգրացիային։',
        payload: testLead
      });
    } catch (err) {
      setStatus('error');
      setResponseLog({
        timestamp: new Date().toLocaleTimeString(),
        message: 'Սխալ՝ ծանուցումը չուղարկվեց։',
        error: err.message
      });
    }
  };

  return (
    <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#229ED9]/15 text-[#229ED9] border border-[#229ED9]/30 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Telegram Bot Ծանուցումների Թեստավորում</h3>
            <p className="text-xs text-neutral-400">
              Ստուգեք կայքից մուտքագրվող նոր լիդերի ակնթարթային ծանուցումների առաքումը Telegram-ին։
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#229ED9]/10 text-[#229ED9] border border-[#229ED9]/20 self-start sm:self-auto">
          Live Dispatcher
        </span>
      </div>

      <form onSubmit={handleSendTest} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">Թեստային Անուն</label>
            <input
              type="text"
              value={testLead.name}
              onChange={(e) => setTestLead({ ...testLead, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">Հեռախոսահամար</label>
            <input
              type="text"
              value={testLead.phone}
              onChange={(e) => setTestLead({ ...testLead, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">Ծառայություն</label>
            <input
              type="text"
              value={testLead.service}
              onChange={(e) => setTestLead({ ...testLead, service: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">Բյուջե</label>
            <input
              type="text"
              value={testLead.budget}
              onChange={(e) => setTestLead({ ...testLead, budget: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-400 mb-1">Հաղորդագրություն</label>
          <textarea
            rows="2"
            value={testLead.message}
            onChange={(e) => setTestLead({ ...testLead, message: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-[#b4f846]"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-neon px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer disabled:opacity-50 min-h-[44px]"
          >
            {status === 'sending' ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Ուղարկվում է Telegram-ին...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Ուղարկել Թեստային Ծանուցում</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Response Box */}
      {responseLog && (
        <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
          status === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-red-500/10 border-red-500/30 text-red-300'
        }`}>
          <div className="flex items-center gap-2 font-bold">
            {status === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
            <span>{responseLog.message}</span>
            <span className="text-[10px] opacity-60 ml-auto">{responseLog.timestamp}</span>
          </div>
          <pre className="text-[11px] p-2 rounded-lg bg-black/40 text-neutral-300 overflow-x-auto font-mono">
            {JSON.stringify(responseLog.payload || responseLog.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
