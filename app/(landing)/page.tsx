"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

import Slide from "@/components/Slide/slide";
import WrapSearch from "@/components/Search/wrap";
import NextNProgress from "nextjs-progressbar";
import { motion } from "framer-motion";

import "react-loading-skeleton/dist/skeleton.css";

import TrackVisibility from "react-on-screen";

const TabProduct = dynamic(() => import("@/components/Product/tab"));
const Budget = dynamic(() => import("@/components/Budget/budget"));
const PopularCity = dynamic(() => import("@/components/Populer/city"));
const PopularCampus = dynamic(() => import("@/components/Populer/campus"));

// import Product from '@/components/Product/product'
// import { Suspense, lazy } from 'react'
// import Loading from './loading'

// const Product = lazy(() => import('@/components/Product/product'))

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <WrapSearch onHide={() => setShow(false)} show={show} />
      <NextNProgress />
      <div className="grid grid-cols-2 max-h-[70vh]">
        <Slide />
        <div className="bg-gradient-to-b from-azure-400 to-azure-200  text-white flex flex-col justify-center px-10 rounded-br-[8rem]">
          <small className="text-azure-900 font-bold">Kostpedia</small>
          <h2 className="text-2xl font-bold mb-7">Cari Hunian terbaik anda.</h2>
          <button
            className="text-left rounded-full bg-white text-slate-400 px-4 py-2"
            onClick={() => setShow(true)}
          >
            Cari Lokasi ...
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container px-8 mb-20 mx-auto"
      >
        <TabProduct />
        <br />
        <br />
        <Budget />
        <br />
        <br />
        <PopularCity />
        <br />
        <br />
        <PopularCampus />
      </motion.div>
    </>
  );
}
