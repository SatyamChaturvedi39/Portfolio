# Satyam Chaturvedi — Portfolio

A Next.js 16 portfolio site built with Tailwind CSS v4 and GSAP.

---

## Tech Stack

| Layer      | Library                     |
|------------|-----------------------------|
| Framework  | Next.js 16 (App Router)     |
| Styling    | Tailwind CSS v4             |
| Animation  | GSAP 3 + ScrollTrigger      |
| Language   | TypeScript                  |
| Fonts      | Barlow Condensed, Outfit, Fira Code (Google Fonts) |

---

## Getting Started

### 1 — Prerequisites

You need **Node.js 18+** installed.  
Check with: `node -v`

Download from https://nodejs.org if needed.

---

### 2 — Install dependencies

```bash
cd satyam-portfolio
npm install
```

---

### 3 — Start the dev server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.  
Hot-reload is on — every file save updates the browser instantly.

---

### 4 — Build for production

```bash
npm run build
npm start
```

---

## Deploy to Vercel (recommended — free)

```bash
# Install Vercel CLI once
npm install -g vercel

# Deploy from the project folder
vercel
```

Follow the prompts — it auto-detects Next.js and deploys in ~30 seconds.  
Your site goes live at a `*.vercel.app` URL immediately.

---

## Deploy to Netlify

```bash
npm run build
# Upload the  .next/  folder via netlify.app dashboard
# or use: npx netlify-cli deploy --dir=.next
```

---

## Project Structure

```
satyam-portfolio/
├── app/
│   ├── globals.css          # Tailwind v4 @theme tokens + all global CSS
│   ├── layout.tsx           # Root layout — loads Google Fonts, sets metadata
│   └── page.tsx             # Assembles all sections in order
│
├── components/
│   ├── Cursor.tsx           # Custom dual-layer cursor with lerp follower
│   ├── Navbar.tsx           # Floating pill nav with scroll-active highlighting
│   ├── Footer.tsx           # Footer + back-to-top button
│   │
│   └── sections/
│       ├── Hero.tsx         # Neural-net canvas, animated name, typing role
│       ├── About.tsx        # Avatar, bio card, animated stat counters
│       ├── Skills.tsx       # Dual marquee rows of skill tiles
│       ├── Experience.tsx   # Centre-line alternating timeline
│       ├── Projects.tsx     # 3-column project cards with SVG mockups
│       ├── Certifications.tsx  # 2x2 cert cards
│       └── Contact.tsx      # Left info + right contact form
│
├── package.json
├── next.config.mjs
├── postcss.config.mjs       # Tailwind v4 postcss plugin
└── tsconfig.json
```

---

## Personalisation Checklist

- [ ] `components/Navbar.tsx` — update any link hrefs if you add external pages  
- [ ] `components/sections/Hero.tsx` — replace GitHub / LinkedIn `href` values  
- [ ] `components/sections/Contact.tsx` — replace GitHub / LinkedIn / LOR `href` values  
- [ ] `components/sections/Projects.tsx` — replace `link: "#"` with real project URLs  
- [ ] `components/sections/Certifications.tsx` — replace `link: "#"` with real certificate URLs  
- [ ] `app/layout.tsx` — update `metadata.description` / keywords  
- [ ] Replace the avatar SVG in `About.tsx` with your actual photo  

---

## Notes on "antigravity"

If your team uses an internal deployment tool called **antigravity**, the project
is a standard Next.js static export — point antigravity at the `npm run build`
output (`.next/` folder) or configure it to run `npm run start` as the web process.
