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
  full_address: string;
  province: number;
  city: number;
  district: number;
  village: number;
  campus: iCampus[];
};

interface iProps {
  setAddress: (name: string, value: string | tOption[]) => void;
  address: iAddressKost;
  // province: number;
  // city: number;
  // district: number;
  // village: number;
  // campus: string[];
}
const AddressKost = memo(function AddressKost({ address, setAddress }: iProps) {
  // const provinceList = useRef<tLoc[]>([
  //   { id: 0, name: "-- Select Provinsi --" },
  // ]);
  const [provinceList, setProvinceList] = useState<{
    list: tLoc[];
    selected: number;
  }>({
    // list: [{ id: 0, name: "-- Select Provinsi --" }],
    list: [],
    selected: 0,
  });
  const [cityList, setCityList] = useState<tLoc[]>([
    // { id: 0, name: "-- Select Kota --" },
  ]);
  const [loadingCity, setLoadingCity] = useState<boolean>(false);
  const [loadingDistrict, setLoadingDistrict] = useState<boolean>(false);
  const [loadingVillage, setLoadingVillage] = useState<boolean>(false);
  const [districtList, setDistrictList] = useState<tLoc[]>([
    // { id: 0, name: "-- Select Kecamatan --" },
  ]);
  const [villageList, setVillageList] = useState<tLoc[]>([
    // { id: 0, name: "-- Select Kelurahan/Desa --" },
  ]);
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
      setCityList(temp);
      setLoadingCity(false);
    });
  };
  const getDistrict = (id: number) => {
    // console.log(id);
    Get(`${process.env.NEXT_PUBLIC_API_HOST}/district/bycity/${id}`).then(
      (resp) => {
        // console.log(resp.data);
        let temp = [{ id: 0, name: "-- Pilih Kecamatan --" }, ...resp.data];
        setDistrictList(temp);
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
        setVillageList(temp);
        setLoadingVillage(false);
      }
    );
  };

  useEffect(() => {
    //   // console.log();
    Province().then((resp: tResp) => {
      let temp = [{ id: 0, name: "-- Pilih Provinsi --" }, ...resp.data];
      setProvinceList({ list: temp, selected: address.province });
    });
    Get(`${process.env.NEXT_PUBLIC_API_HOST}/campus`).then((resp) => {
      if (resp.success) {
        let temp: tMselect[] = [];
        resp.data.forEach((v: { name: string; id: number }, i: number) => {
          temp[i] = {
            label: v.name,
            value: v.id,
          };
        });
        setCampusList(temp);
      }
    });
  }, [address]);
  // getCity(address.province);
  // getDistrict(address.province);
  // getVillage(address.province);
  return (
    <>
      <Textarea
        name="full_address"
        label="Alamat Kost"
        value={address.full_address}
        onChange={setValue}
      />
      <Select
        id="province"
        label="Provinsi"
        name="province"
        option={provinceList.list}
        value={address.province}
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
        name="city"
        isLoading={loadingCity}
        option={cityList}
        value={address.city}
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
        name="district"
        isLoading={loadingDistrict}
        option={districtList}
        value={address.district}
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
        name="village"
        isLoading={loadingVillage}
        option={villageList}
        value={address.village}
        onChange={setValue}
      />

      <MultiSelect
        options={campusList}
        value={address.campus}
        onChange={
          (event) => {
            console.log(event);
            // setCampus(event);
            // let a: any = [];
            // if (event instanceof Array) {
            //   event.forEach((v: tMselect, i: number) => {
            //     a[i] = v.value;
            //   });
            // }
            // console.log(a);
            // setValue("campus", event);
            setAddress("campus", event instanceof Array ? event : []);
          }
          // setAddress({
          //   ...address,
          //   campus: event.target.value,
          // })
        }
        label="Campus"
      />
    </>
  );
});

export default AddressKost;
export type { iAddressKost, tOption as iCampus };

//  Address;
