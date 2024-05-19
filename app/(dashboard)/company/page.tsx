"use client";
import Image from "next/image";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import Checkbox from "@/components/Checkboxes/Checkbox";
import Select from "@/components/Form/CustomSelect";
import Card from "@/components/Card";
import File from "@/components/Form/CustomFile";
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
// interface iCat {
//   name:
// }

const Company = () => {
  // const rules = await getDataRule();

  const [company, setCompany] = useState<iCompany>({
    id: "",
    name: "",
    desc: "",
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
      console.log(m);
      console.log(_files);
      setFiles(_files);
      // setMulti(m);
    }
    // console.log(multiFile);
  };

  const onSubmit = () => {
    addCompany(company.id, {
      desc: company.desc,
      manager_name: company.manager_name,
      manager_phone: company.manager_phone,
      facilities: [],
      rules: [],
      thumbnail: "",
      images: [],
      address: address.full_address,
      province_id: address.province,
      city_id: address.city,
      district_id: address.district,
      village_id: address.village,
      campus: [],
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
          name: data.name,
          desc: data.desc,
          manager_name: data?.admin_kost.name,
          manager_phone: data?.admin_kost.phone,
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
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nama Company"
              name="company_name"
              value={company.name}
              disabled={true}
            />

            <Select option={category} label="Category" />
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

          <div className="mb-4">
            <label className="mb-1 block">Fasilitas</label>
            {facilities
              ? facilities.map((v: any, i) => {
                  return (
                    <Checkbox
                      key={v.id}
                      id={`check${v.id}`}
                      value={v.id}
                      label={v.value}
                      checked={v.checked}
                      name="facility"
                      onChange={(e) => {
                        const myNextList = [...facilities];
                        const artwork = myNextList.find((a) => a.id === v.id);
                        if (artwork !== undefined) {
                          artwork.checked = e.currentTarget.checked;
                        }
                        // console.log(myNextList);
                        setFacilities(myNextList);
                        // console.log(facilities);
                      }}
                    />
                  );
                })
              : "loading ..."}
          </div>
          <Address address={address} setAddress={setAddress} />
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
        </Card>
      </form>
    </>
  );
};

export default Company;
