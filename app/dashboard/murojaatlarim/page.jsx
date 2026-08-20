"use client";

import { useState } from "react";
import { ArrowLeft, Plus, X, MessageSquare, Lightbulb, Bug, HelpCircle, Handshake } from "lucide-react";

function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradA9)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradB9)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradA9" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradB9" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const CATEGORY_META = {
  suggestion: { icon: Lightbulb, label: "Yangi dastur taklifi", tint: "amber" },
  bug: { icon: Bug, label: "Xato haqida xabar", tint: "terracotta" },
  question: { icon: HelpCircle, label: "Umumiy savol", tint: "teal" },
  partnership: { icon: Handshake, label: "Hamkorlik / reklama", tint: "amber" },
};

const STATUS_META = {
  new: { label: "Yangi", tint: "amber" },
  in_review: { label: "Ko'rib chiqilmoqda", tint: "teal" },
  resolved: { label: "Hal qilindi", tint: "teal-solid" },
};

const INITIAL = [
  { id: "m1", category: "suggestion", message: "DAAD Summer School 2027 dasturini qo'shsangiz bo'ladimi? Rasmiy sayti: daad.de/...", status: "resolved", reply: "Rahmat! Dastur qo'shildi va profilingizga mos deb belgilandi. Bonus sifatida 1 oylik Premium taqdim etdik.", time: "5 kun oldin" },
  { id: "m2", category: "bug", message: "\u201cErasmus+ Youth Exchange\u201d elonidagi rasmiy havola ochilmayapti.", status: "in_review", reply: null, time: "2 kun oldin" },
  { id: "m3", category: "question", message: "Premium obunani bekor qilsam, saqlangan dasturlarim o'chib qoladimi?", status: "new", reply: null, time: "6 soat oldin" },
];

export default function CampMurojaatlarim() {
  const [messages, setMessages] = useState(INITIAL);
  const [composerOpen, setComposerOpen] = useState(false);
  const [category, setCategory] = useState("question");
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;
    setMessages((prev) => [
      { id: `m${Date.now()}`, category, message: text.trim(), status: "new", reply: null, time: "hozirgina" },
      ...prev,
    ]);
    setText("");
    setComposerOpen(false);
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
        .field { background: #FFFFFF; border: 1px solid #E1E9E3; transition: border-color 160ms ease, box-shadow 160ms ease; }
        .field:focus-within { border-color: #2F6D5F; box-shadow: 0 0 0 3px rgba(47,109,95,0.12); }

        .fade-up { animation: campFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .chip { font-size: 12px; padding: 6px 12px; border-radius: 999px; border: 1px solid #DCE6DF; background: #FFFFFF; color: #5B6D64; transition: all 160ms ease; white-space: nowrap; display: flex; align-items: center; gap: 5px; }
        .chip-active { background: #2F6D5F; border-color: #2F6D5F; color: #FBF6EA; }

        .status-pill { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px; white-space: nowrap; }
        .status-amber { background: rgba(184,121,43,0.12); color: #B8792B; }
        .status-teal { background: rgba(47,109,95,0.1); color: #2F6D5F; }
        .status-teal-solid { background: #2F6D5F; color: #FBF6EA; }

        .icon-bubble-amber { background: rgba(184,121,43,0.12); color: #B8792B; }
        .icon-bubble-terracotta { background: rgba(184,93,52,0.12); color: #B85D34; }
        .icon-bubble-teal { background: rgba(47,109,95,0.1); color: #2F6D5F; }

        .fab { transition: transform 160ms ease, box-shadow 160ms ease; }
        .fab:hover { transform: translateY(-1px); box-shadow: 0 10px 22px -12px rgba(47,109,95,0.5); }

        .sheet-backdrop { animation: campFadeUp 0.2s ease both; }
        .sheet-panel { animation: campSheetUp 260ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

        .reply-block { border-left: 2px solid #2F6D5F; }
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
            <MessageSquare size={20} className="text-teal" />
            <h1 className="camp-display text-2xl leading-none">Murojaatlarim</h1>
          </div>
          <button onClick={() => setComposerOpen(true)} className="fab bg-teal text-white rounded-full px-4 py-2.5 text-sm font-medium flex items-center gap-1.5">
            <Plus size={15} /> Yangi
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="surface-card rounded-2xl p-10 text-center fade-up">
            <p className="text-muted text-sm">Hali murojaat yubormagansiz.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((m, i) => {
              const cat = CATEGORY_META[m.category];
              const status = STATUS_META[m.status];
              const Icon = cat.icon;
              return (
                <div key={m.id} className="surface-card rounded-2xl p-4 sm:p-5 fade-up" style={{ animationDelay: `${60 + i * 40}ms` }}>
                  <div className="flex items-start gap-3">
                    <span className={`icon-bubble-${cat.tint} w-9 h-9 rounded-full flex items-center justify-center shrink-0`}>
                      <Icon size={15} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs text-muted">{cat.label}</span>
                        <span className={`status-pill status-${status.tint}`}>{status.label}</span>
                      </div>
                      <p className="text-sm mt-1.5 leading-relaxed">{m.message}</p>
                      <p className="text-xs text-muted/70 mt-1.5">{m.time}</p>
                      {m.reply && (
                        <div className="reply-block pl-3 mt-3">
                          <p className="text-xs font-medium text-teal mb-1">Admin javobi</p>
                          <p className="text-sm text-[#3A4640] leading-relaxed">{m.reply}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* New request bottom sheet */}
      {composerOpen && (
        <div className="fixed inset-0 z-40">
          <div className="sheet-backdrop absolute inset-0 bg-black/30" onClick={() => setComposerOpen(false)} />
          <div className="sheet-panel absolute bottom-0 left-0 right-0 bg-[#EEF3EE] rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="camp-display text-lg">Yangi murojaat</h2>
              <button onClick={() => setComposerOpen(false)} className="w-8 h-8 rounded-full surface-card flex items-center justify-center">
                <X size={14} />
              </button>
            </div>

            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Turi</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(CATEGORY_META).map(([key, meta]) => {
                const Icon = meta.icon;
                return (
                  <button key={key} onClick={() => setCategory(key)} className={`chip ${category === key ? "chip-active" : ""}`}>
                    <Icon size={12} /> {meta.label}
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Xabar</p>
            <div className="field rounded-xl p-3.5">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="Fikringizni yozing..."
                className="w-full text-sm outline-none bg-transparent resize-none"
              />
            </div>

            <button
              onClick={submit}
              disabled={!text.trim()}
              className="w-full bg-teal text-white rounded-full py-3 text-sm font-medium mt-5 disabled:opacity-40"
            >
              Yuborish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
