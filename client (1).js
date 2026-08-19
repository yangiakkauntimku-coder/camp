import { createClient } from "@supabase/supabase-js";

/**
 * Supabase brauzer client.
 *
 * Muhim: bu yerda faqat ANON (public) key ishlatiladi — u brauzerda ko'rinishi
 * xavfsiz, chunki RLS (Row Level Security) qoidalari real ruxsatlarni boshqaradi.
 * SERVICE_ROLE key hech qachon bu faylga yozilmaydi.
 *
 * Productionda bu qiymatlar .env.local orqali keladi:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gcesuvckcwxswznhmybw.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZXN1dmNrY3d4c3d6bmhteWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwODgyMTQsImV4cCI6MjEwMjY2NDIxNH0.bZsOmGz0PXQp9AGyW90gbsFVG8sOh4vzK6Fk70XYQF0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/* ------------------------------------------------------------------ */
/*  Yordamchi so'rovlar — bir necha sahifada qayta ishlatiladi          */
/* ------------------------------------------------------------------ */

/** Barcha ochiq elonlarni oladi (status = 'open' yoki 'closing_soon') */
export async function fetchListings() {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .neq("status", "closed")
    .order("apply_deadline", { ascending: true });

  if (error) {
    console.error("fetchListings xatosi:", error.message);
    return [];
  }
  return data ?? [];
}

/** Joriy foydalanuvchining profilini oladi */
export async function fetchProfile(userId) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("fetchProfile xatosi:", error.message);
    return null;
  }
  return data;
}

/** Foydalanuvchi saqlagan elonlar ro'yxatini (wishlist) join bilan oladi */
export async function fetchSavedListings(userId) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("saved_items")
    .select("listing_id, listings(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("fetchSavedListings xatosi:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.listings).filter(Boolean);
}

/** Bitta elonni saqlanganlarga qo'shadi / olib tashlaydi */
export async function toggleSavedListing(userId, listingId, isCurrentlySaved) {
  if (!userId) return { error: "Avval tizimga kiring" };

  if (isCurrentlySaved) {
    const { error } = await supabase
      .from("saved_items")
      .delete()
      .eq("user_id", userId)
      .eq("listing_id", listingId);
    return { error: error?.message ?? null };
  }

  const { error } = await supabase
    .from("saved_items")
    .insert({ user_id: userId, listing_id: listingId });
  return { error: error?.message ?? null };
}

/** Platforma yangiliklari (umumiy, news jadvali) — so'nggi N ta */
export async function fetchNews(limit = 5) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("fetchNews xatosi:", error.message);
    return [];
  }
  return data ?? [];
}

/** Foydalanuvchiga xos bildirishnomalar (notifications jadvali) */
export async function fetchNotifications(userId, limit = 10) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("fetchNotifications xatosi:", error.message);
    return [];
  }
  return data ?? [];
}

/** Bildirishnomani "o'qildi" deb belgilaydi */
export async function markNotificationRead(notificationId) {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId);
  return { error: error?.message ?? null };
}

/**
 * Yangiliklar oynasi uchun: news + notifications ikkalasini birlashtirib,
 * vaqt bo'yicha aralashtirib beradi (struktura hujjatidagi talab shu edi).
 */
export async function fetchCombinedFeed(userId, limit = 5) {
  const [news, notifications] = await Promise.all([
    fetchNews(limit),
    fetchNotifications(userId, limit),
  ]);

  const merged = [
    ...news.map((n) => ({
      id: `news-${n.id}`,
      unread: true,
      title: n.title,
      meta: "Platforma yangiligi",
      time: n.created_at,
      kind: "news",
    })),
    ...notifications.map((n) => ({
      id: `notif-${n.id}`,
      unread: !n.is_read,
      title: n.message,
      meta: n.type === "deadline" ? "Deadline eslatmasi" : n.type === "match" ? "Sizga mos topildi" : "Tizim xabari",
      time: n.created_at,
      kind: "notification",
      rawId: n.id,
    })),
  ];

  merged.sort((a, b) => new Date(b.time) - new Date(a.time));
  return merged.slice(0, limit);
}

/** Bitta elonni id bo'yicha to'liq ma'lumot bilan oladi */
export async function fetchListingById(id) {
  if (!id) return null;
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("fetchListingById xatosi:", error.message);
    return null;
  }
  return data;
}

/** Shu elonga o'xshash boshqa elonlarni oladi (bir xil format, boshqa id) */
export async function fetchSimilarListings(format, excludeId, limit = 3) {
  if (!format) return [];
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("format", format)
    .neq("id", excludeId)
    .neq("status", "closed")
    .order("apply_deadline", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("fetchSimilarListings xatosi:", error.message);
    return [];
  }
  return data ?? [];
}

/** Berilgan elon userning saqlanganlari orasida bor-yo'qligini tekshiradi */
export async function isListingSaved(userId, listingId) {
  if (!userId || !listingId) return false;
  const { data, error } = await supabase
    .from("saved_items")
    .select("listing_id")
    .eq("user_id", userId)
    .eq("listing_id", listingId)
    .maybeSingle();

  if (error) {
    console.error("isListingSaved xatosi:", error.message);
    return false;
  }
  return Boolean(data);
}

/** Real-time: notifications jadvaliga yangi qator qo'shilganda callback chaqiradi */
export function subscribeToNotifications(userId, onInsert) {
  if (!userId) return () => {};
  const channel = supabase
    .channel(`notifications-${userId}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
      (payload) => onInsert(payload.new)
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}
