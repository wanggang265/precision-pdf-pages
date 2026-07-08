import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { truncateDescription } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://removepdfpages.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Remove PDF Pages — Delete PDF Pages Online Free",
    template: "%s | Remove PDF Pages",
  },
  description: truncateDescription(
    "Delete unwanted pages from any PDF online. Upload your file, pick the pages to remove, and download the cleaned PDF in seconds — no signup needed."
  ),
  keywords: ["remove pdf pages", "delete pdf pages", "pdf page remover", "online pdf editor", "remove pages from pdf"],
  authors: [{ name: "Precision PDF" }],
  creator: "Precision PDF",
  publisher: "Precision PDF",
  robots: {
    index: true,
    follow: true,
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://accounts.google.com" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
