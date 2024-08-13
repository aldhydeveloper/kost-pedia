"use client";
import { useRef, useEffect, useState, memo } from "react";
import { PatternFormat } from "react-number-format";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import Select from "@/components/Form/CustomSelect";
import Get from "@/service/get";
import Checkbox from "@/components/Checkboxes/Checkbox";

import Rules from "@/service/dashboard/rules";

interface iDataKost {
  name: string;
  desc: string;
  created_year: string;
  category: string;
  kost_rules: number[];
  admin_kost_name: string;
  admin_kost_phone: string;
}
interface iStateDataKost {
  dataKost: iDataKost;
  handleDataKost: (e: any) => void;
  callbackRuleList: (e: any) => void;
  ruleList: iRule[];
  // validateKost: (e: any) => void;
}
interface iRule {
  id: number;
  name: string;
}
const DataKost = memo(function DataKost({
  dataKost,
  handleDataKost,
  callbackRuleList,
  ruleList,
}: // validateKost,
iStateDataKost) {
  const [rules, setRules] = useState<iRule[]>();
  const [checkedRules, setChecked] = useState<boolean>();
  const handleState = (name: string, value: string | number[]) => {
    handleDataKost({ ...dataKost, [name]: value });
  };

  useEffect(() => {
    if (ruleList.length == 0) {
      const getRule = async () => {
        // const data = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/rule`);
        const dataRules = await Rules();
        if (dataRules.data) {
          setRules(dataRules.data);
          callbackRuleList(dataRules.data);
        }
        // console.log(dataRules);
      };
      getRule();
    } else {
      setRules(ruleList);
    }
  }, [ruleList, callbackRuleList]);
  console.log("render kost");
  // console.log(dataKost);
  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <Input
          classNameParent="col-span-2"
          label="Nama Kost"
          name="name"
          value={dataKost.name}
          onChange={(e) => {
            handleState("name", e.target.value);
          }}
        />
        <div className="col-span-1">
          <label className="mb-2 inline-block text-nowrap">
            Tahun kost dibangun
          </label>
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
          classNameParent="col-span-2"
          label="disewakan untuk"
          value={dataKost.category}
          option={[
            {
              id: "",
              name: "-- Pilih Katergori --",
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
      <Textarea
        label="Deskripsi Kost"
        name="desc"
        value={dataKost.desc}
        onChange={(e) => {
          handleState("desc", e.target.value);
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nama Admin Kost"
          name="admin_kost_name"
          value={dataKost.admin_kost_name}
          onChange={(e) => {
            handleState("admin_kost_name", e.target.value);
          }}
        />
        <Input
          label="No. Telp Admin Kost"
          name="admin_kost_phone"
          value={dataKost.admin_kost_phone}
          onChange={(e) => {
            handleState("admin_kost_phone", e.target.value);
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
                checked={dataKost.kost_rules.includes(v.id)}
                name="rule"
                onChange={({ target }) => {
                  // const newRule = facilities.map((v: iRule) => {
                  const val = parseInt(target.value);
                  console.log(target.checked);
                  let temp: number[] = [];
                  if (target.checked) {
                    temp = [...dataKost.kost_rules, val];
                  } else {
                    temp = dataKost.kost_rules.filter((id) => id !== val);
                  }
                  console.log(temp);
                  // setChecked(temp);
                  // handleChangeChoose(temp);
                  handleState("kost_rules", temp);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
export default DataKost;
export type { iDataKost, iRule };
