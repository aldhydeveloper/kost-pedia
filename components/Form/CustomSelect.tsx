import LoadingOverlay from "react-loading-overlay-ts";

type tOption = {
  id?: string | number;
  value?: string;
  name?: string;
};
type tProps = {
  isLoading?: boolean;
  name?: string;
  id?: string;
  label?: string;
  value?: number | string;
  defaultValue?: number | string;
  classNameParent?: string;
  className?: string;
  onChange?: (event: any) => void;
  option: tOption[];
};
export default function Select({
  label,
  value,
  defaultValue,
  option,
  isLoading,
  classNameParent,
  className,
  ...otherProps
}: tProps) {
  // console.log(label);
  return (
    <div className={`mb-4 ${classNameParent}`}>
      {label && <label className="mb-2 block">{label}</label>}
      <LoadingOverlay
        active={isLoading}
        styles={{
          overlay: (base) => ({
            ...base,
            fadeSpeed: 50,
            borderRadius: "4px",
            background: "rgba(0, 0, 0, 0.25)",
          }),
        }}
      >
        <select
          defaultValue={defaultValue}
          value={value}
          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter ${className}`}
          {...otherProps}
        >
          {option.length > 0
            ? option.map((v, i) => {
                return (
                  <option key={v.id} value={v.id}>
                    {v.value ? v.value : v.name}
                  </option>
                );
              })
            : ""}
        </select>
      </LoadingOverlay>
    </div>
  );
}
