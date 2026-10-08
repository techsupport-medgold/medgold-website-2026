export const STYLE_GUIDE_SEO = {
  title: "Med Gold Style Guide",
  description: "Design tokens, typography, components, motion and image rules for the Med Gold website.",
} as const;

export const colors = [
  { name: "Primary", token: "primary", swatch: "bg-primary", hex: "#0B6376", use: "Buttons, links, icons", contrast: "6.9:1 on white" },
  { name: "Primary deep", token: "primary-deep", swatch: "bg-primary-deep", hex: "#084E5D", use: "Headings, dark bands", contrast: "9.3:1 on white" },
  { name: "Gold", token: "gold", swatch: "bg-gold", hex: "#D4AF37", use: "Accents on dark, accent buttons", contrast: "Decorative on white (2.1:1)" },
  { name: "Gold ink", token: "gold-ink", swatch: "bg-gold-ink", hex: "#876A14", use: "Eyebrows, gold text on light", contrast: "5.1:1 on white" },
  { name: "Ink", token: "ink", swatch: "bg-ink", hex: "#1F2937", use: "Body text", contrast: "14.7:1 on white" },
  { name: "Ink muted", token: "ink-muted", swatch: "bg-ink-muted", hex: "#4B5563", use: "Secondary text", contrast: "7.6:1 on white" },
  { name: "Ink subtle", token: "ink-subtle", swatch: "bg-ink-subtle", hex: "#6B7280", use: "Captions on white only", contrast: "4.8:1 on white" },
  { name: "Surface raised", token: "surface-raised", swatch: "bg-surface-raised", hex: "#E8F1F3", use: "Alternate bands, soft cards", contrast: "Background" },
  { name: "Surface muted", token: "surface-muted", swatch: "bg-surface-muted", hex: "#F3F4F6", use: "Alternate bands", contrast: "Background" },
] as const;

export const typeScale = [
  { label: "Display / h1", className: "font-display text-4xl font-bold tracking-tight sm:text-5xl", sample: "Hospital operations, run right" },
  { label: "Section / h2", className: "font-display text-3xl font-bold tracking-tight sm:text-4xl", sample: "Why hospitals choose Med Gold" },
  { label: "Card / h3", className: "font-display text-lg font-bold", sample: "Pharmacy stock audit" },
  { label: "Lead", className: "text-lg text-ink-muted", sample: "Intro paragraphs under a section heading." },
  { label: "Body", className: "text-base", sample: "Body copy is Inter at 16px with a 1.6 line height." },
  { label: "Eyebrow", className: "text-xs font-bold uppercase tracking-[0.14em] text-gold-ink", sample: "Our services" },
] as const;

export const motionRules = [
  "Reveal: content fades up 24px over 700ms (ease-out-expo) when it scrolls into view; grids stagger 80ms per item, capped at 480ms.",
  "Hover: interactive cards lift 4px with a deeper teal shadow; icon badges scale and tilt; trailing arrows nudge right.",
  "Press: buttons scale to 97% while pressed.",
  "Numbers: stats count up once when they enter the viewport; the server HTML keeps the final value.",
  "Reduced motion: every reveal, lift and count-up is disabled under prefers-reduced-motion.",
] as const;

export const imageRules = [
  "People and places show Indian doctors, nurses, pharmacists and administrators in Indian hospital settings.",
  "No readable signage, logos or real hospital names in photos.",
  "Only the first above-the-fold hero image on a page uses preload; every other image lazy-loads.",
  "Always give next/image a fill frame with sizes, or explicit width and height.",
  "Alt text describes the scene; decorative images use an empty alt.",
  "Text never sits on a raw photo: use a gradient overlay or a solid card.",
] as const;

export const timelineDemo = [
  { title: "Discover", text: "Site walk-through and stakeholder interviews." },
  { title: "Diagnose", text: "Audit findings ranked by impact." },
  { title: "Deploy", text: "Teams, systems and SOPs go live." },
  { title: "Sustain", text: "Monthly reviews against agreed KPIs." },
] as const;

export const statsDemo = [
  { value: "120+", label: "Facilities served", detail: "Across South India" },
  { value: "98%", label: "Shift fill rate", detail: "Rolling 12 months" },
  { value: "24/7", label: "Support desk", detail: "Chennai command centre" },
  { value: "₹4.2 Cr", label: "Stock recovered", detail: "Illustrative" },
] as const;

export const faqDemo = [
  { question: "When should I use an accordion?", answer: "For FAQs and optional detail. Keep the question short and the answer under 80 words." },
  { question: "Can several items be open at once?", answer: "Yes, unless you pass a shared name, which makes the group exclusive." },
] as const;
