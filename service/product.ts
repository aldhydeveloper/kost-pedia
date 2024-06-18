import { getCookie } from "cookies-next";

type iProduct = {
  name: string;
  desc: string;
  price: number | string;
  price_year: number | string;
  // address: string;
  room_size: string;
  category: string;
  created_year: string;
  room_type_name: string;
  facilities: number[];
  images: string[];
  // province_id: number;
  // city_id: number;
  // district_id: number;
  // village_id: number;
  // campus: number[] | string[];
};
const Product = async (id: string, formData: iProduct) => {
  try {
    const url =
      id == ""
        ? `${process.env.NEXT_PUBLIC_API_HOST}/room/add`
        : `${process.env.NEXT_PUBLIC_API_HOST}/room/${id}`;
    const method = id == "" ? "POST" : "PUT";
    const res = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        desc: formData.desc,
        category: formData.category,
        created_year: formData.created_year,
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
