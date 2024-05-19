"use client";

import { NumericFormat } from "react-number-format";
import Image from "next/image";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import ProductList from "@/service/product/list";
import DataTable from "react-data-table-component";
import Link from "@/components/Utility/Link";

type tFacility = {
  id: string;
  name: string;
};
type tRow = {
  id: number;
  name: string;
  price: string;
  facilities: tFacility[];
  desc: string;
};
const columns = [
  {
    name: "Name",
    cell: (row: tRow) => (
      <Link
        href={`/property/form?id=${row.id}`}
        role="link"
        className="text-md btn-link"
      >
        {row.name}
      </Link>
    ),
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
    const products = ProductList();
    products.then((resp) => {
      setList(resp.data);
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
