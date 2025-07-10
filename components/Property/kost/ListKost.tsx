import Get from "@/service/get";
const getData = async () => {
  const products = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/kost`);
  // console.log(products);
  return products;
};

export default async function Kost() {
  const data = await getData();
  console.log(data);
  return <></>;
}
