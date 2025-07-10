"use client";
import products from "@/data/product.json";
import Product from "./core";
import Rooms from "@/service/landing/rooms";
import { useEffect, useState, use } from "react";

async function getKost() {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve("resolved");
  //     }, 4000);
  //   });
  // console.log(Rooms());
  const res = await Rooms();
  // if (res.success) {
  //   return (
  //     <>
  //       <Product data={res?.data} folder="Kost" />
  //     </>
  //   );
  // }
  return res;
  // res.then((resp) => console.log(resp));
  // console.log(res);
  // return Rooms();
}

const data = getKost();
export default function Kost() {
  // const [data, setData] = useState<JSX.Element>(<>Loading ..</>);
  const kosts = use(data);
  // useEffect(() => {
  //   kosts.then((resp) => {
  //     setData(<Product data={resp?.data} folder="Kost" />);
  //   });
  // }, [kosts]);
  // console.log(kosts);
  // const res = data;
  // console.log(data);
  return (
    <>
      <Product data={kosts?.data} folder="Kost" />
    </>
  );
}
