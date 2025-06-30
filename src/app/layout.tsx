import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "NoCluely - Detect AI Assistance & Protect Cognitive Health",
  description: "NoCluely detects when Cluely AI assistant is active on your system. Protect your cognitive health and maintain awareness of AI assistance. Available for macOS with Python, JavaScript, and Rust SDKs.",
  keywords: ["AI detection", "Cluely detector", "cognitive health", "AI awareness", "screen monitoring", "educational integrity"],
  authors: [{ name: "terminalsin" }],
  openGraph: {
    title: "NoCluely - Detect AI Assistance & Protect Cognitive Health",
    description: "Detect when Cluely AI assistant is active on your system. Maintain awareness and protect your cognitive health.",
    url: "https://nocluely.com",
    siteName: "NoCluely",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoCluely - Detect AI Assistance & Protect Cognitive Health",
    description: "Detect when Cluely AI assistant is active on your system. Maintain awareness and protect your cognitive health.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
