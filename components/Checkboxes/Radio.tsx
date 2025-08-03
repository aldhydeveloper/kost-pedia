"use client";

import { ChangeEvent } from "react";

interface iPorps {
  id: string;
  name: string;
  checked?: boolean;
  label?: string;
  value?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Radio({
  id,
  name,
  checked = false,
  label = "",
  value = "",
  onChange = (e: ChangeEvent<HTMLInputElement>) => {},
}: iPorps) {
  // const [isChecked, setIsChecked] = useState(checked);

  return (
    <>
      <input
        type="radio"
        name={name}
        id={id}
        value={value ?? ''}
        className="sr-only peer"
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id} className="flex items-center peer-checked:is-checked group cursor-pointer">
        <span
          className={`rounded-full border w-4 h-4 relative box-content flex items-center justify-center ${
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
