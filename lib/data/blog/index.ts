// ───────────────────────────────────────────────────────────
// BLOG INDEX — tüm yazıları toplar
// Yeni yazı eklemek için: dosyayı import et + ALL_POSTS'a ekle.
// ───────────────────────────────────────────────────────────

import type { BlogPost } from "./types";
import { post as hairTransplantTurkeyCost2026 } from "./hair-transplant-turkey-cost-2026";
import { post as dentalTreatmentTurkeyCost2026 } from "./dental-treatment-turkey-cost-2026";
import { post as plasticSurgeryTurkeyCost2026 } from "./plastic-surgery-turkey-cost-2026";
import { post as isMedicalTourismTurkeySafe } from "./is-medical-tourism-turkey-safe";
import { post as fueVsDhiHairTransplant } from "./fue-vs-dhi-hair-transplant";
import { post as greffeCheveuxTurquiePrix2026 } from "./greffe-cheveux-turquie-prix-2026";
import { post as greffeCheveuxIstanbulCliniques } from "./greffe-cheveux-istanbul-cliniques";
import { post as soinsDentairesTurquiePrix2026 } from "./soins-dentaires-turquie-prix-2026";
import { post as chirurgieEsthetiqueTurquiePrix2026 } from "./chirurgie-esthetique-turquie-prix-2026";
import { post as tourismeMedicalTurquieSecurite } from "./tourisme-medical-turquie-securite";
import { post as ziraatAlshaarTurkiya2026 } from "./ziraat-alshaar-turkiya-2026";
import { post as ziraatAlshaarIstanbul } from "./ziraat-alshaar-istanbul";
import { post as ilajAlasnanTurkiya2026 } from "./ilaj-alasnan-turkiya-2026";
import { post as jirahaTajmiliaIstanbul } from "./jiraha-tajmilia-istanbul";
import { post as sacEkimiTurkiyeFiyatlari2026 } from "./sac-ekimi-turkiye-fiyatlari-2026";
import { post as disTedavisiTurkiyeFiyatlari2026 } from "./dis-tedavisi-turkiye-fiyatlari-2026";
import { post as estetikCerrahiTurkiyeFiyatlari2026 } from "./estetik-cerrahi-turkiye-fiyatlari-2026";
import { post as haartransplantationTuerkeiKosten2026 } from "./haartransplantation-tuerkei-kosten-2026";
import { post as zahnbehandlungTuerkeiKosten2026 } from "./zahnbehandlung-tuerkei-kosten-2026";
import { post as schoenheitsoperationTuerkeiKosten2026 } from "./schoenheitsoperation-tuerkei-kosten-2026";
import { post as trapiantoCapelliTurchiaPrezzi2026 } from "./trapianto-capelli-turchia-prezzi-2026";
import { post as cureDentaliTurchiaPrezzi2026 } from "./cure-dentali-turchia-prezzi-2026";
import { post as chirurgiaEsteticaTurchiaPrezzi2026 } from "./chirurgia-estetica-turchia-prezzi-2026";
import { post as kliniklerIcinYurtdisiHastaRehberi } from "./klinikler-icin-yurtdisi-hasta-rehberi";

export const ALL_POSTS: BlogPost[] = [
  hairTransplantTurkeyCost2026,
  dentalTreatmentTurkeyCost2026,
  plasticSurgeryTurkeyCost2026,
  isMedicalTourismTurkeySafe,
  fueVsDhiHairTransplant,
  greffeCheveuxTurquiePrix2026,
  greffeCheveuxIstanbulCliniques,
  soinsDentairesTurquiePrix2026,
  chirurgieEsthetiqueTurquiePrix2026,
  tourismeMedicalTurquieSecurite,
  ziraatAlshaarTurkiya2026,
  ziraatAlshaarIstanbul,
  ilajAlasnanTurkiya2026,
  jirahaTajmiliaIstanbul,
  sacEkimiTurkiyeFiyatlari2026,
  disTedavisiTurkiyeFiyatlari2026,
  estetikCerrahiTurkiyeFiyatlari2026,
  haartransplantationTuerkeiKosten2026,
  zahnbehandlungTuerkeiKosten2026,
  schoenheitsoperationTuerkeiKosten2026,
  trapiantoCapelliTurchiaPrezzi2026,
  cureDentaliTurchiaPrezzi2026,
  chirurgiaEsteticaTurchiaPrezzi2026,
  kliniklerIcinYurtdisiHastaRehberi,
];

// Bir dile ait yayınlanmış yazılar (en yeni önce)
export function getPostsByLocale(locale: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.locale === locale).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

// Tek yazı (slug + locale)
export function getPost(locale: string, slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.locale === locale && p.slug === slug);
}

// Sitemap + statik üretim için tüm (locale, slug) çiftleri
export function getAllPostParams(): { locale: string; slug: string }[] {
  return ALL_POSTS.map((p) => ({ locale: p.locale, slug: p.slug }));
}

export type { BlogPost };
