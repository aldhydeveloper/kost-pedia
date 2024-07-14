"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Card from "@/components/Card";
import Button from "@/components/Utility/CustomButton";

import DataKost, {
  iDataKost,
  iRule,
} from "@/components/Property/kost/DataKost";
import AddressKost, {
  iAddressKost,
  iAddressList,
  iCampus,
} from "@/components/Property/kost/AddresssKost";
import FotoKost, { tFoto, tFile } from "@/components/Property/kost/FotoKost";
import FacilitiesKost, {
  tFacility,
} from "@/components/Property/kost/FacilitiesKost";
import TypeKost, {
  tRooms,
  dataRooms,
} from "@/components/Property/kost/TypeKost";
import PriceKost from "@/components/Property/kost/PriceKost";

import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Post from "@/service/post";

const sidebar = [
  "Data Kost",
  "Alamat Kost",
  "Foto Kost",
  "Fasilitas",
  "Type Kamar",
];

const List = function List({
  handleChange,
  // callbackDisabled,
  disabled,
  currentStep,
}: {
  handleChange: (i: number) => void | undefined;
  // callbackDisabled: (disabled: boolean) => void | undefined;
  disabled: boolean;
  currentStep: number;
}) {
  // console.log(currentStep);
  // const rr = Array.from({ length: currentStep }, (v, i) => i++);
  // const [step, setStep] = useState<number>(currentStep);

  // const currentStep;
  const handleStep = (e: any) => {
    const i = e.currentTarget.id.split("-")[1];
    // console.log(i);
    handleChange(parseInt(i));
    if (currentStep == 0) {
      // callbackDisabled(disabled);
    }
  };
  // console.log("render list");
  return (
    <>
      <ul role="sidebar">
        {sidebar.map((v, i) => {
          return (
            <li
              key={i}
              id={`list-${i}`}
              className={`pb-1 flex items-center gap-2 ${
                i <= currentStep ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={i <= currentStep ? handleStep : undefined}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full border-2 ${
                  i <= currentStep
                    ? "border-azure-700 bg-azure-700"
                    : " opacity-55"
                }`}
              ></span>
              <span
                className={`${
                  i <= currentStep ? "text-azure-700" : "opacity-55"
                }`}
              >
                {v}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};
const Kost = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [dataKost, setDataKost] = useState<iDataKost>({
    name: "",
    desc: "",
    created_year: "",
    category: "",
    kost_rules: [],
    admin_kost_name: "",
    admin_kost_phone: "",
  });
  const [dataAddress, setDataAddress] = useState<iAddressKost>({
    address: "",
    address_note: "",
    province_id: 0,
    city_id: 0,
    district_id: 0,
    village_id: 0,
    campus: [],
  });
  const [dataAddressList, setDataAddressList] = useState<iAddressList>({
    provinceList: [],
    cityList: [],
    districtList: [],
    villageList: [],
  });
  const [dataFoto, setDataFoto] = useState<tFoto>({
    front_image: "",
    inside_image: [],
    street_image: "",
  });
  const [dataType, setDataType] = useState<tRooms[]>([dataRooms]);
  const [dataFacilities, setDataFacilities] = useState<tFacility[]>([]);
  const [dataRoomFacilities, setDataRoomFacilities] = useState<tFacility[]>([]);
  const [step, setStep] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ruleList = useRef<iRule[]>([]);
  const callbackStep = (step: number) => {
    // console.log(step);
    setStep(step);
    // setDisabled(true);
    // return Array.from({ step }, (v, i) => i++);
  };
  const callbackRuleList = (rules: iRule[]) => {
    // setDisabled(false);
    ruleList.current = rules;
  };
  const onClickStep = () => {
    setStep(step + 1);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    // let front_image = null;
    if (dataFoto.front_image !== "") {
      formData.append("front_image", dataFoto.front_image);
    }
    if (dataFoto.inside_image.length > 0) {
      Array.from(dataFoto.inside_image as FileList).forEach((v, i) => {
        // formData.append(`inside_image[${i}]`, dataFoto.front_image);
        formData.append(`inside_image-${i}`, v);
      });
    }
    if (dataFoto.street_image !== "") {
      formData.append("street_image", dataFoto.street_image);
    }
    // if (dataFoto.inside_image.length > 0) {
    //   Array.from(dataFoto.inside_image as FileList).forEach((v) => {
    //     formData.append("front_image", dataFoto.front_image);
    //   });
    // }
    const url = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((resp) => resp.url_image);

    const front_image = url.front_image ? url.front_image : null;
    const inside_image = Object.keys(url)
      .filter((v) => v.includes("inside_image"))
      .map((v) => url[v]);
    const street_image = url.street_image ? url.street_image : null;
    // console.log(dataType);
    // const kost_images = Object.keys(url).map((v) => {});
    const rooms = dataType.map((v) => {
      const formDataRooms = new FormData();
      // let front_image = null;
      if (v.front_image !== "") {
        formDataRooms.append("front_image", v.front_image);
      }
      if (v.inside_image.length > 0) {
        Array.from(v.inside_image as FileList).forEach((v, i) => {
          // formData.append(`inside_image[${i}]`, dataFoto.front_image);
          formDataRooms.append(`inside_image-${i}`, v);
        });
      }
      if (v.street_image !== "") {
        formDataRooms.append("bath_image", v.street_image);
      }
      const front_image = url.front_image ? url.front_image : null;
      const inside_image = Object.keys(url)
        .filter((v) => v.includes("inside_image"))
        .map((v) => url[v]);
      const bath_image = url.bath_image ? url.bath_image : null;
      return {
        name: v.room_type_name,
        room_size: `${v.p}x${v.l}`,
        desc: v.desc,
        price: v.price,
        price_year: v.price_year,
        room_facilities: v.facilities.rooms,
        bath_facilities: v.facilities.bath,
        front_image: front_image,
        inside_image: inside_image,
        bath_image: bath_image,
      };
    });
    const req = {
      ...dataKost,
      ...dataAddress,
      address_note: "-",
      kost_facilities: dataFacilities
        .filter((v) => v.checked === true && v.type === 1)
        .map((v) => v.id),
      bath_facilities: dataFacilities
        .filter((v) => v.checked === true && v.type === 2)
        .map((v) => v.id),
      campus: dataAddress.campus.map((v) => v.value),
      front_image: front_image,
      inside_image: inside_image,
      street_image: street_image,
      rooms: rooms,
    };
    console.log(JSON.stringify(req));
    const resp = await Post(
      `${process.env.NEXT_PUBLIC_API_HOST}/kost/createWithRooms`,
      req
    );
    if (resp.success) {
      toast.success(<span className="text-nowrap">{resp.success}</span>, {
        position: "top-center",
        className: "w-96",
      });
      setTimeout(() => {
        router.push("/property/kost");
      }, 3000);
    }
    setIsLoading(false);
    // console.log(resp);
  };
  // console.log(dataFoto);

  //   {
  //     "name": "Kost Wildan",
  //     "category": "Putra",
  //     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
  //     "created_year": 2012,
  //     "address": "Jl Kesesatan yang hanya di miliki oleh orang tersesat",
  //     "address_note": "dekat dengan yang maha kuasa",
  //     "front_image" : "/uploads/Black-Lamborghini-Matte-1366x768.jpg",
  //     "inside_image":  ["/uploads/2014-lamborghini-aventador-1366x768.jpg", "/uploads/Black-Lamborghini-Matte-1366x768.jpg", "/uploads/2013_lamborghini_aventador_lp700_4-1366x768.jpg"],
  //     "street_image": "/uploads/lamborghini_aventador_lp700_4_blue_3-wallpaper-1366x768.jpg",
  //     "kost_rules": [1, 2],
  //     "kost_facilities": [1, 3],
  //     "bath_facilities": [1, 3],
  //     "village_id": 1,
  //     "district_id": 1,
  //     "city_id": 1,
  //     "province_id": 1,
  //     "rooms": [
  //         {
  //             "name":"Type A",
  //             "room_size": "2x10",
  //             "desc": "Kamar bertingkat 20",
  //             "front_image": "/uploads/Black-Lamborghini-Matte-1366x768.jpg",
  //             "inside_image": ["/uploads/Black-Lamborghini-Matte-1366x768.jpg"],
  //             "bath_image": "",
  //             "price": 10,
  //             "price_year": 2000

  //         },
  //         {
  //             "name":"Type B",
  //             "room_size": "%x10",
  //             "desc": "Kamar Tanpa Ujung",
  //             "front_image": "/uploads/Black-Lamborghini-Matte-1366x768.jpg",
  //             "inside_image": ["/uploads/Black-Lamborghini-Matte-1366x768.jpg"],
  //             "bath_image": "",
  //             "price": 1000,
  //             "price_year": 2000000

  //         }
  //     ]
  // }
  useEffect(() => {
    console.log(step);
  });
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <List
            handleChange={callbackStep}
            disabled={false}
            // callbackDisabled={(disabled) => setDisabled(disabled)}
            currentStep={step}
          />
        </Card>
        <div className="col-span-3 relative">
          <Card>
            <form onSubmit={onSubmit}>
              <motion.div
                key={step}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {step == 0 && (
                  <DataKost
                    dataKost={dataKost}
                    callbackRuleList={callbackRuleList}
                    ruleList={ruleList.current}
                    handleDataKost={(data) => {
                      setDataKost(data);
                      const kost = Object.keys(data)
                        .map((value) => data[value])
                        .filter(
                          (value) => value === "" || value.length === 0
                        ).length;
                      console.log(kost);
                      setDisabled(kost > 0);
                      // console.log(kost);
                    }}
                    // validateKost={() => {}}
                  />
                )}
                {step == 1 && (
                  <AddressKost
                    address={dataAddress}
                    setAddress={(name: string, value: string | iCampus[]) => {
                      setDataAddress({ ...dataAddress, [name]: value });
                    }}
                    addressList={dataAddressList}
                    handleAddressList={(data: iAddressList) => {
                      console.log(data);
                      setDataAddressList(data);
                    }}
                  />
                )}
                {step == 2 && (
                  <FotoKost
                    foto={dataFoto}
                    handleFotoKost={(name: string, value: tFile) => {
                      // setDataFoto({ ...dataFoto, [name]: value });
                      // setDataFoto((prevstate) => ({
                      //   ...prevstate,
                      //   [name]: value,
                      // }));
                    }}
                  />
                )}
                {step == 3 && (
                  <FacilitiesKost
                    dataFacilities={dataFacilities}
                    handleDataFacilities={(facilities: tFacility[]) => {
                      setDataFacilities(facilities);
                    }}
                  />
                )}
                {step == 4 && (
                  <TypeKost
                    typeKost={dataType}
                    dataFacilities={dataRoomFacilities}
                    handleDataFacilities={setDataRoomFacilities}
                    callback={(type) => {
                      setDataType(type);
                    }}
                  />
                )}
                {step == 5 && (
                  <PriceKost
                    dataRooms={dataType}
                    // callback={(type) => {
                    //   setDataType(type);
                    // }}
                  />
                )}
              </motion.div>
              <div className="inline-flex items-center justify-between w-full">
                <IconContext.Provider
                  value={{ size: "1rem", className: "inline-block" }}
                >
                  <Button
                    type="button"
                    size="sm"
                    className={`inline-flex items-center justify-start ${
                      step == 0 && "invisible"
                    }`}
                    onClick={() => setStep(step - 1)}
                    inline
                  >
                    <FaChevronLeft />
                    <p>Back</p>
                  </Button>
                  {step < sidebar.length - 1 && (
                    <Button
                      type="button"
                      size="sm"
                      className={`inline-flex items-center justify-end`}
                      onClick={() => setStep(step + 1)}
                      // disabled={disabled}
                      inline
                    >
                      Lanjutkan
                      <FaChevronRight />
                    </Button>
                  )}
                  {step == sidebar.length - 1 && (
                    <Button
                      size="sm"
                      className={`inline-flex items-center justify-end`}
                      // disabled={disabled}
                      isLoading={isLoading}
                      inline
                    >
                      Simpan
                    </Button>
                  )}
                </IconContext.Provider>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Kost;
