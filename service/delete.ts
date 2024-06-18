import { getCookie } from "cookies-next";
const Delete = (url: string) => {
  const res = fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default Delete;
