import { useState } from "react";
import {
  Bell,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  Sparkles,
  Stamp,
  X,
  ArrowUpRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  MOCK DATA — bu yerga keyinchalik Supabase so'rovlari ulanadi       */
/* ------------------------------------------------------------------ */

const USER = { name: "Madina", profileCompletion: 60, isPremium: false };

const NEWS = [
  { id: "n1", unread: true, title: "Sizga mos 3 ta yangi grant qo'shildi", meta: "STEM yo'nalishi bo'yicha", time: "2 soat oldin" },
  { id: "n2", unread: true, title: "\u201cErasmus+ Youth Exchange\u201d muddati 3 kundan keyin tugaydi", meta: "Saqlanganlar ro'yxatidan", time: "5 soat oldin" },
  { id: "n3", unread: true, title: "Kalendar bo'limi endi barcha deadline'larni ko'rsatadi", meta: "Platforma yangiligi", time: "Kecha" },
  { id: "n4", unread: false, title: "\u201cDAAD Summer School 2027\u201d elon qilindi", meta: "Xalqaro, to'liq grant", time: "2 kun oldin" },
  { id: "n5", unread: false, title: "Murojaatingiz ko'rib chiqildi", meta: "Support jamoasidan javob", time: "3 kun oldin" },
];

const WISHLIST = [
  { id: "w1", title: "Erasmus+ Youth Exchange", format: "Grant", location: "Xalqaro \u2014 Portugaliya", daysLeft: 3, payment: "To'liq grant", code: "ERZ-2027-YE" },
  { id: "w2", title: "Yozgi IT Camp \u2014 Toshkent", format: "Camp", location: "Mahalliy \u2014 Toshkent", daysLeft: 9, payment: "Qisman moliyalashtirish", code: "ITC-2027-TSH" },
  { id: "w3", title: "Global Volunteer Program", format: "Volontyorlik", location: "Xalqaro \u2014 Gruziya", daysLeft: 21, payment: "Bepul", code: "GVP-2027-GEO" },
  { id: "w4", title: "Yosh Ilmiy Startaplar Konkursi", format: "Konkurs", location: "Mahalliy \u2014 Respublika", daysLeft: 45, payment: "Pullik", code: "YIS-2027-UZ" },
];

const STARS = Array.from({ length: 16 }, (_, i) => ({
  x: 20 + ((i * 47) % 760),
  y: 12 + ((i * 29) % 100),
  r: 1 + (i % 3) * 0.5,
  delay: (i % 8) * 0.4,
}));

function urgencyTone(days) {
  if (days <= 5) return "urgent";
  if (days <= 14) return "soon";
  return "open";
}

/* ------------------------------------------------------------------ */
/*  Logomark — tent + globe + book, echoing the brand logo             */
/* ------------------------------------------------------------------ */
function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradA)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradB)" />
      <path
        d="M32 10a7 7 0 0 1 7 7"
        stroke="#C97C4F"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z"
        fill="#FBF6EA"
      />
      <defs>
        <linearGradient id="tentGradA" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" />
          <stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradB" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" />
          <stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — animated illustrated night-camp scene                       */
