"use client";

import { useState, useMemo } from "react";
import {
  Bell,
  Search,
  SlidersHorizontal,
  X,
  Heart,
  Users,
  Wallet,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  MOCK DATA — keyinchalik Supabase `listings` jadvalidan keladi      */
/* ------------------------------------------------------------------ */

const USER = { name: "Madina", isPremium: false };

const FORMATS = [
  { id: "all", label: "Barchasi" },
  { id: "camp", label: "Camp" },
  { id: "grant", label: "Grant" },
  { id: "volunteer", label: "Volontyorlik" },
  { id: "contest", label: "Konkurs" },
  { id: "scholarship", label: "Stipendiya" },
];

const PAYMENTS = ["Barchasi", "To'liq grant", "Qisman moliyalashtirish", "Bepul", "Pullik"];
const AGES = ["Barchasi", "14-17", "18-25", "25+", "Cheklovsiz"];

const LISTINGS = [
  { id: "l1", title: "Erasmus+ Youth Exchange", format: "grant", location: "Xalqaro \u2014 Portugaliya", age: "18-25", payment: "To'liq grant", daysLeft: 3, code: "ERZ-2027-YE", tint: "a" },
  { id: "l2", title: "Yozgi IT Camp \u2014 Toshkent", format: "camp", location: "Mahalliy \u2014 Toshkent", age: "14-17", payment: "Qisman moliyalashtirish", daysLeft: 9, code: "ITC-2027-TSH", tint: "b" },
  { id: "l3", title: "Global Volunteer Program", format: "volunteer", location: "Xalqaro \u2014 Gruziya", age: "18-25", payment: "Bepul", daysLeft: 21, code: "GVP-2027-GEO", tint: "c" },
  { id: "l4", title: "Yosh Ilmiy Startaplar Konkursi", format: "contest", location: "Mahalliy \u2014 Respublika", age: "18-25", payment: "Pullik", daysLeft: 45, code: "YIS-2027-UZ", tint: "a" },
  { id: "l5", title: "DAAD Summer School 2027", format: "scholarship", location: "Xalqaro \u2014 Germaniya", age: "18-25", payment: "To'liq grant", daysLeft: 30, code: "DAD-2027-DE", tint: "b" },
  { id: "l6", title: "Ekologik Volontyorlik \u2014 Norvegiya", format: "volunteer", location: "Xalqaro \u2014 Norvegiya", age: "18-25", payment: "Bepul", daysLeft: 60, code: "ECV-2027-NO", tint: "c" },
  { id: "l7", title: "San'at va Ijod Camp'i", format: "camp", location: "Mahalliy \u2014 Farg'ona", age: "14-17", payment: "Pullik", daysLeft: 14, code: "ART-2027-FRG", tint: "a" },
  { id: "l8", title: "STEM Fully-Funded Grant", format: "grant", location: "Xalqaro \u2014 AQSH", age: "18-25", payment: "To'liq grant", daysLeft: 5, code: "STM-2027-US", tint: "b" },
];

function urgencyTone(days) {
  if (days <= 5) return "urgent";
  if (days <= 14) return "soon";
  return "open";
}

function LogoMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradA2)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradB2)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradA2" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradB2" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Slim illustrated banner — same night-camp world as the dashboard, cropped low */
function CatalogBanner() {
  const stars = useMemo(
    () => Array.from({ length: 10 }, (_, i) => ({ x: 30 + ((i * 71) % 740), y: 8 + ((i * 23) % 46), r: 1 + (i % 2) * 0.5, delay: (i % 6) * 0.5 })),
    []
  );
  return (
    <div className="hero-frame relative w-full overflow-hidden rounded-[24px]">
      <svg viewBox="0 0 800 170" className="w-full h-auto block" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="skyGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2321" />
            <stop offset="100%" stopColor="#2C6156" />
          </linearGradient>
          <radialGradient id="moonGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBF6EA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FBF6EA" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="170" fill="url(#skyGrad2)" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FBF6EA" className="star" style={{ animationDelay: `${s.delay}s` }} />
        ))}
        <circle cx="690" cy="45" r="46" fill="url(#moonGlow2)" className="moon-pulse" />
        <circle cx="690" cy="45" r="22" fill="#FBF6EA" opacity="0.95" />
        <polygon points="0,120 90,80 180,115 260,70 360,120 460,90 560,120 650,85 800,120 800,170 0,170" fill="#356A61" opacity="0.55" />
        <polygon points="0,140 110,100 210,135 330,90 450,138 590,105 700,135 800,110 800,170 0,170" fill="#234B44" />
      </svg>
      <div className="absolute inset-0 flex items-end p-5 sm:p-7">
        <div>
          <p className="text-cream/70 text-xs mb-1">Katalog</p>
          <h1 className="camp-display text-2xl sm:text-3xl text-cream">O'zingizga mos dasturni toping</h1>
        </div>
      </div>
    </div>
  );
}

