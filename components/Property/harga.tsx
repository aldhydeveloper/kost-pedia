import { NumericFormat } from "react-number-format";
interface iPrice {
  price: number | string;
  priceYear: number | string;
}
interface iProps {
  price: iPrice;
  setPrice: React.Dispatch<React.SetStateAction<iPrice>>;
}
export default function Harga({ price, setPrice }: iProps) {
  return (
    <>
      <label className="mb-2 inline-block">Harga Bulanan</label>
      <NumericFormat
        value={price.price}
        onValueChange={(values) => {
          // const { values } = values;
          // setForm({
          //   ...form,
          //   price: floatValue,
          // });value
          setPrice({ ...price, price: parseInt(values.value) });
          // do something with floatValue
        }}
        prefix="Rp. "
        thousandSeparator="."
        decimalSeparator=","
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
      />
      <label className="mb-2 inline-block">Harga Tahunan</label>
      <NumericFormat
        value={price.priceYear}
        onValueChange={(values) => {
          // console.log(value);
          setPrice({
            ...price,
            priceYear: values.value ? parseInt(values.value) : "",
          });
          // do something with floatValue
        }}
        prefix="Rp. "
        thousandSeparator="."
        decimalSeparator=","
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
      />
    </>
  );
}
