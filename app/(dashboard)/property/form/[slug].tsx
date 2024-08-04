"use client";
import { useEffect, useState, useCallback, memo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import DataKost from "@/components/Property/form/DataKost";
import TypeKost from "@/components/Property/form/TypeKost";
import FotoKost from "@/components/Property/form/FotoKost";
import PriceKost, { iPrice } from "@/components/Property/form/PriceKost";
import FacilitiesKost, {
  iRule,
} from "@/components/Property/form/FacilitiesKost";
import Card from "@/components/Card";
import Link from "@/components/Utility/Link";
import Button from "@/components/Utility/CustomButton";

import ProductList from "@/service/product/list";
import { Product } from "@/service";

import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
interface iDataKost {
  name: string;
  desc: string;
  created_year: string;
  category: string;
}
interface iDataType {
  name: string;
  p: number | string;
  l: number | string;
}

const sidebar = [
  "Data Kost",
  "Type Kost",
  "Foto Kost",
  "Fasilitas",
  "Harga Kost",
];

const List = memo(function List({
  handleChange,
}: {
  handleChange: (i: number) => void;
}) {
  const [step, setStep] = useState<string[]>(["list-0"]);

  const handleStep = (e: any) => {
    // console.log(e.target.parentElement);
    const i = e.currentTarget.id.split("-")[1];
    // console.log(e.target.id);
    let temp = [];
    for (let x = 0; x <= i; x++) {
      temp[x] = `list-${x}`;
    }
    // console.log(temp);
    setStep(temp);
    handleChange(i);
  };
  console.log("render list");
  return (
    <>
      <ul role="sidebar">
        {sidebar.map((v, i) => {
          return (
            <li
              key={i}
              id={`list-${i}`}
              className={`pb-1 flex items-center gap-2 cursor-pointer`}
              onClick={handleStep}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full border-2 ${
                  `list-${i}` == step[i] ? "border-azure-700 bg-azure-700" : ""
                }`}
              ></span>
              <span
                className={`${`list-${i}` == step[i] ? "text-azure-700" : ""}`}
              >
                {v}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
});

const Property = () => {
  const router = useRouter();
  console.log(router);
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id")
    ? searchParams.get("id")
    : "";

  const [disabled, setDisabled] = useState<boolean>(false);
  const [dataKost, setDataKost] = useState<iDataKost>({
    name: "",
    desc: "",
    created_year: "",
    category: "",
  });
  const [dataType, setDataType] = useState<iDataType>({
    name: "",
    p: "",
    l: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [facilities, setFacilities] = useState<number[]>([]);
  const [price, setPrice] = useState<iPrice>({
    price: "",
    priceYear: "",
  });

  const [step, setStep] = useState<number>(0);
  console.log("render");

  const listCallback = useCallback((value: number) => {
    // console.log(value);
    setStep(value);
    // console.log(value);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    // const fileInput = document?.getElementById("fileInput") as HTMLFormElement; // Replace with your HTML element ID
    // const file = fileInput.files[0];

    const formData = new FormData();
    // console.log(files);
    // if (typeof thumbnail !== 'string') {
    formData.append("thumbnail", thumbnail as File);
    // } else {
    //   url[0] = thumbnail;
    // }
    files.forEach((image, i) => {
      formData.append(`image${i}`, image as File);
    });
    // console.log(formData.get("file"));
    // formData.append("file", file);
    // console.log(files);
    // return false;
    const url = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((resp: any) => resp.json())
      .then((resp) => resp.url_image);
    // const url = upload

    // const url = upload.url_image;

    // const facilitas = facilities.filter((arr) => arr.checked == true);
    const res = await Product(id ? id : "", {
      name: dataKost.name,
      room_size: `${dataType.p} X ${dataType.l}`,
      room_type_name: dataType.name,
      // address: address.full_address,
      desc: dataKost.desc,
      price: price.price,
      price_year: price.priceYear,
      category: dataKost.category,
      created_year: dataKost.created_year,
      facilities: facilities,
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

  useEffect(() => {
    // async () => {
    console.log(id);
    if (id) {
      // ProductList(id ? id : "").then((resp) => {
      //   if (resp.success) {
      //     const data = resp.data;
      //   }
      // });
      ProductList(id).then((resp: any) => {
        const data = resp.data;
        console.log(data);
        setDataKost({
          name: data.name,
          desc: data.desc,
          category: data.category,
          created_year: data.created_year,
        });
        let type = {
          name: data.room_type_name,
          p: "",
          l: "",
        };
        if (data.room_size) {
          const size: {
            0: string;
            1: string;
          } = data.room_size.split(" X ");
          // console.log(size);
          type = { ...type, p: size[0], l: size[1] };
        }
        setDataType(type);

        if (data.images.length > 0) {
          const images = data.images;
          // console.log(images[0].url);
          setThumbnail(images[0].url);
          let temp = [];
          for (let i = 1; i < images.length; i++) {
            // console.log(images[i]);
            temp.push(images[i].url);
          }
          // console.log(temp);
          setFiles(temp);
        }
        if (data.facilities.length > 0) {
          const newArr = data.facilities.map((v: iRule, i: number) => {
            return v.id;
          });
          // console.log(newArr);
          setFacilities(newArr);
        }
        setPrice({ price: data.price, priceYear: data.price_year });
        // const
      });
      // console.log(res);
    }
    // };
  }, [id]);
  return (
    <>
      <ToastContainer />
      <Link href="/property" role="link" className="mb-5 text-lg" back={true}>
        Property
      </Link>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <List handleChange={listCallback} />
          </Card>
          <div className="col-span-3 relative border-l">
            <Card customClass="ms-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {step == 0 ? (
                    <DataKost
                      dataKost={dataKost}
                      handleDataKost={(data) => {
                        setDataKost(data);
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {step == 1 ? (
                    <TypeKost
                      roomType={dataType}
                      handleChange={(e: any) => {
                        setDataType({
                          ...dataType,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {step == 2 ? (
                    <FotoKost
                      thumbnail={thumbnail}
                      files={files}
                      handleChange={(file, files) => {
                        setThumbnail(file);
                        setFiles(files);
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {step == 3 ? (
                    <FacilitiesKost
                      // facilities={facilities}
                      // handleChange={(fac: iRule[]) => {
                      //   setFacilities(fac);
                      // }}
                      choosenFacilities={facilities}
                      handleChangeChoose={(fac) => {
                        setFacilities(fac);
                        // console.log(fac);
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {step == 4 ? (
                    <PriceKost
                      price={price}
                      handleChange={(price: iPrice) => {
                        setPrice(price);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </motion.div>
                {/* <span></span> */}
              </AnimatePresence>
              <div className="flex items-center justify-between mt-10">
                <Button disabled={disabled} onClick={() => {}}>
                  Save
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
};

export default Property;
