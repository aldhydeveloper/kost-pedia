// "use client";
import type { Metadata } from "next";
import React from "react";
import localFont from 'next/font/local'
import "./globals.css";

// import Navbar from "@/components/Navbar/navbar";
// import Footer from "@/components/Footer/footer";

const gotham = localFont({
  src: '../assets/fonts/Figtree/Figtree-VariableFont_wght.ttf',
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
      <head>
        <meta name="robots" content="index, follow"  />
        <meta name="google-adsense-account" content="ca-pub-7687063653857622"></meta>
      </head>
      <body className={gotham.className}>
        {children}
      </body>
    </html>
  );
}
