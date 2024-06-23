"use client";
import { useState, memo, useEffect } from "react";
import DataKost, { iDataKost } from "@/components/Property/kost/DataKost";
import Card from "@/components/Card";
import Button from "@/components/Utility/CustomButton";

import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const sidebar = [
  "Data Kost",
  "Alamat Kost",
  "Foto Kost",
  "Type Kamar",
  "Fasilitas",
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
    handleChange(i);
  };
  console.log("render list");
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
  });
  const [step, setStep] = useState<number>(0);

  const callbackStep = (step: number) => {
    setStep(step);
    // return Array.from({ step }, (v, i) => i++);
  };
  const cs = () => {};
  const onClickStep = () => {
    setStep(step + 1);
  };
  const onSubmit = () => {};
  const length = 10;
  // const array = Array.from({ length }, (v, i) => i + 1);
  // console.log();
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
                    handleDataKost={(data) => {
                      setDataKost(data);
                      const kost = Object.keys(data)
                        .map((value, key) => data[value])
                        .filter((value, key) => value === "").length;
                      setDisabled(kost > 0);
                      // console.log(kost);
                    }}
                    // validateKost={() => {}}
                  />
                )}
                {step == 1 && <div>asd</div>}
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
                  className="inline-flex items-center justify-end"
                  onClick={() => setStep(step + 1)}
                  disabled={disabled}
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
