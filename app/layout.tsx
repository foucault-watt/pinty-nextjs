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
  title: "Coin-Coin",
  description: "Gérer votre cave à bière simplement",
  verification: {
    google: "TOkVRHTG-kfIR3RBIaAgWFCDguFGvreMeC26btwRSkE",
  },
};

export const appleWebAppMeta = (
  <meta name="apple-mobile-web-app-title" content="Pinty" />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
