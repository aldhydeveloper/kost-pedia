'use client'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { fuzzySearch, iSearchLoc } from "@/utils/fuzzySearch";
import { MdMapsHomeWork } from "react-icons/md";
import { LiaMapMarkedSolid } from "react-icons/lia";
import Get from '@/service/get'
import Post from '@/service/post'
import Link from "next/link";
import SearchComponent from "@/components/Search";
import CustomButton from'@/components/Utility/CustomButton';
import {useDispatch, useSelector } from "react-redux";
import {hide} from "@/store/slices/showSearchSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useData } from "@/hooks/useContexts";
import 'react-loading-skeleton/dist/skeleton.css'
import { Metadata } from 'next';

interface iKostBody {
    name: string;
}

export async function generateMetadata({ searchParams }:{searchParams:{q:string, campus:string}}): Promise<Metadata> {
    const q = searchParams.q || '';
    const campus = searchParams.campus || '';

    const title =  `Kost ${q ? q : campus} Murah`;
    const desc = `Tersedia banyak pilihan kost di ${q ? q : campus}.Cari hunian kost dengan cepat dan mudah di mana saja, Hanya di Kostpedia. Langsung cek sekarang!.`;
    return {
        title: title,
        description: desc,
        openGraph: {
            title: title,
            description: desc
        },
    };
}


const LinkComponent = ({v}:any) => {
    const active_rooms = v.active_rooms[0];
    return <div className="shadow-lg relative lg:mx-0 mx-5 lg:pb-0 pb-8 mb-10">
        <Link href={`/room/${(v.name + ' ' + active_rooms.name).toLowerCase()
                  .replace(/\s+/g, "-") // Ganti spasi dengan "-"
                  .replace(/[^a-z0-9-]/g, "")}`} className="lg:grid grid-cols-3 lg:my-0 my-10">
                <span className="overflow-hidden w-full block lg:mb-0 mb-4">
                    <Image src={active_rooms?.thumbnail
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${active_rooms?.thumbnail}`
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
                    
                </div>
            </Link>
            </div>
}
const getDataAllKost = async (start:number=0, limit:number=5) => {
    // console.log(data)
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts/${start}/${limit}`);
    return resp.data;
}

const getDataKosts = async (data:iKostBody, start:number=0, limit:number=5) => {
    // console.log(data)
    const resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/loc/${start}/${limit}`, data);
    return resp.data;
}

const getDataKostsByCampus = async (campus:string, start:number=0, limit:number=5) => {
    // console.log(data)
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/campus/${start}/${limit}/${campus}`);
    return resp.data;
}

export default function Search({ searchParams }:{searchParams:{location:string, campus:string}}){
    const dispatch = useDispatch();
    const location = searchParams.location || '';
    const campus = searchParams.campus || '';
    // const { data } = useData();
    // const str = store();
    const loc = useRef<{data: iSearchLoc | undefined}>({data: undefined});
    // const [loc, setLoc] = useState([]);
    const [kosts, setKosts] = useState<Object[] | undefined>(undefined);
    const start = useRef(0);
    const [fetched, setFetched] = useState(false);
    const showAll = useRef<boolean>(false);
    // // console.log(data)
    
    // const generateReq = (data:iSearchLoc) => {
    //     return {
    //         provinces: data.provinces.map(item => item.id),
    //         cities: data.cities.map(item => item.id),
    //     }
    // }
    const handleShowMore = async () => {
        setFetched(true);
        let kosts:any = [];
        if(location){
            start.current += 5;
            // const resp = fuzzySearch({data:data}, q)
            // console.log(resp);
            kosts = await getDataKosts({name: location}, start.current);
        
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
            // console.log(data)
            if(location || campus){
                if(location){
                    // const resp = fuzzySearch({data:data}, q)
                    const kosts = await getDataKosts({name: location});
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
                // const resp = fuzzySearch({data:data}, q)
                const kosts = await getDataAllKost();
                setKosts(kosts.kosts);
                if((start.current) >= kosts.count_data){
                    showAll.current = true;
                } 
            }
        }
        handleGetData();
    }, [location, campus, dispatch])
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
                    : <Image width={440} height={700} src="/img/empty.jpg" alt="empty" className="block mx-auto" />
                :
                <SkeletonTheme borderRadius={8} height={230}>
                    <Skeleton />
                </SkeletonTheme>
            }
            
        </div>
    </>
}