// "use client";
import type { Metadata } from "next";
import React from "react";
import { Figtree } from "next/font/google";
import "./globals.css";
import Script from 'next/script'

// import Navbar from "@/components/Navbar/navbar";
// import Footer from "@/components/Footer/footer";

const gotham = Figtree({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});


export const metadata: Metadata = {
  title: "Kostpedia",
  description: "Tempatnya orang orang mencari kosan dengan mudah.",
  icons: [
    { rel: "icon", url: "/favicon.png", sizes: "32 x 16", type:"image/png"},
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={gotham.className}>
        {children}
      </body>
    </html>
  );
}
