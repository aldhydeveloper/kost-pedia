'use client'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { fuzzySearch, iSearchLoc } from "@/utils/fuzzySearch";
import { MdMapsHomeWork } from "react-icons/md";
import { LiaMapMarkedSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";
import Get from '@/service/get'
import Post from '@/service/post'
import Link from "next/link";
import SearchComponent from "@/components/Search";
import CustomButton from'@/components/Utility/CustomButton';
import {useDispatch, useSelector } from "react-redux";
import {show, hide} from "@/store/slices/showSearchSlice";
import useSWR from "swr";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface iKostBody {
    provinces: number[];
    cities: number[];
}

const fetcher = (url:string) => fetch(url).then((res) => res.json()).then(res => res.data);

const LinkComponent = ({v}:any) => {
    const active_rooms = v.active_rooms[0];
    return <div className="shadow-lg relative lg:mx-0 mx-5 lg:pb-0 pb-8 mb-10">
        <Link href={`/room/${(v.name + ' ' + active_rooms.name).toLowerCase()
                  .replace(/\s+/g, "-") // Ganti spasi dengan "-"
                  .replace(/[^a-z0-9-]/g, "")}`} className="lg:grid grid-cols-3 lg:my-0 my-10">
                <span className="overflow-hidden w-full block lg:mb-0 mb-4">
                    <Image src={active_rooms?.thumbnail
                        ? `${active_rooms?.thumbnail}`
                        : "/img/empty-img.jpg"} alt="" width={300} height={300} className="object-cover lg:w-[300px] w-full h-[300px]" />
                </span>
                <div className="col-span-2 lg:px-8 px-4 pt-6 lg:pb-4">
                    <label className="bg-stroke inline-flex px-3 gap-2 rounded-full items-center mb-5"><MdMapsHomeWork /> {v.category}</label>
                    <h4 className="text-xl mb-4">{v.name + ' ' + active_rooms.name + ' ' + v.city.name}</h4>
                    {/* <p className="text-md">{active_rooms?.desc}</p> */}
                    <div className="flex gap-2 text-bodydark2">
                        <div>
                            <LiaMapMarkedSolid className="lg:block hidden text-[20px] w-[20px]" /> 
                        </div>
                        <p className="text-md flex items-center mb-8">{v.address}, {v.city.name}, {v.province.name}</p>
                    </div>
                    <p className="text-2xl font-extrabold mb-5">{active_rooms?.price.toLocaleString("id-ID", {
                                                                    style: "currency",
                                                                    currency: "IDR",
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0
                                                                })}/Bulan</p>
                    {/* <p className="text-lg flex items-center gap-2"><TbRulerMeasure />{active_rooms.room_size}</p> */}
                    
                </div>
            </Link>
            <Link href={`https://wa.me/+62${v.admin_kosts ? v.admin_kosts.phone.substring(1) : v.user.mobile.substring(1)}?text=Halo%20Bu%2FPak%2C%20Saya%20ingin%20bertanya%20mengenai%20Kost%20Anda%20yang%20saya%20lihat%20di%20Kostpedia.id%20(*${v.name}%20${active_rooms.name}%20${v.city.name}*%20-%20https%3A%2F%2Fkostpedia.id%2Froom%2F${(v.name + ' ' + active_rooms.name).toLowerCase()
                  .replace(/\s+/g, "-") // Ganti spasi dengan "-"
                  .replace(/[^a-z0-9-]/g, "")})%2E%20Saya%20berharap%20untuk%20mendengar%20informasi%20mengenai%20kost%20anda%2E%20Terima%20kasih`} target="_blank" className="bg-[#25d366] lg:absolute right-8 bottom-8 lg:mx-0 mx-4  px-4 py-2 rounded-md text-white text-sm flex justify-center items-center gap-4 lg:max-w-[188px] lg:w-full">
                <Image width={20} height={20} src="/img/wa-white.png" alt="WA" />
                <span>+62{v.admin_kosts ? v.admin_kosts.phone.substring(1) : v.user.mobile.substring(1)}</span>
            </Link>
            </div>
}
// const getData = async () => {
//     const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/loc`);
//     return resp.data;
// }

const getDataAllKost = async (start:number=0, limit:number=5) => {
    // console.log(data)
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts/${start}/${limit}`);
    return resp.data;
}

const getDataKosts = async (data:iKostBody, start:number=0, limit:number=5) => {
    // console.log(data)
    const resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kostsByLoc/${start}/${limit}`, data);
    return resp.data;
}

