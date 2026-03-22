import "./globals.css";
import type { Metadata } from "next";
import { Gilda_Display, Manrope } from "next/font/google";
import ClientShell from "@ui/ClientShell";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const mono = Gilda_Display({
  weight: "400",
  variable: "--font-gilda",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gleam | Videography Market ",
  description: "Mock Videography Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} scroll-smooth`}>
      <body className="antialiased transition-colors">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
};