import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
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
  title: "Orbitex | Your Gateway to DeFi",
  description: "The next generation decentralized exchange. Trade, swap, and earn across multiple chains with ease.",
  keywords: ["DeFi", "DEX", "cryptocurrency", "trading", "blockchain", "web3"],
  openGraph: {
    title: "Orbitex | Your Gateway to DeFi",
    description: "The next generation decentralized exchange. Trade, swap, and earn across multiple chains with ease.",
    type: "website",
    siteName: "Orbitex",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitex | Your Gateway to DeFi",
    description: "The next generation decentralized exchange",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text-primary`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

