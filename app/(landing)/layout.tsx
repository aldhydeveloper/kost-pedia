import type { Metadata } from "next";

import React from "react";

import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import Script from 'next/script'

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
    
    {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
