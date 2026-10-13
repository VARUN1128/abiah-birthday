import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abiah's Little World 🎀 — Happy Birthday!",
  description:
    "A personal birthday website made with love, friendship, and a whole lot of heart. Happy birthday, Abiah!",
  openGraph: {
    title: "Abiah's Little World 🎀",
    description: "A little digital world made just for you. Happy birthday!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dancingScript.variable}`}
    >
      <body style={{ fontFamily: "var(--font-dm-sans, DM Sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
