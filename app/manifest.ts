import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sabrocados - Carne Seca Artesanal",
    short_name: "Sabrocados",
    description:
      "Snacks de cerdo deshidratado artesanal con limón y triple salsa negra. Alta en proteína, keto-friendly.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#10b981",
    orientation: "portrait",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["food", "shopping"],
    lang: "es-MX",
  };
}
