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
  title: {
    default: "RentaGo — Sewa Mobil & Motor",
    template: "%s | RentaGo",
  },
  description:
    "Sewa mobil & motor mudah, cepat, dan terpercaya. Booking online, bayar mudah, kendaraan siap antar.",
  keywords: [
    "rental mobil",
    "rental motor",
    "sewa kendaraan",
    "booking kendaraan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
