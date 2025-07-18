interface iProps {
  name: string;
  className?: string;
  classNameParent?: string;
  value?: string | number;
  type?: string;
  label?: string | undefined;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  name,
  value,
  type = "text",
  label = "",
  placeholder = "",
  className = "",
  disabled = false,
  classNameParent = "",
  onChange = () => {},
  ...otherProps
}: iProps) {
  return (
    <div className={`${label ? "mb-3" : ""} ${classNameParent}`}>
      {label ? <label className="mb-2 inline-block">{label}</label> : ""}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500 read-only:bg-gray-2 read-only:cursor-default ${className}`}
        {...otherProps}
      />
    </div>
  );
}
