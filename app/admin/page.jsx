"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Users,
  MessageSquare,
  Newspaper,
  Sparkles,
  Menu,
  X,
  Plus,
  Pencil,
  Trash2,
  TrendingUp,
  Bookmark,
  Send,
} from "lucide-react";

function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8c5 6 10 12 13 18h-26c3-6 8-12 13-18z" fill="url(#tentGradAd)" />
      <path d="M24 8c-5 6-10 12-13 18h13z" fill="url(#tentGradBd)" />
      <path d="M12 36c3-1.4 6-1.4 9 0 3-1.4 6-1.4 9 0v3c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0z" fill="#FBF6EA" />
      <defs>
        <linearGradient id="tentGradAd" x1="24" y1="8" x2="37" y2="26">
          <stop stopColor="#F3B65D" /><stop offset="1" stopColor="#E2953F" />
        </linearGradient>
        <linearGradient id="tentGradBd" x1="24" y1="8" x2="11" y2="26">
          <stop stopColor="#E2953F" /><stop offset="1" stopColor="#C97535" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: "stats", label: "Statistika", icon: LayoutDashboard },
  { id: "listings", label: "Elonlar", icon: FileText },
  { id: "categories", label: "Kategoriyalar", icon: Tags },
  { id: "users", label: "Foydalanuvchilar", icon: Users },
  { id: "requests", label: "Murojaatlar", icon: MessageSquare },
  { id: "news", label: "Yangiliklar", icon: Newspaper },
  { id: "premium", label: "Premium", icon: Sparkles },
];

const FORMAT_LABEL = { camp: "Camp", grant: "Grant", volunteer: "Volontyorlik", contest: "Konkurs", scholarship: "Stipendiya" };
const STATUS_LABEL = { open: "Ochiq", closing_soon: "Yaqinlashmoqda", closed: "Yopilgan" };

const INITIAL_LISTINGS = [
  { id: "l1", title: "Erasmus+ Youth Exchange", format: "grant", deadline: "2026-08-22", status: "closing_soon", views: 1240 },
  { id: "l2", title: "Yozgi IT Camp \u2014 Toshkent", format: "camp", deadline: "2026-08-28", status: "open", views: 860 },
  { id: "l3", title: "Global Volunteer Program", format: "volunteer", deadline: "2026-09-09", status: "open", views: 430 },
  { id: "l4", title: "DAAD Summer School 2027", format: "grant", deadline: "2026-09-18", status: "open", views: 1520 },
  { id: "l5", title: "Yosh Ilmiy Startaplar Konkursi", format: "contest", deadline: "2026-10-03", status: "open", views: 210 },
];

const INITIAL_USERS = [
  { id: "u1", name: "Madina Yusupova", email: "madina@example.com", role: "user", premium: true },
  { id: "u2", name: "Sardor Aliyev", email: "sardor@example.com", role: "moderator", premium: false },
  { id: "u3", name: "Dilnoza Karimova", email: "dilnoza@example.com", role: "user", premium: false },
  { id: "u4", name: "Javlon Tursunov", email: "javlon@example.com", role: "admin", premium: true },
];

const INITIAL_REQUESTS = [
  { id: "r1", from: "Madina Yusupova", category: "Yangi dastur taklifi", message: "DAAD Summer School 2027 dasturini qo'shsangiz bo'ladimi?", status: "new" },
  { id: "r2", from: "Sardor Aliyev", category: "Xato haqida xabar", message: "Erasmus+ elonidagi rasmiy havola ochilmayapti.", status: "in_review" },
  { id: "r3", from: "Dilnoza Karimova", category: "Umumiy savol", message: "Premium obunani bekor qilsam, saqlangan dasturlarim o'chib qoladimi?", status: "resolved" },
];

const INITIAL_NEWS = [
  { id: "n1", title: "Kalendar bo'limi endi barcha deadline'larni ko'rsatadi", date: "2026-08-18" },
  { id: "n2", title: "Premium foydalanuvchilar uchun Motivatsion xat yordamchisi qo'shildi", date: "2026-08-10" },
];

const SUBSCRIBERS = [
  { id: "s1", name: "Madina Yusupova", plan: "Yillik", status: "active", expires: "2027-03-12" },
  { id: "s2", name: "Javlon Tursunov", plan: "Oylik", status: "active", expires: "2026-09-05" },
  { id: "s3", name: "Nodira Rashidova", plan: "Oylik", status: "expired", expires: "2026-08-01" },
];

