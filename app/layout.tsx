import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const signature = Great_Vibes({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Emaan Bilal | Portfolio",
  description:
    "Interactive portfolio for Emaan Bilal, frontend developer and game developer.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${signature.variable}`}>
        {children}
      </body>
    </html>
  );
}
