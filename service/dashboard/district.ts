import { getCookie } from "cookies-next";
const City = (id: number) => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/district/byprovince/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }
  ).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default City;
