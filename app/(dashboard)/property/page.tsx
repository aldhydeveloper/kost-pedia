"use client";

import { NumericFormat } from "react-number-format";
import Image from "next/image";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import Radio from "@/components/Checkboxes/Radio";
import Checkbox from "@/components/Checkboxes/Checkbox";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import File from "@/components/Form/CustomFile";
import Card from "@/components/Card";
import Button from "@/components/Utility/CustomButton";
import { useRouter } from "next/navigation";
import { Product } from "@/service";
import { getCookie } from "cookies-next";
import { Facilities } from "@/service";
import ProductList from "@/service/product/list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import Link from "@/components/Utility/Link";

type tFacility = {
  id: string;
  name: string;
};
type tRow = {
  name: string;
  price: string;
  facilities: tFacility[];
  desc: string;
};
const columns = [
  {
    name: "Name",
    selector: (row: tRow) => row.name,
  },
  {
    name: "Price",
    cell: (row: tRow) => (
      <NumericFormat
        displayType="text"
        prefix="Rp. "
        thousandSeparator="."
        decimalSeparator=","
        value={row.price}
      />
    ),
  },
  {
    name: "Facilities",
    selector: (row: tRow) => {
      const facilities = row.facilities.map((v, i) => {
        return v.name;
      });
      return facilities.join(", ");
    },
  },
  {
    name: "Description",
    selector: (row: tRow) => row.desc,
  },
];
const Property = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    // console.log(ProductList());
    const products = ProductList();
    products.then((resp) => {
      // console.log(resp);
      setList(resp);
    });
  }, []);
  return (
    <>
      <Link href="/property/form">Tambah Product</Link>
      <div className="my-4">
        <DataTable columns={columns} data={list}></DataTable>
      </div>
    </>
  );
};

export default Property;
