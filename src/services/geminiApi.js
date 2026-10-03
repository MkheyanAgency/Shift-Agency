// Client interface for Gemini AI Chatbot proxy

export async function askGemini(message, history = []) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });

    if (res.ok) {
      const data = await res.json();
      return data.reply;
    }
    throw new Error(`Chat API responded with ${res.status}`);
  } catch (err) {
    console.warn('[Gemini client fallback]', err);
    return 'Շնորհակալություն հարցի համար։ Կարող եք նաև թողնել Ձեր հեռախոսահամարը, և մեր մասնագետը անմիջապես կզանգահարի Ձեզ ⚡։';
  }
}
