interface iProps {
  name: string;
  value?: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  type?: string;
  label?: string | undefined;
  placeholder?: string;
}
export default function Textarea({
  name,
  onChange,
  value,
  label = "",
  placeholder = "",
  ...otherProps
}: iProps) {
  // console.log(name);
  return (
    <div className={label ? "mb-2" : ""}>
      {label ? <label className="mb-2 inline-block">{label}</label> : ""}
      <textarea
        placeholder={placeholder}
        value={value ?? ''}
        name={name}
        onChange={onChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
        {...otherProps}
      ></textarea>
    </div>
  );
}
