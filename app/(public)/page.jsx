import { useState, useMemo } from "react";
import {
  Bell,
  Search,
  ArrowUpRight,
  Users,
  Wallet,
  Tent,
  GraduationCap,
  HeartHandshake,
  Trophy,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  PREVIEW UCHUN MOCK DATA                                            */
/*  Productionda bu massiv o'rniga app/page.jsx'dagi fetchListings()   */
/*  (Supabase 'listings' jadvali) ishlatiladi — struktura bir xil.     */
/* ------------------------------------------------------------------ */

const USER = { loggedIn: true, name: "Madina" };

const FORMAT_META = {
  camp: { label: "Camp", icon: Tent },
  grant: { label: "Grant", icon: GraduationCap },
  volunteer: { label: "Volontyorlik", icon: HeartHandshake },
  contest: { label: "Konkurs", icon: Trophy },
};

const LISTINGS = [
  { id: "l1", title: "Erasmus+ Youth Exchange", format: "grant", location: "Xalqaro — Portugaliya", age: "18-25", payment: "To'liq grant", daysLeft: 3, tint: "a", createdAt: "2026-08-15" },
  { id: "l2", title: "Yozgi IT Camp — Toshkent", format: "camp", location: "Mahalliy — Toshkent", age: "14-17", payment: "Qisman moliyalashtirish", daysLeft: 9, tint: "b", createdAt: "2026-08-17" },
  { id: "l3", title: "Global Volunteer Program", format: "volunteer", location: "Xalqaro — Gruziya", age: "18-25", payment: "Bepul", daysLeft: 21, tint: "c", createdAt: "2026-08-10" },
  { id: "l4", title: "Yosh Ilmiy Startaplar Konkursi", format: "contest", location: "Mahalliy — Respublika", age: "18-25", payment: "Pullik", daysLeft: 45, tint: "a", createdAt: "2026-08-05" },
  { id: "l5", title: "DAAD Summer School 2027", format: "grant", location: "Xalqaro — Germaniya", age: "18-25", payment: "To'liq grant", daysLeft: 30, tint: "b", createdAt: "2026-08-18" },
  { id: "l6", title: "Ekologik Volontyorlik — Norvegiya", format: "volunteer", location: "Xalqaro — Norvegiya", age: "18-25", payment: "Bepul", daysLeft: 60, tint: "c", createdAt: "2026-08-01" },
  { id: "l7", title: "San'at va Ijod Camp'i", format: "camp", location: "Mahalliy — Farg'ona", age: "14-17", payment: "Pullik", daysLeft: 14, tint: "a", createdAt: "2026-08-16" },
  { id: "l8", title: "STEM Fully-Funded Grant", format: "grant", location: "Xalqaro — AQSH", age: "18-25", payment: "To'liq grant", daysLeft: 5, tint: "b", createdAt: "2026-08-12" },
];

function urgencyTone(days) {
  if (days <= 5) return "urgent";
  if (days <= 14) return "soon";
  return "open";
}

function LogoMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradA3)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradB3)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradA3" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradB3" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HomeHero({ query, setQuery }) {
  const stars = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ x: 20 + ((i * 53) % 760), y: 10 + ((i * 27) % 90), r: 1 + (i % 3) * 0.5, delay: (i % 7) * 0.45 })),
    []
  );
  return (
    <div className="hero-frame relative w-full overflow-hidden rounded-[28px]">
      <svg viewBox="0 0 800 300" className="w-full h-auto block" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="homeSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2321" />
            <stop offset="60%" stopColor="#1B463F" />
            <stop offset="100%" stopColor="#2C6156" />
          </linearGradient>
          <radialGradient id="homeMoonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBF6EA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FBF6EA" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="homeFadeBottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1D1B" stopOpacity="0" />
            <stop offset="55%" stopColor="#0A1D1B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0A1D1B" stopOpacity="0.92" />
          </linearGradient>
        </defs>
        <rect width="800" height="300" fill="url(#homeSkyGrad)" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FBF6EA" className="star" style={{ animationDelay: `${s.delay}s` }} />
        ))}
        <circle cx="640" cy="70" r="60" fill="url(#homeMoonGlow)" className="moon-pulse" />
        <circle cx="640" cy="70" r="30" fill="#FBF6EA" opacity="0.95" />
        <polygon points="0,200 90,140 180,195 260,130 360,200 460,145 560,200 650,150 800,205 800,300 0,300" fill="#356A61" opacity="0.55" />
        <polygon points="0,225 110,165 210,220 330,155 450,225 590,175 700,220 800,185 800,300 0,300" fill="#234B44" />
        <rect width="800" height="300" fill="url(#homeFadeBottom)" />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
        <p className="text-cream text-xs sm:text-sm mb-1 opacity-90" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
          Camp for You
        </p>
        <h1 className="camp-display text-3xl sm:text-5xl text-cream leading-tight max-w-lg" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}>
          O'zingizga mos grant, camp va dasturni toping
        </h1>
        <p className="text-cream text-xs sm:text-sm mt-2 max-w-sm opacity-90" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
          Xalqaro va mahalliy imkoniyatlar — bir joyda, doimiy yangilanadi.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5 flex items-center gap-2 bg-white/95 rounded-full p-1.5 pl-4 max-w-md shadow-lg"
        >
          <Search size={16} className="text-muted shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Dastur nomi, yo'nalish yoki mamlakat..."
            className="flex-1 min-w-0 text-sm outline-none py-2 bg-transparent"
          />
          <button type="submit" className="bg-teal text-white text-sm font-medium rounded-full px-4 py-2 shrink-0">
            Qidirish
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CampHomePreview() {
  const [query, setQuery] = useState("");

  const closingSoon = useMemo(() => [...LISTINGS].sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 6), []);
  const latest = useMemo(() => [...LISTINGS].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4), []);

  return (
    <div className="camp-root min-h-screen w-full pb-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

        .camp-root { background: #EEF3EE; color: #1B2420; font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif; }
        .camp-display { font-family: 'Fraunces', Georgia, serif; }
        .camp-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .text-cream { color: #FBF6EA; }
        .text-muted { color: #5B6D64; }
        .text-teal { color: #2F6D5F; }
        .text-amber { color: #B8792B; }
        .text-terracotta { color: #B85D34; }
        .bg-teal { background: #2F6D5F; }
        .border-hair { border-color: #DCE6DF; }

        .surface-card { background: #FFFFFF; border: 1px solid #E1E9E3; transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease; }
        .surface-card:hover { transform: translateY(-2px); box-shadow: 0 10px 26px -16px rgba(24,52,44,0.35); border-color: #CFE0D6; }
        .surface-paper { background: #FBF6EA; color: #1B2420; }
        .hero-frame { box-shadow: 0 20px 45px -22px rgba(15,35,30,0.55); }

        .star { animation: campTwinkle 3.6s ease-in-out infinite; }
        @keyframes campTwinkle { 0%,100% { opacity: 0.15; } 50% { opacity: 1; } }
        .moon-pulse { animation: campMoonPulse 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes campMoonPulse { 0%,100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
        @media (prefers-reduced-motion: reduce) { .star, .moon-pulse { animation: none !important; } }

        .fade-up { animation: campFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .ticket-punch { position: relative; }
        .ticket-punch::before, .ticket-punch::after { content: ""; position: absolute; top: 50%; width: 16px; height: 16px; background: #EEF3EE; border: 1px solid #E1E9E3; border-radius: 999px; transform: translateY(-50%); z-index: 2; }
        .ticket-punch::before { left: -9px; }
        .ticket-punch::after { right: -9px; }
        .ticket-divider { border-left: 1.5px dashed #D9C9A8; }
        .ticket-card { transition: transform 220ms ease, box-shadow 220ms ease; }
        .ticket-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px -18px rgba(24,52,44,0.4); }

        .band-a { background: linear-gradient(135deg, #2F6D5F, #1B463F); }
        .band-b { background: linear-gradient(135deg, #E2953F, #C97535); }
        .band-c { background: linear-gradient(135deg, #B85D34, #8A4126); }

        .carousel-track { display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 4px; -ms-overflow-style: none; scrollbar-width: none; }
        .carousel-track::-webkit-scrollbar { display: none; }
        .carousel-item { scroll-snap-align: start; flex: 0 0 240px; }

        .category-tile { transition: transform 180ms ease, box-shadow 180ms ease; cursor: pointer; }
        .category-tile:hover { transform: translateY(-3px); }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-hair" style={{ background: "rgba(238,243,238,0.9)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoMark size={22} />
            <span className="camp-display text-base tracking-tight">Camp for You</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full surface-card flex items-center justify-center">
              <Bell size={16} className="text-muted" />
            </button>
            {USER.loggedIn ? (
              <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center text-sm font-semibold text-white">{USER.name.charAt(0)}</div>
            ) : (
              <button className="text-sm font-medium text-teal border border-teal/30 rounded-full px-4 py-1.5">Kirish</button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 pt-5 space-y-10">
        <div className="fade-up"><HomeHero query={query} setQuery={setQuery} /></div>

        {/* Platform stats */}
        <div className="grid grid-cols-3 gap-3 fade-up" style={{ animationDelay: "60ms" }}>
          <div className="surface-card rounded-2xl px-4 py-4 text-center">
            <p className="camp-mono text-xl leading-none text-teal">500+</p>
            <p className="text-muted text-xs mt-1">Faol dastur</p>
          </div>
          <div className="surface-card rounded-2xl px-4 py-4 text-center">
            <p className="camp-mono text-xl leading-none text-amber">12,000+</p>
            <p className="text-muted text-xs mt-1">Foydalanuvchi</p>
          </div>
          <div className="surface-card rounded-2xl px-4 py-4 text-center">
            <p className="camp-mono text-xl leading-none text-terracotta">4</p>
            <p className="text-muted text-xs mt-1">Yo'nalish turi</p>
          </div>
        </div>

        {/* Quick categories */}
        <section className="fade-up" style={{ animationDelay: "100ms" }}>
          <h2 className="camp-display text-xl mb-3">Yo'nalish bo'yicha qidiring</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(FORMAT_META).map(([key, { label, icon: Icon }]) => (
              <div key={key} className="category-tile surface-card rounded-2xl p-4 flex flex-col items-start gap-3">
                <span className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                  <Icon size={18} className="text-teal" />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Closing soon carousel */}
        <section className="fade-up" style={{ animationDelay: "140ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="camp-display text-xl">Muddati yaqinlashayotgan</h2>
            <span className="text-xs text-teal flex items-center gap-1">Barchasi <ChevronRight size={13} /></span>
          </div>
          <div className="carousel-track">
            {closingSoon.map((l) => {
              const tone = urgencyTone(l.daysLeft);
              return (
                <div key={l.id} className="carousel-item ticket-card rounded-2xl overflow-hidden border border-hair block">
                  <div className={`band-${l.tint} h-12 flex items-center px-4`}>
                    <span className="camp-mono text-[10px] tracking-widest uppercase text-cream/90 bg-black/15 rounded-full px-2.5 py-1">
                      {FORMAT_META[l.format]?.label}
                    </span>
                  </div>
                  <div className="surface-paper p-4">
                    <h3 className="camp-display text-sm leading-snug">{l.title}</h3>
                    <p className="text-xs text-muted mt-1">{l.location}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="flex items-center gap-1 text-xs text-muted"><Users size={12} /> {l.age}</span>
                      <span className={`camp-mono text-xs font-semibold ${tone === "urgent" ? "text-terracotta" : tone === "soon" ? "text-amber" : "text-teal"}`}>
                        {l.daysLeft} kun
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Latest listings */}
        <section className="fade-up" style={{ animationDelay: "180ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="camp-display text-xl">So'nggi qo'shilganlar</h2>
            <span className="text-xs text-teal flex items-center gap-1">Barchasi <ChevronRight size={13} /></span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {latest.map((l) => {
              const tone = urgencyTone(l.daysLeft);
              return (
                <div key={l.id} className="ticket-card rounded-2xl overflow-hidden border border-hair flex">
                  <div className="surface-paper ticket-punch flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <span className="camp-mono text-[10px] tracking-widest uppercase text-muted">{FORMAT_META[l.format]?.label}</span>
                      <h3 className="camp-display text-base leading-snug mt-1.5">{l.title}</h3>
                      <p className="text-xs text-muted mt-1">{l.location}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-muted"><Wallet size={12} /> {l.payment}</span>
                      </div>
                    </div>
                    <span className={`camp-mono text-xs font-semibold mt-3 ${tone === "urgent" ? "text-terracotta" : tone === "soon" ? "text-amber" : "text-teal"}`}>
                      {l.daysLeft} kun qoldi
                    </span>
                  </div>
                  <div className="surface-paper ticket-divider w-12 shrink-0 flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-muted" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
