import { getCookie } from "cookies-next";
const Province = () => {
  const res = fetch(`${process.env.NEXT_PUBLIC_API_HOST}/province`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default Province;
