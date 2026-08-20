"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/* ------------------------------------------------------------------ */
/*  Umumiy forma — /kirish va /royxatdan-otish sahifalari shu bir      */
/*  komponentni import qiladi, faqat `mode` prop orqali farqlanadi.    */
/* ------------------------------------------------------------------ */

function LogoMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradAF)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradBF)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradAF" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradBF" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AuthScene() {
  const stars = Array.from({ length: 18 }, (_, i) => ({
    x: 10 + ((i * 41) % 380), y: 10 + ((i * 53) % 420), r: 1 + (i % 3) * 0.5, delay: (i % 8) * 0.4,
  }));
  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg viewBox="0 0 400 600" className="w-full h-full block" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="authSkyF" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2321" /><stop offset="55%" stopColor="#1B463F" /><stop offset="100%" stopColor="#2C6156" />
          </linearGradient>
          <radialGradient id="authMoonGlowF" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBF6EA" stopOpacity="0.55" /><stop offset="100%" stopColor="#FBF6EA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="authFireGlowF" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2A93B" stopOpacity="0.55" /><stop offset="100%" stopColor="#F2A93B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="authFlameF" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#E2652F" /><stop offset="100%" stopColor="#F6C55B" />
          </linearGradient>
        </defs>
        <rect width="400" height="600" fill="url(#authSkyF)" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FBF6EA" className="star" style={{ animationDelay: `${s.delay}s` }} />
        ))}
        <circle cx="290" cy="120" r="60" fill="url(#authMoonGlowF)" className="moon-pulse" />
        <circle cx="290" cy="120" r="30" fill="#FBF6EA" opacity="0.95" />
        <polygon points="0,380 70,300 140,370 220,290 300,375 400,310 400,600 0,600" fill="#356A61" opacity="0.55" />
        <polygon points="0,420 90,350 190,415 280,340 400,410 400,600 0,600" fill="#234B44" />
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 10 + i * 46;
          const h = 34 + ((i * 17) % 30);
          const y = 428 - h * 0.15;
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <polygon points={`10,0 0,${h} 20,${h}`} fill="#193C36" />
              <polygon points={`10,10 2,${h + 10} 18,${h + 10}`} fill="#153630" />
            </g>
          );
        })}
        <rect x="0" y="440" width="400" height="160" fill="#153630" />
        <circle cx="120" cy="470" r="46" fill="url(#authFireGlowF)" className="fire-glow" />
        <g transform="translate(100 452)">
          <ellipse cx="20" cy="22" rx="17" ry="5" fill="#1B1A17" opacity="0.35" />
          <rect x="4" y="15" width="30" height="4.5" rx="2" fill="#5C3A26" transform="rotate(-8 20 17)" />
          <path d="M20 -5c4 5 7 9 7 13a7 7 0 1 1-14 0c0-4 3-8 7-13z" fill="url(#authFlameF)" className="flame flame-1" />
          <path d="M16 2c2 3 4 5 4 8a4 4 0 1 1-8 0c0-3 2-5 4-8z" fill="#F6C55B" className="flame flame-2" />
        </g>
        <g className="tent-in" transform="translate(220 388)">
          <ellipse cx="26" cy="56" rx="32" ry="6" fill="#102A25" opacity="0.4" />
          <path d="M26 0c11 18 21 37 26 52H0c5-15 15-34 26-52z" fill="url(#authTentAF)" />
          <path d="M26 0c-11 18-21 37-26 52h26z" fill="url(#authTentBF)" />
          <path d="M15 52l11-19 11 19z" fill="#2B1710" opacity="0.85" />
          <defs>
            <linearGradient id="authTentAF" x1="26" y1="0" x2="52" y2="52"><stop stopColor="#F3B65D" /><stop offset="1" stopColor="#DD8D3B" /></linearGradient>
            <linearGradient id="authTentBF" x1="26" y1="0" x2="0" y2="52"><stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" /></linearGradient>
          </defs>
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="flex items-center gap-2.5">
          <LogoMark size={28} />
          <span className="camp-display text-lg text-cream tracking-tight">Camp for You</span>
        </div>
        <div>
          <h2 className="camp-display text-2xl sm:text-3xl text-cream leading-snug max-w-xs" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Imkoniyatlar sizni kutmoqda
          </h2>
          <p className="text-cream text-sm mt-2 max-w-xs opacity-90" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
            12,000+ yoshlar allaqachon o'zlariga mos grant, camp va dasturlarni topishdi.
          </p>
        </div>
      </div>
    </div>
  );
}

