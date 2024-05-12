import { getCookie } from "cookies-next";
const City = (url: string) => {
  const res = fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default City;
