import { NumericFormat } from "react-number-format";
interface iInput {
  label: string;
  value: number | string;
  name: string;
  decimalScale?: number;
  onChange: (values: any) => void;
}

export default function Input({
  onChange,
  value,
  name = "",
  label = "",
  decimalScale = 0,
}: iInput) {
  return (
    <div>
      {label && <label className="mb-2 inline-block">{label}</label>}
      <NumericFormat
        name={name}
        value={value}
        onValueChange={onChange}
        // decimalScale={decimalScale}
        // onValueChange={onChange}
        prefix="Rp. "
        thousandSeparator="."
        decimalSeparator=","
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter"
      />
    </div>
  );
}
