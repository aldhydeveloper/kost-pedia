"use client";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import Select from "@/components/Form/CustomSelect";
import MultiSelect from "@/components/Form/CustomMultiSelect";
import Province from "@/service/dashboard/province";
import City from "@/service/dashboard/city";
import Get from "@/service/get";
import { useEffect, useState, useRef } from "react";

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
type tAddress = {
  full_address: string;
  province: number;
  city: number;
  district: number;
  village: number;
  campus: number[] | string[];
};

interface iProps {
  setAddress: React.Dispatch<React.SetStateAction<tAddress>>;
  address: tAddress;
  // province: number;
  // city: number;
  // district: number;
  // village: number;
  // campus: string[];
}
export default function Address({ address, setAddress }: iProps) {
  const provinceList = useRef<tLoc[]>([
    { id: 0, name: "-- Select Provinsi --" },
  ]);
  const [cityList, setCityList] = useState<tLoc[]>([
    { id: 0, name: "-- Select Kota --" },
  ]);
  const [districtList, setDistrictList] = useState<tLoc[]>([
    { id: 0, name: "-- Select Kecamatan --" },
  ]);
  const [villageList, setVillageList] = useState<tLoc[]>([
    { id: 0, name: "-- Select Kelurahan/Desa --" },
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

  const getCity = (id: number) => {
    // console.log(id);
    City(id as number).then((resp) => {
      // console.log(resp.data);
      let temp = [cityList[0], ...resp.data];
      setCityList(temp);
    });
  };
  const getDistrict = (id: number) => {
    // console.log(id);
    Get(`${process.env.NEXT_PUBLIC_API_HOST}/district/bycity/${id}`).then(
      (resp) => {
        // console.log(resp.data);
        let temp = [districtList[0], ...resp.data];
        setDistrictList(temp);
      }
    );
  };
  const getVillage = (id: number) => {
    // console.log(id);
    Get(`${process.env.NEXT_PUBLIC_API_HOST}/village/bydistrict/${id}`).then(
      (resp) => {
        // console.log(resp.data);
        let temp = [villageList[0], ...resp.data];
        setVillageList(temp);
      }
    );
  };

  useEffect(() => {
    // console.log();
    Province().then((resp: tResp) => {
      provinceList.current = [
        { id: 0, name: "-- Select Provinsi --" },
        ...resp.data,
      ];
      // console.log(resp);
      // if (resp.success) {
      //   resp.data.forEach((v: tProvince, i) => {
      // setProvince([...province, { id: v.id, value: v.name }]);
      // setProvince(resp.data);
      //   });
      // }
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
      // console.log(resp);
      // console.log(resp.data);
      // let temp = [villageList[0], ...resp.data];
      // setVillageList(temp);
    });
  }, [provinceList]);
  // console.log(province);
  return (
    <>
      <Textarea
        name="address"
        label="Alamat Kost"
        value={address.full_address}
        onChange={(e) =>
          setAddress({ ...address, full_address: e.target.value })
        }
      />
      <Select
        label="Provinsi"
        option={provinceList.current}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // console.log(target)
          getCity(event.target ? parseInt(event.target.value) : 0);
          setAddress({ ...address, province: parseInt(event.target.value) });
        }}
      />
      <Select
        label="Kota"
        option={cityList}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // console.log(target)
          getDistrict(event.target ? parseInt(event.target.value) : 0);
          setAddress({ ...address, city: parseInt(event.target.value) });
        }}
      />
      <Select
        label="Kecamatan"
        option={districtList}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // console.log(target)
          getVillage(event.target ? parseInt(event.target.value) : 0);
          setAddress({ ...address, village: parseInt(event.target.value) });
        }}
      />
      <Select label="Desa" option={villageList} />

      <MultiSelect
        options={campusList}
        value={campus}
        onChange={
          (event) => {
            setCampus(event);
            let a: any = [];
            if (event instanceof Array) {
              event.forEach((v: tMselect, i: number) => {
                a[i] = v.value;
              });
            }
            // console.log(a);
            setAddress({ ...address, campus: a });
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
}

//  Address;
