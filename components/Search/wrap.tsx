'use client'
import React, { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import { createRoot } from "react-dom/client";

// import Campus from "@/components/Search/campus";
import Popular from '@/components/Search/popular'
import { FaArrowLeft } from "react-icons/fa6";
import { fuzzySearch, iKeySearch, iSearchLoc } from "@/utils/fuzzySearch";
import Button from '@/components/Utility/CustomButton';
import Get from '@/service/get'
import Post from "@/service/post";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { useData } from "@/hooks/useContexts";


const hideClass = "opacity-0 invisible";
const showClass = "opacity-100 visible";

const cities = [
  'Jakarta',
  'Bandung',
  'Bogor',
  'Surabaya',
  'Yogyakarta'
];


const getData = async () => {
  const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/loc`, 'default');
  return resp.data;
}

// const 
const DefaultSearchComponent = () => {
  return  <>
  <p className="mt-6 mb-3 opacity-60">Kampus Populer</p>
  <div className="grid grid-cols-5 gap-4 pb-1"><Popular /></div>
  
  <div>
    <p className="mt-6 mb-2 opacity-60">Kota</p>
      {
        cities.map(v => {
          // return <button type="button" key={v} value={v} className="flex items-center w-full justify-between border-b py-4 border-stroke">
          //   <span>{v}</span>
          //   <FaChevronRight />
          //   </button>
          return <Link key={v} href={`/search?q=${v}`} className="flex items-center w-full justify-between border-b py-4 border-stroke">
            <span>{v}</span>
            <FaChevronRight />
            </Link>
        })
      }
  </div>
</>
}

export default function Wrap({ show, onHide }: { show: boolean; onHide: any }) {
  const router = useRouter();
  const { data } = useData();
  // const search = ;
  // search.then((v) => {
  // })  
  const ref = useRef<HTMLInputElement>(null);
  const [searchComponent, setSearchComponent] = useState<React.ReactNode>(
   <DefaultSearchComponent />
  )
  const containerSearchLocation = useRef<HTMLDivElement>(null)
  const data_loc = useRef<iSearchLoc>()
  const key = useRef<string>('');
  const [input, setInput] = useState({
    search: "",
  });
  // const [show, setShow] = useState<boolean>(false);
  // const [popular, setPopular] = useState<any>(<Popular name={input.search} />);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  // const [showing, setShowing] = useState<boolean>(false);
  function handleCallback(childData: string) {
    setInput({ search: childData });
    // setPopular(<Popular name={input.search} />);
  }

  const handleClickCity = (event:React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/search?q=${event.currentTarget.value}`);
    setTimeout(onHide, 100)
    // onHide();
  }
  
  let timer: number | undefined;
  const handleChange = (async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    const value = e.target.value
    // setInput({search: value})
    input.search = value;
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
          return <Link key={i} href={`/search?q=${v.name}`} className="py-3 flex gap-4 items-center border-b border-bodydark">
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

  // const handleClickSearch = async () => {
  //   setIsLoadingSearch(true)
  //   // const data = await getData();
  //   // const resp = fuzzySearch(data, input.search)
  //   console.log('dasd')
  //   router.replace(`/search?q=${input.search}`);
  //   // router.refresh();
  // }
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }

    // async function getDataLoc(){
    //   const resp = await getData();
    //   // console.log(data)
    //   data_loc.current = resp.data;
    // }
    
    // getDataLoc();
    // onHide();
    // console.log()
    // search

    // const search = async () => {
    // }

    // search();
  });
  return (
    <div
      className={`fixed inset-0 z-50 bg-white duration-200 text-graydark ${
        show ? showClass : hideClass
      }`}
    >
      <div className="container max-w-2xl mx-auto py-8">
        <div className="flex mb-8 gap-4">
          <button className="px-4 text-xl" onClick={onHide} >
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
        <div className="wrap-result-search">
          
          {searchComponent}
        
          {/* {
            !input.search && <>
            <p className="mt-6 mb-3 opacity-60">Kampus Populer</p>
            <div className="grid grid-cols-5 gap-4 pb-1">{show && <Popular />}</div></>
          } */}

        </div>
        {/* <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="grid grid-cols-5 gap-5">
            {cities.map((v, i) => {
              return (
                <City
                  img={v.img}
                  name={v.name}
                  key={i}
                  childCallback={handleCallback}
                />
              );
            })}
          </div>
          <p className="mt-6 mb-2">Pencarian Populer</p>
          <div className="grid grid-cols-5 gap-4 pb-1">{popular}</div>
          <p className="mt-6 mb-2">Kampus terdekat</p>
          <Campus />
        </div> */}
      </div>
    </div>
  );
}
