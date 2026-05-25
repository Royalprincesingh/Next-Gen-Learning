import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NeuraLrn | Next-Gen Learning Dashboard",
  description: "A futuristic, hardware-accelerated learning dashboard with Bento layout grid, real-time data fetching, and buttery-smooth micro-interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100 overflow-x-hidden`}
      >
        {/* Futuristic global background layers */}
        <div className="mesh-bg" />
        <div className="grid-overlay" />
        {children}
      </body>
    </html>
  );
}