/* ------------------------------------------------------------------ */
function CampHero({ name }) {
  return (
    <div className="hero-frame relative w-full overflow-hidden rounded-[28px]">
      <svg viewBox="0 0 800 340" className="w-full h-auto block" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2321" />
            <stop offset="60%" stopColor="#1B463F" />
            <stop offset="100%" stopColor="#2C6156" />
          </linearGradient>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBF6EA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FBF6EA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2A93B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F2A93B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#E2652F" />
            <stop offset="100%" stopColor="#F6C55B" />
          </linearGradient>
          <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1D1B" stopOpacity="0" />
            <stop offset="45%" stopColor="#0A1D1B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0A1D1B" stopOpacity="0.92" />
          </linearGradient>
        </defs>

        <rect width="800" height="340" fill="url(#skyGrad)" />

        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#FBF6EA"
            className="star"
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}

        <g className="cloud-a" style={{ transformOrigin: "400px 60px" }}>
          <ellipse cx="150" cy="55" rx="70" ry="12" fill="#F4EFDE" opacity="0.06" />
          <ellipse cx="600" cy="40" rx="90" ry="14" fill="#F4EFDE" opacity="0.05" />
        </g>

        <circle cx="610" cy="80" r="70" fill="url(#moonGlow)" className="moon-pulse" />
        <circle cx="610" cy="80" r="34" fill="#FBF6EA" opacity="0.95" />

        {/* far mountains */}
        <polygon points="0,230 90,150 180,220 260,140 360,225 460,160 560,230 650,170 800,235 800,340 0,340" fill="#356A61" opacity="0.55" />
        {/* near mountains */}
        <polygon points="0,260 110,190 210,255 330,175 450,258 590,200 700,255 800,215 800,340 0,340" fill="#234B44" />

        {/* tree line */}
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 10 + i * 37;
          const h = 30 + ((i * 13) % 26);
          const y = 262 - h * 0.15;
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <polygon points={`10,0 0,${h} 20,${h}`} fill="#193C36" />
              <polygon points={`10,10 2,${h + 10} 18,${h + 10}`} fill="#153630" />
            </g>
          );
        })}

        <rect x="0" y="270" width="800" height="70" fill="#153630" />

        {/* campfire glow + flames */}
        <circle cx="185" cy="290" r="55" fill="url(#fireGlow)" className="fire-glow" />
        <g transform="translate(160 268)">
          <ellipse cx="24" cy="26" rx="20" ry="6" fill="#1B1A17" opacity="0.35" />
          <rect x="6" y="18" width="34" height="5" rx="2" fill="#5C3A26" transform="rotate(-8 23 20)" />
          <rect x="4" y="22" width="34" height="5" rx="2" fill="#4A2E1D" transform="rotate(9 23 24)" />
          <path d="M24 -6c5 6 8 11 8 16a8 8 0 1 1-16 0c0-5 3-10 8-16z" fill="url(#flameGrad)" className="flame flame-1" />
          <path d="M18 2c3 4 5 7 5 10a5 5 0 1 1-10 0c0-3 2-6 5-10z" fill="#F6C55B" className="flame flame-2" />
        </g>

        {/* tent, echoing the logo */}
        <g className="tent-in" transform="translate(300 214)">
          <ellipse cx="34" cy="72" rx="42" ry="7" fill="#102A25" opacity="0.4" />
          <path d="M34 0c14 24 28 48 34 68H0c6-20 20-44 34-68z" fill="url(#tentBodyA)" />
          <path d="M34 0c-14 24-28 48-34 68h34z" fill="url(#tentBodyB)" />
          <path d="M34 0v68" stroke="#8A4F27" strokeWidth="1.5" opacity="0.5" />
          <path d="M20 68l14-24 14 24z" fill="#2B1710" opacity="0.85" />
          <defs>
            <linearGradient id="tentBodyA" x1="34" y1="0" x2="68" y2="68">
              <stop stopColor="#F3B65D" />
              <stop offset="1" stopColor="#DD8D3B" />
            </linearGradient>
            <linearGradient id="tentBodyB" x1="34" y1="0" x2="0" y2="68">
              <stop stopColor="#E2953F" />
              <stop offset="1" stopColor="#C97535" />
            </linearGradient>
          </defs>
        </g>

        <rect width="800" height="340" fill="url(#fadeBottom)" />
      </svg>

      {/* overlay content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-9">
        <div>
          <p className="text-cream text-xs sm:text-sm mb-1 opacity-90" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
            Xush kelibsiz,
          </p>
          <h1 className="camp-display text-3xl sm:text-5xl text-cream leading-none" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}>
            {name}
          </h1>
          <p className="text-cream text-xs sm:text-sm mt-2 max-w-xs opacity-90" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
            Sizga mos grant, camp va dasturlar shu yerda \u2014 chodiringizni tiking, sayohat boshlansin.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function CampDashboard() {
  const [news, setNews] = useState(NEWS);
  const [wishlist, setWishlist] = useState(WISHLIST);
  const [showAllNews, setShowAllNews] = useState(false);
  const [removing, setRemoving] = useState(null);

  const unreadCount = news.filter((n) => n.unread).length;
  const visibleNews = showAllNews ? news : news.slice(0, 4);

  function markRead(id) {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }

  function removeSaved(id) {
    setRemoving(id);
    setTimeout(() => {
      setWishlist((prev) => prev.filter((w) => w.id !== id));
      setRemoving(null);
    }, 220);
  }

  return (
    <div className="camp-root min-h-screen w-full pb-28 lg:pb-14">
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
        .bg-amber { background: #E2953F; }
        .bg-terracotta { background: #C97535; }
        .border-hair { border-color: #DCE6DF; }

        .surface-card { background: #FFFFFF; border: 1px solid #E1E9E3; transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease; }
        .surface-card:hover { transform: translateY(-2px); box-shadow: 0 10px 26px -16px rgba(24,52,44,0.35); border-color: #CFE0D6; }
        .surface-paper { background: #FBF6EA; color: #1B2420; }

        .hero-frame { box-shadow: 0 20px 45px -22px rgba(15,35,30,0.55); }

        .star { animation: campTwinkle 3.6s ease-in-out infinite; }
        @keyframes campTwinkle { 0%,100% { opacity: 0.15; } 50% { opacity: 1; } }

        .moon-pulse { animation: campMoonPulse 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes campMoonPulse { 0%,100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }

        .cloud-a { animation: campCloudDrift 40s linear infinite; }
        @keyframes campCloudDrift { 0% { transform: translateX(-30px); } 50% { transform: translateX(30px); } 100% { transform: translateX(-30px); } }

        .fire-glow { animation: campFireGlow 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes campFireGlow { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 0.95; transform: scale(1.12); } }

        .flame { transform-box: fill-box; transform-origin: bottom center; animation: campFlicker 0.9s ease-in-out infinite; }
        .flame-2 { animation-duration: 0.7s; animation-delay: 0.15s; }
        @keyframes campFlicker { 0%,100% { transform: scaleY(1) skewX(0deg); } 30% { transform: scaleY(1.08) skewX(-3deg); } 60% { transform: scaleY(0.94) skewX(3deg); } }

        @media (prefers-reduced-motion: reduce) {
          .star, .moon-pulse, .cloud-a, .fire-glow, .flame, .tent-in { animation: none !important; }
        }

        .tent-in { animation: campTentIn 900ms cubic-bezier(0.22,1,0.36,1) both; animation-delay: 200ms; transform-box: fill-box; transform-origin: bottom center; }
        @keyframes campTentIn { from { opacity: 0; transform: translateY(14px) scale(0.92); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .fade-up { animation: campFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

        .news-row { transition: background-color 180ms ease; }
        .news-row:hover { background-color: #F7FBF8; }

        .unread-dot { animation: campPulse 2.2s ease-out infinite; }
        @keyframes campPulse { 0% { box-shadow: 0 0 0 0 rgba(47,109,95,0.32); } 70% { box-shadow: 0 0 0 7px rgba(47,109,95,0); } 100% { box-shadow: 0 0 0 0 rgba(47,109,95,0); } }

        .ring-progress { transition: stroke-dashoffset 1000ms cubic-bezier(0.22,1,0.36,1); }

        .ticket-punch { position: relative; }
        .ticket-punch::before, .ticket-punch::after { content: ""; position: absolute; top: 50%; width: 16px; height: 16px; background: #EEF3EE; border: 1px solid #E1E9E3; border-radius: 999px; transform: translateY(-50%); z-index: 2; }
        .ticket-punch::before { left: -9px; }
        .ticket-punch::after { right: -9px; }
        .ticket-divider { border-left: 1.5px dashed #D9C9A8; }
        .barcode { background-image: repeating-linear-gradient(90deg, #1B2420 0px, #1B2420 2px, transparent 2px, transparent 5px, #1B2420 5px, #1B2420 6px, transparent 6px, transparent 10px); opacity: 0.3; }

        .ticket-leaving { opacity: 0; transform: scale(0.97); }
        .ticket-card { transition: opacity 220ms ease, transform 220ms ease; }
        .ticket-card:hover { transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-hair" style={{ background: "rgba(238,243,238,0.9)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoMark size={24} />
            <span className="camp-display text-base tracking-tight">Camp for You</span>
          </div>
          <div className="flex items-center gap-3">
            {USER.isPremium && (
              <span className="hidden sm:flex items-center gap-1 text-xs font-medium text-amber border border-amber/40 rounded-full px-3 py-1">
                <Sparkles size={12} /> Premium
              </span>
            )}
            <button className="relative w-9 h-9 rounded-full surface-card flex items-center justify-center">
              <Bell size={16} className="text-muted" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-terracotta text-[10px] font-semibold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center text-sm font-semibold text-white">
              {USER.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 pt-5 space-y-10">
        <div className="fade-up">
          <CampHero name={USER.name} />
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 fade-up" style={{ animationDelay: "80ms" }}>
          <div className="surface-card rounded-2xl px-4 py-4">
            <Bookmark size={16} className="text-teal mb-2" />
            <p className="camp-mono text-xl leading-none">{wishlist.length}</p>
            <p className="text-muted text-xs mt-1">Saqlangan</p>
          </div>
          <div className="surface-card rounded-2xl px-4 py-4">
            <Clock size={16} className="text-terracotta mb-2" />
            <p className="camp-mono text-xl leading-none">{wishlist.filter((w) => w.daysLeft <= 7).length}</p>
            <p className="text-muted text-xs mt-1">Yaqin deadline</p>
          </div>
          <div className="surface-card rounded-2xl px-4 py-4">
            <Stamp size={16} className="text-amber mb-2" />
            <p className="camp-mono text-xl leading-none">{USER.profileCompletion}%</p>
            <p className="text-muted text-xs mt-1">Profil</p>
          </div>
        </div>

        {/* News widget */}
        <section className="fade-up" style={{ animationDelay: "140ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="camp-display text-xl">Yangiliklar</h2>
            <button onClick={() => setShowAllNews((v) => !v)} className="text-xs text-teal flex items-center gap-1 hover:opacity-70 transition-opacity">
              {showAllNews ? "Kamroq ko'rsatish" : "Barchasini ko'rish"}
              <ChevronRight size={13} />
            </button>
          </div>
          <div className="surface-card rounded-2xl divide-y divide-[#EEF1EC] overflow-hidden">
            {visibleNews.map((item) => (
              <button key={item.id} onClick={() => markRead(item.id)} className="news-row w-full text-left px-4 py-3.5 flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.unread ? "bg-teal unread-dot" : "bg-[#E2E8E3]"}`} />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm leading-snug">{item.title}</span>
                  <span className="flex items-center gap-2 mt-1">
                    <span className="text-muted text-xs">{item.meta}</span>
                    <span className="text-muted/50 text-xs">\u00b7</span>
                    <span className="text-muted text-xs">{item.time}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Profile completion */}
        <section className="fade-up" style={{ animationDelay: "200ms" }}>
          <div className="surface-card rounded-2xl p-5 flex items-center gap-5">
            <div className="relative shrink-0">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="27" fill="none" stroke="#EEF1EC" strokeWidth="5" />
                <circle
                  className="ring-progress"
                  cx="30" cy="30" r="27" fill="none" stroke="#2F6D5F" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray="169.6"
                  strokeDashoffset={169.6 * (1 - USER.profileCompletion / 100)}
                  transform="rotate(-90 30 30)"
                />
              </svg>
              <Stamp size={16} className="text-teal absolute inset-0 m-auto" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Profilingiz {USER.profileCompletion}% to'ldirilgan</p>
              <p className="text-muted text-xs mt-1">Yosh, yo'nalish va til darajasini to'ldiring \u2014 moslik foizi aniqroq hisoblanadi</p>
            </div>
            <ChevronRight size={16} className="text-muted shrink-0" />
          </div>
        </section>

        {/* Wishlist */}
        <section className="fade-up" style={{ animationDelay: "260ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="camp-display text-xl">Saqlanganlar</h2>
            <span className="text-muted text-xs">{wishlist.length} ta dastur</span>
          </div>

          {wishlist.length === 0 ? (
            <div className="surface-card rounded-2xl p-8 text-center">
              <p className="text-muted text-sm">Hali hech narsa saqlamagansiz. Katalogdan o'zingizga mos dasturni toping.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {wishlist.map((w) => {
                const tone = urgencyTone(w.daysLeft);
                return (
                  <div key={w.id} className={`ticket-card flex rounded-2xl overflow-hidden border border-hair ${removing === w.id ? "ticket-leaving" : ""}`}>
                    <div className="surface-paper ticket-punch flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="camp-mono text-[10px] tracking-widest uppercase text-muted">{w.format}</span>
                          <button onClick={() => removeSaved(w.id)} className="text-muted hover:text-terracotta transition-colors" aria-label="Saqlanganlardan o'chirish">
                            <X size={14} />
                          </button>
                        </div>
                        <h3 className="camp-display text-base leading-snug mt-1.5 pr-2">{w.title}</h3>
                        <p className="text-xs text-muted mt-1">{w.location}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-muted">{w.payment}</span>
                        <span className={`camp-mono text-xs font-semibold ${tone === "urgent" ? "text-terracotta" : tone === "soon" ? "text-amber" : "text-teal"}`}>
                          {w.daysLeft} kun qoldi
                        </span>
                      </div>
                    </div>
                    <div className="surface-paper ticket-divider w-16 shrink-0 flex flex-col items-center justify-between py-4">
                      <ArrowUpRight size={14} className="text-muted" />
                      <div className="barcode w-3 flex-1 my-2" />
                      <span className="camp-mono text-[9px] rotate-90 whitespace-nowrap text-muted">{w.code}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Bottom nav — mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-hair lg:hidden" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          {[
            { icon: Sparkles, label: "Bosh sahifa" },
            { icon: Bookmark, label: "Katalog" },
            { icon: Calendar, label: "Kalendar" },
            { icon: Stamp, label: "Kabinet", active: true },
          ].map(({ icon: Icon, label, active }) => (
            <button key={label} className={`flex flex-col items-center gap-1 text-[10px] transition-colors ${active ? "text-teal" : "text-muted"}`}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