const TOP_CATEGORIES = [
  { label: "STEM", pct: 82 },
  { label: "Xalqaro grantlar", pct: 68 },
  { label: "Ijtimoiy-gumanitar", pct: 51 },
  { label: "Volontyorlik", pct: 40 },
];

/* ------------------------------------------------------------------ */

function StatusPill({ children, tint = "teal" }) {
  return <span className={`status-pill status-${tint}`}>{children}</span>;
}

function StatsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 fade-up">
        {[
          { label: "Jami elonlar", value: "487", icon: FileText, tint: "teal" },
          { label: "Faol foydalanuvchilar", value: "12,340", icon: Users, tint: "amber" },
          { label: "Premium obunachilar", value: "612", icon: Sparkles, tint: "terracotta" },
          { label: "Bu oy qo'shilgan", value: "34", icon: TrendingUp, tint: "teal" },
        ].map((s) => (
          <div key={s.label} className="surface-card rounded-2xl p-4">
            <span className={`icon-bubble-${s.tint} w-9 h-9 rounded-full flex items-center justify-center mb-2.5`}>
              <s.icon size={15} />
            </span>
            <p className="camp-mono text-xl leading-none">{s.value}</p>
            <p className="text-muted text-xs mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 fade-up" style={{ animationDelay: "60ms" }}>
          <h3 className="camp-display text-lg mb-4">Eng ko'p qidirilgan kategoriyalar</h3>
          <div className="space-y-3.5">
            {TOP_CATEGORIES.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{c.label}</span>
                  <span className="text-muted">{c.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#EEF1EC] overflow-hidden">
                  <div className="h-full bg-teal rounded-full bar-fill" style={{ "--w": `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card rounded-2xl p-5 fade-up" style={{ animationDelay: "100ms" }}>
          <h3 className="camp-display text-lg mb-4">Eng ko'p bosilgan elonlar</h3>
          <div className="space-y-1">
            {[...INITIAL_LISTINGS].sort((a, b) => b.views - a.views).map((l, i) => (
              <div key={l.id} className="flex items-center justify-between py-2.5 border-b border-hair last:border-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="camp-mono text-xs text-muted w-4 shrink-0">{i + 1}</span>
                  <span className="text-sm truncate">{l.title}</span>
                </div>
                <span className="camp-mono text-xs text-muted shrink-0">{l.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingsView() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", format: "grant", deadline: "" });

  function addListing() {
    if (!draft.title.trim()) return;
    setListings((prev) => [
      { id: `l${Date.now()}`, title: draft.title, format: draft.format, deadline: draft.deadline || "2026-12-31", status: "open", views: 0 },
      ...prev,
    ]);
    setDraft({ title: "", format: "grant", deadline: "" });
    setModalOpen(false);
  }
  function remove(id) {
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between fade-up">
        <p className="text-muted text-sm">{listings.length} ta elon</p>
        <button onClick={() => setModalOpen(true)} className="fab bg-teal text-white rounded-full px-4 py-2.5 text-sm font-medium flex items-center gap-1.5">
          <Plus size={15} /> Yangi elon
        </button>
      </div>

      <div className="surface-card rounded-2xl overflow-hidden fade-up" style={{ animationDelay: "60ms" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hair text-left text-xs text-muted uppercase tracking-wide">
                <th className="px-4 py-3 font-medium">Nomi</th>
                <th className="px-4 py-3 font-medium">Format</th>
                <th className="px-4 py-3 font-medium">Deadline</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id} className="border-b border-hair last:border-0 admin-row">
                  <td className="px-4 py-3">{l.title}</td>
                  <td className="px-4 py-3 text-muted">{FORMAT_LABEL[l.format]}</td>
                  <td className="px-4 py-3 camp-mono text-xs text-muted">{l.deadline}</td>
                  <td className="px-4 py-3">
                    <StatusPill tint={l.status === "open" ? "teal" : l.status === "closing_soon" ? "amber" : "terracotta"}>
                      {STATUS_LABEL[l.status]}
                    </StatusPill>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="w-7 h-7 rounded-full hover:bg-[#EEF1EC] flex items-center justify-center text-muted">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => remove(l.id)} className="w-7 h-7 rounded-full hover:bg-[#EEF1EC] flex items-center justify-center text-terracotta">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-5">
          <div className="sheet-backdrop absolute inset-0 bg-black/30" onClick={() => setModalOpen(false)} />
          <div className="sheet-panel-center surface-card rounded-2xl p-5 w-full max-w-sm relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="camp-display text-lg">Yangi elon</h3>
              <button onClick={() => setModalOpen(false)} className="w-7 h-7 rounded-full hover:bg-[#EEF1EC] flex items-center justify-center">
                <X size={14} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="field rounded-xl px-3.5 py-2.5">
                <input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} placeholder="Elon nomi" className="w-full text-sm outline-none bg-transparent" />
              </div>
              <div className="field rounded-xl px-3.5 py-2.5">
                <select value={draft.format} onChange={(e) => setDraft((d) => ({ ...d, format: e.target.value }))} className="w-full text-sm outline-none bg-transparent">
                  {Object.entries(FORMAT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div className="field rounded-xl px-3.5 py-2.5">
                <input type="date" value={draft.deadline} onChange={(e) => setDraft((d) => ({ ...d, deadline: e.target.value }))} className="w-full text-sm outline-none bg-transparent" />
              </div>
            </div>
            <button onClick={addListing} className="w-full bg-teal text-white rounded-full py-2.5 text-sm font-medium mt-4">Qo'shish</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoriesView() {
  const [groups, setGroups] = useState({
    Format: ["Camp", "Grant", "Volontyorlik", "Konkurs", "Stipendiya"],
    "Yosh toifasi": ["14-17", "18-25", "25+", "Cheklovsiz"],
    "To'lov turi": ["To'liq grant", "Qisman moliyalashtirish", "Pullik", "Bepul"],
  });
  const [newTag, setNewTag] = useState({});

  function addTag(group) {
    const val = (newTag[group] || "").trim();
    if (!val) return;
    setGroups((g) => ({ ...g, [group]: [...g[group], val] }));
    setNewTag((n) => ({ ...n, [group]: "" }));
  }
  function removeTag(group, tag) {
    setGroups((g) => ({ ...g, [group]: g[group].filter((t) => t !== tag) }));
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {Object.entries(groups).map(([group, tags], i) => (
        <div key={group} className="surface-card rounded-2xl p-5 fade-up" style={{ animationDelay: `${i * 40}ms` }}>
          <h3 className="camp-display text-base mb-3">{group}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((t) => (
              <span key={t} className="chip flex items-center gap-1.5">
                {t}
                <button onClick={() => removeTag(group, t)} className="text-muted hover:text-terracotta"><X size={11} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="field rounded-full px-3.5 py-2 flex-1">
              <input
                value={newTag[group] || ""}
                onChange={(e) => setNewTag((n) => ({ ...n, [group]: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && addTag(group)}
                placeholder="Yangi qiymat..."
                className="w-full text-xs outline-none bg-transparent"
              />
            </div>
            <button onClick={() => addTag(group)} className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center shrink-0">
              <Plus size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersView() {
  const [users, setUsers] = useState(INITIAL_USERS);

  function setRole(id, role) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }
  function togglePremium(id) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, premium: !u.premium } : u)));
  }

  return (
    <div className="surface-card rounded-2xl overflow-hidden fade-up">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-hair text-left text-xs text-muted uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Ism</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium">Premium</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-hair last:border-0 admin-row">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 text-muted">{u.email}</td>
                <td className="px-4 py-3">
                  <select value={u.role} onChange={(e) => setRole(u.id, e.target.value)} className="field rounded-full px-3 py-1.5 text-xs outline-none">
                    <option value="user">user</option>
                    <option value="moderator">moderator</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => togglePremium(u.id)} className={`toggle-switch ${u.premium ? "on" : ""}`}>
                    <span className="toggle-knob" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RequestsView() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [replyDraft, setReplyDraft] = useState({});

  function setStatus(id, status) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }
  function sendReply(id) {
    if (!replyDraft[id]?.trim()) return;
    setStatus(id, "resolved");
    setReplyDraft((d) => ({ ...d, [id]: "" }));
  }

  return (
    <div className="space-y-3">
      {requests.map((r, i) => (
        <div key={r.id} className="surface-card rounded-2xl p-4 sm:p-5 fade-up" style={{ animationDelay: `${i * 40}ms` }}>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div>
              <p className="text-sm font-medium">{r.from}</p>
              <p className="text-xs text-muted">{r.category}</p>
            </div>
            <StatusPill tint={r.status === "new" ? "amber" : r.status === "in_review" ? "teal" : "teal-solid"}>
              {r.status === "new" ? "Yangi" : r.status === "in_review" ? "Ko'rib chiqilmoqda" : "Hal qilindi"}
            </StatusPill>
          </div>
          <p className="text-sm text-[#3A4640] leading-relaxed mb-3">{r.message}</p>
          {r.status !== "resolved" && (
            <div className="flex items-center gap-2">
              {r.status === "new" && (
                <button onClick={() => setStatus(r.id, "in_review")} className="text-xs text-teal font-medium border border-teal/30 rounded-full px-3 py-1.5">
                  Ko'rib chiqishni boshlash
                </button>
              )}
              <div className="field rounded-full px-3.5 py-2 flex-1 flex items-center gap-2">
                <input
                  value={replyDraft[r.id] || ""}
                  onChange={(e) => setReplyDraft((d) => ({ ...d, [r.id]: e.target.value }))}
                  placeholder="Javob yozing..."
                  className="flex-1 min-w-0 text-xs outline-none bg-transparent"
                />
                <button onClick={() => sendReply(r.id)} className="text-teal shrink-0"><Send size={14} /></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function NewsView() {
  const [news, setNews] = useState(INITIAL_NEWS);
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState("");

  function publish() {
    if (!draft.trim()) return;
    setNews((prev) => [{ id: `n${Date.now()}`, title: draft.trim(), date: "hozirgina" }, ...prev]);
    setDraft("");
    setComposerOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between fade-up">
        <p className="text-muted text-sm">{news.length} ta yangilik</p>
        <button onClick={() => setComposerOpen(true)} className="fab bg-teal text-white rounded-full px-4 py-2.5 text-sm font-medium flex items-center gap-1.5">
          <Plus size={15} /> Yangi post
        </button>
      </div>
      {composerOpen && (
        <div className="surface-card rounded-2xl p-4 fade-up">
          <div className="field rounded-xl p-3 mb-3">
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} placeholder="Yangilik matni..." className="w-full text-sm outline-none bg-transparent resize-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={publish} className="bg-teal text-white rounded-full px-4 py-2 text-xs font-medium">Joylashtirish</button>
            <button onClick={() => setComposerOpen(false)} className="text-xs text-muted px-4 py-2">Bekor qilish</button>
          </div>
        </div>
      )}
      <div className="surface-card rounded-2xl divide-y divide-[#EEF1EC] overflow-hidden fade-up" style={{ animationDelay: "60ms" }}>
        {news.map((n) => (
          <div key={n.id} className="px-4 py-3.5 flex items-center justify-between gap-3">
            <p className="text-sm">{n.title}</p>
            <span className="camp-mono text-xs text-muted shrink-0">{n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PremiumView() {
  const active = SUBSCRIBERS.filter((s) => s.status === "active").length;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 fade-up">
        <div className="surface-card rounded-2xl p-4">
          <p className="camp-mono text-xl leading-none text-teal">{active}</p>
          <p className="text-muted text-xs mt-1">Faol obunachi</p>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <p className="camp-mono text-xl leading-none text-amber">{SUBSCRIBERS.filter((s) => s.plan === "Yillik").length}</p>
          <p className="text-muted text-xs mt-1">Yillik reja</p>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <p className="camp-mono text-xl leading-none text-terracotta">{SUBSCRIBERS.filter((s) => s.status === "expired").length}</p>
          <p className="text-muted text-xs mt-1">Tugagan</p>
        </div>
      </div>
      <div className="surface-card rounded-2xl overflow-hidden fade-up" style={{ animationDelay: "60ms" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hair text-left text-xs text-muted uppercase tracking-wide">
                <th className="px-4 py-3 font-medium">Ism</th>
                <th className="px-4 py-3 font-medium">Reja</th>
                <th className="px-4 py-3 font-medium">Holat</th>
                <th className="px-4 py-3 font-medium">Muddati</th>
              </tr>
            </thead>
            <tbody>
              {SUBSCRIBERS.map((s) => (
                <tr key={s.id} className="border-b border-hair last:border-0 admin-row">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3 text-muted">{s.plan}</td>
                  <td className="px-4 py-3">
                    <StatusPill tint={s.status === "active" ? "teal" : "terracotta"}>{s.status === "active" ? "Faol" : "Tugagan"}</StatusPill>
                  </td>
                  <td className="px-4 py-3 camp-mono text-xs text-muted">{s.expires}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const VIEWS = {
  stats: StatsView,
  listings: ListingsView,
  categories: CategoriesView,
  users: UsersView,
  requests: RequestsView,
  news: NewsView,
  premium: PremiumView,
};

export default function CampAdmin() {
  const [tab, setTab] = useState("stats");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const ActiveView = VIEWS[tab];
  const activeNav = NAV.find((n) => n.id === tab);

  function selectTab(id) {
    setTab(id);
    setDrawerOpen(false);
  }

  return (
    <div className="camp-root min-h-screen w-full">
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

        .fade-up { animation: campFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .chip { font-size: 12px; padding: 6px 12px; border-radius: 999px; border: 1px solid #DCE6DF; background: #FFFFFF; color: #5B6D64; }

        .status-pill { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px; white-space: nowrap; }
        .status-amber { background: rgba(184,121,43,0.12); color: #B8792B; }
        .status-teal { background: rgba(47,109,95,0.1); color: #2F6D5F; }
        .status-terracotta { background: rgba(184,93,52,0.12); color: #B85D34; }
        .status-teal-solid { background: #2F6D5F; color: #FBF6EA; }

        .icon-bubble-teal { background: rgba(47,109,95,0.1); color: #2F6D5F; }
        .icon-bubble-amber { background: rgba(184,121,43,0.12); color: #B8792B; }
        .icon-bubble-terracotta { background: rgba(184,93,52,0.12); color: #B85D34; }

        .admin-row { transition: background-color 160ms ease; }
        .admin-row:hover { background-color: #F7FBF8; }

        .bar-fill { width: 0; animation: campBarFill 900ms cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: 200ms; }
        @keyframes campBarFill { to { width: var(--w); } }

        .fab { transition: transform 160ms ease, box-shadow 160ms ease; }
        .fab:hover { transform: translateY(-1px); box-shadow: 0 10px 22px -12px rgba(47,109,95,0.5); }

        .sheet-backdrop { animation: campFadeUp 0.2s ease both; }
        .sheet-panel-center { animation: campPopIn 220ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campPopIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        .toggle-switch { width: 38px; height: 22px; border-radius: 999px; background: #E1E9E3; position: relative; transition: background-color 180ms ease; }
        .toggle-switch.on { background: #2F6D5F; }
        .toggle-knob { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 999px; background: #FFFFFF; transition: transform 180ms ease; }
        .toggle-switch.on .toggle-knob { transform: translateX(16px); }

        .nav-item { transition: background-color 160ms ease, color 160ms ease; }
        .nav-item:hover { background-color: #F7FBF8; }
        .nav-item.active { background-color: #2F6D5F; color: #FBF6EA; }
        .nav-item.active .nav-icon { color: #FBF6EA; }

        .drawer-backdrop { animation: campFadeUp 0.2s ease both; }
        .drawer-panel { animation: campDrawerIn 220ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes campDrawerIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>

      <div className="lg:grid lg:grid-cols-[240px_1fr] min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col border-r border-hair bg-white/50 px-4 py-5">
          <div className="flex items-center gap-2 px-2 mb-6">
            <LogoMark size={22} />
            <span className="camp-display text-sm tracking-tight">Camp Admin</span>
          </div>
          <nav className="space-y-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => selectTab(n.id)}
                className={`nav-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left ${tab === n.id ? "active" : "text-[#1B2420]"}`}
              >
                <n.icon size={16} className="nav-icon text-muted shrink-0" />
                {n.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="drawer-backdrop absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
            <div className="drawer-panel absolute left-0 top-0 bottom-0 w-64 bg-[#EEF3EE] p-5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <LogoMark size={22} />
                  <span className="camp-display text-sm tracking-tight">Camp Admin</span>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-full surface-card flex items-center justify-center">
                  <X size={14} />
                </button>
              </div>
              <nav className="space-y-1">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => selectTab(n.id)}
                    className={`nav-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left ${tab === n.id ? "active" : "text-[#1B2420]"}`}
                  >
                    <n.icon size={16} className="nav-icon text-muted shrink-0" />
                    {n.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-hair" style={{ background: "rgba(238,243,238,0.9)", backdropFilter: "blur(10px)" }}>
            <div className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setDrawerOpen(true)} className="lg:hidden w-9 h-9 rounded-full surface-card flex items-center justify-center">
                  <Menu size={16} />
                </button>
                <h1 className="camp-display text-lg">{activeNav?.label}</h1>
              </div>
              <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center text-sm font-semibold text-white">A</div>
            </div>
          </header>
          <main className="p-5 max-w-5xl">
            <ActiveView key={tab} />
          </main>
        </div>
      </div>
    </div>
  );
}
