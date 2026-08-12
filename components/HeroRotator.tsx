"use client";
import { useState, useEffect } from "react";

// Hastalara yönelik, KISA, dönen mesajlar — her 5 saniyede bir değişir (yavaş, okunabilir)
const MESSAGES = [
  "Search, find & compare top providers in Turkey",
  "Hair transplant? Get matched instantly.",
  "AI connects you with trusted providers.",
  "Dental work, done right. Compare — free.",
  "Ask our AI. Find your provider in seconds.",
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
      className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-[1.2] transition-opacity duration-300 min-h-[2.4em] sm:min-h-[1.4em] flex items-center justify-center ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {MESSAGES[idx]}
    </h1>
  );
}
