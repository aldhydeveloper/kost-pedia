import { MultiSelect } from "react-multi-select-component";
type tOption = {
  label: string;
  value: string | number;
};
type tProps = {
  label?: string;
  onChange: React.Dispatch<React.SetStateAction<tOption[]>>;
  value: tOption[];
  options: tOption[];
};
export default function Select({
  label,
  options,
  value,
  onChange,
  ...otherProps
}: tProps) {
  return (
    <div className="mb-4">
      <label className="mb-2 block">{label}</label>

      <MultiSelect
        className=""
        options={options}
        value={value}
        onChange={onChange}
        labelledBy="Select"
      />
    </div>
  );
}
