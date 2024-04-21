import { getCookie } from "cookies-next";
const ProductList = () => {
  const res = fetch(`${process.env.NEXT_PUBLIC_API_HOST}/room`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }).then((resp) => resp.json());
  // console.log(res);
  return res;
};

export default ProductList;
