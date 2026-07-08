import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "US Mortgage Calculator",
  description: "Estimate your total monthly house payment including taxes and insurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="monetag" content="9adffa1c33e3b00d176181fcb589cad8" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
