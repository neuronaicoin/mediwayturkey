import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mediwayturkey.com"),
  title: "MediWayTurkey — Search, find & compare top health providers in Turkey",
  description:
    "Compare verified hair transplant, dental and aesthetic clinics in Turkey. Free for patients, no commission. Connect directly with trusted providers.",
  verification: {
    google: "ZgeNITUSMAJUJTNtZ8ycJVylrDaQeaLutNZjXutC1vw",
  },
  openGraph: {
    title: "MediWayTurkey — Top health providers in Turkey",
    description:
      "Compare verified hair transplant, dental and aesthetic clinics in Turkey. Free for patients, no commission.",
    url: "https://www.mediwayturkey.com",
    siteName: "MediWayTurkey",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
