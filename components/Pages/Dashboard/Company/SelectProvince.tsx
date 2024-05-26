import Province from "@/service/dashboard/province";
const getProvince = async () => {
  // console.log(id);
  const resp = await Province();
  return resp.json();
};

interface iProps {
  province: number;
}

const SelectProvince = () => {
  const province = getProvince();
  return <></>;
};

export default SelectProvince;
