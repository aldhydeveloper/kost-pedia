"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
// import Gt3 from './gt3';

import Loading from "@/components/Product/loading";
const loadingOpt = {
  loading: () => <Loading iteration={10} />,
  ssr: false,
};
const Lt3 = dynamic(() => import("./lt3"), { ...loadingOpt });
const Between34 = dynamic(() => import("./between35"), { ...loadingOpt });
const Gt5 = dynamic(() => import("./gt5"), { ...loadingOpt });
// const Apartment = dynamic(
//   () => import('./apartment'),
//   {...loadingOpt}
// )
export default function Budget() {
  const [budget, setBudget] = useState<string>("3m");
  const [container, setContainer] = useState<JSX.Element>(<Lt3 />);
  const hoverClass = "text-white bg-azure-800 border-azure-800";

  // useEffect(() => {
  const setComponent = (active: string, comp: JSX.Element) => {
    setBudget(active);
    setContainer(comp);
  };
  // })
  // console.log(hoverClass)
  return (
    <div>
      <h2 className="text-xl text-bold mb-3">Cari Hunian Sesuai Budget</h2>
      <ul className="flex mb-4">
        <li
          className={`border py-1 px-5 rounded-l-md cursor-pointer ${
            budget == "3m" && hoverClass
          }`}
          onClick={() => {
            setComponent("3m", <Lt3 />);
          }}
        >
          &lt; 3 Juta
        </li>
        <li
          className={`border py-1 px-5 cursor-pointer ${
            budget == "35m" && hoverClass
          }`}
          onClick={() => {
            setComponent("35m", <Between34 />);
          }}
        >
          3 - 5 Juta
        </li>
        <li
          className={`border py-1 px-5 rounded-r-md cursor-pointer ${
            budget == "5m" && hoverClass
          }`}
          onClick={() => {
            setComponent("5m", <Gt5 />);
          }}
        >
          &gt; 5 Juta
        </li>
      </ul>
      {container}
    </div>
  );
}
