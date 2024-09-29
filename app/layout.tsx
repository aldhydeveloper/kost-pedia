// "use client";
import type { Metadata } from "next";
import React from "react";
import { Figtree } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={gotham.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}
