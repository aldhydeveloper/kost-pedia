"use client";
// import { Wizard } from "react-use-wizard";
// import Content from "@/components/Wizard/WizContent";
// declare module "react-form-wizard-component";;
// import FormWizard from "react-form-wizard-component";
// import "react-form-wizard-component/dist/style.css";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Radio from "@/components/Checkboxes/Radio";
import Checkbox from "@/components/Checkboxes/Checkbox";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import File from "@/components/Form/CustomFile";
import Card from "@/components/Card";
import Button from "@/components/Utility/CustomButton";
import Link from "@/components/Utility/Link";

import Address from "@/components/Property/address";
import Type from "@/components/Property/type";
import Price from "@/components/Property/harga";

import ProductList from "@/service/product/list";

import { useSearchParams } from "next/navigation";
import { Product } from "@/service";
import { getCookie } from "cookies-next";
import { Facilities } from "@/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: any;
  // room_size: string;
  address: any;
  desc: any;
  price: number | string;
  facilities?: any;
}

type tPrice = {
  price: number | string;
  priceYear: number | string;
};

type tAddress = {
  full_address: string;
  province: number;
  city: number;
  district: number;
  village: number;
  campus: number[] | string[];
};

const sidebar = [
  "Data Kost",
  "Alamat Kost",
  "Type Kost",
  "Foto Kost",
  "Harga Kost",
];

