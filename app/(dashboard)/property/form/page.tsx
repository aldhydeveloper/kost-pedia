"use client";
// import { Wizard } from "react-use-wizard";
// import Content from "@/components/Wizard/WizContent";
// declare module "react-form-wizard-component";;
// import FormWizard from "react-form-wizard-component";
// import "react-form-wizard-component/dist/style.css";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { NumericFormat } from "react-number-format";
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

import { Product } from "@/service";
import { getCookie } from "cookies-next";
import { Facilities } from "@/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: any;
  room_size: string;
  address: any;
  desc: any;
  price: number | string;
  facilities?: any;
}

type tAddress = {
  full_address: string;
  province: number;
  city: number;
  district: number;
  village: number;
  campus: number[] | string[];
};

const sidebar = ["Data Kost", "Alamat Kost", "Foto Kost"];

const handleComplete = () => {
  console.log("Form completed!");
  // Handle form completion logic here
};

const tabChanged = ({
  prevIndex,
  nextIndex,
}: {
  prevIndex: number;
  nextIndex: number;
}) => {
  console.log("prevIndex", prevIndex);
  console.log("nextIndex", nextIndex);
};
const Property = () => {
  // const resFacilities = Facilities();
  // console.log(resFacilities);
  // const myPromise = Facilities().then((resp) => resp);
  // console.log(resFacilities);
  const router = useRouter();
  // console.log(status);
  // const authState = useAppSelector((state) => state.auth.authState);
  const [checked, setChecked] = useState("Data Kost");
  const [form, setForm] = useState<FormData>({
    name: "",
    room_size: "",
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
  // const [facilities, setFacilities] =
  //   useState<Array<{ id: number; value: string; checked: boolean }>>(fasility);

  const [facilities, setFacilities] = useState<
    Array<{ id: number; value: string; checked: boolean }> | undefined
  >(undefined);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [height, setH] = useState<number>();
  const [file, setFile] = useState<string>("/img/empty-img.jpg");
  const [multiFile, setMulti] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();

  const [next, setNext] = useState(2);
  const [prev, setPrev] = useState(2);
  const [goTo, setGoto] = useState(1);
  const [currentForm, setCurrentForm] = useState(1);
  // const [file, setFile] = useState([]);
  // console.log(authState);
  const adjust = () => {
    setTimeout(() => {
      const h =
        document.querySelector<HTMLElement>(".wrap.visible")?.offsetHeight;
      setH(h);
    }, 50);
  };
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
      Array.from(e.target.files).forEach((v: any) => {
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
    form2.current[name] = value;
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
      name: form2.current.name,
      room_size: form2.current.room_size,
      address: form2.current.address,
      desc: form2.current.desc,
      price: form2.current.price,
      facilities: facilitas,
      images: url,
      province_id: address.province,
      city_id: address.city,
      district_id: address.district,
      village_id: address.village,
      campus: address.campus,
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
    const ff = Facilities();
    // console.log(ff);
    ff.then((data) => {
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
  }, [height]);
  console.log(address);
  // console.log(facilities);
  return (
    <>
      <ToastContainer />
      <Link href="/property" role="link" back={true}>
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
                  // value={form.name}
                  // value={form2.current.name}
                  onChange={handlerChange}
                />
                <Input
                  name="room_size"
                  label="Room Size"
                  // value={form.room_size}
                  onChange={handlerChange}
                />
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
                            value={v.value}
                            label={v.value}
                            checked={v.checked}
                            name="facility"
                            onChange={(e) => {
                              // facilities[i].checked = e.currentTarget.checked;
                              // console.log(facilities[i]);
                              // setFacilities(
                              //   facilities.map((vF) => {
                              //     if (vF.id === v.id) {
                              //       // console.log(e.currentTarget.checked);
                              //       return {
                              //         ...vF,
                              //         checked: true,
                              //       };
                              //     } else {
                              //       return vF;
                              //     }
                              //   })
                              // );
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
                <NumericFormat
                  value={form.price}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue }: any = values;
                    // setForm({
                    //   ...form,
                    //   price: floatValue,
                    // });value
                    form2.current.price = value;
                    // do something with floatValue
                  }}
                  prefix="Rp. "
                  thousandSeparator="."
                  decimalSeparator=","
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
                />
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
                  checked == "Foto Kost"
                    ? "visible opacity-100 delay-200"
                    : "invisible opacity-0 hidden"
                }`}
              >
                <File
                  onChange={handleChange_image}
                  label="Thumbnail"
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
                  onChange={handleChnage_imageMulti}
                  multiple={true}
                  label="Image"
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
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default Property;
