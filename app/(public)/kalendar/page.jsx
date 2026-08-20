"use client";

import { useState, useMemo } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Users,
  Bookmark,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  PREVIEW UCHUN MOCK DATA — productionda Supabase 'listings'dan      */
/*  fetchCalendarListings(userId) orqali keladi. Struktura bir xil.    */
/* ------------------------------------------------------------------ */

const TODAY = new Date();
const Y = TODAY.getFullYear();
const M = TODAY.getMonth();
function d(day) { return `${Y}-${String(M + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }

const LISTINGS = [
  { id: "l1", title: "Erasmus+ Youth Exchange", format: "grant", age_min: 18, age_max: 25, apply_deadline: d(Math.min(28, TODAY.getDate() + 3)), isSaved: true },
  { id: "l2", title: "Yozgi IT Camp — Toshkent", format: "camp", age_min: 14, age_max: 17, apply_deadline: d(Math.min(28, TODAY.getDate() + 9)), isSaved: false },
  { id: "l3", title: "Global Volunteer Program", format: "volunteer", age_min: 18, age_max: 25, apply_deadline: d(Math.min(28, TODAY.getDate() + 3)), isSaved: true },
  { id: "l4", title: "Yosh Ilmiy Startaplar Konkursi", format: "contest", age_min: 18, age_max: 25, apply_deadline: d(Math.min(28, TODAY.getDate() + 14)), isSaved: false },
  { id: "l5", title: "DAAD Summer School 2027", format: "grant", age_min: 18, age_max: 25, apply_deadline: d(Math.min(28, TODAY.getDate() + 20)), isSaved: false },
];

const FORMAT_MAP = { camp: "Camp", grant: "Grant", volunteer: "Volontyorlik", contest: "Konkurs", scholarship: "Stipendiya" };
const TINTS = ["a", "b", "c"];

const MONTH_NAMES = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];
const WEEKDAYS = ["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya"];

function ageLabel(min, max) {
  if (min <= 14 && max <= 17) return "14-17";
  if (min <= 18 && max <= 25) return "18-25";
  return "25+";
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function urgencyTone(days) {
  if (days <= 5) return "urgent";
  if (days <= 14) return "soon";
  return "open";
}

function isoDate(y, m, dd) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
}

function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradA5)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradB5)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradA5" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradB5" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function CampKalendarPreview() {
  const [cursor, setCursor] = useState({ y: Y, m: M });
  const [selectedDate, setSelectedDate] = useState(TODAY.toISOString().slice(0, 10));
  const [onlySaved, setOnlySaved] = useState(false);

  const visibleListings = useMemo(() => (onlySaved ? LISTINGS.filter((l) => l.isSaved) : LISTINGS), [onlySaved]);

  const byDate = useMemo(() => {
    const map = {};
    visibleListings.forEach((l) => {
      (map[l.apply_deadline] ||= []).push(l);
    });
    return map;
  }, [visibleListings]);

  const { y, m } = cursor;
  const firstDay = new Date(y, m, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let dd = 1; dd <= daysInMonth; dd++) cells.push(dd);

  const todayIso = TODAY.toISOString().slice(0, 10);
  const selectedListings = byDate[selectedDate] || [];

  function goMonth(delta) {
    let nm = m + delta, ny = y;
    if (nm < 0) { nm = 11; ny -= 1; }
    if (nm > 11) { nm = 0; ny += 1; }
    setCursor({ y: ny, m: nm });
  }

  return (
    <div className="camp-root min-h-screen w-full pb-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

        .camp-root { background: #EEF3EE; color: #1B2420; font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif; }
        .camp-display { font-family: 'Fraunces', Georgia, serif; }
        .camp-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
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
        .band-b { background: linear-gradient(135deg, #E2953F, #C97535); }
        .band-c { background: linear-gradient(135deg, #B85D34, #8A4126); }

        .ticket-punch { position: relative; }
        .ticket-card { transition: transform 220ms ease, box-shadow 220ms ease; }
        .ticket-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px -18px rgba(24,52,44,0.4); }

        .day-cell { aspect-ratio: 1; border-radius: 14px; transition: background-color 160ms ease; position: relative; cursor: pointer; }
        .day-cell:hover { background-color: #F2F7F3; }
        .day-cell.selected { background-color: #2F6D5F; color: #FBF6EA; }
        .day-cell.today:not(.selected) { border: 1.5px solid #2F6D5F; }
        .deadline-dot { position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 999px; }

        .toggle-pill { transition: all 160ms ease; cursor: pointer; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-hair" style={{ background: "rgba(238,243,238,0.9)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-4xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoMark size={22} />
            <span className="camp-display text-base tracking-tight">Camp for You</span>
          </div>
          <button className="relative w-9 h-9 rounded-full surface-card flex items-center justify-center">
            <Bell size={16} className="text-muted" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 pt-5 space-y-6">
        <div className="fade-up flex items-center justify-between">
          <div>
            <p className="text-muted text-xs mb-1">Kalendar</p>
            <h1 className="camp-display text-2xl">Deadline'lar taqvimi</h1>
          </div>
          <button
            onClick={() => setOnlySaved((v) => !v)}
            className={`toggle-pill text-xs font-medium rounded-full px-3.5 py-2 flex items-center gap-1.5 ${
              onlySaved ? "bg-teal text-white" : "surface-card text-muted"
            }`}
          >
            <Bookmark size={13} /> Faqat saqlanganlar
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Calendar grid */}
          <div className="surface-card rounded-2xl p-4 sm:p-6 fade-up" style={{ animationDelay: "60ms" }}>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => goMonth(-1)} className="w-8 h-8 rounded-full surface-card flex items-center justify-center">
                <ChevronLeft size={15} />
              </button>
              <h2 className="camp-display text-lg">{MONTH_NAMES[m]} {y}</h2>
              <button onClick={() => goMonth(1)} className="w-8 h-8 rounded-full surface-card flex items-center justify-center">
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((w) => (
                <div key={w} className="text-center text-[10px] text-muted uppercase tracking-wide py-1">{w}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((dd, i) => {
                if (!dd) return <div key={i} />;
                const dateStr = isoDate(y, m, dd);
                const dayListings = byDate[dateStr] || [];
                const isSelected = dateStr === selectedDate;
                const isToday = dateStr === todayIso;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`day-cell flex items-center justify-center text-sm ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                  >
                    {dd}
                    {dayListings.length > 0 && (
                      <span className="deadline-dot" style={{ background: isSelected ? "#FBF6EA" : "#2F6D5F" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected day listings */}
          <div className="fade-up" style={{ animationDelay: "100ms" }}>
            <p className="text-sm font-medium mb-3">
              {new Date(selectedDate).toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            {selectedListings.length === 0 ? (
              <div className="surface-card rounded-2xl p-6 text-center">
                <p className="text-muted text-sm">Bu kunga deadline'i tushadigan dastur yo'q.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedListings.map((l, i) => {
                  const days = daysUntil(l.apply_deadline);
                  const tone = urgencyTone(days);
                  const tint = TINTS[i % TINTS.length];
                  return (
                    <div key={l.id} className={`ticket-card rounded-2xl overflow-hidden border border-hair block band-${tint} p-0.5 cursor-pointer`}>
                      <div className="surface-paper ticket-punch rounded-[14px] p-3.5">
                        <div className="flex items-center justify-between">
                          <span className="camp-mono text-[10px] tracking-widest uppercase text-muted">{FORMAT_MAP[l.format]}</span>
                          {l.isSaved && <Bookmark size={12} className="text-teal" fill="currentColor" />}
                        </div>
                        <h3 className="camp-display text-sm leading-snug mt-1">{l.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="flex items-center gap-1 text-xs text-muted"><Users size={11} /> {ageLabel(l.age_min, l.age_max)}</span>
                          <span className={`camp-mono text-xs font-semibold ${tone === "urgent" ? "text-terracotta" : tone === "soon" ? "text-amber" : "text-teal"}`}>
                            {days} kun
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
