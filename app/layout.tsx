import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import JsonLd from "./components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10b981",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sabrocados.com"),
  title: {
    default: "Sabrocados - Carne Seca Artesanal con Triple Salsa Negra",
    template: "%s | Sabrocados",
  },
  description:
    "Snacks de cerdo deshidratado artesanal con limón y triple salsa negra. Alta en proteína, baja en carbohidratos, keto-friendly. Envíos a todo México.",
  keywords: [
    "carne seca",
    "jerky",
    "snacks proteína",
    "keto",
    "sabrocados",
    "carne deshidratada",
    "snacks saludables",
    "bajo en carbohidratos",
    "alta proteína",
    "snacks México",
  ],
  authors: [{ name: "Sabrocados" }],
  creator: "Sabrocados",
  publisher: "Sabrocados",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://sabrocados.com",
    siteName: "Sabrocados",
    title: "Sabrocados - El Snack que Satisface",
    description:
      "Carne de cerdo deshidratada con limón y triple salsa negra. Alta en proteína, keto-friendly.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sabrocados - Carne Seca Artesanal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabrocados - El Snack que Satisface",
    description:
      "Carne de cerdo deshidratada con limón y triple salsa negra. Alta en proteína, keto-friendly.",
    creator: "@sabrocados",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: "https://sabrocados.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className="dark">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