export default function CampKatalog() {
  const [format, setFormat] = useState("all");
  const [payment, setPayment] = useState("Barchasi");
  const [age, setAge] = useState("Barchasi");
  const [sort, setSort] = useState("deadline");
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saved, setSaved] = useState(new Set());

  const results = useMemo(() => {
    let list = LISTINGS.filter((l) => {
      if (format !== "all" && l.format !== format) return false;
      if (payment !== "Barchasi" && l.payment !== payment) return false;
      if (age !== "Barchasi" && l.age !== age) return false;
      if (query && !l.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === "deadline") list = [...list].sort((a, b) => a.daysLeft - b.daysLeft);
    if (sort === "new") list = [...list].reverse();
    return list;
  }, [format, payment, age, query, sort]);

  function toggleSave(id) {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filterPanel = (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Yosh toifasi</p>
        <div className="flex flex-wrap gap-2">
          {AGES.map((a) => (
            <button key={a} onClick={() => setAge(a)} className={`chip ${age === a ? "chip-active" : ""}`}>{a}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">To'lov turi</p>
        <div className="flex flex-wrap gap-2">
          {PAYMENTS.map((p) => (
            <button key={p} onClick={() => setPayment(p)} className={`chip ${payment === p ? "chip-active" : ""}`}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );

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
        .hero-frame { box-shadow: 0 16px 36px -20px rgba(15,35,30,0.5); }

        .star { animation: campTwinkle 3.6s ease-in-out infinite; }
        @keyframes campTwinkle { 0%,100% { opacity: 0.15; } 50% { opacity: 1; } }
        .moon-pulse { animation: campMoonPulse 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes campMoonPulse { 0%,100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
        @media (prefers-reduced-motion: reduce) { .star, .moon-pulse { animation: none !important; } }

        .fade-up { animation: campFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .chip { font-size: 12px; padding: 6px 12px; border-radius: 999px; border: 1px solid #DCE6DF; background: #FFFFFF; color: #5B6D64; transition: all 160ms ease; white-space: nowrap; }
        .chip:hover { border-color: #B7CFC3; }
        .chip-active { background: #2F6D5F; border-color: #2F6D5F; color: #FBF6EA; }

        .ticket-punch { position: relative; }
        .ticket-punch::before, .ticket-punch::after { content: ""; position: absolute; top: 50%; width: 16px; height: 16px; background: #EEF3EE; border: 1px solid #E1E9E3; border-radius: 999px; transform: translateY(-50%); z-index: 2; }
        .ticket-punch::before { left: -9px; }
        .ticket-punch::after { right: -9px; }
        .ticket-divider { border-left: 1.5px dashed #D9C9A8; }
        .barcode { background-image: repeating-linear-gradient(90deg, #1B2420 0px, #1B2420 2px, transparent 2px, transparent 5px, #1B2420 5px, #1B2420 6px, transparent 6px, transparent 10px); opacity: 0.3; }
        .ticket-card { transition: transform 220ms ease, box-shadow 220ms ease; }
        .ticket-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px -18px rgba(24,52,44,0.4); }

        .band-a { background: linear-gradient(135deg, #2F6D5F, #1B463F); }
        .band-b { background: linear-gradient(135deg, #E2953F, #C97535); }
        .band-c { background: linear-gradient(135deg, #B85D34, #8A4126); }

        .heart-btn { transition: transform 160ms ease; }
        .heart-btn:active { transform: scale(0.85); }

        .sheet-backdrop { animation: campFadeUp 0.2s ease both; }
        .sheet-panel { animation: campSheetUp 260ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
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
            <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center text-sm font-semibold text-white">
              {USER.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 pt-5 space-y-6">
        <div className="fade-up"><CatalogBanner /></div>

        {/* Search + sort */}
        <div className="flex flex-col sm:flex-row gap-3 fade-up" style={{ animationDelay: "60ms" }}>
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Dastur nomi bo'yicha qidirish..."
              className="surface-card w-full rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-teal"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSheetOpen(true)}
              className="sm:hidden surface-card rounded-full px-4 py-2.5 text-sm flex items-center gap-2"
            >
              <SlidersHorizontal size={14} /> Filtr
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="surface-card appearance-none rounded-full pl-4 pr-9 py-2.5 text-sm outline-none cursor-pointer"
              >
                <option value="deadline">Deadline bo'yicha</option>
                <option value="new">Yangi qo'shilgan</option>
                <option value="popular">Mashhur</option>
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Format chips */}
        <div className="flex flex-wrap gap-2 fade-up" style={{ animationDelay: "100ms" }}>
          {FORMATS.map((f) => (
            <button key={f.id} onClick={() => setFormat(f.id)} className={`chip ${format === f.id ? "chip-active" : ""}`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          {/* Desktop sidebar filters */}
          <aside className="hidden lg:block fade-up" style={{ animationDelay: "140ms" }}>
            <div className="surface-card rounded-2xl p-4 sticky top-24">{filterPanel}</div>
          </aside>

          {/* Results */}
          <section className="fade-up" style={{ animationDelay: "180ms" }}>
            <p className="text-muted text-xs mb-3">{results.length} ta dastur topildi</p>
            {results.length === 0 ? (
              <div className="surface-card rounded-2xl p-10 text-center">
                <p className="text-muted text-sm">Bu filtrlar bo'yicha dastur topilmadi. Filtrlarni o'zgartirib ko'ring.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {results.map((l) => {
                  const tone = urgencyTone(l.daysLeft);
                  const isSaved = saved.has(l.id);
                  return (
                    <div key={l.id} className="ticket-card rounded-2xl overflow-hidden border border-hair">
                      <div className={`band-${l.tint} h-16 relative flex items-center px-4`}>
                        <span className="camp-mono text-[10px] tracking-widest uppercase text-cream/90 bg-black/15 rounded-full px-2.5 py-1">
                          {FORMATS.find((f) => f.id === l.format)?.label}
                        </span>
                        <button
                          onClick={() => toggleSave(l.id)}
                          className="heart-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
                          aria-label="Saqlash"
                        >
                          <Heart size={14} className={isSaved ? "text-terracotta" : "text-muted"} fill={isSaved ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <div className="flex">
                        <div className="surface-paper ticket-punch flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="camp-display text-base leading-snug pr-2">{l.title}</h3>
                            <p className="text-xs text-muted mt-1">{l.location}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="flex items-center gap-1 text-xs text-muted"><Users size={12} /> {l.age}</span>
                              <span className="flex items-center gap-1 text-xs text-muted"><Wallet size={12} /> {l.payment}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span
                              className={`camp-mono text-xs font-semibold ${
                                tone === "urgent" ? "text-terracotta" : tone === "soon" ? "text-amber" : "text-teal"
                              }`}
                            >
                              {l.daysLeft} kun qoldi
                            </span>
                            <span className="text-xs text-teal font-medium">Batafsil</span>
                          </div>
                        </div>
                        <div className="surface-paper ticket-divider w-14 shrink-0 flex flex-col items-center justify-between py-4">
                          <ArrowUpRight size={13} className="text-muted" />
                          <div className="barcode w-3 flex-1 my-2" />
                          <span className="camp-mono text-[8px] rotate-90 whitespace-nowrap text-muted">{l.code}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile filter bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="sheet-backdrop absolute inset-0 bg-black/30" onClick={() => setSheetOpen(false)} />
          <div className="sheet-panel absolute bottom-0 left-0 right-0 bg-[#EEF3EE] rounded-t-3xl p-5 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="camp-display text-lg">Filtrlar</h2>
              <button onClick={() => setSheetOpen(false)} className="w-8 h-8 rounded-full surface-card flex items-center justify-center">
                <X size={14} />
              </button>
            </div>
            {filterPanel}
            <button
              onClick={() => setSheetOpen(false)}
              className="w-full bg-teal text-white rounded-full py-3 text-sm font-medium mt-6"
            >
              Natijalarni ko'rsatish ({results.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
