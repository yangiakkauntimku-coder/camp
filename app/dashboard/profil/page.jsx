"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Sparkles,
  Check,
  ChevronDown,
} from "lucide-react";

function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradA7)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradB7)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradA7" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradB7" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const REGIONS = ["Toshkent", "Samarqand", "Buxoro", "Farg'ona", "Andijon", "Namangan", "Boshqa"];
const LANG_LEVELS = ["Boshlang'ich", "O'rta", "Yuqori", "Ona tili darajasida"];
const ALL_INTERESTS = ["STEM", "Ijtimoiy-gumanitar", "San'at", "Sport", "Ekologiya", "Startap", "Til o'rganish", "Ko'ngillilik"];

function fieldsFilled(p) {
  let n = 0;
  if (p.fullName) n++;
  if (p.age) n++;
  if (p.region) n++;
  if (p.interests.length > 0) n++;
  if (p.languageLevel) n++;
  return n;
}

export default function CampProfil() {
  const [profile, setProfile] = useState({
    fullName: "Madina Yusupova",
    age: "20",
    region: "Toshkent",
    interests: ["STEM", "Til o'rganish"],
    languageLevel: "O'rta",
  });
  const [saved, setSaved] = useState(false);

  const completion = Math.round((fieldsFilled(profile) / 5) * 100);

  function update(key, value) {
    setSaved(false);
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function toggleInterest(tag) {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      interests: p.interests.includes(tag) ? p.interests.filter((t) => t !== tag) : [...p.interests, tag],
    }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
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
        .bg-teal { background: #2F6D5F; }
        .border-hair { border-color: #DCE6DF; }

        .surface-card { background: #FFFFFF; border: 1px solid #E1E9E3; }
        .field { background: #FFFFFF; border: 1px solid #E1E9E3; transition: border-color 160ms ease, box-shadow 160ms ease; }
        .field:focus-within { border-color: #2F6D5F; box-shadow: 0 0 0 3px rgba(47,109,95,0.12); }

        .fade-up { animation: campFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .ring-progress { transition: stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1); }

        .chip { font-size: 12.5px; padding: 7px 13px; border-radius: 999px; border: 1px solid #DCE6DF; background: #FFFFFF; color: #5B6D64; transition: all 160ms ease; }
        .chip:hover { border-color: #B7CFC3; }
        .chip-active { background: #2F6D5F; border-color: #2F6D5F; color: #FBF6EA; }

        .save-btn { transition: transform 160ms ease, box-shadow 160ms ease, background-color 200ms ease; }
        .save-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 22px -12px rgba(47,109,95,0.5); }

        .toast { animation: campToast 260ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campToast { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .avatar-ring { background: conic-gradient(#2F6D5F 0deg, #2F6D5F var(--pct), #E1E9E3 var(--pct)); }
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

      <main className="max-w-2xl mx-auto px-5 pt-7 space-y-6">
        <div className="fade-up flex items-center gap-5">
          <div
            className="avatar-ring w-20 h-20 rounded-full p-1 shrink-0"
            style={{ "--pct": `${completion * 3.6}deg` }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative">
              <span className="camp-display text-2xl text-teal">{profile.fullName.charAt(0) || "?"}</span>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-teal text-white flex items-center justify-center border-2 border-[#EEF3EE]">
                <Camera size={12} />
              </button>
            </div>
          </div>
          <div>
            <h1 className="camp-display text-2xl">Profil</h1>
            <p className="text-muted text-sm mt-0.5">Profilingiz {completion}% to'ldirilgan</p>
          </div>
        </div>

        <div className="surface-card rounded-2xl p-5 sm:p-6 space-y-5 fade-up" style={{ animationDelay: "60ms" }}>
          <div>
            <label className="text-xs font-medium text-muted uppercase tracking-wide">To'liq ism</label>
            <div className="field rounded-xl mt-1.5 px-3.5 py-3">
              <input
                value={profile.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="w-full text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wide">Yosh</label>
              <div className="field rounded-xl mt-1.5 px-3.5 py-3">
                <input
                  value={profile.age}
                  onChange={(e) => update("age", e.target.value.replace(/\D/g, ""))}
                  inputMode="numeric"
                  className="w-full text-sm outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wide">Viloyat</label>
              <div className="field rounded-xl mt-1.5 px-3.5 py-3 relative">
                <select
                  value={profile.region}
                  onChange={(e) => update("region", e.target.value)}
                  className="w-full text-sm outline-none bg-transparent appearance-none pr-5"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted uppercase tracking-wide">Til darajasi (ingliz tili)</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {LANG_LEVELS.map((lvl) => (
                <button key={lvl} onClick={() => update("languageLevel", lvl)} className={`chip ${profile.languageLevel === lvl ? "chip-active" : ""}`}>
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted uppercase tracking-wide">Qiziqishlar</label>
            <p className="text-xs text-muted mt-1 mb-2">Moslik foizi shular asosida hisoblanadi</p>
            <div className="flex flex-wrap gap-2">
              {ALL_INTERESTS.map((tag) => (
                <button key={tag} onClick={() => toggleInterest(tag)} className={`chip ${profile.interests.includes(tag) ? "chip-active" : ""}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Premium status */}
        <div className="surface-card rounded-2xl p-5 flex items-center gap-4 fade-up" style={{ animationDelay: "100ms" }}>
          <span className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center shrink-0">
            <Sparkles size={17} className="text-amber" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium">Siz hozircha Free tarifdasiz</p>
            <p className="text-xs text-muted mt-0.5">Moslik foizi, motivatsion xat yordamchisi va boshqa imkoniyatlar uchun Premium'ga o'ting</p>
          </div>
          <button className="text-xs font-medium text-amber border border-amber/40 rounded-full px-3.5 py-2 whitespace-nowrap">
            Premium
          </button>
        </div>

        <div className="fade-up flex items-center gap-3" style={{ animationDelay: "140ms" }}>
          <button onClick={handleSave} className="save-btn bg-teal text-white rounded-full px-6 py-3 text-sm font-medium">
            Saqlash
          </button>
          {saved && (
            <span className="toast flex items-center gap-1.5 text-sm text-teal">
              <Check size={15} /> Saqlandi
            </span>
          )}
        </div>
      </main>
    </div>
  );
}
