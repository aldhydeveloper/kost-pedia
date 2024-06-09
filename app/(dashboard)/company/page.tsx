"use client";
import { useRef, useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkboxes/Checkbox";
import Input from "@/components/Form/CustomInput";
import Select from "@/components/Form/CustomSelect";
import Textarea from "@/components/Form/CustomTextarea";
import File from "@/components/Form/CustomFile";
import MultiSelect from "@/components/Form/CustomMultiSelect";
import { Facilities } from "@/service";
import City from "@/service/dashboard/city";
import Province from "@/service/dashboard/province";
import addCompany from "@/service/company";
import Get from "@/service/get";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/Utility/CustomButton";

interface iInput {
  onChange: (v: string) => void;
  // onChangeValue?: () => {};
  name: string;
  label: string;
  value: string;
  disabled?: boolean;
}

type tMselect = {
  label: string;
  value: string | number;
};
interface iSelect {
  id?: string;
  onChange?: (v: React.ChangeEvent<HTMLInputElement>) => void;
  // onChangeValue?: () => {};
  list: iLoc[] | undefined;
  name: string;
  label: string;
  value: number;
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
  // console.log(name, value);
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
  ...otherProps
}: // getChild,
// parent,
iSelect) {
  // const [value, setValue] = useState<string>("");
  // console.log(name, list);
  return <Select label={label} option={list} value={value} {...otherProps} />;
});
const TextAreaComponent = memo(function TextAreaComponent({
  value,
  name,
  label,
  onChange,
}: // getChild,
// parent,
iInput) {
  // const [value, setValue] = useState<string>("");
  // console.log(name, value);
  return (
    <Textarea
      label={label}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

export default function Company() {
  const router = useRouter();

  const id = useRef<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [managerName, setManagerName] = useState<string>("");
  const [managerPhone, setManagerPhone] = useState<string>("");

  const [provinceList, setProvinceList] = useState<iLoc[]>([
    { id: 0, name: "-- Select Privinsi --" },
  ]);
  const [cityList, setCityList] = useState<iLoc[]>([
    { id: 0, name: "-- Select Kota --" },
  ]);
  const [districtList, setDistrictList] = useState<iLoc[]>([
    { id: 0, name: "-- Select Kecamatan --" },
  ]);
  const [villageList, setVillageList] = useState<iLoc[]>([
    { id: 0, name: "-- Select Desa --" },
  ]);

  const [address, setAddress] = useState<string>("");
  const [campusList, setCampusList] = useState<tMselect[]>([]);
  const [campus, setCampus] = useState<tMselect[]>([]);
  // const [province, setProvince] = useState<number>(0);
  // const [city, setCity] = useState<number>(0);

  const province = useRef<number>(0);
  const city = useRef<number>(0);
  const district = useRef<number>(0);
  const village = useRef<number>(0);
  const category_id = useRef<number>(0);

  const choosenRule = useRef<number[]>([]);
  const choosenFacility = useRef<number[]>([]);
  // const campus = useRef<tMselect[]>([]);

  const [category, setCategory] = useState([]);
  const [rules, setRule] = useState<iRule[]>([]);

  const [facilities, setFacilities] = useState<iRule[]>([]);
  const [file, setFile] = useState<string>("/img/empty-img.jpg");
  // const [multiFile, setMulti] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [disabled, setDisabled] = useState<boolean>(false);

  const getCity = (id: number) => {
    // console.log(id);
    City(id as number).then((resp) => {
      // console.log(resp.data);
      let temp = [{ id: 0, name: "-- Select Kota --" }, ...resp.data];
      setCityList(temp);
    });
  };

  const getDistrict = (id: number) => {
    // console.log(id);
    Get(`${process.env.NEXT_PUBLIC_API_HOST}/district/bycity/${id}`).then(
      (resp) => {
        // console.log(resp.data);
        let temp = [{ id: 0, name: "-- Select Kecamatan --" }, ...resp.data];
        setDistrictList(temp);
      }
    );
  };

  const getVillage = (id: number) => {
    // console.log(id);
    Get(`${process.env.NEXT_PUBLIC_API_HOST}/village/bydistrict/${id}`).then(
      (resp) => {
        // console.log(resp.data);
        let temp = [{ id: 0, name: "-- Select Desa --" }, ...resp.data];
        setVillageList(temp);
      }
    );
  };

  const handleChangProvince = (e: any) => {
    // console.log(e);
    province.current = e.target.value;
    getCity(e.target.value);
  };

  const handleChangeCity = (e: any) => {
    // console.log(e);
    city.current = e.target.value;
    getDistrict(e.target.value);
  };

  const handleChangeDistrict = (e: any) => {
    // console.log(e);
    district.current = e.target.value;
    getVillage(e.target.value);
  };
  const handleChange_image = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
      // setThumbnail(e.target.files[0]);
    }
  };
  const handleChnage_imageMulti = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.files) {
      let m: string[] = [];
      if (Array.from(e.target.files).length > 3) {
        toast.error(
          <span className="text-nowrap">Cannot Upload more then 3 files</span>,
          {
            position: "top-center",
            className: "w-96",
          }
        );
        // if (document.getElementById("kamarKost") !== undefined) {
        (document.getElementById("kamarKost") as HTMLInputElement).value = "";
        // }
        return false;
      }
      Array.from(e.target.files).forEach((v: any, i: number) => {
        // setMulti([...multiFile, URL.createObjectURL(v)]);
        m.push(URL.createObjectURL(v));
      });
      const _files = Array.from(e.target.files);

      setFiles(_files);
      // setMulti(m);
    }
    // console.log(multiFile);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const fileInput = document?.getElementById("fileInput") as HTMLFormElement; // Replace with your HTML element ID
    const file = fileInput.files[0];

    const formData = new FormData();
    // console.log(files);
    // formData.append("thumbnail", thumbnail as File);
    files.forEach((image, i) => {
      formData.append(`image${i}`, image);
    });
    // console.log(formData.get("file"));
    // formData.append("file", file);

    const url = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((resp: any) => resp.json())
      .then((resp) => resp.url_image);

    const newFacilites = facilities
      ? facilities
          .filter((v, i) => {
            return v.checked;
          })
          .map((v) => Number(v.id))
      : [];
    const newRules = rules
      ? rules
          .filter((v, i) => {
            return v.checked;
          })
          .map((v) => Number(v.id))
      : [];
    // console.log(facilities);
    const newCampus = campus
      ? campus.map((v: tMselect, i: number) => {
          return Number(v.value);
        })
      : [];
    addCompany(id.current, {
      desc: desc,
      phone: phone,
      category_id: category_id.current,
      manager_name: managerName,
      manager_phone: managerPhone,
      facilities: newFacilites,
      rules: newRules,
      thumbnail: "",
      images: url,
      address: address,
      province_id: province.current,
      city_id: city.current,
      district_id: district.current,
      village_id: village.current,
      campus: newCampus,
    }).then((resp) => {
      if (resp.success) {
        toast.success(resp.success, {
          position: "top-center",
          className: "w-96",
        });
      } else {
        toast.error(resp.error, {
          position: "top-center",
          className: "w-96",
        });
      }
      setDisabled(false);
    });
  };
  useEffect(() => {
    (async () => {
      const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/company/get`);

      if (resp.success) {
        const data = resp.data;

        id.current = data.id;
        setName(data.name);
        setPhone(data.phone_number ?? "");
        setDesc(data.description ?? "");
        setAddress(data.address ?? "");
        if (data.admin_kost) {
          setManagerName(data.admin_kost.name);
          setManagerPhone(data.admin_kost.phone);
        }
        choosenRule.current = data.rules.map((v: iRule) => v.id);
        choosenFacility.current = data.facilities.map((v: iRule) => v.id);
        console.log(data.facilities);
        province.current = data.province_id;
        city.current = data.city_id;
        district.current = data.district_id;
        village.current = data.village_id;
        if (data.category) {
          category_id.current = data.category.id;
        }

        // GET TRULE
        const rule = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/rule`);

        if (rule.success) {
          let r: iRule[] = [];
          rule.data.forEach((v: iRule, i: number) => {
            console.log(choosenRule.current.includes(parseInt(v.id)));
            r[i] = {
              id: v.id,
              name: v.name,
              checked: choosenRule.current.includes(parseInt(v.id)),
            };
          });
          setRule(r);
        }
      }
      // GET CATEGORY
      const cat = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/category`);
      if (cat.success) {
        const data = cat.data;
        setCategory(data);
      }
      // }

      // GET FACILITY
      Facilities(0).then((data) => {
        // console.log(data);
        if (data.success) {
          console.log(data);
          let temp: any = [];
          data.data.forEach((v: any, i: number) => {
            // temp[i] = v;
            temp[i] = {
              id: v.id,
              name: v.name,
              checked: choosenFacility.current.includes(v.id),
            };
          });
          setFacilities(temp);
        }
      });

      // if () {
      Province().then((resp: iResp) => {
        let temp = [{ id: 0, name: "-- Select Province --" }, ...resp.data];
        setProvinceList(temp);
      });
      // }
      if (province.current) {
        getCity(province.current);
      }
      if (city.current) {
        getDistrict(province.current);
      }
      if (district.current) {
        getVillage(province.current);
      }
      // getDistrict(city.current);
      // getVillage(district.current);

      // GET CAMPUS

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
    })();
  }, []);
  return (
    <>
      <ToastContainer />
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
                <Select
                  option={category}
                  label="Category"
                  value={category_id.current}
                  onChange={(e) => (category_id.current = e.target.value)}
                />
                <InputComponent
                  label="Nomor Handphone"
                  name="phone"
                  value={phone}
                  onChange={setPhone}
                />
              </div>
              <TextAreaComponent
                label="Deskripsi Kost"
                name="desc"
                value={desc}
                onChange={setDesc}
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

              <div className="mb-4">
                <label>Peraturan Kos</label>
                {rules ? (
                  rules.map((v: iRule, i: number) => {
                    return (
                      <Checkbox
                        id={v.id}
                        name="rule"
                        key={i}
                        value={v.id}
                        label={v.name}
                        checked={v.checked}
                        onChange={({ target }) => {
                          const newRule = rules.map((v) => {
                            if (v.id == target.value) {
                              return {
                                ...v,
                                checked: target.checked,
                              };
                            } else {
                              return v;
                            }
                          });
                          setRule(newRule);
                        }}
                      />
                    );
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="mb-4">
                <label>Fasilitas Kos</label>
                {facilities ? (
                  facilities.map((v: iRule, i: number) => {
                    return (
                      <Checkbox
                        id={v.id}
                        name="rule"
                        key={i}
                        value={v.id}
                        label={v.name}
                        checked={v.checked}
                        onChange={({ target }) => {
                          const newRule = facilities.map((v: iRule) => {
                            if (v.id == target.value) {
                              return {
                                ...v,
                                checked: target.checked,
                              };
                            } else {
                              return v;
                            }
                          });
                          setFacilities(newRule);
                        }}
                      />
                    );
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <TextAreaComponent
                name="address"
                label="Alamat Kost"
                value={address}
                onChange={setAddress}
              />
              {provinceList ? (
                <>
                  <SelectComponent
                    label="Provinsi"
                    name="province"
                    list={provinceList}
                    value={province.current}
                    onChange={handleChangProvince}
                    // getChild={getCity(province)}
                  />
                  <SelectComponent
                    id="city"
                    label="Kota"
                    name="city"
                    list={cityList}
                    value={city.current}
                    onChange={handleChangeCity}
                  />
                  <SelectComponent
                    label="Kecamatan"
                    name="district"
                    list={districtList}
                    value={district.current}
                    onChange={handleChangeDistrict}
                  />
                  <SelectComponent
                    label="Kecamatan"
                    name="district"
                    list={villageList}
                    value={village.current}
                    onChange={(e) =>
                      (village.current = parseInt(e.target.value))
                    }
                  />
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}

          <MultiSelect
            options={campusList}
            value={campus}
            onChange={setCampus}
            label="Campus"
          />
          <File
            onChange={handleChange_image}
            label="Thumbnail Kost"
            id="fileInput"
          />
          <Image
            src={file}
            width={500}
            height={500}
            alt="Thumbnail"
            className="my-4"
          />

          <File
            id="kamarKost"
            onChange={handleChnage_imageMulti}
            multiple={true}
            label="Foto Kost tampak Depan"
          />
          <div className="grid grid-cols-3 gap-5">
            {files.map((v, i) => {
              return (
                <Image
                  key={i}
                  src={URL.createObjectURL(v)}
                  width={500}
                  height={500}
                  alt="Thumbnail"
                  className="my-4"
                />
              );
            })}
          </div>

          <Button disabled={disabled} className="mt-10">
            Save
          </Button>
        </Card>
      </form>
    </>
  );
}
