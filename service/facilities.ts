import { getCookie } from "cookies-next";
const Facilities = () => {
  const res = fetch(`${process.env.NEXT_PUBLIC_API_HOST}/facility`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default Facilities;
