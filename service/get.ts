import { getCookie } from "cookies-next";
const Get = (url: string, cache: RequestCache = "no-store") => {
  const res = fetch(url, {
    method: "GET",
    cache,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  }).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default Get;
