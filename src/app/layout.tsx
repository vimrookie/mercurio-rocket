import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercurio - Lanza tu Negocio Hacia el Exito Automatizado",
  description: "Transforma el procesamiento de tus documentos financieros con OCR potenciado por IA, integracion con WhatsApp y automatizacion inteligente. 90% de reduccion en trabajo manual.",
  keywords: "procesamiento de documentos, OCR, automatizacion, integracion WhatsApp, documentos financieros, procesamiento de recibos, automatizacion empresarial, Latinoamerica",
  authors: [{ name: "Mercurio Team" }],
  creator: "Mercurio",
  publisher: "Mercurio",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_419",
    url: "https://mercuriohub.io",
    title: "Mercurio - Lanza tu Negocio Hacia el Exito Automatizado",
    description: "Transforma el procesamiento de tus documentos financieros con OCR potenciado por IA y automatizacion inteligente.",
    siteName: "Mercurio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercurio - Lanza tu Negocio Hacia el Exito Automatizado",
    description: "Transforma el procesamiento de tus documentos financieros con OCR potenciado por IA y automatizacion inteligente.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#BDBDBD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased`}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#181C23',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
