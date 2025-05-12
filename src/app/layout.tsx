import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusConnect",
  description: "Buy, sell, and trade with other students on your campus.",
  keywords: ['campus', 'marketplace', 'students', 'listings', 'buy', 'sell'],
  openGraph: {
    title: 'CampusConnect',
    description: 'A student marketplace for buying and selling on campus.',
    type: 'website',
    url: 'https://campusconnect.example.com',
  },
  twitter: {
    card: 'summary',
    title: 'CampusConnect',
    description: 'A student marketplace for buying and selling on campus.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <Navbar />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} /> 
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
