"use client";
// import { Wizard } from "react-use-wizard";
// import Content from "@/components/Wizard/WizContent";
// declare module "react-form-wizard-component";;
// import FormWizard from "react-form-wizard-component";
// import "react-form-wizard-component/dist/style.css";
import { NumericFormat } from "react-number-format";
import Image from "next/image";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import Radio from "@/components/Checkboxes/Radio";
import Checkbox from "@/components/Checkboxes/Checkbox";
import Input from "@/components/Form/CustomInput";
import Textarea from "@/components/Form/CustomTextarea";
import File from "@/components/Form/CustomFile";
import Card from "@/components/Card";
import Button from "@/components/Utility/CustomButton";

interface FormData {
  name: any;
  address: any;
  desc: any;
  price: number | string;
  facility?: any;
}

const sidebar = ["Data Kost", "Foto Kost"];
const fasility = [
  { id: 0, value: "Wifi", checked: false },
  { id: 1, value: "Parkir", checked: false },
  { id: 2, value: "A/C", checked: false },
  { id: 3, value: "Ruang Tamu", checked: false },
  { id: 4, value: "Kamar Mandi Dalem", checked: false },
  { id: 5, value: "Jendela", checked: false },
];
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
  const [checked, setChecked] = useState("Data Kost");
  const [form, setForm] = useState<FormData>({
    name: "",
    address: "",
    desc: "",
    price: "",
  });
  const [facilities, setFacilities] =
    useState<Array<{ id: number; value: string; checked: boolean }>>(fasility);
  const [height, setH] = useState<number>();
  const [file, setFile] = useState<string>("/img/empty-img.jpg");
  const [multiFile, setMulti] = useState<string[]>([]);

  const [next, setNext] = useState(2);
  const [prev, setPrev] = useState(2);
  const [goTo, setGoto] = useState(1);
  const [currentForm, setCurrentForm] = useState(1);
  // const [file, setFile] = useState([]);
  const adjust = () => {
    setTimeout(() => {
      const h =
        document.querySelector<HTMLElement>(".wrap.visible")?.offsetHeight;
      setH(h);
    }, 50);
  };
  const handleChange_image = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleChnage_imageMulti = (e: any) => {
    // console.log(e.target.files);
    let m: string[] = [];
    Array.from(e.target.files).forEach((v: any) => {
      // setMulti([...multiFile, URL.createObjectURL(v)]);
      m.push(URL.createObjectURL(v));
    });
    setMulti(m);
    adjust();
    // console.log(multiFile);
  };
  const handlerChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    // console.log(value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlerChange_checkbox = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const checked = e.currentTarget.checked;

    const f: any = facilities.map((v) => {
      if (v.value == value) {
        return {
          ...v,
          checked: checked,
        };
      } else {
        return v;
      }
    });
    setFacilities(f);
  };
  useEffect(() => {
    // adjustHeight();

    adjust();
  }, [height, facilities]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <ul role="sidebar">
            {sidebar.map((v, i) => {
              return (
                <li
                  key={i}
                  className="pb-1"
                  onClick={() => {
                    adjust();
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
          <Card id="wrap" style={{ height: height }} customClass="ms-4">
            <div
              className={`wrap duration-300 absolute inset-x-6 top-6 ${
                checked == "Data Kost"
                  ? "visible opacity-100 delay-200"
                  : "invisible opacity-0"
              }`}
            >
              <Input
                name="name"
                label="Nama Kost"
                value={form.name}
                onChange={handlerChange}
              />
              <Textarea
                name="address"
                label="Alamat Kost"
                value={form.address}
                onChange={handlerChange}
              />
              <Textarea
                name="desc"
                label="Deskripsi Kost"
                value={form.desc}
                onChange={handlerChange}
              />
              <label className="mb-1 block">Fasilitas</label>
              <div className="mb-4">
                {facilities.map((v) => {
                  return (
                    <Checkbox
                      key={v.id}
                      id={`${v.id}`}
                      name="facility"
                      value={v.value}
                      label={v.value}
                      checked={v.checked}
                      onClick={handlerChange_checkbox}
                    />
                    // <div key={v.id}>
                    //   <input
                    //     type="checkbox"
                    //     name={v.value}
                    //     value={v.value}
                    //     id={`check${v.id}`}
                    //     className="sr- peer"
                    //     onChange={(e) => handlerChange_checkbox(e)}
                    //     // checked={v.checked}
                    //   />
                    //   <label
                    //     htmlFor={`check${v.id}`}
                    //     className="flex items-center peer-checked:is-checked group cursor-pointer"
                    //   >
                    //     <span
                    //       className={`rounded-sm border w-4 h-4 relative box-content flex items-center justify-center ${
                    //         v.value ? "me-3" : ""
                    //       } ${v.checked ? "border-azure-500" : ""}`}
                    //     >
                    //       <span
                    //         className={`w-2 h-2 rounded-full ${
                    //           v.checked ? "bg-azure-600" : "bg-transparent"
                    //         }`}
                    //       ></span>
                    //     </span>
                    //     <span>{v.value}</span>
                    //   </label>
                    // </div>
                  );
                })}
              </div>
              <label className="mb-2 block">Harga</label>
              <NumericFormat
                value={form.price}
                prefix="Rp. "
                thousandSeparator="."
                decimalSeparator=","
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
              />
            </div>
            <div
              className={`wrap duration-300 absolute inset-x-6 top-6 ${
                checked == "Foto Kost"
                  ? "visible opacity-100 delay-200"
                  : "invisible opacity-0"
              }`}
            >
              <File onChange={handleChange_image} label="Thumbnail" />
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
                  console.log(v);
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
            </div>

            <div className="flex items-center justify-between">
              {/* <Button onClick={() => {}}>Prev</Button> */}
            </div>
          </Card>
        </div>
      </div>
    </>
    // <Wizard>
    //   <Content sidebar={sidebar}>
    //     <label>Nama Kost</label>
    //     <input
    //       type="text"
    //       placeholder="Nama Kost"
    //       className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    //     />
    //     <label>Deskripsi Kost</label>
    //     <textarea
    //       placeholder="Deskripsi Kost"
    //       className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    //     ></textarea>
    //   </Content>
    //   <Content sidebar={sidebar}>
    //     <label>Alamat Kost</label>
    //     <textarea
    //       placeholder="Alamat Kost"
    //       className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    //     ></textarea>
    //   </Content>
    // </Wizard>
  );
};

export default Property;
