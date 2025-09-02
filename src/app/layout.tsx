import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercurio - Launch Your Business Into Automated Success",
  description: "Transform your financial document processing with rocket-powered OCR, seamless WhatsApp integration, and intelligent automation. 90% reduction in manual work.",
  keywords: "document processing, OCR, automation, WhatsApp integration, financial documents, receipt processing, business automation",
  authors: [{ name: "Mercurio Team" }],
  creator: "Mercurio",
  publisher: "Mercurio",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mercuriohub.io",
    title: "Mercurio - Launch Your Business Into Automated Success",
    description: "Transform your financial document processing with rocket-powered OCR and intelligent automation.",
    siteName: "Mercurio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercurio - Launch Your Business Into Automated Success",
    description: "Transform your financial document processing with rocket-powered OCR and intelligent automation.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#BDBDBD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
