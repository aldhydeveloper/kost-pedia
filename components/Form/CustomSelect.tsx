type tOption = {
  id?: string;
  value?: string;
  name?: string;
};
type tProps = {
  label?: string;
  onChange?: (event: any) => void;
  option: tOption[];
};
export default function Select({ label, option, ...otherProps }: tProps) {
  return (
    <div className="mb-4">
      <label className="mb-2 block">{label}</label>
      <select
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
        {...otherProps}
      >
        {option
          ? option.map((v, i) => {
              return (
                <option key={v.id} value={v.id}>
                  {v.value ? v.value : v.name}
                </option>
              );
            })
          : ""}
      </select>
    </div>
  );
}
