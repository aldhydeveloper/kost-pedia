import City from "@/service/dashboard/city";
const getCity = async (id: number) => {
  // console.log(id);
  const resp = await City(id);
  return resp.json();
};

interface iProps {
  province: number;
}

const SelectCity = ({ province }: iProps) => {
  const city = getCity(province);
  return <></>;
};

export default SelectCity;
