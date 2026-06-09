"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgknngy";

export function ContactForm() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", phone: "", message: "" });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-navy/15 px-4 py-2.5 text-[15px] text-navy bg-white focus:outline-none focus:border-gold transition";

  return (
    <div className="max-w-xl mx-auto w-full">
      {!open && (
        <div className="text-center">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-md font-semibold hover:brightness-105 transition"
          >
            <MailIcon /> Contact us
          </button>
        </div>
      )}

      {open && (
        <div className="bg-white rounded-2xl border border-navy/10 shadow-sm p-6 sm:p-8 text-left">
          {!sent ? (
            <>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display text-xl font-semibold text-navy">Contact us</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-navy/40 hover:text-navy text-2xl leading-none"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <p className="text-sm text-navy/60 mb-5">
                Send us a message and we&apos;ll get back to you.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                />
                <textarea
                  required
                  placeholder="Your message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={inputCls + " resize-none"}
                />
                {error && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gold text-navy py-3 rounded-md font-semibold hover:brightness-105 transition disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send message"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <CheckIcon />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy mb-1">
                Message sent!
              </h3>
              <p className="text-sm text-navy/60">
                Thank you. We&apos;ll get back to you as soon as possible.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#0a2540" strokeWidth="1.8" />
      <path d="m3 7 9 6 9-6" stroke="#0a2540" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4.5 4.5L19 7" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
