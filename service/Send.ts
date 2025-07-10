import { getCookie } from "cookies-next";
interface iForm {
  url: string;
  body: any;
}
const Send = (url: string, method: string, body: Object) => {
  const res = fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default Send;