const getDataKostsByCampus = async (campus:string, start:number=0, limit:number=5) => {
    // console.log(data)
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/campus/${start}/${limit}/${campus}`);
    return resp.data;
}

export default function Search({ searchParams }:{searchParams:{q:string, campus:string}}){
    const dispatch = useDispatch();
    const q = searchParams.q || '';
    const campus = searchParams.campus || '';
    // const str = store();
    const loc = useRef<{data: iSearchLoc | undefined}>({data: undefined});
    // const [loc, setLoc] = useState([]);
    const [kosts, setKosts] = useState<Object[] | undefined>(undefined);
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}/loc`, fetcher);
    const start = useRef(0);
    const [fetched, setFetched] = useState(false);
    const showAll = useRef<boolean>(false);
    // // console.log(data)
    
    const generateReq = (data:iSearchLoc) => {
        return {
            provinces: data.provinces.map(item => item.id),
            cities: data.cities.map(item => item.id),
        }
    }
    const handleShowMore = async () => {
        setFetched(true);
        let kosts:any = [];
        if(q){
            start.current += 5;
            const resp = fuzzySearch({data:data}, q)
            kosts = await getDataKosts(generateReq(resp), start.current);
        
        }else if(campus){
            start.current += 5;
            kosts = await getDataKostsByCampus(btoa(campus), start.current);

        }else{
            start.current += 5;
            // const resp = fuzzySearch({data:data}, q)
            kosts = await getDataAllKost(start.current);
            if((start.current+5) >= kosts.count_data){
                showAll.current = true;
            } 
        }
        
        if((start.current+5) >= kosts.count_data){
            showAll.current = true;
        }
        if(Array.isArray(kosts.kosts)){
            setKosts(prev => prev ? [...prev, ...kosts.kosts] : [])
        }
        setFetched(false);
    }
    useEffect(() => {
        setKosts(undefined);
        // console.log('dasd')
        const handleGetData = async () => {
            console.log(data)
            if(data || q || campus){
                if(q){
                    const resp = fuzzySearch({data:data}, q)
                    const kosts = await getDataKosts(generateReq(resp));
                    // console.log(start.current)
                    // console.log(kosts.count_data)
                    if((start.current+5) >= kosts.count_data){
                        showAll.current = true;
                    }
                    setKosts(kosts.kosts);
                    if((start.current+5) >= kosts.count_data){
                        showAll.current = true;
                    }

                }else if(campus){
                    // start.current += 5;
                    // const resp = fuzzySearch({data:data}, q)
                    const kosts = await getDataKostsByCampus(btoa(campus));
                    setKosts(kosts.kosts);
                    if((start.current) >= kosts.count_data){
                        showAll.current = true;
                    }
        
                }else{
                    // start.current += 5;
                    // // const resp = fuzzySearch({data:data}, q)
                    const kosts = await getDataAllKost();
                    setKosts(kosts.kosts);
                    if((start.current+5) >= kosts.count_data){
                        showAll.current = true;
                    } 
                }
                dispatch(hide());
            }else{
                // start.current += 5;
                const resp = fuzzySearch({data:data}, q)
                const kosts = await getDataAllKost();
                setKosts(kosts.kosts);
                if((start.current) >= kosts.count_data){
                    showAll.current = true;
                } 
            }
        }
        handleGetData();
    }, [q, data, campus, dispatch])
    // console.log('wildan',kosts)
    // const resp = fuzzySearch(data, params.slug);
                            // console.log(kosts)
    return <>
        <div className="container max-w-4xl pt-30 pb-20 mx-auto">
            <SearchComponent customClass="block border border-stroke mx-auto !py-3 mb-10" />
            {
                campus && <p className="mb-4 lg:ml-0 ml-5"> Kost disekitaran <strong>{campus}</strong></p>
            }
            {
                kosts ?
                    kosts.length > 0 ?
                    <>
                        {
                            kosts.map((v:any, i:number) => {
                                if(v.active_rooms.length == 0){
                                    return false;
                                }
                                return <LinkComponent v={v} key={i}/>
                            })
                        }
                        <CustomButton className={`block !w-50 mx-auto py-2 rounded-md ${showAll.current ? 'hidden' : ''}`} onClick={handleShowMore} isLoading={fetched}>Lihat Selengkapnya</CustomButton>
                    </>
                    : <h1 className="text-4xl text-center font-bold my-6">Data Kost tidak ditemukan.</h1>
                :
                <SkeletonTheme borderRadius={8} height={230}>
                    <Skeleton />
                </SkeletonTheme>
            }
            
        </div>
    </>
}