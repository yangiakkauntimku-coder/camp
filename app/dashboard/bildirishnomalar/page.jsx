"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Bell, Clock, Sparkles, Info, CheckCheck } from "lucide-react";

function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradA8)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradB8)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradA8" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradB8" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const TYPE_META = {
  deadline: { icon: Clock, tint: "terracotta", label: "Deadline" },
  match: { icon: Sparkles, tint: "amber", label: "Moslik" },
  system: { icon: Info, tint: "teal", label: "Tizim" },
};

const NOTIFICATIONS = [
  { id: "n1", type: "match", unread: true, title: "Sizga mos 3 ta yangi grant qo'shildi", detail: "STEM yo'nalishi bo'yicha, profilingizdagi qiziqishlarga mos", time: "2 soat oldin", day: "Bugun" },
  { id: "n2", type: "deadline", unread: true, title: "\u201cErasmus+ Youth Exchange\u201d muddati 3 kundan keyin tugaydi", detail: "Saqlanganlar ro'yxatidan \u2014 hozir ariza topshiring", time: "5 soat oldin", day: "Bugun" },
  { id: "n3", type: "system", unread: true, title: "Kalendar bo'limi endi barcha deadline'larni ko'rsatadi", detail: "Yangi funksiya qo'shildi", time: "Kecha, 18:40", day: "Kecha" },
  { id: "n4", type: "deadline", unread: false, title: "\u201cYozgi IT Camp \u2014 Toshkent\u201d muddati 9 kundan keyin tugaydi", detail: "Saqlanganlar ro'yxatidan", time: "Kecha, 09:12", day: "Kecha" },
  { id: "n5", type: "match", unread: false, title: "\u201cDAAD Summer School 2027\u201d elon qilindi", detail: "Xalqaro, to'liq grant \u2014 sizning yo'nalishingizga mos", time: "2 kun oldin", day: "Bu hafta" },
  { id: "n6", type: "system", unread: false, title: "Murojaatingiz ko'rib chiqildi", detail: "Support jamoasidan javob keldi", time: "3 kun oldin", day: "Bu hafta" },
  { id: "n7", type: "system", unread: false, title: "Profilingizni to'ldiring", detail: "Moslik foizi aniqroq hisoblanishi uchun", time: "5 kun oldin", day: "Bu hafta" },
];

const FILTERS = [
  { id: "all", label: "Barchasi" },
  { id: "deadline", label: "Deadline" },
  { id: "match", label: "Moslik" },
  { id: "system", label: "Tizim" },
];

export default function CampBildirishnomalar() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => (filter === "all" ? items : items.filter((n) => n.type === filter)), [items, filter]);
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((n) => (map[n.day] ||= []).push(n));
    return map;
  }, [filtered]);
  const unreadCount = items.filter((n) => n.unread).length;

  function markRead(id) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }
  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
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

        .surface-card { background: #FFFFFF; border: 1px solid #E1E9E3; }
        .fade-up { animation: campFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .chip { font-size: 12.5px; padding: 6px 13px; border-radius: 999px; border: 1px solid #DCE6DF; background: #FFFFFF; color: #5B6D64; transition: all 160ms ease; white-space: nowrap; }
        .chip:hover { border-color: #B7CFC3; }
        .chip-active { background: #2F6D5F; border-color: #2F6D5F; color: #FBF6EA; }

        .notif-row { transition: background-color 180ms ease, opacity 300ms ease; }
        .notif-row:hover { background-color: #F7FBF8; }
        .notif-row.read-anim { opacity: 0.55; }

        .unread-dot { animation: campPulse 2.2s ease-out infinite; }
        @keyframes campPulse { 0% { box-shadow: 0 0 0 0 rgba(47,109,95,0.32); } 70% { box-shadow: 0 0 0 7px rgba(47,109,95,0); } 100% { box-shadow: 0 0 0 0 rgba(47,109,95,0); } }

        .icon-bubble-teal { background: rgba(47,109,95,0.1); color: #2F6D5F; }
        .icon-bubble-amber { background: rgba(184,121,43,0.12); color: #B8792B; }
        .icon-bubble-terracotta { background: rgba(184,93,52,0.12); color: #B85D34; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-hair" style={{ background: "rgba(238,243,238,0.9)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-2xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted">
            <ArrowLeft size={16} /> Kabinet
          </span>
          <div className="flex items-center gap-2">
            <LogoMark size={20} />
            <span className="camp-display text-sm tracking-tight">Camp for You</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 pt-7 space-y-5">
        <div className="fade-up flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell size={20} className="text-teal" />
            <div>
              <h1 className="camp-display text-2xl leading-none">Bildirishnomalar</h1>
              {unreadCount > 0 && <p className="text-muted text-xs mt-1">{unreadCount} ta o'qilmagan</p>}
            </div>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs text-teal font-medium">
              <CheckCheck size={14} /> Hammasini o'qilgan deb belgilash
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 fade-up" style={{ animationDelay: "60ms" }}>
          {FILTERS.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`chip ${filter === f.id ? "chip-active" : ""}`}>
              {f.label}
            </button>
          ))}
        </div>

        {Object.keys(grouped).length === 0 ? (
          <div className="surface-card rounded-2xl p-10 text-center fade-up">
            <p className="text-muted text-sm">Bu turdagi bildirishnomalar yo'q.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([day, list], gi) => (
            <div key={day} className="fade-up" style={{ animationDelay: `${100 + gi * 40}ms` }}>
              <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2 px-1">{day}</p>
              <div className="surface-card rounded-2xl divide-y divide-[#EEF1EC] overflow-hidden">
                {list.map((n) => {
                  const meta = TYPE_META[n.type];
                  const Icon = meta.icon;
                  return (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`notif-row w-full text-left px-4 py-4 flex items-start gap-3 ${!n.unread ? "" : ""}`}
                    >
                      <span className={`icon-bubble-${meta.tint} w-9 h-9 rounded-full flex items-center justify-center shrink-0`}>
                        <Icon size={15} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-start justify-between gap-2">
                          <span className="block text-sm leading-snug font-medium">{n.title}</span>
                          {n.unread && <span className="unread-dot mt-1.5 w-2 h-2 rounded-full bg-teal shrink-0" />}
                        </span>
                        <span className="block text-xs text-muted mt-1">{n.detail}</span>
                        <span className="block text-xs text-muted/70 mt-1">{n.time}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
