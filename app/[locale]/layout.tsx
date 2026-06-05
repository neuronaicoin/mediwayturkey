import { notFound } from "next/navigation";
import { isValidLocale, getLanguage, LOCALE_CODES } from "@/lib/data/languages";

export function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const lang = getLanguage(params.locale);

  return (
    <div dir={lang?.dir ?? "ltr"} data-locale={params.locale}>
      {children}
    </div>
  );
}