// mode: "login" | "signup"
export default function AuthForm({ mode }) {
  const router = useRouter();
  const supabase = createClient();

  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signupDone, setSignupDone] = useState(false);
  const isLogin = mode === "login";

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Email va parolni to'ldiring.");
      return;
    }

    if (isLogin) {
      setLoading(true);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      if (signInError) {
        setError(
          signInError.message === "Invalid login credentials"
            ? "Email yoki parol noto'g'ri."
            : signInError.message
        );
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } else {
      if (!form.name.trim()) {
        setError("Ismingizni kiriting.");
        return;
      }
      if (form.password !== form.confirm) {
        setError("Parollar bir xil emas.");
        return;
      }
      if (form.password.length < 6) {
        setError("Parol kamida 6 belgidan iborat bo'lishi kerak.");
        return;
      }

      setLoading(true);
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name.trim() } },
      });
      setLoading(false);
      if (signUpError) {
        setError(
          signUpError.message === "User already registered"
            ? "Bu email bilan hisob allaqachon mavjud."
            : signUpError.message
        );
        return;
      }

      if (data.session) {
        // Email tasdiqlash o'chirilgan loyihalarda sessiya darhol beriladi
        router.push("/dashboard");
        router.refresh();
      } else {
        // Standart holat: emailga tasdiqlash havolasi yuborildi
        setSignupDone(true);
      }
    }
  }

  return (
    <div className="camp-root min-h-screen w-full">
      <style>{`
        .camp-root { background: #EEF3EE; color: #1B2420; font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif; }
        .camp-display { font-family: 'Fraunces', Georgia, serif; }
        .text-cream { color: #FBF6EA; } .text-muted { color: #5B6D64; } .text-teal { color: #2F6D5F; } .text-terracotta { color: #B85D34; }
        .bg-teal { background: #2F6D5F; } .border-hair { border-color: #DCE6DF; }
        .star { animation: campTwinkle 3.6s ease-in-out infinite; }
        @keyframes campTwinkle { 0%,100% { opacity: 0.15; } 50% { opacity: 1; } }
        .moon-pulse { animation: campMoonPulse 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes campMoonPulse { 0%,100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
        .fire-glow { animation: campFireGlow 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes campFireGlow { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 0.95; transform: scale(1.12); } }
        .flame { transform-box: fill-box; transform-origin: bottom center; animation: campFlicker 0.9s ease-in-out infinite; }
        .flame-2 { animation-duration: 0.7s; animation-delay: 0.15s; }
        @keyframes campFlicker { 0%,100% { transform: scaleY(1) skewX(0deg); } 30% { transform: scaleY(1.08) skewX(-3deg); } 60% { transform: scaleY(0.94) skewX(3deg); } }
        .tent-in { animation: campTentIn 900ms cubic-bezier(0.22,1,0.36,1) both; animation-delay: 200ms; transform-box: fill-box; transform-origin: bottom center; }
        @keyframes campTentIn { from { opacity: 0; transform: translateY(14px) scale(0.92); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (prefers-reduced-motion: reduce) { .star, .moon-pulse, .fire-glow, .flame, .tent-in { animation: none !important; } }
        .fade-up { animation: campFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .field { background: #FFFFFF; border: 1px solid #E1E9E3; transition: border-color 160ms ease, box-shadow 160ms ease; }
        .field:focus-within { border-color: #2F6D5F; box-shadow: 0 0 0 3px rgba(47,109,95,0.12); }
        .submit-btn { transition: transform 160ms ease, box-shadow 160ms ease; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 22px -12px rgba(47,109,95,0.5); }
        .submit-btn:active { transform: translateY(0); }
      `}</style>

      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:block"><AuthScene /></div>
        <div className="lg:hidden h-52 relative"><AuthScene /></div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm fade-up">
            <div className="lg:hidden flex items-center gap-2 mb-6 -mt-2">
              <LogoMark size={22} />
              <span className="camp-display text-base tracking-tight">Camp for You</span>
            </div>

            <h1 className="camp-display text-2xl mb-1">{isLogin ? "Xush kelibsiz" : "Sayohatni boshlang"}</h1>
            <p className="text-muted text-sm mb-6">
              {isLogin ? "Hisobingizga kiring va imkoniyatlaringizni davom ettiring." : "Bir necha soniyada ro'yxatdan o'ting."}
            </p>

            {signupDone ? (
              <div className="field rounded-xl p-4 flex items-start gap-3" style={{ borderColor: "#2F6D5F" }}>
                <CheckCircle2 size={18} className="text-teal shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Deyarli tayyor!</p>
                  <p className="text-xs text-muted mt-1">
                    <span className="font-medium">{form.email}</span> manzilingizga tasdiqlash havolasi yuborildi. Emailingizni tekshiring va havolani bosing.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="rounded-xl p-3 mb-3.5 flex items-start gap-2" style={{ background: "rgba(184,93,52,0.08)" }}>
                    <AlertCircle size={15} className="text-terracotta shrink-0 mt-0.5" />
                    <p className="text-xs text-terracotta">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {!isLogin && (
                    <div className="field rounded-xl flex items-center gap-2.5 px-3.5 py-3">
                      <User size={16} className="text-muted shrink-0" />
                      <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="To'liq ismingiz" className="flex-1 min-w-0 text-sm outline-none bg-transparent" />
                    </div>
                  )}
                  <div className="field rounded-xl flex items-center gap-2.5 px-3.5 py-3">
                    <Mail size={16} className="text-muted shrink-0" />
                    <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" placeholder="Email manzilingiz" className="flex-1 min-w-0 text-sm outline-none bg-transparent" />
                  </div>
                  <div className="field rounded-xl flex items-center gap-2.5 px-3.5 py-3">
                    <Lock size={16} className="text-muted shrink-0" />
                    <input value={form.password} onChange={(e) => update("password", e.target.value)} type={showPass ? "text" : "password"} placeholder="Parol" className="flex-1 min-w-0 text-sm outline-none bg-transparent" />
                    <button type="button" onClick={() => setShowPass((v) => !v)} className="text-muted shrink-0">{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                  </div>
                  {!isLogin && (
                    <div className="field rounded-xl flex items-center gap-2.5 px-3.5 py-3">
                      <Lock size={16} className="text-muted shrink-0" />
                      <input value={form.confirm} onChange={(e) => update("confirm", e.target.value)} type={showPass ? "text" : "password"} placeholder="Parolni tasdiqlang" className="flex-1 min-w-0 text-sm outline-none bg-transparent" />
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex justify-end">
                      <button type="button" className="text-xs text-teal font-medium">Parolni unutdingizmi?</button>
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="submit-btn w-full bg-teal text-white rounded-full py-3.5 text-sm font-medium flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
                    {loading ? "Iltimos kuting..." : isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
                    {!loading && <ArrowRight size={15} />}
                  </button>
                </form>
              </>
            )}

            <p className="text-xs text-muted text-center mt-6">
              {isLogin ? (
                <>Hisobingiz yo'qmi? <a href="/royxatdan-otish" className="text-teal font-medium">Ro'yxatdan o'ting</a></>
              ) : (
                <>Hisobingiz bormi? <a href="/kirish" className="text-teal font-medium">Kiring</a></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
