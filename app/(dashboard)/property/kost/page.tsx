"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import KostLink from "@/components/Utility/Link";
import Button from "@/components/Utility/CustomButton";
import { NumericFormat } from "react-number-format";
// import Product from "@/components/Property/kost/ListKost";
import Get from "@/service/get";
import Card from "@/components/Card";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { FaChevronDown } from "react-icons/fa6";
import "react-accessible-accordion/dist/fancy-example.css";
// import "react-slidedown/lib/slidedown.css";
interface iRooms {
  id: string;
  name: string;
  price: number;
  size: string;
}
interface iProduct {
  id: string;
  name: string;
  category: string;
  address: string;
  front_image: string;
  status: number;
  rooms: iRooms[];
}
// const getData = async () => {

// }
const Kost = () => {
  // console.log(Product());
  const [listKost, setListKost] = useState<iProduct[]>();
  const [open, setOpen] = useState<boolean[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const products = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/kost`);
      if (products.success) {
        setListKost(products.data);
      }
      // console.log(products);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-bold">Daftar Kost</h1>
        <KostLink href="/property/kost/form">Tambah Product</KostLink>
      </div>
      <Accordion allowMultipleExpanded allowZeroExpanded className="border-0">
        <div className="inline-grid grid-cols-3 gap-4 items-start">
          {listKost &&
            listKost.map((value, index) => {
              return (
                <Card key={index} customClass="py-3">
                  <div className="grid grid-cols-4">
                    <div className="col-span-3 pr-2">
                      <h5 className="text-sm text-azure-700">
                        {value.category}
                      </h5>
                      <h3 className="text-base font-bold mb-2">{value.name}</h3>
                      <p className="text-xs leading-4">{value.address}</p>
                    </div>
                    <Image
                      src={value.front_image}
                      alt="thumbnil"
                      width={200}
                      height={100}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label
                      className={`block text-center my-3 rounded-full font-bold px-3 py-1 text-xs ${
                        value.status == 1
                          ? "bg-azure-200 text-azure-700"
                          : "bg-[#fee6e5] text-meta-1"
                      }`}
                    >
                      {value.status == 1 ? "Aktif" : "Non Aktif"}
                    </label>
                    <Link
                      href={`/property/kost/form/${value.id}`}
                      role="link"
                      className="text-sm text-azure-600"
                    >
                      Ubah Kost
                    </Link>
                  </div>
                  <AccordionItem key={value.id}>
                    <AccordionItemHeading className="mb-2">
                      <AccordionItemButton className="flex justify-between items-center text-azure ">
                        <span>Detail Kamar</span>
                        <FaChevronDown />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="p0 accordion__panel !p-0">
                      {value.rooms &&
                        value.rooms.map((v) => (
                          <div
                            key={v.id}
                            className="flex items-center justify-between"
                          >
                            <div className="wrap py-1">
                              <p className="text-sm font-bold">{v.name}</p>
                              <NumericFormat
                                value={v.price}
                                displayType="text"
                                prefix="Harga : Rp. "
                                thousandSeparator="."
                                decimalSeparator=","
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Button
                                role="link"
                                className="text-sm float-right"
                                href={`/property/room/${v.id}`}
                              >
                                Ubah Kamar
                              </Button>
                            </div>
                          </div>
                        ))}
                    </AccordionItemPanel>
                  </AccordionItem>
                </Card>
              );
            })}
        </div>
      </Accordion>
      {/* <Product /> */}
    </>
  );
};

export default Kost;
