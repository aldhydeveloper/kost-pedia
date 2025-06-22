export type tKost = {
  name: string;
  desc: string;
  created_year: string;
  category: string;
  kost_rules: number[];
  admin_kost_name: string;
  admin_kost_phone: string;
};
export type tAddress = {
  full_address: string;
  address_note: string;
  province_id: number;
  city_id: number;
  district_id: number;
  village_id: number;
  // campus: iCampus[];
};
export type tImage = {
  first_image: File | undefined;
  second_image: File[] | undefined;
  third_image: File | undefined;
};
export type tFacilities = {
  value: number[];
};
export type tRooms = {
  type_name: string;
  desc: string;
  p: number;
  l: number;
  price: number;
  price_year: number;
  room_facilities: number[];
  bath_facilities: number[];
  first_image: File | undefined;
  second_image: File[] | undefined;
  third_image: File | undefined;
  active: boolean;
  thumbnail: string;
};
