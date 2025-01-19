import { getCookie } from "cookies-next";
interface iForm {
  url: string;
  body: any;
}
const Post = (url: string, body: Object) => {
  const res = fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
  // console.log(JSON.stringify(body));
  return res;
};

export default Post;
