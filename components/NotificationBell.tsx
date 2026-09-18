"use client";

import { useEffect, useRef, useState } from "react";
import {
  getUnreadLeadCount,
  getLatestLeadTimestamp,
  markNotificationsSeen,
} from "@/lib/notifications";

interface Props {
  providerId: string;
}

const POLL_INTERVAL_MS = 20000; // 20 saniyede bir kontrol

// Web Audio API ile basit, hoş bir "ding" sesi üretir — dış ses dosyasına
// ihtiyaç yok, hiçbir yere bağımlı değil.
function playDing() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1108, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    /* ses çalışmazsa sessizce geç — kritik değil */
  }
}

export function NotificationBell({ providerId }: Props) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [ringing, setRinging] = useState(false);
  const lastKnownTimestamp = useRef<string | null>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!providerId) return;
    let active = true;

    async function check() {
      const [count, latest] = await Promise.all([
        getUnreadLeadCount(providerId),
        getLatestLeadTimestamp(providerId),
      ]);
      if (!active) return;
      setUnreadCount(count);

      // İlk yüklemede sadece referans zamanı kaydet, ses çalma.
      if (firstLoad.current) {
        lastKnownTimestamp.current = latest;
        firstLoad.current = false;
        return;
      }
      // Yeni bir lead geldiyse (zaman damgası ilerlediyse) sesli uyarı ver.
      if (latest && latest !== lastKnownTimestamp.current) {
        lastKnownTimestamp.current = latest;
        playDing();
        setRinging(true);
        setTimeout(() => setRinging(false), 1000);
      }
    }

    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [providerId]);

  async function handleClick() {
    setUnreadCount(0);
    await markNotificationsSeen(providerId);
    const el = document.getElementById("patient-leads-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Notifications"
      className={`relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-sky transition ${
        ringing ? "animate-bounce" : ""
      }`}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z"
          stroke="#0a2540"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M10 18a2 2 0 0 0 4 0" stroke="#0a2540" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}
