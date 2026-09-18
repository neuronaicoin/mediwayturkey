"use client";
import { useState, useEffect } from "react";

// Hastalara yönelik, KISA, dönen mesajlar — her 5 saniyede bir değişir (yavaş, okunabilir)
const MESSAGES = [
  "Find trusted providers in Turkey",
  "Hair transplant? Get matched now.",
  "AI-matched, verified providers.",
  "Compare dental care — free.",
  "Ask AI. Find your provider fast.",
];

export function HeroRotator() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className={`font-display text-[28px] sm:text-4xl md:text-5xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-[1.2] transition-opacity duration-300 min-h-[1.3em] flex items-center justify-center ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {MESSAGES[idx]}
    </h1>
  );
}
