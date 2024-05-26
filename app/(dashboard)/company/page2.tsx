"use client";
import Card from "@/components/Card";
import Input from "@/components/Form/CustomInput";
import Select from "@/components/Form/CustomSelect";
import Textarea from "@/components/Form/CustomTextarea";
import { Facilities } from "@/service";
import City from "@/service/dashboard/city";
import Province from "@/service/dashboard/province";
import Get from "@/service/get";
import { useRef, useEffect, useState, memo } from "react";

interface iInput {
  onChange: (v: string) => void;
  // onChangeValue?: () => {};
  name: string;
  label: string;
  value: string;
  disabled?: boolean;
}

interface iSelect {
  onChange: (v: React.ChangeEvent<HTMLInputElement>) => void;
  // onChangeValue?: () => {};
  list: iLoc[] | undefined;
  name: string;
  label: string;
  value: number;
  getChild?: void;
  parent?: number;
}
interface iLoc {
  id: number;
  name: string;
}
interface iRule {
  id: string;
  name: string;
  checked: boolean;
}

interface iResp {
  success?: string;
  error?: string;
  data: iLoc[];
}
const InputComponent = memo(function InputComponent({
  value,
  name,
  label,
  onChange,
  disabled = false,
}: iInput) {
  // const [value, setValue] = useState<string>("");
  console.log(name, value);
  return (
    <Input
      label={label}
      name={name}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

const SelectComponent = memo(function SelectComponent({
  value,
  name,
  label,
  list,
  onChange,
  getChild,
  parent,
}: iSelect) {
  // const [value, setValue] = useState<string>("");
  console.log(name, parent);
  return (
    <Select label={label} option={list} value={value} onChange={onChange} />
  );
});

export default function Company() {
  const id = useRef<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [managerName, setManagerName] = useState<string>("");
  const [managerPhone, setManagerPhone] = useState<string>("");

  const [provinceList, setProvinceList] = useState<iLoc[]>();
  const [cityList, setCityList] = useState<iLoc[]>();
  const [distrctList, setDistrictList] = useState<iLoc[]>();
  const [villageList, setVillageList] = useState<iLoc[]>();

  const [address, setAddress] = useState<string>("");
  // const [province, setProvince] = useState<number>(0);
  // const [city, setCity] = useState<number>(0);

  const province = useRef<number>(0);
  const city = useRef<number>(0);

  const [category, setCategory] = useState([]);
  const [rule, setRule] = useState<iRule[]>([]);

  const [facilities, setFacilities] = useState<
    Array<{ id: number; value: string; checked: boolean }> | undefined
  >(undefined);

  const getCity = (id: number) => {
    // console.log(id);
    City(id as number).then((resp) => {
      // console.log(resp.data);
      let temp = [{ id: 0, name: "-- Select City --" }, ...resp.data];
      setCityList(temp);
    });
  };

  const onSubmit = () => {};

  useEffect(() => {
    (async () => {
      const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/company/get`);
      // console.log(resp);
      let province_id = 0;
      if (resp.success) {
        const data = resp.data;
        id.current = data.id;
        setName(data.name);
        setPhone(data.name);
        setDesc(data.name);
        setManagerName(data?.admin_kost.name);
        setManagerPhone(data?.admin_kost.phone);

        // setProvince(data.province_id);
        // setCity(data.city_id);
        province.current = data.province_id;
        city.current = data.city_id;

        // province_id = data.province_id;

        // GET CATEGORY
        const cat = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/category`);
        if (cat.success) {
          const data = cat.data;
          setCategory(data);
        }

        // GET FACILITIES

        const rule = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/rule`);

        if (rule.success) {
          let r: iRule[] = [];
          rule.data.forEach((v: iRule, i: number) => {
            r[i] = {
              id: v.id,
              name: v.name,
              checked: false,
            };
          });
          setRule(r);
        }
        // setCompany({
        //   id: data.id,
        //   phone: data.phone_number,
        //   name: data.name,
        //   desc: data.desc,
        //   manager_name: data?.admin_kost.name,
        //   manager_phone: data?.admin_kost.phone,
        // });
      }

      Facilities(0).then((data) => {
        // console.log(data);
        if (data.success) {
          console.log(data);
          let temp: any = [];
          data.data.forEach((v: any, i: number) => {
            // temp[i] = v;
            temp[i] = {
              id: v.id,
              value: v.name,
              checked: false,
            };
          });
          setFacilities(temp);

          // form2.current.facilities = temp;
        }

        Province().then((resp: iResp) => {
          let temp = [{ id: 0, name: "-- Select Province --" }, ...resp.data];
          setProvinceList(temp);
        });

        if (province.current) {
          City(province_id).then((resp: iResp) => {
            let temp = [{ id: 0, name: "-- Select City --" }, ...resp.data];
            setCityList(temp);
          });
        }
      });
    })();
  }, []);
  console.log(province);
  return (
    <>
      <form onSubmit={onSubmit}>
        <Card>
          {name ? (
            <>
              <div className="grid grid-cols-3 gap-4">
                <InputComponent
                  label="Nama Company"
                  name="company_name"
                  value={name}
                  disabled={true}
                  onChange={setName}
                />
                <Select option={category} label="Category" />
                <InputComponent
                  label="Nomor Handphone"
                  name="phone"
                  value={phone}
                  onChange={setPhone}
                />
              </div>
              <Textarea
                label="Deskripsi Kost"
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputComponent
                  label="Nama Pengelola"
                  name="manager_name"
                  value={managerName}
                  onChange={setManagerName}
                />
                <InputComponent
                  label="Nomor Pengelola"
                  name="manager_phone"
                  value={managerPhone}
                  onChange={setManagerPhone}
                />
              </div>

              <Textarea
                name="address"
                label="Alamat Kost"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <SelectComponent
                label="Provinsi"
                name="province"
                list={provinceList}
                value={province.current}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  // setProvince(val);
                  province.current = val;
                  getCity(val);
                }}
                // getChild={getCity(province)}
              />
              <SelectComponent
                label="Kota"
                name="city"
                list={cityList}
                value={city.current}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  city.current = val;
                  // setCity(val);
                  // getCity(val);
                }}
              />
              {/* <Select
                id="province"
                label="Provinsi"
                option={provinceList}
                value={province}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setProvince(parseInt(event.target.value));
                  // console.log(target)
                }}
              />
              <Select
                label="Kota"
                option={cityList}
                value={city}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCity(parseInt(event.target.value));
                }}
              /> */}
            </>
          ) : (
            ""
          )}
        </Card>
      </form>
    </>
  );
}
