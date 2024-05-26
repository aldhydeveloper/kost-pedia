"use client";
import Image from "next/image";
import { useEffect, memo, useState, ChangeEvent, useRef } from "react";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import Checkbox from "@/components/Checkboxes/Checkbox";
import Select from "@/components/Form/CustomSelect";
import Card from "@/components/Card";
import File from "@/components/Form/CustomFile";
import Button from "@/components/Utility/CustomButton";
import Address from "@/components/Property/address";

import Get from "@/service/get";
import { Facilities } from "@/service";
import addCompany from "@/service/company";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface iCompany {
  id: string;
  name: string;
  desc: string;
  phone: string;
  manager_name: string;
  manager_phone: string;
}
interface iRule {
  id: string;
  name: string;
  checked: boolean;
}

type tAddress = {
  full_address: string;
  province: number;
  city: number;
  district: number;
  village: number;
  campus: number[] | string[];
};

type tAddressComp = {
  address: tAddress;
  setAddress: React.Dispatch<React.SetStateAction<tAddress>>;
};
// interface iCat {
//   name:
// }

const AddressComponent = memo(function AddressComponent({
  address,
  setAddress,
}: tAddressComp) {
  return <Address address={address} setAddress={setAddress} />;
});
const Company = () => {
  // const rules = await getDataRule();
  const [disabled, setDisabled] = useState<boolean>(false);
  const id = useRef<string>("");
  // const [disabled, setDisabled] = useState<boolean>(false);
  const [company, setCompany] = useState<iCompany>({
    id: "",
    name: "",
    desc: "",
    phone: "",
    manager_name: "",
    manager_phone: "",
  });

  const [address, setAddress] = useState<tAddress>({
    full_address: "",
    province: 0,
    city: 0,
    district: 0,
    village: 0,
    campus: [],
  });
  const [category, setCategory] = useState([]);

  const [facilities, setFacilities] = useState<
    Array<{ id: number; value: string; checked: boolean }> | undefined
  >(undefined);
  // const [rule. setRule]
  const [rule, setRule] = useState<iRule[]>([]);
  const [file, setFile] = useState<string>("/img/empty-img.jpg");
  // const [multiFile, setMulti] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();

  const handlerChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    // const value = event.target.value;
    setCompany({ ...company, [name]: value });
    // form2.current[name] = value;
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

    const fileInput = document?.getElementById("fileInput") as HTMLFormElement; // Replace with your HTML element ID
    const file = fileInput.files[0];

    const formData = new FormData();
    // console.log(files);
    formData.append("thumbnail", thumbnail as File);
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
      ? facilities?.map((v, i) => {
          return v.id;
        })
      : [];
    const newRules = rule
      ? rule?.map((v, i) => {
          return Number(v.id);
        })
      : [];
    console.log(newFacilites);
    // console.log(facilities);
    addCompany(company.id, {
      desc: company.desc,
      phone: company.phone,
      manager_name: company.manager_name,
      manager_phone: company.manager_phone,
      facilities: newFacilites,
      rules: newRules,
      thumbnail: "",
      images: url,
      address: address.full_address,
      province_id: address.province,
      city_id: address.city,
      district_id: address.district,
      village_id: address.village,
      campus: address.campus,
    }).then((resp) => {});
  };

  useEffect(() => {
    (async () => {
      const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/company/get`);
      // console.log(resp);
      if (resp.success) {
        const data = resp.data;
        setCompany({
          id: data.id,
          phone: data.phone_number,
          name: data.name,
          desc: data.desc,
          manager_name: data?.admin_kost.name,
          manager_phone: data?.admin_kost.phone,
        });
        setAddress({
          full_address: data.address,
          province: data.province_id,
          city: data.city_id,
          district: data.district_id,
          village: data.village_id,
          campus: JSON.parse(data.campus),
        });
      }

      const cat = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/category`);
      // console.log(cat);

      if (cat.success) {
        const data = cat.data;
        setCategory(data);
      }
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
    })();

    Facilities(0).then((data) => {
      console.log(data);
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
    });
    // fetchMyAPI();
    // const comp = getCompany();
    // console.log(comp);
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <Card
          id="wrap"
          // style={{ height: height }}
          customClass="ms-4"
        >
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Nama Company"
              name="company_name"
              value={company.name}
              disabled={true}
            />

            <Select option={category} label="Category" />
            <Input
              label="Nomor Handphone"
              name="phone"
              value={company.phone}
              onChange={handlerChange}
            />
          </div>
          <Textarea label="Deskripsi Kost" name="desc" />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nama Pengelola"
              name="manager_name"
              value={company.manager_name}
              onChange={handlerChange}
            />
            <Input
              label="Nomor Pengelola"
              name="manager_phone"
              value={company.manager_phone}
              onChange={handlerChange}
            />
          </div>
          <div className="mb-4">
            <label>Peraturan Kos</label>
            {rule ? (
              rule.map((v: iRule, i: number) => {
                return (
                  <Checkbox
                    id={v.id}
                    name="rule"
                    key={i}
                    value={v.id}
                    label={v.name}
                    checked={v.checked}
                    onChange={({ target }) => {
                      const newRule = rule.map((v) => {
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

          {/* */}
          <AddressComponent address={address} setAddress={setAddress} />
          <File
            onChange={handleChange_image}
            label="Thumbnail Kamar"
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

          <Button disabled={disabled} className="mt-10" onClick={() => {}}>
            Save
          </Button>
        </Card>
      </form>
    </>
  );
};

export default Company;
