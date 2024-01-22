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
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
    // <html lang="en">
    // <body className={nunito.className}>
    // </body>
    // </html>
  );
}
