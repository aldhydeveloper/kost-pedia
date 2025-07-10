"use client";
import { memo, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { tFacility } from "@/components/Property/kost/FacilitiesKost";
import TypeKost, {
  tRooms,
  dataRooms,
} from "@/components/Property/kost/TypeKost";
import Get from "@/service/get";
import Card from "@/components/Card";
import collect from "collect.js";
import Button from "@/components/Utility/CustomButton";
import Send from "@/service/Send";
import { FaChevronLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
const options = {
  maxSizeMB: 0.25, // Maksimal ukuran gambar dalam MB
  maxWidthOrHeight: 1024, // Maksimal lebar atau tinggi gambar
  useWebWorker: true, // Gunakan Web Worker untuk meningkatkan kinerja
};

const RoomComp = memo(function RoomComp({
  dataType,
  dataRoomFacilities,
  setDataRoomFacilities,
  setDataType,
}: any) {
  return (
    <TypeKost
      isSingle={true}
      typeKost={dataType}
      dataFacilities={dataRoomFacilities}
      handleDataFacilities={setDataRoomFacilities}
      callback={(type) => {
        setDataType(type);
      }}
    />
  );
});
const Room = ({ params }: { params: { slug: string } }) => {
  // console.log(params);
  const router = useRouter();
  const id = params.slug ? params.slug : "";
  const [dataType, setDataType] = useState<tRooms[]>([dataRooms]);
  const [dataRoomFacilities, setDataRoomFacilities] = useState<tFacility[]>([]);
  const [submited, setSubmited] = useState<boolean>(false);
  const kost_id = useRef<string>("");

  async function getData() {
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/room/${id}`);
    if (resp.success) {
      // console.log(resp.data);
      const v = resp.data;
      const size = v.room_size;
      let p = 0;
      let l = 0;
      if (size) {
        const arr_size = size.split("x");
        p = arr_size[0];
        l = arr_size[1];
      }
      
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
      console.log(thumbnail)
      const temp = {
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
        facilities: {
          rooms: collect(v.facilities.filter((vFac: any) => vFac.type === 2))
            .flatMap((vFac: any) => vFac.id)
            .all(),
          bath: collect(v.bath_facilities)
            .flatMap((vFac: any) => vFac.id)
            .all(),
        },
        thumbnail_url: v.thumbnail,
        thumbnail: thumbnail,
      };
      kost_id.current = v.kost_id;
      let d = [];
      d[0] = temp;
      setDataType(d);
    }
    // console.log(resp);
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmited(true);
    // console.log("wildan");
    const data = dataType[0];

    const formDataRooms = new FormData();
    // let front_image = null;
    console.log(typeof data.front_image === "object");
    if (typeof data.front_image === "object") {
      const compressedFile = await imageCompression(data.front_image, options);
      formDataRooms.append("front_image", compressedFile);
    }
    if (data.inside_image.length > 0) {
      //   Array.from(data.inside_image).forEach(async (v, i) => {
      //     console.log(v);
      //     if (typeof v === "object") {
      //       const compressedFile = await imageCompression(v, options);
      //       formDataRooms.append(`inside_image-${i}`, compressedFile);
      //     }
      //   });
      let i = 1;
      for (const v in Array.from(data.inside_image)) {
        const image = Array.from(data.inside_image)[v];
        // console.log(v);
        if (typeof image === "object") {
          const compressedFile = await imageCompression(image, options);
          formDataRooms.append(`inside_image-${i}`, compressedFile);
          i++;
        }
      }
    }
    if (typeof data.street_image === "object") {
      const compressedFile = await imageCompression(data.street_image, options);
      formDataRooms.append("bath_image", compressedFile);
    }

    const inside_foto_exist = collect(
      data.inside_image.filter((v) => typeof v === "string")
    );

    const url = await fetch("/api/upload", {
      method: "POST",
      body: formDataRooms,
    })
      .then((resp) => resp.json())
      .then((resp) => resp.url_image);

    const front_image = url.front_image ? url.front_image : data.front_image;
    const inside_image = inside_foto_exist
      .merge(
        Object.keys(url)
          .filter((v) => v.includes("inside_image"))
          .map((v) => url[v])
      )
      .all();

    // console.log(inside_image);
    // return false;
    const bath_image = url.bath_image ? url.bath_image : data.street_image;

    
    let thumbnail = data.thumbnail == "front_image" ? front_image : "";
    thumbnail = thumbnail
      ? thumbnail
      : (data.thumbnail == "street_image"
      ? bath_image
      : "");

    if (!thumbnail) {
      const index = data.thumbnail?.slice(-1)
        ? parseInt(data.thumbnail?.slice(-1))
        : 0;
      // console.log(v.thumbnail);
      thumbnail = index >= 0 && index < 3 ? inside_image[index] : "";
      // console.log(thumbnail);
      // console.log(thumbnail);
      // if (thumbnail) {
      //   thumbnail = thumbnail[thumbnail.length - 1];
      // }
    }
    
    const resp = await Send(
      `${process.env.NEXT_PUBLIC_API_HOST}/room/${id}`,
      "Put",
      {
        name: data.room_type_name,
        desc: data.desc,
        room_size: `${data.p}x${data.l}`,
        price: data.price,
        price_year: data.price_year,
        room_facilities: data.facilities.rooms,
        bath_facilities: data.facilities.bath,
        front_image: front_image,
        inside_image: inside_image,
        bath_image: bath_image,
        status: data.status,
        kost_id: kost_id.current,
        thumbnail: thumbnail ? thumbnail : data.thumbnail_url,
      }
    );

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
      setSubmited(false);
    }
  };
  useEffect(() => {
    // if (!loaded.current) {
    if (!dataType[0].room_type_name) {
      getData();
    }
  });
  return (
    <>
      <Button
        href="/property/kost"
        role="link"
        className="text-xl text-black mb-8"
      >
        <FaChevronLeft /> Property
      </Button>
      <Card>
        <form onSubmit={submitForm}>
          <RoomComp
            dataType={dataType}
            dataRoomFacilities={dataRoomFacilities}
            setDataRoomFacilities={setDataRoomFacilities}
            setDataType={setDataType}
          />
          <Button isLoading={submited}>Simpan</Button>
        </form>
      </Card>
    </>
  );
};

export default Room;
