import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Tüm genel arama motorları
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/login", "/api"],
      },
      // AI botları — açıkça izin (ChatGPT, Gemini, Perplexity, Claude, vb.)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
    ],
    sitemap: "https://www.mediwayturkey.com/sitemap.xml",
  };
}
