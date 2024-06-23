"use client";
import { useRef, useEffect, useState, memo } from "react";
import { PatternFormat } from "react-number-format";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import Select from "@/components/Form/CustomSelect";
import Get from "@/service/get";
import Checkbox from "@/components/Checkboxes/Checkbox";

interface iDataKost {
  name: string;
  desc: string;
  created_year: string;
  category: string;
}
interface iStateDataKost {
  dataKost: iDataKost;
  handleDataKost: (e: any) => void;
  // validateKost: (e: any) => void;
}
interface iRule {
  id: number;
  name: string;
}
const DataKost = memo(function DataKost({
  dataKost,
  handleDataKost,
}: // validateKost,
iStateDataKost) {
  const [rules, setRules] = useState<iRule[]>();
  const handleState = (name: string, value: string) => {
    handleDataKost({ ...dataKost, [name]: value });
  };

  useEffect(() => {
    const getRule = async () => {
      const data = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/rule`);
      setRules(data);
    };

    getRule();
  }, []);
  console.log("render kost");
  // console.log(dataKost);
  return (
    <>
      <Input
        label="Nama Kost"
        name="name"
        value={dataKost.name}
        onChange={(e) => {
          handleState("name", e.target.value);
          // validateKost()
          // console.log(dataKost.map((v:iDataKost) => {
          //   return v !== ''
          // }))
          // console.log(dataKost);
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
              id: "",
              name: "-- Select Category --",
            },
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
      <p className="mb-2">Peraturan Kost</p>
      {rules && (
        <ul className="grid grid-cols-2 gap-2 mb-8">
          {rules.map((v) => (
            <li key={v.id}>
              <Checkbox
                id={`check${v.id}`}
                value={v.id}
                label={v.name}
                name="rule"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
export default DataKost;
export type { iDataKost };
