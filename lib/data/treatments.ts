// ───────────────────────────────────────────────────────────
// TEDAVİLER — Modüler alan setleri (sistemin kalbi)
// Her tedavi = bir modül. Her modülün KENDİ alanları var.
// Yeni tedavi eklemek için (göz, obezite vb.):
//   1. TREATMENTS dizisine yeni nesne ekle
//   2. fields → o tedaviye özel seçenekler
// Hiçbir kod değişikliği gerekmez; sistem otomatik tanır.
// ───────────────────────────────────────────────────────────

export interface TreatmentFieldGroup {
  key: string;
  label: string;
  type: "multi" | "single";
  options: { slug: string; name: string }[];
  maxSelect?: number;
}

export interface Treatment {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  active: boolean;
  fields: TreatmentFieldGroup[];
}

export const TREATMENTS: Treatment[] = [
  // ─── SAÇ EKİMİ ───
  {
    slug: "hair-transplant",
    name: "Hair Transplant",
    shortName: "Hair",
    icon: "hair",
    active: true,
    fields: [
      {
        key: "technique",
        label: "Techniques",
        type: "multi",
        options: [
          { slug: "fue", name: "FUE" },
          { slug: "dhi", name: "DHI" },
          { slug: "sapphire-fue", name: "Sapphire FUE" },
          { slug: "beard", name: "Beard transplant" },
          { slug: "eyebrow", name: "Eyebrow transplant" },
        ],
      },
    ],
  },

  // ─── DİŞ ───
  {
    slug: "dental",
    name: "Dental Treatment",
    shortName: "Dental",
    icon: "dental",
    active: true,
    fields: [
      {
        key: "branch",
        label: "Treatments offered",
        type: "multi",
        maxSelect: 10,
        options: [
          { slug: "implant", name: "Dental implants" },
          { slug: "veneers", name: "Veneers" },
          { slug: "hollywood-smile", name: "Hollywood Smile" },
          { slug: "zirconium", name: "Zirconium crowns" },
          { slug: "whitening", name: "Teeth whitening" },
          { slug: "root-canal", name: "Root canal" },
          { slug: "orthodontics", name: "Orthodontics" },
          { slug: "all-on-four", name: "All-on-4 / All-on-6" },
          { slug: "extraction", name: "Extraction & surgery" },
          { slug: "general", name: "General dentistry" },
        ],
      },
    ],
  },

  // ─── ESTETİK ───
  {
    slug: "aesthetics",
    name: "Aesthetics",
    shortName: "Aesthetics",
    icon: "aesthetics",
    active: true,
    fields: [
      {
        key: "face",
        label: "Face",
        type: "multi",
        options: [
          { slug: "rhinoplasty", name: "Rhinoplasty (nose)" },
          { slug: "facelift", name: "Facelift" },
          { slug: "blepharoplasty", name: "Eyelid (blepharoplasty)" },
          { slug: "brow-lift", name: "Brow lift" },
          { slug: "jawline", name: "Jawline / chin" },
          { slug: "otoplasty", name: "Ear (otoplasty)" },
        ],
      },
      {
        key: "body",
        label: "Body",
        type: "multi",
        options: [
          { slug: "liposuction", name: "Liposuction" },
          { slug: "tummy-tuck", name: "Tummy tuck" },
          { slug: "bbl", name: "BBL" },
          { slug: "arm-leg-lift", name: "Arm / leg lift" },
          { slug: "mommy-makeover", name: "Mommy makeover" },
        ],
      },
      {
        key: "breast",
        label: "Breast",
        type: "multi",
        options: [
          { slug: "augmentation", name: "Breast augmentation" },
          { slug: "reduction", name: "Breast reduction" },
          { slug: "lift", name: "Breast lift" },
          { slug: "gynecomastia", name: "Gynecomastia" },
        ],
      },
      {
        key: "skin",
        label: "Skin (non-surgical)",
        type: "multi",
        options: [
          { slug: "botox", name: "Botox" },
          { slug: "fillers", name: "Fillers" },
          { slug: "prp", name: "PRP" },
          { slug: "laser", name: "Laser / skin resurfacing" },
        ],
      },
    ],
  },
];

// ─── Paket tipleri (tüm tedaviler için ortak) ───
export const PACKAGE_OPTIONS = [
  { slug: "operation", name: "Operation only" },
  { slug: "transfer", name: "Transfer included" },
  { slug: "accommodation", name: "Accommodation included" },
];

// ─── Yardımcılar ───
export function getTreatment(slug: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.slug === slug);
}

export const ACTIVE_TREATMENTS = TREATMENTS.filter((t) => t.active);
