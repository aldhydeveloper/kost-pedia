interface iProps {
  name: string;
  value?: string | number;
  type?: string;
  label?: string | undefined;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  name,
  value,
  type = "text",
  label = "",
  placeholder = "",
  onChange = () => {},
}: iProps) {
  return (
    <div className={label ? "mb-2" : ""}>
      {label ? <label className="mb-2 inline-block">{label}</label> : ""}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
      />
    </div>
  );
}