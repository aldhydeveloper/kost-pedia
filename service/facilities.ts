import { getCookie } from "cookies-next";
const Facilities = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/facility`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  // console.log(res);
  return res.json();
};

export default Facilities;
