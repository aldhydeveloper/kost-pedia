'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

import { fuzzySearch, iSearchLoc } from "@/utils/fuzzySearch";
import { MdMapsHomeWork } from "react-icons/md";
import { LiaMapMarkedSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";
import Get from '@/service/get'
import Post from '@/service/post'
import Link from "next/link";
import SearchComponent from "@/components/Search";
import {useDispatch, useSelector } from "react-redux";
import {show, hide} from "@/store/slices/showSearchSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface iKostBody {
    provinces: number[];
    cities: number[];
}

const LinkComponent = ({v}:any) => {
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
            <Link href={`https://wa.me/+62${v.admin_kosts ? v.admin_kosts.phone.substring(1) : v.user.mobile.substring(1)}`} target="_blank" className="bg-[#25d366] absolute right-8 bottom-8 max-w-xs px-4 py-2 rounded-md text-white text-sm w-full flex justify-center items-center gap-4">
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
    const resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kostsByLoc/0/99`, data);
    return resp.data;
}
export default function Search({ searchParams }:{searchParams:{q:string}}){
    const q = searchParams.q || '';
    const dispatch = useDispatch();
    // const str = store();
    const [loc, setLoc] = useState([]);
    const [kosts, setKosts] = useState<Object[] | undefined>(undefined);
    
    useEffect(() => {
        setKosts(undefined);
        dispatch(hide());
        const handleGetData = async () => {

            const data = await getData();
            const resp = fuzzySearch(data, q)

            const generateReq = (data:iSearchLoc) => {
                return {
                    provinces: data.provinces.map(item => item.id),
                    cities: data.cities.map(item => item.id),
                }
            }
            
            const kosts = await getDataKosts(generateReq(resp));
            setKosts(kosts);
            // console.log(kosts)
        }
        handleGetData();
    }, [q, dispatch])
    // console.log('wildan',kosts)
    // const resp = fuzzySearch(data, params.slug);
    return <>
        <div className="container max-w-4xl pt-30 pb-20 mx-auto">
            <SearchComponent customClass="block border border-stroke mx-auto !py-3 mb-10" />
            {
                kosts ?
                    kosts.length > 0 ?
                        kosts.map((v:any, i:number) => {
                            if(v.active_rooms.length == 0){
                                return <span key={i}>No data found.</span>;
                            }
                            return <LinkComponent v={v} key={i}/>
                        })
                    : <h1 className="text-4xl text-center font-bold my-6">No data found.</h1>
                :
                <SkeletonTheme borderRadius={8} height={230}>
                    <Skeleton />
                </SkeletonTheme>
            }
            
        </div>
    </>
}