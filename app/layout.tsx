import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { VisitTracker } from "@/components/VisitTracker";

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
    other: {
      "msvalidate.01": "9CB03E8E93C7289160D5677D71AB3ACB",
    },
  },
  openGraph: {
    title: "MediWayTurkey — Top health providers in Turkey",
    description:
      "Compare verified hair transplant, dental and aesthetic clinics in Turkey. Free for patients, no commission.",
    url: "https://www.mediwayturkey.com",
    siteName: "MediWayTurkey",
    type: "website",
    images: [
      {
        url: "https://www.mediwayturkey.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "MediWayTurkey — Compare verified health providers in Turkey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediWayTurkey — Top health providers in Turkey",
    description:
      "Compare verified hair transplant, dental and aesthetic clinics in Turkey. Free for patients, no commission.",
    images: ["https://www.mediwayturkey.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        {children}
        <VisitTracker />
      </body>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-68Y3R270WM"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-68Y3R270WM');
        `}
      </Script>
      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x3tlb2u5ke");
        `}
      </Script>
    </html>
  );
}
