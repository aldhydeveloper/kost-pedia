"use client";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import Select from "@/components/Form/CustomSelect";
import MultiSelect, { tOption } from "@/components/Form/CustomMultiSelect";
import Province from "@/service/dashboard/province";
import City from "@/service/dashboard/city";
import Get from "@/service/get";
import { useEffect, useState, memo } from "react";

type tSelect = {
  id: number;
  value: string;
};
type tMselect = {
  label: string;
  value: string | number;
};
type tLoc = {
  id: string | number;
  name: string;
};
type tResp = {
  success?: string;
  error?: string;
  data: tLoc[];
};
type iCampus = {
  label: string;
  value: string | number;
};
type iAddressKost = {
  address: string;
  address_note: string;
  province_id: number;
  city_id: number;
  district_id: number;
  village_id: number;
  campus: iCampus[];
};
interface iAddressList {
  provinceList: tLoc[];
  cityList: tLoc[];
  districtList: tLoc[];
  villageList: tLoc[];
}
interface iProps {
  setAddress: (name: string, value: string | tOption[]) => void;
  address: iAddressKost;
  addressList: iAddressList;
  handleAddressList: (addresList: iAddressList) => void;
  // province: number;
  // city: number;
  // district: number;
  // village: number;
  // campus: string[];
}
const AddressKost = memo(function AddressKost({
  address,
  setAddress,
  // provinceList,
  // cityList,
  // districtList,
  // villageList,
  addressList,
  handleAddressList,
}: iProps) {
  // const provinceList = useRef<tLoc[]>([
  //   { id: 0, name: "-- Select Provinsi --" },
  // ]);
  // const [provinceList, setProvinceList] = useState<tLoc[]>([]);
  // const [cityList, setCityList] = useState<tLoc[]>([]);
  // const [districtList, setDistrictList] = useState<tLoc[]>([]);
  // const [villageList, setVillageList] = useState<tLoc[]>([]);

  const [loadingCity, setLoadingCity] = useState<boolean>(false);
  const [loadingDistrict, setLoadingDistrict] = useState<boolean>(false);
  const [loadingVillage, setLoadingVillage] = useState<boolean>(false);

  const [campusList, setCampusList] = useState<tMselect[]>([]);

  const [campus, setCampus] = useState<tMselect[]>([]);
  const [province, setProvince] = useState<number>(0);
  // const [address, setAddress] = useState<tAddress>({
  //   full_address: "",
  //   province: 0,
  //   city: 0,
  //   district: 0,
  //   village: 0,
  //   campus: [],
  // });

  const setValue = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(e.target.name, e.target.value);
  };

  const getCity = (id: number) => {
    // console.log(id);
    City(id as number).then((resp) => {
      // console.log(resp.data);
      let temp = [{ id: 0, name: "-- Pilih Kota --" }, ...resp.data];
      // setCityList(temp);
      handleAddressList({ ...addressList, cityList: temp });
      setLoadingCity(false);
    });
  };
  const getDistrict = (id: number) => {
    // console.log(id);
    Get(`${process.env.NEXT_PUBLIC_API_HOST}/district/bycity/${id}`).then(
      (resp) => {
        // console.log(resp.data);
        let temp = [{ id: 0, name: "-- Pilih Kecamatan --" }, ...resp.data];
        // setDistrictList(temp);
        handleAddressList({ ...addressList, districtList: temp });
        setLoadingDistrict(false);
      }
    );
  };
  const getVillage = (id: number) => {
    // console.log(id);
    Get(`${process.env.NEXT_PUBLIC_API_HOST}/village/bydistrict/${id}`).then(
      (resp) => {
        // console.log(resp.data);
        let temp = [
          { id: 0, name: "-- Pilih Keluarahan/Desa --" },
          ...resp.data,
        ];
        // setVillageList(temp);
        handleAddressList({ ...addressList, villageList: temp });
        setLoadingVillage(false);
      }
    );
  };

  useEffect(() => {
    //   // console.log();
    async function getData() {
      if (addressList.provinceList.length === 0) {
        const resp = await Province();
        let temp = [{ id: 0, name: "-- Pilih Provinsi --" }, ...resp.data];
        handleAddressList({ ...addressList, provinceList: temp });
        // Province().then((resp: tResp) => {
        //   let temp = [{ id: 0, name: "-- Pilih Provinsi --" }, ...resp.data];
        //   // setProvinceList(temp);
        //   handleAddressList({ ...addressList, provinceList: temp });
        // });
      }

      if (
        addressList.cityList.length === 0 &&
        addressList.provinceList.length > 0 &&
        address.province_id
      ) {
        const resp = await City(address.province_id);
        let temp = [{ id: 0, name: "-- Pilih Kota --" }, ...resp.data];
        handleAddressList({ ...addressList, cityList: temp });
        // City(address.province_id).then((resp) => {
        //   // console.log(resp.data);
        //   let temp = [{ id: 0, name: "-- Pilih Kota --" }, ...resp.data];
        //   // setCityList(temp);
        //   handleAddressList({ ...addressList, cityList: temp });
        //   // setLoadingCity(false);
        // });
      }

      if (
        addressList.districtList.length === 0 &&
        addressList.cityList.length > 0 &&
        address.city_id
      ) {
        const resp = await Get(
          `${process.env.NEXT_PUBLIC_API_HOST}/district/bycity/${address.city_id}`
        );
        let temp = [{ id: 0, name: "-- Pilih Kecamatan --" }, ...resp.data];
        handleAddressList({ ...addressList, districtList: temp });
        // City(address.province_id).then((resp) => {
        //   // console.log(resp.data);
        //   let temp = [{ id: 0, name: "-- Pilih Kota --" }, ...resp.data];
        //   // setCityList(temp);
        //   handleAddressList({ ...addressList, cityList: temp });
        //   // setLoadingCity(false);
        // });
      }

      if (
        addressList.villageList.length === 0 &&
        addressList.districtList.length > 0 &&
        address.district_id
      ) {
        const resp = await Get(
          `${process.env.NEXT_PUBLIC_API_HOST}/village/bydistrict/${address.district_id}`
        );
        let temp = [{ id: 0, name: "-- Pilih Kelurahan --" }, ...resp.data];
        handleAddressList({ ...addressList, villageList: temp });
        // City(address.province_id).then((resp) => {
        //   // console.log(resp.data);
        //   let temp = [{ id: 0, name: "-- Pilih Kota --" }, ...resp.data];
        //   // setCityList(temp);
        //   handleAddressList({ ...addressList, cityList: temp });
        //   // setLoadingCity(false);
        // });
      }
    }
    getData();
  }, [address, addressList, handleAddressList]);
  // getCity(address.province);
  // getDistrict(address.province);
  // getVillage(address.province);
  return (
    <>
      <Textarea
        name="address"
        label="Alamat Kost"
        value={address.address}
        onChange={setValue}
      />
      <Textarea
        name="address_note"
        label="Catatan Alamat"
        value={address.address_note}
        onChange={setValue}
      />
      <Select
        id="province"
        label="Provinsi"
        name="province_id"
        option={addressList.provinceList}
        value={address.province_id}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // console.log(target)
          getCity(event.target ? parseInt(event.target.value) : 0);
          setValue(event);
          setLoadingCity(true);
          // setAddress({ ...address, province: parseInt(event.target.value) });
        }}
      />
      <Select
        label="Kota"
        name="city_id"
        isLoading={loadingCity}
        option={addressList.cityList}
        value={address.city_id}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // console.log(target)
          getDistrict(event.target ? parseInt(event.target.value) : 0);
          setValue(event);
          setLoadingDistrict(true);
          // setAddress({ ...address, city: parseInt(event.target.value) });
        }}
      />
      <Select
        label="Kecamatan"
        name="district_id"
        isLoading={loadingDistrict}
        option={addressList.districtList}
        value={address.district_id}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // console.log(target)
          getVillage(event.target ? parseInt(event.target.value) : 0);
          setValue(event);
          setLoadingVillage(true);
          // setAddress({ ...address, district: parseInt(event.target.value) });
        }}
      />
      <Select
        label="Desa"
        name="village_id"
        isLoading={loadingVillage}
        option={addressList.villageList}
        value={address.village_id}
        onChange={setValue}
      />

      {/* <MultiSelect
        options={campusList}
        value={address.campus}
        onChange={(event) => {
          setAddress("campus", event instanceof Array ? event : []);
        }}
        label="Campus"
      /> */}
    </>
  );
});

export default AddressKost;
export type { iAddressKost, iAddressList, tOption as iCampus };

//  Address;
