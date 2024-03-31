import { getCookie } from "cookies-next";

type iProduct = {
  name: string;
  desc: string;
  price: number | string;
  address: string;
  room_size: string;
  facilities: number[];
  images: string[];
};
const Product = async (formData: iProduct) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/room/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        desc: formData.desc,
        address: formData.address,
        price: formData.price,
        room_size: formData.room_size,
        facilities: formData.facilities,
        images: formData.images,
      }),
    });

    return res.json();
  } catch (err) {}
};

export default Product;
