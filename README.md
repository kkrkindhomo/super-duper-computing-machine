# Horny Housewives

> Een luxueuze ervaring, gesmeed in goud en roze. ✨

**Horny Housewives** is een moderne single-page website (React + TypeScript + Vite) die live staat op
[**hornyhousewives.eu**](https://hornyhousewives.eu). De site bevat een homepagina, een over-ons pagina en een
werkend contactformulier dat berichten rechtstreeks naar het e-mailadres van Lisa stuurt.

---

## ✨ Functionaliteiten

- **Home** — hero-sectie met logo, introductietekst en een interactieve “❤️ Likes”-knop.
- **About** — over de site en het *D-block Empire*.
- **Contact** — werkend contactformulier (naam, e-mail, bericht) dat via een zelf-gehoste Express-backend een e-mail
  verstuurt naar `lisa@hornyhousewives.eu`.
- **Luxe thema** — donkerblauwe achtergrond met gouden en roze accenten, Cormorant Garamond + Jost lettertypes.
- **Responsive** — werkt op desktop en mobiel.
- **Client-side routing** — drie pagina’s via `react-router-dom` (HashRouter).

---

## 🛠 Tech stack

| Categorie | Technologie |
|---|---|
| UI-framework | React 19 |
| Taal | TypeScript 6 |
| Build tool | Vite 8 |
| Routing | react-router-dom 7 (HashRouter) |
| Styling | Handgeschreven CSS (CSS custom properties) |
| Linter | Oxlint |
| Deploy (frontend) | GitHub Pages (`gh-pages`) |
| Backend (contact) | Node.js + Express + Nodemailer |
| Mail | Postfix (lokaal) |
| Tunnel | Cloudflare Tunnel |

> **Let op:** Tailwind CSS staat in de `devDependencies`, maar de huidige styling is volledig handgeschreven CSS
> (CSS custom properties in `src/App.css`). Tailwind is beschikbaar mocht je het later willen gebruiken.

---

## 📁 Projectstructuur

```
.
├── index.html                     # Entry HTML + Google Fonts (Cormorant Garamond, Jost)
├── package.json
├── vite.config.ts                 # Vite config (base: '/')
├── tsconfig*.json                 # TypeScript config
├── .oxlintrc.json                 # Oxlint regels
├── public/
│   ├── CNAME                      # hornyhousewives.eu (GitHub Pages custom domain)
│   └── KOENK/                     # Statische bestanden (niet aanpassen)
├── src/
│   ├── main.tsx                   # React entry point
│   ├── App.tsx                    # Router, navbar, footer
│   ├── App.css                    # Globale stijl + luxe thema (CSS variables)
│   ├── assets/
│   │   ├── Logo/                  # Logo’s
│   │   └── pictures/              # Afbeeldingen (PieterIntro, S1mpleFAT)
│   └── components/
│       ├── Home/                  # Home.tsx + Home.css
│       ├── About/                 # About.tsx + About.css
│       └── Contact/               # Contact.tsx + Contact.css
└── backend/                       # Contactformulier-backend (Express + Nodemailer)
    ├── server.js
    ├── package.json
    ├── .env.example
    └── README.md
```

---

## 🚀 Aan de slag

### Vereisten
- **Node.js** 20+ en **npm**

### Installatie
```bash
npm install
```

### Ontwikkelserver
```bash
npm run dev
```
Open daarna de URL die Vite toont (standaard `http://localhost:5173`).

### Productie-build
```bash
npm run build
```
De build wordt in de `dist/`-map geplaatst.

### Build lokaal bekijken
```bash
npm run preview
```

### Linten
```bash
npm run lint
```

---

## ⚙️ Omgevingsvariabelen

| Variabele | Standaardwaarde | Omschrijving |
|---|---|---|
| `VITE_API_URL` | `https://api.hornyhousewives.eu/api/contact` | URL van de contactformulier-backend. Alleen nodig om lokaal naar een andere backend te wijzen. |

> De frontend is volledig statisch; de enige externe afhankelijkheid is de contactformulier-API.

---

## 📬 Contactformulier & backend

Het contactformulier POST naar een zelf-gehoste Express-backend die de e-mail verstuurt:

```
Browser (GitHub Pages)
   │  fetch POST { naam, email, bericht }
   ▼
https://api.hornyhousewives.eu   (Cloudflare Tunnel)
   │
   ▼
Express :3000  (Dell R630 / LXC)
   │  Nodemailer → SMTP 127.0.0.1:25
   ▼
Postfix  →  lisa@hornyhousewives.eu
```

- **Velden:** `naam` (optioneel), `email` (verplicht), `bericht` (verplicht, min. 10 tekens, max. 2000).
- **Rate-limit:** 5 verzoeken per 15 minuten per IP.
- **CORS:** alleen `https://hornyhousewives.eu`.
- **Reply-To:** het e-mailadres van de bezoeker, zodat Lisa direct kan antwoorden.

👉 Zie [`backend/README.md`](backend/README.md) voor de volledige backend-documentatie en deploy-stappen.

---

## 🎨 Design & theming

Het thema is gedefinieerd met CSS custom properties in [`src/App.css`](src/App.css):

| Variabele | Waarde | Gebruik |
|---|---|---|
| `--bg-dark` | `#0a1424` | Hoofdachtergrond |
| `--bg-darker` | `#060d18` | Donkerdere achtergrond |
| `--gold` | `#d4af37` | Gouden accent |
| `--gold-light` | `#e8c874` | Lichte goud (hover) |
| `--rose` | `#d98ba0` | Roze accent |
| `--rose-deep` | `#c05a7a` | Donkerroze |
| `--text` | `#ece5d8` | Hoofdtekst |
| `--text-muted` | `#a89f8c` | Secundaire tekst |
| `--card-border` | `rgba(212,175,55,0.25)` | Kaart-randen |

Lettertypes (via Google Fonts in `index.html`):
- **Cormorant Garamond** — koppen (serif, luxueus)
- **Jost** — lopende tekst en knoppen (sans-serif)

---

## 🌐 Deployment

### Frontend (GitHub Pages)
```bash
npm run deploy   # = npm run build + gh-pages -d dist
```
De custom domain `hornyhousewives.eu` is gekoppeld via [`public/CNAME`](public/CNAME).
> Zorg dat `base: '/'` in `vite.config.ts` staat voor een custom domain.

### Backend (Dell R630 / Proxmox LXC)
De backend draait op een LXC-container (Debian 12, Node 20) en is bereikbaar via
`api.hornyhousewives.eu` door een Cloudflare Tunnel. Zie [`backend/README.md`](backend/README.md)
voor de volledige ops (Postfix, systemd, DNS/SPF/DKIM/DMARC).

---

## 📄 `public/KOENK/`

Deze map bevat statische bestanden (screenshots en een PDF) die rechtstreeks via
`https://hornyhousewives.eu/KOENK/...` bereikbaar zijn. **Niet aanpassen** tenzij expliciet gevraagd.

---

## 📜 npm-scripts

| Script | Omschrijving |
|---|---|
| `npm run dev` | Start de Vite dev-server met HMR |
| `npm run build` | TypeScript-check + productie-build naar `dist/` |
| `npm run preview` | Lokale preview van de productie-build |
| `npm run lint` | Oxlint draaien |
| `npm run deploy` | Build + push naar GitHub Pages |

---

## 📄 Licentie

© Horny Housewives · D-block Empire
