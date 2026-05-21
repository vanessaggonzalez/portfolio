import type { Metadata } from "next";
import {
  Inter,
  Cormorant_Garamond,
} from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vanessa Gonzalez",
  description: "Editorial portfolio and creative archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable}
        ${cormorant.variable}
        h-full
        antialiased
      `}
    >
      <body className="min-h-full bg-[#f7f1eb] font-sans text-[#201c1a]">
        {children}
      </body>
    </html>
  );
}
