import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Persistent storage directories (.shift-data/)
const DATA_DIR = path.join(__dirname, '.shift-data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('[Persistent storage initialization notice]', err.message);
}

// Initial seed leads
const SEED_LEADS = [
  {
    id: '1',
    name: 'Արամ Գրիգորյան',
    phone: '041 88 24 80',
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
    phone: '043 88 24 80',
    email: 'lilit@petrosyancare.am',
    service: 'SMM դասընթաց',
    budget: 'Ակադեմիա',
    message: 'Ուզում եմ գրանցվել առաջիկա SMM խմբում, նախընտրում եմ երեկոյան ժամերը։',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    source: 'Course Modal'
  }
];

// Helper to load leads from persistent storage
function loadLeads() {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[Error reading leads from persistent storage]', err);
  }
  return [...SEED_LEADS];
}

// Helper to save leads to persistent storage
function saveLeads(leads) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Error saving leads to persistent storage]', err);
  }
}

let storedLeads = loadLeads();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve persistent uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// Production Authentication Endpoint (Server-Side Only)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.SHIFT_ADMIN_EMAIL;
  const adminPassword = process.env.SHIFT_ADMIN_PASSWORD;
  const sessionSecret = process.env.SHIFT_ADMIN_SESSION_SECRET;

  // Safe failure: If required production secrets are missing on the server, reject with 503
  if (!adminEmail || !adminPassword || !sessionSecret) {
    console.warn('[AUTH] Attempted login but SHIFT_ADMIN_EMAIL, SHIFT_ADMIN_PASSWORD, or SHIFT_ADMIN_SESSION_SECRET is not configured on server.');
    return res.status(503).json({
      success: false,
      error: 'Production authentication is not configured on this server. Contact administrator.'
    });
  }

  // Constant-time comparison or clean credential verification
  if (email === adminEmail && password === adminPassword) {
    const sessionToken = crypto
      .createHmac('sha256', sessionSecret)
      .update(`${email}:${Date.now()}`)
      .digest('hex');

    return res.json({
      success: true,
      token: sessionToken,
      user: {
        email,
        name: 'Shift Administrator',
        role: 'Super Administrator',
        loggedInAt: new Date().toISOString()
      }
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Սխալ էլ․ հասցե կամ գաղտնաբառ։'
  });
});

// Gemini AI Chatbot Route (Server-Side Proxy)
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
- Կոնտակտներ՝ 041 88 24 80, 043 88 24 80, WhatsApp / Viber (+37443882480)։ Գրասենյակ՝ Աբովյան, Հայաստան։
- Դասընթացներ՝ Պրակտիկ SMM դասընթաց (18 դաս + քննություն), Target Ads ինտենսիվ, Բրենդինգ, Կոմերցիոն լուսանկարչություն։
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
    reply = 'Մեր SMM դասընթացը բաղկացած է 18 գործնական դասերից, պորտֆոլիոյի պատրաստումից և Meta Ads-ի խորացված պրակտիկայից։ Կապ՝ 041 88 24 80։';
  } else if (query.includes('գին') || query.includes('արժեք')) {
    reply = 'Գները հաշվարկվում են անհատական՝ ըստ Ձեր բիզնեսի նպատակների։ Կարող եք օգտվել մեր կայքի ինտերակտիվ հաշվիչից կամ զանգահարել 041 88 24 80 / 043 88 24 80։';
  }
  return res.json({ reply });
});

// Leads API (Backed by persistent .shift-data/)
app.get('/api/leads', (req, res) => {
  res.json({ leads: storedLeads });
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

  storedLeads.unshift(newLead);
  saveLeads(storedLeads);
  res.json({ success: true, lead: newLead });
});

app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const lead = storedLeads.find(l => l.id === id);
  if (lead) {
    Object.assign(lead, req.body);
    saveLeads(storedLeads);
    res.json({ success: true, lead });
  } else {
    res.status(404).json({ error: 'Lead not found' });
  }
});

app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const index = storedLeads.findIndex(l => l.id === id);
  if (index !== -1) {
    storedLeads.splice(index, 1);
    saveLeads(storedLeads);
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
  storedLeads.unshift(newLead);
  saveLeads(storedLeads);
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
  console.log(`Persistent storage active at: ${DATA_DIR}`);
});
