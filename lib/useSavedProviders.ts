"use client";

import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// Kaydedilen klinikler deposu (localStorage tabanlı).
// SSR-safe: window kontrolü ile sunucuda çalışmaz.
// Sekmeler/sayfalar arası senkron için custom event kullanır.
// ─────────────────────────────────────────────────────────────

export interface SavedProvider {
  id: string;
  name: string;
  city?: string;
  businessType?: string;
  photo?: string;
}

const KEY = "mw_saved_providers";
const EVENT = "mw-saved-changed";

function read(): SavedProvider[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedProvider[]) : [];
  } catch {
    return [];
  }
}

function write(list: SavedProvider[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // sessizce geç
  }
}

export function useSavedProviders() {
  const [saved, setSaved] = useState<SavedProvider[]>([]);

  // İlk yükleme + değişiklik dinleme
  useEffect(() => {
    setSaved(read());
    const sync = () => setSaved(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isSaved = useCallback(
    (id: string) => saved.some((p) => p.id === id),
    [saved]
  );

  const toggle = useCallback((provider: SavedProvider) => {
    const list = read();
    const exists = list.some((p) => p.id === provider.id);
    const next = exists
      ? list.filter((p) => p.id !== provider.id)
      : [...list, provider];
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((p) => p.id !== id));
  }, []);

  return { saved, isSaved, toggle, remove };
}