const Property = () => {
  const searchParams = useSearchParams();
  // const resFacilities = Facilities();
  // console.log(resFacilities);
  // const myPromise = Facilities().then((resp) => resp);
  // console.log(resFacilities);
  const router = useRouter();
  const id: any = searchParams.get("id");
  // console.log(status);
  // const authState = useAppSelector((state) => state.auth.authState);
  const [checked, setChecked] = useState("Data Kost");
  const [roomType, setRoomType] = useState({
    name: "",
    size: {
      p: 0,
      l: 0,
    },
  });
  const [price, setPrice] = useState<tPrice>({
    price: "",
    priceYear: "",
  });
  const [form, setForm] = useState<FormData>({
    name: "",
    // room_size: "",
    address: "",
    desc: "",
    price: "",
    facilities: [],
  });
  const form2 = useRef<any>({
    name: "",
    room_size: "",
    address: "",
    desc: "",
    price: "",
    facilities: [],
  });
  const [address, setAddress] = useState<tAddress>({
    full_address: "",
    province: 0,
    city: 0,
    district: 0,
    village: 0,
    campus: [],
  });

  const [facilities, setFacilities] = useState<
    Array<{ id: number; value: string; checked: boolean }> | undefined
  >(undefined);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [file, setFile] = useState<string>("/img/empty-img.jpg");
  const [multiFile, setMulti] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();

  const handleChange_image = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
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
      setMulti(m);
    }
    // console.log(multiFile);
  };
  const handlerChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    // const value = event.target.value;
    setForm({ ...form, [name]: value });
    // form2.current[name] = value;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
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
    // const url = upload
    console.log(url);
    // const url = upload.url_image;

    let facilitas: number[] = [];
    // console.log(facilities);
    let i = 0;
    facilities?.forEach((f) => {
      // console.log(f);
      if (f.checked) {
        facilitas[i] = Number(f.id);
        i++;
      }
    });
    const res = await Product({
      name: form.name,
      room_size: `${roomType.size.p} X ${roomType.size.l}`,
      room_type_name: roomType.name,
      // address: address.full_address,
      desc: form.desc,
      price: price.price,
      price_year: price.priceYear,
      facilities: facilitas,
      images: url,
      // province_id: address.province,
      // city_id: address.city,
      // district_id: address.district,
      // village_id: address.village,
      // campus: address.campus,
    });
    // console.log(res);
    // const json = res?.json();
    if (res?.success) {
      toast.success(<span className="text-nowrap">{res.success}</span>, {
        position: "top-center",
        className: "w-96",
      });
      setTimeout(() => {
        router.push("/property");
      }, 3000);
    } else {
      toast.error(<span className="text-nowrap">{res?.error}</span>, {
        position: "top-center",
        className: "w-96",
      });
      setDisabled(false);
    }
    // console.log(res);
  };
  // const dataFacilities = [];
  useEffect(() => {
    // adjustHeight();

    // if (status === "loading") {
    //   router.push("/signin");
    // }
    ProductList(id ? id : "").then((resp) => {
      if (resp.success) {
        const data = resp.data;
        setForm({
          name: data.name,
          // room_size: data.room_size,
          address: "",
          desc: data.desc,
          price: data.price,
          facilities: [],
        });
        // setFacilities(temp);
        // let f = data.facilities.map((v: { id: number; name: string }) => {
        //   return { id: v.id, name: v.name };
        // });
        // console.log(f);
        // let temp = [];
        // f?.forEach((v: { id: number; name: string }) => {
        //   if () {

        //   }
        // });
      }
    });
    // console.log(products);
    // products.then((resp) => {
    //   if (resp.success) {
    //     form2.current.name = resp.data.name;
    //   }
    //   console.log(form2.current);
    //   // console.log(resp);
    //   // setList(resp.data);
    // });

    const ff = Facilities();
    // console.log(ff);
    ff.then((data) => {
      if (data.success) {
        // console.log(data);
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
  }, [id]);
  console.log(id);
  // console.log(address);
  // console.log(facilities);
  return (
    <>
      <ToastContainer />
      <Link href="/property" role="link" className="mb-5 text-lg" back={true}>
        Property
      </Link>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <ul role="sidebar">
            {sidebar.map((v, i) => {
              return (
                <li
                  key={i}
                  className="pb-1"
                  onClick={() => {
                    setChecked(v);
                  }}
                >
                  <Radio
                    id={`input${i}`}
                    name="wizard"
                    label={v}
                    checked={checked === v}
                  />
                </li>
              );
            })}
          </ul>
        </Card>
        {/* CONTENT */}
        <div className="col-span-3 relative border-l">
          <form onSubmit={onSubmit}>
            <Card
              id="wrap"
              // style={{ height: height }}
              customClass="ms-4"
            >
              <div
                className={`wrap ransition-all duration-300 inset-x-6 top-6 ${
                  checked == "Data Kost"
                    ? "visible opacity-100 delay-200"
                    : "invisible opacity-0 hidden"
                }`}
              >
                <Input
                  name="name"
                  label="Nama Kost"
                  value={form.name}
                  // value={form2.current.name}
                  onChange={handlerChange}
                />
                {/* <Input
                  name="room_size"
                  label="Room Size"
                  value={form.room_size}
                  onChange={handlerChange}
                /> */}
                {/* <Textarea
                  name="address"
                  label="Alamat Kost"
                  onChange={handlerChange}
                /> */}
                <Textarea
                  name="desc"
                  label="Deskripsi Kost"
                  // value={form.desc}
                  onChange={handlerChange}
                />
                <label className="mb-1 block">Fasilitas</label>
                <div className="mb-4">
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
                              // let f = fac;
                              // if (e.target.checked) {
                              //   f.push(e.target.value);
                              // } else {
                              //   f = fac.filter((value) => {
                              //     return value !== e.target.value;
                              //   });
                              // }
                              // setFac(f);
                              // console.log(f);
                              // setFac();
                              const myNextList = [...facilities];
                              const artwork = myNextList.find(
                                (a) => a.id === v.id
                              );
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
                <label className="mb-2 block">Harga</label>
              </div>
              <div
                className={`wrap ransition-all duration-300 inset-x-6 top-6 ${
                  checked == "Alamat Kost"
                    ? "visible opacity-100 delay-200"
                    : "invisible opacity-0 hidden"
                }`}
              >
                <Address
                  address={address}
                  setAddress={setAddress}
                  // onChangeAddress={(e: any) =>
                  //   setAddress({ ...address, full_address: e.target.value })
                  // }
                />
              </div>
              <div
                className={`wrap ransition-all duration-300 inset-x-6 top-6 ${
                  checked == "Type Kost"
                    ? "visible opacity-100 delay-200"
                    : "invisible opacity-0 hidden"
                }`}
              >
                <Type
                  roomType={roomType}
                  setRoomType={setRoomType}
                  // onChangeAddress={(e: any) =>
                  //   setAddress({ ...address, full_address: e.target.value })
                  // }
                />
              </div>
              <div
                className={`wrap ransition-all duration-300 inset-x-6 top-6 ${
                  checked == "Foto Kost"
                    ? "visible opacity-100 delay-200"
                    : "invisible opacity-0 hidden"
                }`}
              >
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
                  label="Foto Kamar Kost (Max 3)"
                />
                <div className="grid grid-cols-3 gap-5">
                  {multiFile.map((v) => {
                    return (
                      <Image
                        key={v}
                        src={v}
                        width={500}
                        height={500}
                        alt="Thumbnail"
                        className="my-4"
                      />
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-10">
                  <Button disabled={disabled} onClick={() => {}}>
                    Save
                  </Button>
                </div>
              </div>
              <div
                className={`wrap ransition-all duration-300 inset-x-6 top-6 ${
                  checked == "Harga Kost"
                    ? "visible opacity-100 delay-200"
                    : "invisible opacity-0 hidden"
                }`}
              >
                <Price
                  price={price}
                  setPrice={setPrice}
                  // onChangeAddress={(e: any) =>
                  //   setAddress({ ...address, full_address: e.target.value })
                  // }
                />
              </div>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default Property;
