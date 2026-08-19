import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Users,
  Wallet,
  Languages,
  CalendarDays,
  ExternalLink,
  Sparkles,
  Lock,
  ArrowUpRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  PREVIEW UCHUN MOCK DATA — productionda Supabase 'listings'dan      */
/*  fetchListingById(slug) orqali keladi. Struktura bir xil.           */
/* ------------------------------------------------------------------ */

const LISTING = {
  id: "l1",
  title: "Erasmus+ Youth Exchange 2027",
  format: "grant",
  is_international: true,
  region: "Portugaliya",
  age_min: 18,
  age_max: 25,
  payment_type: "full",
  language_required: "Ingliz tili",
  apply_deadline: "2026-08-22",
  event_date: "2026-10-05",
  full_desc:
    "Erasmus+ Youth Exchange dasturi Yevropa mamlakatlaridan kelgan yoshlarni bir hafta davomida madaniy almashinuv, workshop va jamoaviy loyihalarda ishtirok etishga taklif qiladi. Barcha xarajatlar — parvoz, turar joy va ovqatlanish — dastur tomonidan qoplanadi. Ishtirokchilardan faqat faollik va ingliz tilida erkin muloqot qilish talab etiladi.",
  official_url: "https://example.com",
};

const SIMILAR = [
  { id: "l5", title: "DAAD Summer School 2027", format: "grant", apply_deadline: "2026-09-18" },
  { id: "l8", title: "STEM Fully-Funded Grant", format: "grant", apply_deadline: "2026-08-24" },
];

const FORMAT_MAP = { camp: "Camp", grant: "Grant", volunteer: "Volontyorlik", contest: "Konkurs", scholarship: "Stipendiya" };
const PAYMENT_MAP = { free: "Bepul", paid: "Pullik", partial: "Qisman moliyalashtirish", full: "To'liq grant" };

function ageLabel(min, max) {
  if (min == null && max == null) return "Cheklovsiz";
  if (min <= 14 && max <= 17) return "14-17 yosh";
  if (min <= 18 && max <= 25) return "18-25 yosh";
  if (min >= 25 && !max) return "25 yosh va undan katta";
  return `${min ?? "0"}-${max ?? "∞"} yosh`;
}

