import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import Navigation from './ui/Navigation'
import BackgroundDrei from './ui/BackgroundDrei'
import { Gilda_Display, Manrope } from 'next/font/google'

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const mono = Gilda_Display({
  weight: "400",
  variable: "--font-gilda",
  subsets: ['latin'],
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
    //global font size, not sure if tailwind is the best way to apply this
    <html suppressHydrationWarning lang="en" className="no-scrollbar scroll-smooth">
      <body className={`${sans.variable} ${mono.variable} antialiased text-foreground bg-background transition-colors`}>
        <Providers>
          <Navigation />
          <BackgroundDrei />
          {children}
        </Providers>
      </body>
    </html>
  )
}
