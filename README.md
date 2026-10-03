# Shift Marketing Agency & Academy

This is a standalone, multi-page site built from five linked HTML documents and shared front-end assets:

- `index.html` — SMM Academy landing page and course modules
- `about.html` — agency story, team roles, and verified-stat slots
- `portfolio.html` — sector case-study templates and results slots
- `faq.html` — course FAQ and student-review section
- `contact.html` — registration form, contact settings, and map placeholder
- `site.css` / `site.js` — shared styles and vanilla JavaScript interactions

Open `index.html` directly or serve this folder from any static web server. Tailwind CDN, Lucide icons, and web fonts load from their respective CDNs.

Before publishing, edit the `CONFIG` object at the top of `site.js` with the real course deadline, official contact/social URLs, approved statistics, case-study results, and form endpoint. The registration form validates its fields but does not transmit or store submissions until `formEndpoint` is configured. Unverified case-study results and testimonials are intentionally left blank.

The Shift logo image is expected at `shift_sev-removebg-preview.png` beside the HTML files.
