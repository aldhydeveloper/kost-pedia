"use client";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Loading from "./loading";
import { Provider } from "react-redux";
import { store } from "@/store";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      // this is a simple animation that fades in the page. You can do all kind of fancy stuff here
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      <Provider store={store}>
        {children}
      </Provider>
    </motion.div>
  );
}
