"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Card from "@/components/Card";
import Button from "@/components/Utility/CustomButton";
import collect from "collect.js";

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
import Get from "@/service/get";
import Send from "@/service/Send";
import imageCompression from "browser-image-compression";
const options = {
  maxSizeMB: 0.25, // Maksimal ukuran gambar dalam MB
  maxWidthOrHeight: 1024, // Maksimal lebar atau tinggi gambar
  useWebWorker: true, // Gunakan Web Worker untuk meningkatkan kinerja
};

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
const Kost = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  // const route = nextRoute();
  // console.log(params);
  // console.log(params.slug);
  const id = params.slug ? params.slug[0] : "";
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
  const idRooms = useRef<string[]>([]);
  const [dataType, setDataType] = useState<tRooms[]>([dataRooms]);
  const [dataFacilities, setDataFacilities] = useState<tFacility[]>([]);
  const [dataRoomFacilities, setDataRoomFacilities] = useState<tFacility[]>([]);
  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const isDisabled = useRef<boolean>(true);

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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsLoading(true);
    const formData = new FormData();
    // let front_image = null;
    // console.log(typeof dataFoto.front_image === "object");
    // return false;
    // let front_image_temp = null;
    if (typeof dataFoto.front_image === "object") {
      const compressedFile = await imageCompression(
        dataFoto.front_image,
        options
      );
      formData.append("front_image", dataFoto.front_image);
    }
    if (dataFoto.inside_image.length > 0) {
      for (const key in Array.from(dataFoto.inside_image)) {
        const image = Array.from(dataFoto.inside_image)[key];
        // console.log(v);
        if (typeof image === "object") {
          const compressedFile = await imageCompression(image, options);
          formData.append(`inside_image-${key}`, compressedFile);
        }
      }
      // Array.from(dataFoto.inside_image).forEach((v, i) => {
      //   if (typeof v === "object") {
      //     // formData.append(`inside_image[${i}]`, dataFoto.front_image);
      //     formData.append(`inside_image-${i}`, v);
      //   }
      // });
    }
    const inside_foto_exist = collect(
      dataFoto.inside_image.filter((v) => typeof v === "string")
    );
    // console.log(Array.from(formData));
    // console.log(inside_foto_exist);
    // return false;
    if (typeof dataFoto.street_image === "object") {
      const compressedFile = await imageCompression(
        dataFoto.street_image,
        options
      );
      formData.append("street_image", compressedFile);
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

    const front_image = url.front_image
      ? url.front_image
      : dataFoto.front_image;
    // const inside_image = [
    //   ...inside_foto_exist,
    //   Object.keys(url)
    //     .filter((v) => v.includes("inside_image"))
    //     .map((v) => url[v]),
    // ];

    const inside_image = inside_foto_exist
      .merge(
        Object.keys(url)
          .filter((v) => v.includes("inside_image"))
          .map((v) => url[v])
      )
      .all();
    const street_image = url.street_image
      ? url.street_image
      : dataFoto.street_image;
    // console.log(dataType);
    // const kost_images = Object.keys(url).map((v) => {});
    const rooms = await Promise.all(
      dataType.map(async (v) => {
        const formDataRooms = new FormData();
        // let front_image = null;
        // console.log(typeof v.front_image === "object");
        if (typeof v.front_image === "object") {
          const compressedFile = await imageCompression(v.front_image, options);
          formDataRooms.append("front_image", compressedFile);
        }
        if (v.inside_image.length > 0) {
          // Array.from(v.inside_image).forEach((v, i) => {
          //   // formData.append(`inside_image[${i}]`, dataFoto.front_image);
          //   formDataRooms.append(`inside_image-${i}`, v);
          // });

          for (const key in Array.from(v.inside_image)) {
            const image = Array.from(v.inside_image)[key];
            // console.log(v);
            if (typeof image === "object") {
              const compressedFile = await imageCompression(image, options);
              formDataRooms.append(`inside_image-${key}`, compressedFile);
            }
          }
        }
        if (typeof v.street_image === "object") {
          const compressedFile = await imageCompression(
            v.street_image,
            options
          );
          formDataRooms.append("bath_image", compressedFile);
        }

        const inside_foto_exist = collect(
          v.inside_image.filter((v) => typeof v === "string")
        );

        const url = await fetch("/api/upload", {
          method: "POST",
          body: formDataRooms,
        })
          .then((resp) => resp.json())
          .then((resp) => resp.url_image);

        const front_image = url.front_image ? url.front_image : v.front_image;
        // console.log(url);
        // const inside_image = [
        //   ...inside_foto_exist,
        //   Object.keys(url)
        //     .filter((v) => v.includes("inside_image"))
        //     .map((v) => url[v]),
        // ];
        const inside_image = inside_foto_exist
          .merge(
            Object.keys(url)
              .filter((v) => v.includes("inside_image"))
              .map((v) => url[v])
          )
          .all();
        // let thumbnail = v.thumbnail == "front_image" ? front_image : "";
        //     thumbnail;

        // console.log(inside_image);
        // return false;
        const bath_image = url.bath_image ? url.bath_image : v.street_image;

        let thumbnail = v.thumbnail == "front_image" ? front_image : "";
        thumbnail = thumbnail
          ? thumbnail
          : v.thumbnail == "street_image"
          ? bath_image
          : "";

        if (!thumbnail) {
          const index = v.thumbnail?.slice(-1)
            ? parseInt(v.thumbnail?.slice(-1))
            : 0;
          // console.log(v.thumbnail);
          thumbnail = index >= 0 && index < 3 ? inside_image[index] : "";
          console.log(thumbnail);
          // console.log(thumbnail);
          // if (thumbnail) {
          //   thumbnail = thumbnail[thumbnail.length - 1];
          // }
        }
        // console.log(v.thumbnail);
        // const arr_thumbnail = url.filter((vUrl: string) => {
        //   return vUrl.replaceAll("_", "") == v.thumbnail?.replaceAll("_", "");
        // });
        // const thumbnail =
        //   arr_thumbnail.length > 0
        //     ? arr_thumbnail[arr_thumbnail.length - 1]
        //     : "";
        // console.log(arr_thumbnail);
        // console.log(thumbnail);
        return {
          id: v.id,
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
          status: v.status,
          thumbnail: thumbnail,
        };
      })
    );
    // return false;
    const req = {
      ...dataKost,
      ...dataAddress,
      kost_facilities: dataFacilities
        .filter((v) => v.checked === true && v.type === 1)
        .map((v) => v.id),
      bath_facilities: dataFacilities
        .filter((v) => v.checked === true && v.type === 3)
        .map((v) => v.id),
      campus: dataAddress.campus.map((v) => v.value),
      front_image: front_image,
      inside_image: inside_image,
      street_image: street_image,
      id_rooms: idRooms.current,
      rooms: rooms,
    };
    // console.log(JSON.stringify(req));
    const resp = await Send(
      `${process.env.NEXT_PUBLIC_API_HOST}/kost/${
        !id ? "createWithRooms" : `updateWithRooms/${id}`
      }`,
      !id ? "Post" : "Put",
      req
    );
    if (resp.success) {
      toast.success(<span className="text-nowrap">{resp.success}</span>, {
        position: "top-center",
        className: "w-96",
      });
      // setTimeout(() => {
      //   router.push("/property/kost");
      // }, 3000);
    } else {
      toast.error(<span className="text-nowrap">{resp.error}</span>, {
        position: "top-center",
        className: "w-96",
      });
      setIsLoading(false);
    }
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
  const loaded = useRef(false);
  useEffect(() => {
    // const collection = collect(["Unicorn", "Rainbow"]);

    // const merged = collection.merge([]);

    // console.log(merged.all());
    // console.log(step);
    if (id && !loaded.current) {
      loaded.current = false;
      // console.log(id);
      const resp = Get(`${process.env.NEXT_PUBLIC_API_HOST}/kost/${id}`);
      resp.then((resl) => {
        if (resl.success) {
          const data = resl.data;

          const rules: { id: number }[] = data.rules;
          const rulesCollection = collect(rules);
          const r: number[] = rulesCollection
            .flatMap((value) => value.id)
            .all();
          // if (rules) {
          // }
          // console.log(rulesCollection.flatMap((value) => value.id));

          setDataKost({
            name: data.name,
            desc: data.desc,
            created_year: data.created_year,
            category: data.category,
            kost_rules: r,
            admin_kost_name: data.admin_kosts ? data.admin_kosts.name : "",
            admin_kost_phone: data.admin_kosts ? data.admin_kosts.phone : "",
          });

          setDataAddress({
            address: data.address,
            address_note: data.address_note,
            province_id: data.province ? data.province.id : 0,
            city_id: data.city ? data.city.id : 0,
            district_id: data.district ? data.district.id : 0,
            village_id: data.village ? data.village.id : 0,
            campus: [],
          });
          setDataFoto({
            front_image: data.front_image,
            inside_image: data.inside_image,
            street_image: data.street_image,
          });
          if (data.facilities.length > 0) {
            // console.log(data.facilities);
            // const temp = data.facilities.map((v: tFacility) => {
            //   return {
            //     id: v.id,
            //     name: v.name,
            //     type: v.type,
            //     checked: true,
            //   };
            // });
            const collection = collect(data.facilities);
            const collection2 = collect(data.bath_facilities);
            const temp = collect(
              data.all_facilities.map((v: tFacility) => {
                return {
                  ...v,
                  checked:
                    collection.contains("id", v.id) ||
                    collection2.contains("id", v.id),
                };
              })
            );
            const facilities = temp.all();
            // const temp_bath = data.all_facilities.map((v: tFacility) => {
            //   return { ...v, checked: collection2.contains("id", v.id) };
            // });

            // const merged = temp.merge(temp_bath).all();
            // console.log("collection", temp);
            setDataFacilities(facilities as tFacility[]);
          }

          if (data.rooms.length > 0) {
            const temp = data.rooms.map((v: any) => {
              const size = v.room_size;
              let p = 0;
              let l = 0;
              if (size) {
                const arr_size = size.split("x");
                p = arr_size[0];
                l = arr_size[1];
              }
              // console.log(v.facilities);
              //  = [...idRooms.current, v.id];
              return {
                id: v.id,
                room_type_name: v.name,
                p: p,
                l: l,
                desc: v.desc,
                front_image: v.front_image,
                inside_image: v.inside_image,
                street_image: v.bath_image ? v.bath_image : "",
                price: v.price,
                price_year: v.price_year,
                status: v.status,
                thumbnail: v.thumbnail,
                facilities: {
                  rooms: collect(
                    v.facilities.filter((vFac: any) => vFac.type === 2)
                  )
                    .flatMap((vFac: any) => vFac.id)
                    .all(),
                  bath: collect(v.bath_facilities)
                    .flatMap((vFac: any) => vFac.id)
                    .all(),
                },
              };
            });
            setDataType(temp);
            idRooms.current = collect(data.rooms)
              .flatMap((v: any) => v.id)
              .all();
            // setDataRoomFacilities(data.facilities);
          }
        }
      });
    }
  }, [id]);
  return (
    <>
      <Button
        href="/property/kost"
        role="link"
        className="text-xl text-black mb-8"
      >
        <FaChevronLeft /> Property
      </Button>
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
                      // console.log(kost);
                      // setDisabled(kost > 0);
                      // console.log(kost);

                      isDisabled.current = kost > 0;
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
                      // console.log(data);
                      setDataAddressList(data);
                    }}
                  />
                )}
                {step == 2 && (
                  <>
                    <div className="mb-6">
                      <h2 className="mb-0 leading-4 text-lg font-bold">
                        Pasang Foto Kost terbaik anda
                      </h2>
                      <small>
                        Foto yang menarik akan menjadi perhatian bagi penyewa
                        kost
                      </small>
                    </div>
                    <FotoKost
                      firstImageID="frontImage"
                      secondImageID="insideImage"
                      thirdImageID="streetImage"
                      foto={dataFoto}
                      handleFotoKost={(name: string, value: tFile) => {
                        // setDataFoto({ ...dataFoto, [name]: value });
                        // console.log(name);
                        setDataFoto((prevstate) => ({
                          ...prevstate,
                          [name]: value,
                        }));
                      }}
                    />
                  </>
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
                {step == 5 && <PriceKost dataRooms={dataType} />}
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
                      // disabled={isDisabled.current}
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
