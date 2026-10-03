import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory leads storage
const inMemoryLeads = [
  {
    id: '1',
    name: 'Արամ Գրիգորյան',
    phone: '+374 98 123456',
    email: 'aram@techarmenia.am',
    service: 'SMM & Target Ads',
    budget: '500,000֏ / ամիս',
    message: 'Հետաքրքրված ենք Instagram & TikTok էջերի զարգացմամբ և թիրախային գովազդով։',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    source: 'Website Form'
  },
  {
    id: '2',
    name: 'Լիլիթ Պետրոսյան',
    phone: '+374 77 987654',
    email: 'lilit@petrosyancare.am',
    service: 'SMM դասընթաց',
    budget: 'Ակադեմիա',
    message: 'Ուզում եմ գրանցվել առաջիկա SMM խմբում, նախընտրում եմ երեկոյան ժամերը։',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    source: 'Course Modal'
  }
];

// Gemini AI Chatbot Route
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' }
        }
      });

      const systemInstruction = `Դուք Shift Marketing Agency & Academy-ի առաջատար խելացի AI խորհրդատուն եք (Shift AI)։
Գործակալության մասին.
- Անվանում: Shift Marketing Agency & Academy
- Կարգախոս: «Մարքեթինգ, որը բիզնեսը վերածում է ճանաչելի բրենդի և իրական վաճառքի ⚡»
- Ծառայություններ՝ SMM (սոցիալական մեդիա մարքեթինգ), Բրենդինգ և Վիզուալ Ինքնություն, Կրեատիվ Կոնտենտ (Reels, TikTok, Photo/Video), Target Ads (Meta, Google, TikTok Ads), Վեբ Ծրագրավորում (React, Next.js, E-commerce)։
- Ակադեմիա / Դասընթացներ՝ Պրակտիկ SMM դասընթաց (15 դաս + ավարտական քննություն + պորտֆոլիո + սերտիֆիկատ), Target Ads ինտենսիվ, Բրենդինգ և Կոնտենտ։
- Պատասխանեք սիրալիր, պրոֆեսիոնալ և դրդեք հաճախորդին թողնել իր հեռախոսահամարը կամ ամրագրել անվճար խորհրդատվություն։`;

      const formattedHistory = Array.isArray(history)
        ? history.map(item => `${item.role === 'user' ? 'User' : 'Assistant'}: ${item.text}`).join('\n')
        : '';

      const prompt = `${formattedHistory ? formattedHistory + '\n' : ''}User: ${message}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { systemInstruction, temperature: 0.7 }
      });

      return res.json({ reply: response.text || 'Շնորհակալություն, կկապվենք Ձեզ հետ։' });
    }
  } catch (err) {
    console.warn('[Gemini API error, fallback activated]', err.message);
  }

  // Fallback
  const query = (message || '').toLowerCase();
  let reply = 'Բարև Ձեզ։ Ես Shift Marketing Agency-ի AI օգնականն եմ ⚡։ Ինչպե՞ս կարող եմ օգնել Ձեր բիզնեսին։';
  if (query.includes('դաս') || query.includes('smm')) {
    reply = 'Մեր SMM դասընթացը բաղկացած է 15 գործնական դասերից, պորտֆոլիոյի պատրաստումից և Meta Ads-ի խորացված պրակտիկայից։';
  } else if (query.includes('գին') || query.includes('արժեք')) {
    reply = 'Գները հաշվարկվում են անհատական՝ ըստ Ձեր բիզնեսի նպատակների։ Կարող եք օգտվել մեր կայքի ինտերակտիվ հաշվիչից կամ թողնել Ձեր կոնտակտները։';
  }
  return res.json({ reply });
});

// Leads API
app.get('/api/leads', (req, res) => {
  res.json({ leads: inMemoryLeads });
});

app.post('/api/leads', (req, res) => {
  const leadData = req.body || {};
  const newLead = {
    id: String(Date.now()),
    name: leadData.name || 'Անանուն հաճախորդ',
    phone: leadData.phone || '',
    email: leadData.email || '',
    service: leadData.service || 'Ընդհանուր հարցում',
    budget: leadData.budget || 'Չի նշված',
    message: leadData.message || leadData.note || '',
    status: 'new',
    createdAt: new Date().toISOString(),
    source: leadData.source || 'Website'
  };

  inMemoryLeads.unshift(newLead);
  res.json({ success: true, lead: newLead });
});

app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const lead = inMemoryLeads.find(l => l.id === id);
  if (lead) {
    Object.assign(lead, req.body);
    res.json({ success: true, lead });
  } else {
    res.status(404).json({ error: 'Lead not found' });
  }
});

app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const index = inMemoryLeads.findIndex(l => l.id === id);
  if (index !== -1) {
    inMemoryLeads.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Lead not found' });
  }
});

// Backward compatibility with legacy /api/register
app.post('/api/register', (req, res) => {
  const leadData = req.body || {};
  const newLead = {
    id: String(Date.now()),
    name: leadData.name || 'Անանուն',
    phone: leadData.phone || '',
    email: leadData.email || '',
    service: 'SMM Course Registration',
    budget: 'Standard',
    message: leadData.note || '',
    status: 'new',
    createdAt: new Date().toISOString(),
    source: 'Course Registration Form'
  };
  inMemoryLeads.unshift(newLead);
  res.json({ success: true, message: 'Հայտը հաջողությամբ ընդունված է։', data: newLead });
});

app.post('/api/notify-telegram', (req, res) => {
  console.log('🔔 [Telegram Alert received]', req.body);
  res.json({ success: true, delivered: true });
});

// Serve dist in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.use(express.static(__dirname));

// SPA catch-all
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Shift Marketing Agency server running on http://${HOST}:${PORT}`);
});
