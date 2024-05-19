import { getCookie } from "cookies-next";

type iProduct = {
  name: string;
  desc: string;
  price: number | string;
  price_year: number | string;
  // address: string;
  room_size: string;
  room_type_name: string;
  facilities: number[];
  images: string[];
  // province_id: number;
  // city_id: number;
  // district_id: number;
  // village_id: number;
  // campus: number[] | string[];
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
        // address: formData.address,
        price: formData.price,
        price_year: formData.price_year,
        room_size: formData.room_size,
        room_type_name: formData.room_type_name,
        facilities: formData.facilities,
        images: formData.images,
        // province_id: formData.province_id,
        // city_id: formData.city_id,
        // district_id: formData.district_id,
        // village_id: formData.village_id,
        // campus: formData.campus,
      }),
    });

    return res.json();
  } catch (err) {}
};

export default Product;
