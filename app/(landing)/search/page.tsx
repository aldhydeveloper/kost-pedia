import Image from "next/image";
import { fuzzySearch, iSearchLoc } from "@/utils/fuzzySearch";
import { MdMapsHomeWork } from "react-icons/md";
import { LiaMapMarkedSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";
import Get from '@/service/get'
import Post from '@/service/post'
import Link from "next/link";

interface iKostBody {
    provinces: number[];
    cities: number[];
}

const LinkComponent = ({v}:any) => {
    'use client';
    const active_rooms = v.active_rooms[0];
    return <div className="shadow-lg relative">
        <Link href={`/room/${active_rooms.id}`} className="grid grid-cols-3 my-10">
                <span className="overflow-hidden">
                    <Image src={active_rooms?.thumbnail
                        ? `${active_rooms?.thumbnail}`
                        : "/img/empty-img.jpg"} alt="" width={300} height={300} className="object-cover w-[300px] h-[300px]" />
                </span>
                <span className="col-span-2 px-8 py-6">
                    <label className="bg-stroke inline-flex px-3 gap-2 rounded-full items-center mb-5"><MdMapsHomeWork /> Kost</label>
                    <p className="text-2xl font-extrabold mb-5">{active_rooms?.price.toLocaleString("id-ID", {
                                                                    style: "currency",
                                                                    currency: "IDR",
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0
                                                                })}/Bulan</p>
                    <p className="text-md">{active_rooms?.desc}</p>
                    <p className="text-md text-bodydark2 flex items-center mb-8"><LiaMapMarkedSolid /> {v.city.name}, {v.province.name}</p>
                    <p className="text-lg flex items-center gap-2"><TbRulerMeasure />{active_rooms.room_size}</p>
                    
                </span>
            </Link>
            <Link href={`https://wa.me/+62${v.user.mobile.substring(1)}`} target="_blank" className="bg-[#25d366] absolute right-8 bottom-8 max-w-xs px-4 py-2 rounded-md text-white text-sm w-full flex justify-center items-center gap-4">
                <Image width={20} height={20} src="/img/wa-white.png" alt="WA" />
                <span>+62{v.admin_kosts ? v.admin_kosts.phone.substring(1) : v.user.mobile.substring(1)}</span>
            </Link>
            </div>
}
const getData = async () => {
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/loc`);
    return resp.data;
  }

  const getDataKosts = async (data:iKostBody) => {
    // console.log(data)
    const resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kostsByLoc/0/99`, data);
    return resp.data;
  }
export default async function Search({ searchParams }:{searchParams:{q:string}}){
    const data = await getData();
    const q = searchParams.q || '';
    const resp = fuzzySearch(data, q)

    const generateReq = (data:iSearchLoc) => {
        return {
            provinces: data.provinces.map(item => item.id),
            cities: data.cities.map(item => item.id),
        }
    }
    // const reqLoc = (resp: iSearchLoc[]) => {
    //     return resp.reduce((acc:{provinces:number[], cities:number[]}, item) => {
    //       acc.provinces = item.provinces.map(prov => prov.id);
    //       acc.cities = item.cities.map(city => city.id);
    //       return acc;
    //     }, { provinces: [], cities: [] });
    //   };
    console.log(generateReq(resp))
    const kosts = await getDataKosts(generateReq(resp));
    // console.log('wildan',kosts)
    // const resp = fuzzySearch(data, params.slug);
    return <>
        <div className="container max-w-4xl pt-30 pb-20 mx-auto">
            {
                kosts.length > 0 ?
                    kosts.map((v:any, i:number) => {
                        if(v.active_rooms.length == 0){
                            return <>No data found.</>;
                        }
                        return <LinkComponent v={v} key={i}/>
                    })
                : <h1 className="text-4xl text-center font-bold">No data found.</h1>
            }
            
        </div>
    </>
}