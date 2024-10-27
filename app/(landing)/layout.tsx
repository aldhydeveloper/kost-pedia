import type { Metadata } from "next";
import React from "react";

import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";

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
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
