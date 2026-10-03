// Telegram Bot alert dispatcher

export async function sendTelegramLeadNotification(leadData) {
  try {
    const text = `🚨 *ՆՈՐ ԼԻԴ SHIFT AGENCY ԿԱՅՔԻՑ* 🚨\n\n` +
      `👤 *Անուն:* ${leadData.name || 'Անանուն'}\n` +
      `📞 *Հեռախոս:* ${leadData.phone || 'Չի նշված'}\n` +
      `✉️ *Էլ․ հասցե:* ${leadData.email || 'Չի նշված'}\n` +
      `💼 *Ծառայություն:* ${leadData.service || 'Ընդհանուր'}\n` +
      `💰 *Բյուջե:* ${leadData.budget || '—'}\n` +
      `📝 *Հաղորդագրություն:* ${leadData.message || leadData.note || '—'}\n` +
      `🌐 *Աղբյուր:* ${leadData.source || 'Website'}\n` +
      `⏱️ *Ժամանակ:* ${new Date().toLocaleString()}`;

    const res = await fetch('/api/notify-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lead: leadData })
    });

    return await res.json();
  } catch (err) {
    console.warn('[Telegram alert dispatch failed]', err);
    return { success: false };
  }
}
