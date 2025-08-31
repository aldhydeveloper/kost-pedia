'use client'
import React, { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
import DefaultSearchComponent from './Default';
import { FaArrowLeft } from "react-icons/fa6";
import { fuzzySearch, iKeySearch, iSearchLoc } from "@/utils/fuzzySearch";
import Post from "@/service/post";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { useData } from "@/hooks/useContexts";


const hideClass = "opacity-0 invisible";
const showClass = "opacity-100 visible";

export default function Wrap({ show, onHide }: { show: boolean; onHide: any }) {
  const { data } = useData();

  const ref = useRef<HTMLInputElement>(null);
  const [searchComponent, setSearchComponent] = useState<React.ReactNode>(
   <DefaultSearchComponent />
  );
  
  let timer: number | undefined;
  const handleChange = (async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    const value = e.target.value
    // setInput({search: value})
    // input.search = value;
    timer = window.setTimeout(async () => {
      // console.log(data_loc.current)
      let html:any = [];
      if(value.length >= 3){
        const resp = fuzzySearch({data: data}, value);
        // const provinces = resp.provinces;
        for(const i in resp){
          const key = i as keyof iSearchLoc;
          const v = resp[key];
          v.every((vDet, i) => {
            if(i <= 3){
              html = [...html, vDet];
              return false;
            }
            return true;
          })
          if(html.length === 3){
            break;
          }
          // console.log(v)

        }
        let component = html.map((v:any, i:number) => {
          return <Link key={i} href={`/search?city=${v.name}`} className="py-3 flex gap-4 items-center border-b border-bodydark">
                   <FaMapMarkerAlt />
                   <span className="flex flex-col">
                     <span>
                       {v.name}
                     </span>
                     <small>
                       {v.parent}
                     </small>
                   </span>
                 </Link>
        })


        const respKost = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/search`, {
          key: e.target.value
        })

        if(respKost.data.kost && respKost.data.kost.length > 0){
          // console.log(respKost)
          component = <>
              {component}
              <div className="py-8">
              <p className="opacity-60">Kost terkait</p>
              {respKost.data.kost.map((v:any, i:number) => {
                const rooms = v.rooms[0];
                return <Link key={i} href={`/room/${(v.name + ' ' + rooms.name).toLowerCase()
                  .replace(/\s+/g, "-") // Ganti spasi dengan "-"
                  .replace(/[^a-z0-9-]/g, "")}`} className="py-3 font-medium flex gap-4 items-center border-b border-bodydark">
                <IoHomeOutline />
                <span className="flex flex-col">
                  <span>
                    {(v.name + ' ' + rooms.name + ' ' + v.sub_district_name + ' ' + v.city_name).split(new RegExp(`(${e.target.value})`, "gi")).map((part:string, i:number) => 
                      part.toLowerCase() === e.target.value.toLowerCase() ? 
                      <span key={i} className="text-azure-600">{part}</span>
                      : part
                    )}
                  </span>
                </span>
              </Link>
              })}
              </div>
            </>
          
        }
        setSearchComponent(component);
      }else{
        setSearchComponent(<DefaultSearchComponent />);
      }
    }, 300);
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }

  });
  return (
    <div
      className={`fixed inset-0 z-50 bg-white duration-200 text-graydark bg-no-repeat bg-cover bg-[url('/img/bg-search.png')] ${
        show ? showClass : hideClass
      }`}
    >
      <div className="bg-[#ffffff70] w-full">
        <div className="max-w-2xl mx-auto py-8 bg-white rounded-xl shadow-md px-3">
          <div className="flex mb-8 gap-4">
            <button className="pl-2 pr-4 text-xl" onClick={onHide} >
              <FaArrowLeft />
            </button>
            <input
              type="text"
              className="rounded-full border-slate-200 border outline-none w-full py-3 px-4 text-xs"
              placeholder="Coba Bandung, Jakarta, Surabaya"
              onChange={handleChange}
              // value={input.search}
              ref={ref}
            />
            {/* <Button type="button" className="py-2 max-w-20" onClick={handleClickSearch} isLoading={isLoadingSearch}>Cari</Button> */}
          </div>
          <div className="wrap-result-search overflow-y-auto h-[calc(100vh-120px)]">
            
            {searchComponent}
        

          </div>
        </div>
      </div>
    </div>
  );
}
