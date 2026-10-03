import React, { useState, useRef, useEffect } from 'react';
import { askGemini } from '../../services/geminiApi';
import { submitLead } from '../../services/leadsService';
import { sendTelegramLeadNotification } from '../../services/telegramBot';
import { MessageSquare, X, Send, Bot, Sparkles, User, CheckCircle2 } from 'lucide-react';

const QUICK_PROMPTS = [
  'Ի՞նչ արժեն SMM ծառայությունները',
  'Ի՞նչ է ներառում SMM դասընթացը',
  'Ինչպե՞ս է աշխատում թիրախային գովազդը',
  'Ուզում եմ ամրագրել խորհրդատվություն'
];

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Ողջո՛ւյն ⚡։ Ես Shift Marketing Agency-ի խելացի AI խորհրդատուն եմ։ Ինչպե՞ս կարող եմ օգնել Ձեր բիզնեսի առաջխաղացմանը կամ SMM ուսուցմանը։'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage = { role: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    // Check if the user entered a phone number inside the chat to auto-capture as lead
    const phoneMatch = query.match(/(?:\+?374|0)?\s*(?:[1-9]\d{7}|[1-9]\d\s*\d{3}\s*\d{3}|\d{8})/);
    if (phoneMatch && !leadCaptured) {
      const capturedPhone = phoneMatch[0];
      submitLead({
        name: 'AI Chat Client',
        phone: capturedPhone,
        message: query,
        source: 'Gemini AI Chatbot'
      });
      sendTelegramLeadNotification({
        name: 'AI Chat Client',
        phone: capturedPhone,
        message: query,
        source: 'Gemini AI Chatbot'
      });
      setLeadCaptured(true);
    }

    try {
      const historyForApi = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));
      const reply = await askGemini(query, historyForApi);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Ներողություն, տեղի ունեցավ կապի ընդհատում։ Կարող եք թողնել Ձեր հեռախոսահամարը, և մեր մասնագետը անմիջապես կկապվի Ձեզ հետ։'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0d0e12] border border-[#b4f846]/40 text-white shadow-[0_0_25px_rgba(180,248,70,0.35)] hover:border-[#b4f846] hover:shadow-[0_0_35px_rgba(180,248,70,0.6)] transition-all cursor-pointer"
          aria-label="Open AI Consultant"
        >
          <div className="w-8 h-8 rounded-full bg-[#b4f846] flex items-center justify-center text-black font-black text-sm shadow-[0_0_12px_#b4f846]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-black tracking-wide pr-1">Shift AI Օգնական</span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b4f846] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#b4f846]"></span>
          </span>
        </button>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] rounded-3xl glass-panel border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-[#101319] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#b4f846]/20 border border-[#b4f846] text-[#b4f846] flex items-center justify-center shadow-[0_0_15px_rgba(180,248,70,0.3)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>Shift AI Խորհրդատու</span>
                  <span className="w-2 h-2 rounded-full bg-[#b4f846] animate-pulse" />
                </h4>
                <p className="text-[11px] text-neutral-400">Gemini 3.8 Flash • 24/7 Օնլայն</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-[#b4f846]/20 border border-[#b4f846]/40 text-[#b4f846] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#b4f846] text-black font-semibold rounded-br-none'
                      : 'bg-white/[0.06] text-neutral-200 border border-white/10 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                {m.role === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs pl-8">
                <span className="w-2 h-2 rounded-full bg-[#b4f846] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#b4f846] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#b4f846] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-3 py-2 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-neutral-300 hover:text-[#b4f846] hover:border-[#b4f846]/30 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#101319] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Գրեք Ձեր հարցը կամ հեռախոսահամարը..."
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#b4f846]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#b4f846] text-black hover:bg-[#c4fa62] disabled:opacity-50 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