function daysUntil(dateStr) {
  if (!dateStr) return 999;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function urgencyTone(days) {
  if (days <= 5) return "urgent";
  if (days <= 14) return "soon";
  return "open";
}

function formatDate(dateStr) {
  if (!dateStr) return "Belgilanmagan";
  return new Date(dateStr).toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" });
}

function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradA4)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradB4)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradA4" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradB4" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ElonBatafsilPreview() {
  const [saved, setSaved] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // shu tugma bilan ikkala holatni ham ko'rish mumkin

  const days = daysUntil(LISTING.apply_deadline);
  const tone = urgencyTone(days);

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

        .fade-up { animation: campFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .band-a { background: linear-gradient(135deg, #2F6D5F, #1B463F); }

        .ticket-punch { position: relative; }
        .ticket-punch::before, .ticket-punch::after { content: ""; position: absolute; top: 50%; width: 16px; height: 16px; background: #EEF3EE; border: 1px solid #E1E9E3; border-radius: 999px; transform: translateY(-50%); z-index: 2; }
        .ticket-punch::before { left: -9px; }
        .ticket-punch::after { right: -9px; }
        .ticket-divider { border-left: 1.5px dashed #D9C9A8; }
        .ticket-card { transition: transform 220ms ease, box-shadow 220ms ease; }
        .ticket-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px -18px rgba(24,52,44,0.4); }

        .heart-btn { transition: transform 160ms ease; }
        .heart-btn:active { transform: scale(0.85); }

        .premium-lock { background: repeating-linear-gradient(135deg, #FBF6EA, #FBF6EA 8px, #F4EBD6 8px, #F4EBD6 16px); }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-hair" style={{ background: "rgba(238,243,238,0.9)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted">
            <ArrowLeft size={16} /> Katalog
          </span>
          <div className="flex items-center gap-2">
            <LogoMark size={20} />
            <span className="camp-display text-sm tracking-tight">Camp for You</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 pt-6 space-y-6">
        {/* Title band */}
        <div className="band-a rounded-2xl p-5 sm:p-7 fade-up relative overflow-hidden">
          <button
            onClick={() => setSaved((v) => !v)}
            className="heart-btn absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center"
            aria-label="Saqlash"
          >
            <Heart size={16} className={saved ? "text-terracotta" : "text-muted"} fill={saved ? "currentColor" : "none"} />
          </button>
          <span className="camp-mono text-[10px] tracking-widest uppercase text-cream/90 bg-black/15 rounded-full px-2.5 py-1">
            {FORMAT_MAP[LISTING.format]}
          </span>
          <h1 className="camp-display text-2xl sm:text-3xl text-cream mt-3 pr-10 leading-snug">{LISTING.title}</h1>
          <p className="text-cream/80 text-sm mt-2">Xalqaro — {LISTING.region}</p>
        </div>

        {/* Key facts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fade-up" style={{ animationDelay: "60ms" }}>
          <div className="surface-card rounded-2xl p-3.5">
            <Users size={15} className="text-teal mb-1.5" />
            <p className="text-xs text-muted">Yosh</p>
            <p className="text-sm font-medium mt-0.5">{ageLabel(LISTING.age_min, LISTING.age_max)}</p>
          </div>
          <div className="surface-card rounded-2xl p-3.5">
            <Wallet size={15} className="text-amber mb-1.5" />
            <p className="text-xs text-muted">To'lov</p>
            <p className="text-sm font-medium mt-0.5">{PAYMENT_MAP[LISTING.payment_type]}</p>
          </div>
          <div className="surface-card rounded-2xl p-3.5">
            <Languages size={15} className="text-teal mb-1.5" />
            <p className="text-xs text-muted">Til</p>
            <p className="text-sm font-medium mt-0.5">{LISTING.language_required}</p>
          </div>
          <div className="surface-card rounded-2xl p-3.5">
            <span className={`camp-mono text-xs font-semibold ${tone === "urgent" ? "text-terracotta" : tone === "soon" ? "text-amber" : "text-teal"}`}>
              {days} kun
            </span>
            <p className="text-xs text-muted mt-1.5">Deadline'gacha</p>
          </div>
        </div>

        {/* Description */}
        <section className="surface-card rounded-2xl p-5 sm:p-6 fade-up" style={{ animationDelay: "100ms" }}>
          <h2 className="camp-display text-lg mb-3">Dastur haqida</h2>
          <p className="text-sm text-[#3A4640] leading-relaxed whitespace-pre-line">{LISTING.full_desc}</p>
        </section>

        {/* Important dates */}
        <section className="surface-card rounded-2xl p-5 sm:p-6 fade-up" style={{ animationDelay: "140ms" }}>
          <h2 className="camp-display text-lg mb-3 flex items-center gap-2"><CalendarDays size={18} className="text-teal" /> Muhim sanalar</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted">Ariza muddati</p>
              <p className="text-sm font-medium mt-1">{formatDate(LISTING.apply_deadline)}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Dastur boshlanishi</p>
              <p className="text-sm font-medium mt-1">{formatDate(LISTING.event_date)}</p>
            </div>
          </div>
        </section>

        {/* Premium block — tugma bilan ikkala holatni ko'rsatadi */}
        <section className="fade-up" style={{ animationDelay: "180ms" }}>
          {isPremium ? (
            <div className="surface-card rounded-2xl p-5 sm:p-6 border-amber/40">
              <div className="flex items-center justify-between mb-3">
                <h2 className="camp-display text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-amber" /> Premium tahlil
                </h2>
                <button onClick={() => setIsPremium(false)} className="text-[10px] text-muted underline">demo: yopish</button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full border-4 border-teal flex items-center justify-center camp-mono text-sm font-semibold text-teal">86%</div>
                <p className="text-sm text-muted flex-1">Sizning profilingiz asosida moslik foizi hisoblandi.</p>
              </div>
              <button className="w-full bg-teal text-white rounded-full py-3 text-sm font-medium">
                Motivatsion xat namunasi yaratish
              </button>
            </div>
          ) : (
            <div className="premium-lock rounded-2xl p-5 sm:p-6 border border-amber/30 flex items-center gap-4">
              <Lock size={22} className="text-amber shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Moslik foizi va Motivatsion xat yordamchisi</p>
                <p className="text-xs text-muted mt-1">Bu funksiyalar faqat Premium foydalanuvchilar uchun ochiq.</p>
              </div>
              <button onClick={() => setIsPremium(true)} className="text-xs font-medium text-amber border border-amber/40 rounded-full px-3 py-1.5 whitespace-nowrap">
                Premium olish
              </button>
            </div>
          )}
        </section>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 fade-up" style={{ animationDelay: "220ms" }}>
          <a
            href={LISTING.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-teal text-white rounded-full py-3.5 text-sm font-medium flex items-center justify-center gap-2"
          >
            Ariza topshirish <ExternalLink size={14} />
          </a>
          <button
            onClick={() => setSaved((v) => !v)}
            className="surface-card rounded-full py-3.5 px-6 text-sm font-medium flex items-center justify-center gap-2"
          >
            <Heart size={15} className={saved ? "text-terracotta" : "text-muted"} fill={saved ? "currentColor" : "none"} />
            {saved ? "Saqlangan" : "Saqlash"}
          </button>
        </div>

        {/* Similar listings */}
        <section className="fade-up" style={{ animationDelay: "260ms" }}>
          <h2 className="camp-display text-lg mb-3">O'xshash dasturlar</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SIMILAR.map((s) => {
              const sDays = daysUntil(s.apply_deadline);
              const sTone = urgencyTone(sDays);
              return (
                <div key={s.id} className="ticket-card rounded-2xl overflow-hidden border border-hair flex cursor-pointer">
                  <div className="surface-paper ticket-punch flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <span className="camp-mono text-[10px] tracking-widest uppercase text-muted">{FORMAT_MAP[s.format]}</span>
                      <h3 className="camp-display text-sm leading-snug mt-1.5">{s.title}</h3>
                    </div>
                    <span className={`camp-mono text-xs font-semibold mt-3 ${sTone === "urgent" ? "text-terracotta" : sTone === "soon" ? "text-amber" : "text-teal"}`}>
                      {sDays} kun qoldi
                    </span>
                  </div>
                  <div className="surface-paper ticket-divider w-10 shrink-0 flex items-center justify-center">
                    <ArrowUpRight size={13} className="text-muted" />
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
