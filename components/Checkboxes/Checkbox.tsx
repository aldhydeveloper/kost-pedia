"use client";
interface iPorps {
  id: string;
  name: string;
  checked?: boolean;
  label?: string;
  value?: any;
  onClick?: (event: any) => void;
}

const oon = () => {
  console.log("dasd");
};
export default function Checkbox({
  id,
  name,
  value,
  checked = false,
  label = "",
  onClick = () => {},
}: iPorps) {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        value={value}
        id={id}
        className="sr-only peer"
        onChange={onClick}
        // checked={checked}
      />
      <label
        htmlFor={id}
        className="flex items-center peer-checked:is-checked group cursor-pointer"
      >
        <span
          className={`rounded-sm border w-4 h-4 relative box-content flex items-center justify-center ${
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
