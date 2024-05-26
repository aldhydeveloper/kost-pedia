import { getCookie } from "cookies-next";

type iProduct = {
  // name: string;
  desc: string;
  phone: string;
  manager_name: string;
  manager_phone: string;
  rules: number[];
  facilities: number[];
  address: string;
  // created_year: string;
  thumbnail: string;
  images: string[];
  province_id: number;
  city_id: number;
  district_id: number;
  village_id: number;
  campus: number[] | string[];
};
const Company = async (id: string, formData: iProduct) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/company/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // name: formData.name,
          description: formData.desc,
          phone_number: formData.phone,
          // created_year: formData.created_year,
          address: formData.address,
          manager_name: formData.manager_name,
          manager_phone: formData.manager_phone,
          facilities: formData.facilities,
          rules: formData.rules,
          thumbnail: formData.thumbnail,
          images: formData.images,
          province_id: formData.province_id,
          city_id: formData.city_id,
          district_id: formData.district_id,
          village_id: formData.village_id,
          campus: formData.campus,
        }),
      }
    );

    return res.json();
  } catch (err) {}
};

export default Company;
