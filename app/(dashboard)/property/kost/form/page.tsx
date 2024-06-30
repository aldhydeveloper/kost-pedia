"use client";
import { useState, memo, useEffect, useRef } from "react";
import Card from "@/components/Card";
import Button from "@/components/Utility/CustomButton";

import DataKost, {
  iDataKost,
  iRule,
} from "@/components/Property/kost/DataKost";
import AddressKost, {
  iAddressKost,
  iCampus,
} from "@/components/Property/kost/AddresssKost";
import FotoKost, { tFoto, tFile } from "@/components/Property/kost/FotoKost";
import FacilitiesKost, {
  tFacility,
} from "@/components/Property/kost/FacilitiesKost";
import TypeKost, { tRooms } from "@/components/Property/kost/TypeKost";
import PriceKost from "@/components/Property/kost/PriceKost";

import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const sidebar = [
  "Data Kost",
  "Alamat Kost",
  "Foto Kost",
  "Fasilitas",
  "Type Kamar",
  "Harga Kost",
];

const List = function List({
  handleChange,
  currentStep,
}: {
  handleChange: (i: number) => void | undefined;
  currentStep: number;
}) {
  // console.log(currentStep);
  // const rr = Array.from({ length: currentStep }, (v, i) => i++);
  // const [step, setStep] = useState<number>(currentStep);

  // const currentStep;
  const handleStep = (e: any) => {
    const i = e.currentTarget.id.split("-")[1];
    // console.log(i);
    handleChange(parseInt(i));
  };
  // console.log("render list");
  return (
    <>
      <ul role="sidebar">
        {sidebar.map((v, i) => {
          return (
            <li
              key={i}
              id={`list-${i}`}
              className={`pb-1 flex items-center gap-2 ${
                i <= currentStep ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={i <= currentStep ? handleStep : undefined}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full border-2 ${
                  i <= currentStep
                    ? "border-azure-700 bg-azure-700"
                    : " opacity-55"
                }`}
              ></span>
              <span
                className={`${
                  i <= currentStep ? "text-azure-700" : "opacity-55"
                }`}
              >
                {v}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};
const Kost = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [dataKost, setDataKost] = useState<iDataKost>({
    name: "",
    desc: "",
    created_year: "",
    category: "",
    rules: [],
  });
  const [dataAddress, setDataAddress] = useState<iAddressKost>({
    full_address: "",
    province: 0,
    city: 0,
    district: 0,
    village: 0,
    campus: [],
  });
  const [dataFoto, setDataFoto] = useState<tFoto>({
    front_image: "",
    inside_image: [],
    street_image: "",
  });
  const [dataType, setDataType] = useState<tRooms[]>([]);
  const [dataFacilities, setDataFacilities] = useState<tFacility[]>([]);
  const [step, setStep] = useState<number>(0);

  const ruleList = useRef<iRule[]>([]);
  const callbackStep = (step: number) => {
    // console.log(step);
    setStep(step);
    // return Array.from({ step }, (v, i) => i++);
  };
  const callbackRuleList = (rules: iRule[]) => {
    ruleList.current = rules;
  };
  const cs = () => {};
  const onClickStep = () => {
    setStep(step + 1);
  };
  const onSubmit = () => {};
  const length = 10;
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <List handleChange={callbackStep} currentStep={step} />
        </Card>
        <div className="col-span-3 relative">
          <Card>
            <form onSubmit={onSubmit}>
              <motion.div
                key={step}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {step == 0 && (
                  <DataKost
                    dataKost={dataKost}
                    callbackRuleList={callbackRuleList}
                    ruleList={ruleList.current}
                    handleDataKost={(data) => {
                      setDataKost(data);
                      const kost = Object.keys(data)
                        .map((value) => data[value])
                        .filter(
                          (value) => value === "" || value.length === 0
                        ).length;
                      setDisabled(kost > 0);
                      // console.log(kost);
                    }}
                    // validateKost={() => {}}
                  />
                )}
                {step == 1 && (
                  <AddressKost
                    address={dataAddress}
                    setAddress={(name: string, value: string | iCampus[]) => {
                      setDataAddress({ ...dataAddress, [name]: value });
                    }}
                  />
                )}
                {step == 2 && (
                  <FotoKost
                    foto={dataFoto}
                    handleFotoKost={(name: string, value: tFile) => {
                      setDataFoto({ ...dataFoto, [name]: value });
                    }}
                  />
                )}
                {step == 3 && (
                  <FacilitiesKost
                    dataFacilities={dataFacilities}
                    handleDataFacilities={(facilities: tFacility[]) => {
                      setDataFacilities(facilities);
                    }}
                  />
                )}
                {step == 4 && (
                  <TypeKost
                    typeKost={dataType}
                    callback={(type) => {
                      setDataType(type);
                    }}
                  />
                )}
                {step == 5 && (
                  <PriceKost
                    dataRooms={dataType}
                    // callback={(type) => {
                    //   setDataType(type);
                    // }}
                  />
                )}
              </motion.div>
            </form>
            <div className="inline-flex items-center justify-between w-full">
              <IconContext.Provider
                value={{ size: "1rem", className: "inline-block" }}
              >
                <Button
                  size="sm"
                  className={`inline-flex items-center justify-start ${
                    step == 0 && "invisible"
                  }`}
                  onClick={() => setStep(step - 1)}
                  inline
                >
                  <FaChevronLeft />
                  <p>Back</p>
                </Button>
                <Button
                  size="sm"
                  className={`inline-flex items-center justify-end ${
                    step == sidebar.length - 1 && "invisible"
                  }`}
                  onClick={() => setStep(step + 1)}
                  // disabled={disabled}
                  inline
                >
                  Lanjutkan
                  <FaChevronRight />
                </Button>
              </IconContext.Provider>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Kost;
