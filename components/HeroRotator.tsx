"use client";
import { useState, useEffect } from "react";

// Hastalara yönelik, kısa, dönen mesajlar — her 3 saniyede bir değişir
const MESSAGES = [
  "Search, find & compare top health providers in Turkey",
  "Thinking about a hair transplant? Get matched with top providers in Turkey — instantly.",
  "Considering aesthetic treatment? Our AI connects you directly with trusted providers.",
  "Need dental work done right? Compare verified providers in Turkey — free.",
  "Ask our AI assistant — get matched with the right doctor in seconds.",
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
      }, 280);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight max-w-3xl mx-auto leading-[1.18] transition-opacity duration-300 min-h-[3.6em] sm:min-h-[2.4em] flex items-center justify-center ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {MESSAGES[idx]}
    </h1>
  );
}
