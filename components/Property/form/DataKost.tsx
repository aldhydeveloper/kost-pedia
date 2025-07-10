"use client";
import { useRef, useEffect, useState, memo } from "react";
import { PatternFormat } from "react-number-format";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import Select from "@/components/Form/CustomSelect";

import Get from "@/service/get";
interface iDataKost {
  name: string;
  desc: string;
  created_year: string;
  category: string;
}
interface iStateDataKost {
  dataKost: iDataKost;
  handleDataKost: (e: any) => void;
}
const DataKost = memo(function DataKost({
  dataKost,
  handleDataKost,
}: iStateDataKost) {
  // console.log("render this");
  // const [data, setData] = useState<iDataKost>({
  //   name: "",
  //   desc: "",
  //   created_year: "",
  //   category: "",
  // });

  const handleState = (name: string, value: string) => {
    handleDataKost({ ...dataKost, [name]: value });
  };

  useEffect(() => {}, []);
  console.log("render kost");
  return (
    <>
      <Input
        label="Nama Kost"
        name="name"
        value={dataKost.name}
        onChange={(e) => {
          handleState("name", e.target.value);
        }}
      />
      <Textarea
        label="Deskripsi Kost"
        name="desc"
        value={dataKost.desc}
        onChange={(e) => {
          handleState("desc", e.target.value);
        }}
      />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-2 inline-block">Tahun kost dibangun</label>
          <PatternFormat
            value={dataKost.created_year}
            onValueChange={(values) => {
              handleState("created_year", values.value);
            }}
            mask="_"
            format="####"
            allowEmptyFormatting
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
          />
        </div>
        <Select
          label="disewakan untuk"
          option={[
            {
              id: "Putra",
              name: "Putra",
            },
            {
              id: "Putri",
              name: "Putri",
            },
            {
              id: "Campur",
              name: "Campur",
            },
          ]}
          onChange={({ target }) => {
            handleState("category", target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Nama Kost"
          name="name"
          value={dataKost.name}
          onChange={(e) => {
            handleState("name", e.target.value);
          }}
        />
      </div>
    </>
  );
});
export default DataKost;
