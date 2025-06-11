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
