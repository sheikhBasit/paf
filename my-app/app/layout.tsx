// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Using the Geist fonts from your first example
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pakistan School Sport Federation",
  description: "Official website for the Pakistan School Sport Federation.",
  keywords: ["Sports", "Pakistan", "Federation", "Programs"],
  openGraph: {
    title: "Pakistan Sports Federation",
    description: "Official website for the Pakistan Sports Federation.", // Updated description
    url: "https://paf-wheat.vercel.app",
    siteName: "Pakistan Sports Federation",
    images: ["/logo.svg"],
    locale: "en_PK",
    type: "website",
  },
  verification: {
    // Paste your Google Search Console verification key here
    google: "8SMp1W6kH8eHXZmibLPFzg_mke7nlhQV7yi_SvN6ALs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}