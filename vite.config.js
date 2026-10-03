import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { GoogleGenAI } from '@google/genai';

// In-memory leads store
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
  },
  {
    id: '3',
    name: 'Կարեն Սարգսյան',
    phone: '+374 55 456789',
    email: 'karen@restogroup.am',
    service: 'Կրեատիվ կոնտենտ & Ռեբրենդինգ',
    budget: '1,200,000֏',
    message: 'Ռեստորանային ցանցի վիզուալների և Reels-երի արտադրություն։',
    status: 'closed',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    source: 'Calculator'
  }
];

function apiMiddleware() {
  return {
    name: 'api-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];

        // Helper to parse JSON body
        const readBody = () => new Promise((resolve) => {
          let data = '';
          req.on('data', chunk => { data += chunk; });
          req.on('end', () => {
            try {
              resolve(data ? JSON.parse(data) : {});
            } catch {
              resolve({});
            }
          });
        });

        // POST /api/chat (Gemini AI Assistant)
        if (url === '/api/chat' && req.method === 'POST') {
          readBody().then(async (body) => {
            const { message, history } = body;
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
- Տեղեկացրեք գների, փաթեթների, դասընթացների մասին, եղեք սիրալիր, պրոֆեսիոնալ և դրդեք հաճախորդին թողնել իր հեռախոսահամարը կամ ամրագրել անվճար մարքեթինգային խորհրդատվություն։
- Եթե հարցնում են հայերեն՝ պատասխանեք գրագետ հայերենով։ Եթե անգլերեն են հարցնում՝ պատասխանեք անգլերենով։`;

                const formattedHistory = Array.isArray(history)
                  ? history.map(item => `${item.role === 'user' ? 'User' : 'Assistant'}: ${item.text}`).join('\n')
                  : '';

                const prompt = `${formattedHistory ? formattedHistory + '\n' : ''}User: ${message}\nAssistant:`;

                const response = await ai.models.generateContent({
                  model: 'gemini-3.8-flash',
                  contents: prompt,
                  config: {
                    systemInstruction,
                    temperature: 0.7,
                  }
                });

                const replyText = response.text || 'Շնորհակալություն հաղորդագրության համար։ Մեր մասնագետները կկապվեն Ձեզ հետ։';

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply: replyText }));
                return;
              }
            } catch (err) {
              console.warn('[Gemini API error, falling back to smart agent response]', err.message);
            }

            // Fallback smart response when API key is pending or network is offline
            const query = (message || '').toLowerCase();
            let fallbackReply = 'Բարև Ձեզ։ Ես Shift Marketing Agency-ի AI օգնականն եմ ⚡։ Ինչպե՞ս կարող եմ օգնել Ձեր բիզնեսի առաջխաղացմանը։';

            if (query.includes('դասընթաց') || query.includes('course') || query.includes('smm')) {
              fallbackReply = 'Մեր SMM դասընթացը բաղկացած է 15 խորացված գործնական դասերից + ավարտական քննությունից։ Դուք կտիրապետեք Meta Business Suite-ին, Ads Manager-ին, կոնտենտ-ստրատեգիային և կստեղծեք Ձեր առաջին պորտֆոլիոն։ Գրանցվելու համար կարող եք թողնել Ձեր կոնտակտները «Դասընթացներ» բաժնում։';
            } else if (query.includes('գին') || query.includes('արժեք') || query.includes('price') || query.includes('cost')) {
              fallbackReply = 'Մեր փաթեթները ճկուն են՝ ելնելով բիզնեսի մասշտաբից (Start, Growth, Premium)։ Կայքում կարող եք օգտվել մեր «Ինտերակտիվ Գնացուցակի Հաշվիչից», կամ թողեք Ձեր հեռախոսահամարը, և մենք կկազմենք անհատական առաջարկ։';
            } else if (query.includes('տեղեկ') || query.includes('տեղ') || query.includes('ժամ')) {
              fallbackReply = 'Դասընթացների նոր խմբերում մնացել է սահմանափակ թվով տեղեր։ Դասերը հասանելի են առավոտյան և երեկոյան ժամերին։ Շտապեք ամրագրել Ձեր տեղը։';
            } else if (query.includes('բարև') || query.includes('ողջույն') || query.includes('hello') || query.includes('hi')) {
              fallbackReply = 'Ողջո՛ւյն։ Շնորհակալություն Shift Marketing Agency դիմելու համար 🚀։ Ինչպե՞ս կարող ենք աջակցել՝ SMM ծառայություններ, Թիրախային գովազդ, թե՞ Ակադեմիայի դասընթացներ։';
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ reply: fallbackReply }));
          });
          return;
        }

        // GET /api/leads
        if (url === '/api/leads' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ leads: inMemoryLeads }));
          return;
        }

        // POST /api/leads
        if (url === '/api/leads' && req.method === 'POST') {
          readBody().then((leadData) => {
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
            console.log('⚡ [New Lead captured & Live Alert triggered]:', newLead);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              message: 'Հայտը հաջողությամբ ընդունված է։ Մեր մասնագետները կկապվեն Ձեզ հետ։',
              lead: newLead
            }));
          });
          return;
        }

        // PATCH /api/leads/:id
        if (url.startsWith('/api/leads/') && req.method === 'PATCH') {
          const id = url.replace('/api/leads/', '');
          readBody().then((patchData) => {
            const lead = inMemoryLeads.find(l => l.id === id);
            if (lead) {
              Object.assign(lead, patchData);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, lead }));
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Lead not found' }));
            }
          });
          return;
        }

        // DELETE /api/leads/:id
        if (url.startsWith('/api/leads/') && req.method === 'DELETE') {
          const id = url.replace('/api/leads/', '');
          const index = inMemoryLeads.findIndex(l => l.id === id);
          if (index !== -1) {
            inMemoryLeads.splice(index, 1);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Lead not found' }));
          }
          return;
        }

        // POST /api/notify-telegram (Simulation / Hook)
        if (url === '/api/notify-telegram' && req.method === 'POST') {
          readBody().then((body) => {
            console.log('🔔 [Telegram Live Alert Dispatch]:', body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, delivered: true, timestamp: Date.now() }));
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiMiddleware()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all'
  }
});
