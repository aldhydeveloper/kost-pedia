import { getCookie } from "cookies-next";
const ProductList = (id: string | null | undefined = null) => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/room${id ? `/${id}` : ""}`,
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

export default ProductList;
