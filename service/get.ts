import { getCookie } from "cookies-next";

const Get = async (url: string, cache: RequestCache = "no-store") => {
  const res = await fetch(url, {
    method: "GET",
    cache,
    next: { revalidate: 3600 * 12 },
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  })
    .then((resp) => resp.json())
    .catch((error) => error);
  // console.log(res);
  return res;
};

export default Get;
