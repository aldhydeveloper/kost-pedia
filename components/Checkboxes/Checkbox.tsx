"use client";

import { useState } from "react";

interface iPorps {
  id: string;
  name: string;
  checked?: boolean;
  label?: string;
  value?: any;
  onChange?: (event: any) => void;
}

export default function Checkbox({
  id,
  name,
  value,
  checked,
  label = "",
  onChange = () => {},
  ...otherProps
}: // ,
iPorps) {
  // const [checked, setChecked] = useState<boolean>(false);
  // const onClick = (e: any) => {
  //   setChecked(e.currentTarget.checked);
  //   onChange;
  // };
  // console.log(checked);
  return (
    <>
      <input
        type="checkbox"
        name={name}
        value={value}
        id={id}
        className="sr-only peer"
        onChange={onChange}
        checked={checked}
        {...otherProps}
      />
      <label
        htmlFor={id}
        className={`flex items-center peer-checked:is-checked group cursor-pointer`}
      >
        <span
          className={`rounded-sm border w-4 h-4 relative box-content flex items-center justify-center flex-shrink-0 ${
            label ? "me-3" : ""
          } ${checked ? "border-azure-500" : ""}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              checked ? "bg-azure-600" : "bg-transparent"
            }`}
          ></span>
        </span>
        <span>{label}</span>
      </label>
    </>
  );
}
