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
                    ? "border-meta-5 bg-meta-5"
                    : " opacity-55"
                }`}
              ></span>
              <span
                className={`${
                  i <= currentStep ? "text-meta-5" : "opacity-55"
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
  // const [disabled, setDisabled] = useState<boolean>(true);
  const disabled = useRef<boolean>(false);

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
    setIsLoading(true);
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
      formData.append("front_image_kost", dataFoto.front_image);
    }
    if (dataFoto.inside_image.length > 0) {
      for (const key in Array.from(dataFoto.inside_image)) {
        const image = Array.from(dataFoto.inside_image)[key];
        // console.log(v);
        if (typeof image === "object") {
          const compressedFile = await imageCompression(image, options);
          formData.append(`inside_image_kost-${key}`, compressedFile);
        }
      }
    }
    const inside_foto_exist = collect(
      dataFoto.inside_image.filter((v) => typeof v === "string")
    );
    
    if (typeof dataFoto.street_image === "object") {
      const compressedFile = await imageCompression(
        dataFoto.street_image,
        options
      );
      formData.append("street_image_kost", compressedFile);
    }
    let empty = true;
    for (let pair of formData.entries()) {
      empty = false; // Jika ada entri, berarti form tidak kosong
    }

    var url:any = {
      front_image: '',
      inside_image: [],
      street_image: ''
    };

    const formImageKost = formData;
    // if(!empty){
    //   url = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   })
    //   .then((resp) => resp.json())
    //   .then((resp) => resp.url_image);
    // }

    // const front_image = url.front_image
    //   ? url.front_image
    //   : dataFoto.front_image;

    // const inside_image = inside_foto_exist
    //   .merge(
    //     Object.keys(url)
    //       .filter((v) => v.includes("inside_image"))
    //       .map((v) => url[v])
    //   )
    //   .all().filter((v) => v.length > 0);
    // const street_image = url.street_image
    //   ? url.street_image
    //   : dataFoto.street_image;
    
    let formImageRooms:any = [];
    const rooms = await Promise.all(
      dataType.map(async (v, i) => {
        const formDataRooms = new FormData();
        // let front_image = null;
        // console.log(typeof v.front_image === "object");
        if (typeof v.front_image === "object") {
          const compressedFile = await imageCompression(v.front_image, options);
          formDataRooms.append(`front_image_room-${i}`, compressedFile);
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
              formDataRooms.append(`inside_image_room-${i}-${key}`, compressedFile);
            }
          }
        }
        if (typeof v.street_image === "object") {
          const compressedFile = await imageCompression(
            v.street_image,
            options
          );
          formDataRooms.append(`bath_image_room-${i}`, compressedFile);
        }

        const inside_foto_exist = collect(
          v.inside_image.filter((v) => typeof v === "string")
        );
        
          var url_room:any = {
            front_image: '',
            inside_image:'',
            bath_image: ''
          };
          let empty = true;
          for (let pair of formDataRooms.entries()) {
            empty = false; // Jika ada entri, berarti form tidak kosong
          }
          formImageRooms = [...formImageRooms, formDataRooms];
        // if(!empty){
        //   url_room ={};
        //   url_room = await fetch("/api/upload", {
        //     method: "POST",
        //     body: formDataRooms,
        //   })
        //     .then((resp) => resp.json())
        //     .then((resp) => resp.url_image);

        // }

        // const front_image = url_room.front_image ? url_room.front_image : v.front_image;
        // // console.log(url);

        // const inside_image = inside_foto_exist
        //   .merge(
        //     Object.keys(url_room)
        //       .filter((v) => v.includes("inside_image") && v !== '')
        //       .map((v) => url_room[v])
        //   )
        //   .all().filter(v => v !== '');
        // // let thumbnail = v.thumbnail == "front_image" ? front_image : "";
        // //     thumbnail;

        // // return false;
        // const bath_image = url_room.bath_image ? url_room.bath_image : v.street_image;
        
        // let thumbnail = v.thumbnail == "front_image" ? front_image : "";
        // thumbnail = thumbnail
        //   ? thumbnail
        //   : (v.thumbnail == "street_image"
        //   ? bath_image
        //   : "");

        // if (!thumbnail) {
        //   const index = v.thumbnail?.slice(-1)
        //     ? parseInt(v.thumbnail?.slice(-1))
        //     : 0;
        //   // console.log(v.thumbnail);
        //   thumbnail = index >= 0 && index < 3 ? inside_image[index] : "";
        //   // console.log(thumbnail);
        //   // console.log(thumbnail);
        //   // if (thumbnail) {
        //   //   thumbnail = thumbnail[thumbnail.length - 1];
        //   // }
        // }
        // console.log(thumbnail)
        return {
          id: v.id,
          name: v.room_type_name,
          room_size: `${v.p}x${v.l}`,
          desc: v.desc,
          price: v.price,
          price_year: v.price_year,
          room_facilities: v.facilities.rooms,
          bath_facilities: v.facilities.bath,
          // front_image: front_image,
          // inside_image: inside_image,
          // bath_image: bath_image,
          status: v.status,
          thumbnail: v.thumbnail_url,
        };
      })
    );
    console.log(formImageKost.keys().next().done)
    console.log(formImageRooms.keys().next().done)

    let dataUpload:any = new FormData();;

    if(!formImageKost.keys().next().done){
      for (const [key, value] of formImageKost.entries()) {
        dataUpload.append(key, value);
      }
    }

    if(formImageRooms.length > 0){
      formImageRooms.forEach((element:any) => {
        for (const [key, value] of element.entries()) {
          dataUpload.append(key, value);
        }
      });
    }

    for (const [key, value] of formImageKost.entries()) {
      console.log(`${key}:`, value);
    }
    console.log(dataUpload)
    for (const [key, value] of dataUpload.entries()) {
      console.log(`${key}:`, value);
    }

    
    const respUpload = await fetch("/api/upload", {
      method: "POST",
      body: dataUpload,
    })
      .then((resp) => resp.json())
      .then((resp) => resp.url_image);

    console.log(respUpload)
    const front_image = respUpload.front_image_kost || '';
    const inside_image = Object.keys(respUpload).filter((v) => v.indexOf('inside_image_kost') !== -1).map(v => respUpload[v]);
    const street_image = respUpload.street_image_kost || '';

    
    const index_image_rooms = Object.keys(respUpload).filter((v) => v.indexOf('image_room') !== -1).map(v => v.split('-')[1]).filter((value, index, array) => array.indexOf(value) === index);
    let image_rooms:any = [];
    index_image_rooms.forEach((i) => {
      const front_image = respUpload[`front_image_room-${i}`] || '';
      const inside_image = Object.keys(respUpload).filter((v) => v.indexOf(`inside_image_room-${i}`) !== -1).map(v => respUpload[v]);
      const bath_image = respUpload[`front_image_room-${i}`] || '';

      const v = rooms[parseInt(i)];
      let thumbnail = v.thumbnail == "front_image" ? front_image : "";
      thumbnail = thumbnail
        ? thumbnail
        : (v.thumbnail == "street_image"
        ? bath_image
        : "");

      if (!thumbnail) {
        const index = v.thumbnail?.slice(-1)
          ? parseInt(v.thumbnail?.slice(-1))
          : 0;
        // console.log(v.thumbnail);
        thumbnail = index >= 0 && index < 3 ? inside_image[index] : "";
        // console.log(thumbnail);
        // console.log(thumbnail);
        // if (thumbnail) {
        //   thumbnail = thumbnail[thumbnail.length - 1];
        // }
      }
      image_rooms = [...image_rooms, {
        front_image,
        inside_image,
        bath_image,
        thumbnail
      }]
    })

    const new_rooms = rooms.map((v, i) => {
      return {...v, ...image_rooms[i]}
    })
    console.log(new_rooms)
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
      rooms: new_rooms,
    };
    // return false;
    // console.log(JSON.stringify(req));
    try{
      const resp = await Send(
        `${process.env.NEXT_PUBLIC_API_HOST}/kost/${
          !id ? "createWithRooms" : `updateWithRooms/${id}`
        }`,
        !id ? "Post" : "Put",
        req
      );
    // console.log(resp)
      if (resp.success) {
        toast.success(<span className="text-nowrap">{resp.success}</span>, {
          position: "top-center",
          className: "w-96",
        });
        setTimeout(() => {
          router.push("/property/kost");
        }, 3000);
      } else {
        toast.error(<span className="text-nowrap">{resp.error}</span>, {
          position: "top-center",
          className: "w-96",
        });
        setIsLoading(false);
      }
    }catch(e){
      toast.error(<span className="text-nowrap">Internal Server Error.</span>, {
        position: "top-center",
        className: "w-96",
      });
      setIsLoading(false);
      // console.log((e as Error).message)
    }
    // console.log(resp);
  };

  const loaded = useRef(false);
  let temp;
  if(step === 0){
    temp = dataKost;
  }else if(step === 1){
    temp = dataAddress;
  }else if(step === 2){
    temp = dataFoto;
  }else if(step === 3){
    const filter = dataFacilities.filter(v => v.checked === true);
    disabled.current = filter.length === 0;
  }else if(step === 4){
    // console.log(dataType)
    const filter = dataType.filter((v:tRooms):boolean => {
      return !v.room_type_name || !v.front_image || v.inside_image.length === 0 || !v.street_image || !v.p || !v.l || !v.price || v.facilities.rooms.length === 0;
    })
    disabled.current = filter.length > 0;
  }
  const whiteList:any = ['admin_kost_name', 'admin_kost_phone', 'campus'];
  // console.log(temp)
  if(temp){
    for(const i in temp){
      if((temp[i] === '' || temp[i] === 0 || temp[i].length === 0) && !whiteList.includes(i as keyof iDataKost | iAddressKost | tFoto )){
        // console.log('widan')
        disabled.current = true;
        break;
      }
      disabled.current = false;
    }
  }
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
              let thumbnail:string | undefined;
              if(v.thumbnail){
                if(v.front_image == v.thumbnail){
                  thumbnail = 'front_image'
                }
                if(!thumbnail){
                  v.inside_image.forEach((vImg:string, i:number) => {
                    console.log(v)
                    if(vImg == v.thumbnail){
                      thumbnail = `inside_image${i}`;
                    }
                  });
                  
                  if(!thumbnail && v.thumbnail == v.bath_image){
                    thumbnail = 'street_image'
                  }
                }
              }
              // console.log(v.thumbnail)
              // console.log(thumbnail)
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
                thumbnail: thumbnail,
                thumbnail_url: v.thumbnail,
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
                      // disabled={disabled.current}
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
                      disabled={disabled.current}
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
