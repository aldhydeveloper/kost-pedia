export default function File(props: any) {
  return (
    <>
      <div className="mb-2">
        <label className="leading-4 block dark:text-white">{props.label}</label>
        <small>{props.note}</small>
      </div>
      <input
        type="file"
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
        // onChange={onChange}
        {...props}
      />
    </>
  );
}
