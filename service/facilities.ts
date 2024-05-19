import { getCookie } from "cookies-next";
const Facilities = (type = 1) => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/facility/type/${type}`,
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

export default Facilities;
