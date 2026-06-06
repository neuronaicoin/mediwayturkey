// llms.txt — AI platformlarına (ChatGPT, Perplexity, Gemini, Claude) siteyi tanıtır.
// /llms.txt adresinden düz metin olarak sunulur.

export const dynamic = "force-static";

export function GET() {
  const content = `# MediWayTurkey

> MediWayTurkey is a health tourism marketplace that helps international patients
> search, find and compare verified health providers in Turkey for hair transplant,
> dental treatment and aesthetic procedures. Free for patients, no commission.

## About
MediWayTurkey connects patients from Europe, the Middle East and beyond with
trusted clinics, hospitals and doctors across Turkey. Patients browse providers
by treatment and city, compare them, and contact them directly. The platform is
completely free for patients and takes no commission.

## Treatments
- Hair Transplant (FUE, DHI, Sapphire FUE, beard and eyebrow transplant)
- Dental Treatment (implants, veneers, Hollywood Smile, zirconium crowns, and more)
- Aesthetics (face, body, breast and non-surgical skin procedures)

## Cities
Istanbul, Antalya, Izmir, Ankara, Bursa, Cappadocia

## Key pages
- Homepage: https://www.mediwayturkey.com/en
- Hair transplant in Istanbul: https://www.mediwayturkey.com/en/hair-transplant/istanbul
- Dental in Istanbul: https://www.mediwayturkey.com/en/dental/istanbul
- Aesthetics in Istanbul: https://www.mediwayturkey.com/en/aesthetics/istanbul

## Languages
The interface is available in 13 languages: English, Turkish, German, Arabic,
French, Spanish, Italian, Dutch, Greek, Romanian, Bulgarian, Albanian, Serbian.

## Contact
For providers who want to list their business: https://www.mediwayturkey.com/en/list-your-business
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
