"use client";
import Get from "@/service/get";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import {default as RoomsWraper, iRoom, iKost} from '@/components/Product/Room';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
interface iLabelCampus {
  id: string;
  name: string;
  logo: string;
  alias: string;
}
interface iCampus {
  id: string;
  name: string;
  category: string;
  active_rooms: iRoom[];
}
// const campusList: iCampus[] = [
//   {
//     name: "Institute Teknologi Bandung",
//     image: "itb.png",
//   },
//   {
//     name: "Universitas Padjajaran",
//     image: "unpad.png",
//   },
//   {
//     name: "Universitas Pendidikan Indonesia",
//     image: "upi.svg",
//   },
//   {
//     name: "Universitas Komputer Indonesia",
//     image: "unikom.png",
//   },
//   {
//     name: "Universitas Maranatha",
//     image: "maranatha.png",
//   },
//   {
//     name: "Universitas Parahyangan",
//     image: "unpar.png",
//   },
//   {
//     name: "Institute Telkom",
//     image: "telkom.png",
//   },
//   {
//     name: "Universitas Gajah Mada",
//     image: "ugm.png",
//   },
//   {
//     name: "Universitas Indonesia",
//     image: "ui.png",
//   },
// ];

const getDataByCampus = async (campus:string) => {
  const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/campus/0/10/${campus}`);

  return resp.data;
}
const Campus = memo(function Campus() {
  const [campus, setCampus] = useState<string>("ITB");
  const [campuslabel, setCampusLabel] = useState([]);
  const [campusList, setCampusList] = useState<iCampus[] | undefined>(undefined);
  // const campusList = useRef([]);

  const handleChangeCampus = async (e:React.ChangeEvent<HTMLInputElement>) => {
    setCampusList(undefined)
    const v = e.target.value;
    setCampus(v)
    const c = await getDataByCampus(v);
    setCampusList(c.kosts);
  }
  
  useEffect(() => {
    const getCampus = async () => {  
     const camp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/campus`);
     setCampusLabel(camp.data);
     const c = await getDataByCampus('ITB');
     setCampusList(c.kosts);
    //  console.log(c)
    }
    getCampus();
  }, [])
   console.log(campusList)
  return (
    <>
      <div className="scrollbar-none relative snap-x snap-mandatory text-nowrap flex-row space-x-4 overflow-x-auto w-full inline-flex flex-nowrap py-6">
        {campuslabel.map((v: iLabelCampus, i: number) => {
          return (
            <label
              key={v.name}
              htmlFor={`${i}`}
              className={`p-4 text-md flex-none flex justify-between items-center gap-4 rounded-lg cursor-pointer text-nowrap h-[71px] ${
                campus === v.alias
                  ? "bg-azure-600 text-white"
                  : "bg-stroke text-strokedark"
              } `}
            >
              <input
                id={`${i}`}
                type="radio"
                onChange={handleChangeCampus}
                value={v.alias}
                name="campus"
                hidden
              />
              <Image
                src={`${v.logo}`}
                width={40}
                height={40}
                alt={v.name}
              />
              {v.name}
            </label>
          );
        })}
      </div>
      {
        campusList ? 
        <div className="scrollbar-none snap-x space-x-4 relative overflow-x-auto  w-full inline-flex flex-nowrap flex-none py-6">
        {
            campusList.map((v:iCampus) => {
              const room:iRoom = v.active_rooms[0];
              return  <div key={v.id} className="w-full">
                        <RoomsWraper className="block w-[200px]" id={v.id}  name={v.name} category={v.category} room={room} district={room.district || ''} />
                      </div>
            })
        }
        </div>
        : <SkeletonTheme borderRadius={8} height={26} >
                <Skeleton inline={true} count={5} width={220} height={220} className="mr-10" />
        </SkeletonTheme>
      }
    </>
  );
});

export default Campus;
