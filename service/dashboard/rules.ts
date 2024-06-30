import { getCookie } from "cookies-next";
const Rules = () => {
  const res = fetch(`${process.env.NEXT_PUBLIC_API_HOST}/rule`, {
    method: "GET",
    // cache: "force-cache",
    next: { revalidate: 1000 },
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  }).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default Rules;
