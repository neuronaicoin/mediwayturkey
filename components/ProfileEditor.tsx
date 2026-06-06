"use client";

import { useState, type ChangeEvent } from "react";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import { LANGUAGES } from "@/lib/data/languages";
import { COUNTRY_CODES } from "@/lib/data/ai-flow";
import {
  saveProfile,
  saveTreatments,
  uploadPhoto,
  deletePhoto,
  setPublished,
  type ProfileData,
  type TreatmentSelection,
} from "@/lib/profile";

interface Props {
  providerId: string;
  initialProfile: Partial<ProfileData>;
  initialTreatments: TreatmentSelection;
  initialPhotos: { id: string; url: string }[];
  onPublishedChange: (published: boolean) => void;
}

const BUSINESS_TYPES = [
  { value: "clinic", label: "Clinic" },
  { value: "hospital", label: "Hospital" },
  { value: "doctor", label: "Doctor" },
  { value: "agency", label: "Agency" },
];

export function ProfileEditor({
  providerId,
  initialProfile,
  initialTreatments,
  initialPhotos,
  onPublishedChange,
}: Props) {
  const [businessType, setBusinessType] = useState(initialProfile.business_type ?? "clinic");
  const [cities, setCities] = useState<string[]>(initialProfile.cities ?? []);
  const [langs, setLangs] = useState<string[]>(initialProfile.languages ?? []);
  const [whatsappCC, setWhatsappCC] = useState(initialProfile.whatsapp_country_code ?? "+90");
  const [whatsapp, setWhatsapp] = useState(initialProfile.whatsapp ?? "");
  const [website, setWebsite] = useState(initialProfile.website ?? "");
  const [bio, setBio] = useState(initialProfile.bio ?? "");
  const [treatments, setTreatments] = useState<TreatmentSelection>(initialTreatments);
  const [photos, setPhotos] = useState<{ id: string; url: string }[]>(initialPhotos);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  function toggleArr(arr: string[], val: string): string[] {
    return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
  }

  function toggleTreatment(slug: string) {
    setTreatments((prev) => {
      const next = { ...prev };
      if (next[slug]) {
        delete next[slug];
      } else {
        next[slug] = {};
      }
      return next;
    });
  }

  function toggleTreatmentOption(slug: string, fieldKey: string, value: string) {
    setTreatments((prev) => {
      const next = { ...prev };
      const t = { ...(next[slug] ?? {}) };
      const arr = t[fieldKey] ?? [];
      t[fieldKey] = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
      next[slug] = t;
      return next;
    });
  }

  async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (photos.length >= 8) {
      setMsg("Maximum 8 photos.");
      return;
    }
    setUploading(true);
    setMsg("");
    const file = files[0];
    const url = await uploadPhoto(providerId, file, photos.length);
    setUploading(false);
    if (url) {
      // Yeniden yükleyip id almak yerine basit: sayfada göster (id sonradan reload'da gelir)
      setPhotos((prev) => [...prev, { id: `temp-${Date.now()}`, url }]);
    } else {
      setMsg("Photo upload failed. Try a smaller image.");
    }
  }

  async function handleDeletePhoto(id: string) {
    if (id.startsWith("temp-")) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    const ok = await deletePhoto(id);
    if (ok) setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleSave() {
    setSaving(true);
    setMsg("");
    const profileData: ProfileData = {
      business_type: businessType,
      cities,
      districts: [],
      languages: langs,
      phone_country_code: "",
      phone: "",
      whatsapp_country_code: whatsappCC,
      whatsapp,
      website,
      bio,
    };
    const ok1 = await saveProfile(providerId, profileData);
    const ok2 = await saveTreatments(providerId, treatments);
    setSaving(false);
    setMsg(ok1 && ok2 ? "Saved!" : "Something went wrong while saving.");
  }

  const hasTreatment = Object.keys(treatments).length > 0;
  const canPublish = hasTreatment && photos.length > 0;

  async function handlePublish() {
    if (!canPublish) return;
    // Önce kaydet, sonra yayına al
    await handleSave();
    const ok = await setPublished(providerId, true);
    if (ok) {
      onPublishedChange(true);
      setMsg("Your profile is now live!");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* TEMEL PROFİL */}
      <section className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-navy mb-3">Basic profile</h2>

        <label className="block text-xs font-medium text-navy mb-1">Business type</label>
        <select value={businessType} onChange={(e: ChangeEvent<HTMLSelectElement>) => setBusinessType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-navy outline-none mb-3">
          {BUSINESS_TYPES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>

        <label className="block text-xs font-medium text-navy mb-1">Cities you serve</label>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {ACTIVE_CITIES.map((c) => (
            <button key={c.slug} type="button" onClick={() => setCities((p) => toggleArr(p, c.slug))}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                cities.includes(c.slug) ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-300"
              }`}>
              {c.name}
            </button>
          ))}
        </div>

        <label className="block text-xs font-medium text-navy mb-1">Languages spoken</label>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {LANGUAGES.map((l) => (
            <button key={l.code} type="button" onClick={() => setLangs((p) => toggleArr(p, l.code))}
              className={`text-xs px-2.5 py-1 rounded-full border transition ${
                langs.includes(l.code) ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-300"
              }`}>
              {l.label}
            </button>
          ))}
        </div>

        <label className="block text-xs font-medium text-navy mb-1">WhatsApp</label>
        <div className="flex gap-1.5 mb-3">
          <select value={whatsappCC} onChange={(e: ChangeEvent<HTMLSelectElement>) => setWhatsappCC(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-2 text-sm text-navy outline-none">
            {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
          </select>
          <input value={whatsapp} onChange={(e: ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp number" inputMode="tel"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-navy outline-none" />
        </div>

        <label className="block text-xs font-medium text-navy mb-1">Website (optional)</label>
        <input value={website} onChange={(e: ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-navy outline-none" />
      </section>

      {/* TEDAVİLER (modüler) */}
      <section className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-navy mb-3">Treatments offered</h2>
        <div className="flex flex-col gap-3">
          {ACTIVE_TREATMENTS.map((tr) => {
            const selected = !!treatments[tr.slug];
            return (
              <div key={tr.slug} className={`border rounded-lg p-3 ${selected ? "border-gold bg-gold-tint/30" : "border-gray-200"}`}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selected} onChange={() => toggleTreatment(tr.slug)} className="accent-navy" />
                  <span className="text-sm font-semibold text-navy">{tr.name}</span>
                </label>
                {selected && (
                  <div className="mt-3 pl-6 flex flex-col gap-3">
                    {tr.fields.map((field) => (
                      <div key={field.key}>
                        <div className="text-[11px] uppercase tracking-wide text-gray-500 font-medium mb-1.5">{field.label}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {field.options.map((o) => {
                            const isOn = (treatments[tr.slug]?.[field.key] ?? []).includes(o.slug);
                            return (
                              <button key={o.slug} type="button"
                                onClick={() => toggleTreatmentOption(tr.slug, field.key, o.slug)}
                                className={`text-xs px-2.5 py-1 rounded-full border transition ${
                                  isOn ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-300"
                                }`}>
                                {o.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOTOĞRAFLAR */}
      <section className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-navy mb-1">Photos</h2>
        <p className="text-[11px] text-gray-500 mb-3">Up to 8 photos. First photo is your cover.</p>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {photos.map((p) => (
            <div key={p.id} className="relative aspect-square rounded-lg overflow-hidden bg-sky">
              <img src={p.url} alt="" className="w-full h-full object-cover" />
              <button onClick={() => handleDeletePhoto(p.id)}
                className="absolute top-1 right-1 bg-black/60 text-white w-5 h-5 rounded-full text-xs leading-none">×</button>
            </div>
          ))}
          {photos.length < 8 && (
            <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gold">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <span className="text-2xl text-gray-400">+</span>
            </label>
          )}
        </div>
        {uploading && <div className="text-xs text-slate-body">Uploading...</div>}
      </section>

      {/* BIO */}
      <section className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-navy mb-3">About (English)</h2>
        <textarea value={bio} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
          rows={4} placeholder="Tell patients about your clinic, experience, and what makes you stand out."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-navy outline-none resize-none" />
      </section>

      {/* KAYDET / YAYINLA */}
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <button onClick={handleSave} disabled={saving}
          className="flex-1 w-full border border-navy text-navy py-3 rounded-lg text-sm font-semibold hover:bg-sky transition disabled:opacity-60">
          {saving ? "Saving..." : "Save draft"}
        </button>
        <button onClick={handlePublish} disabled={!canPublish}
          className="flex-1 w-full bg-navy text-white py-3 rounded-lg text-sm font-semibold hover:bg-navy-light transition disabled:opacity-50 disabled:cursor-not-allowed">
          Publish profile
        </button>
      </div>
      {!canPublish && (
        <p className="text-[11px] text-gray-500 text-center -mt-2">
          Add at least one treatment and one photo to publish.
        </p>
      )}
      {msg && <p className="text-xs text-center text-navy font-medium">{msg}</p>}
    </div>
  );
}
