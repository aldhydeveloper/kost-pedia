'use client'
import Image from 'next/image';
import Link from 'next/link';
import { tParams, tKosts, tRooms } from '../SearchType';
import { LiaMapMarkedSolid } from 'react-icons/lia';
import { MdMapsHomeWork } from 'react-icons/md';
import useFilter from './FilterHook';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useCallback, useEffect, useRef, useState } from 'react';
import Get from '@/service/get';
import CustomButton from'@/components/Utility/CustomButton';
import Post from '@/service/post';
import useSWR from 'swr';


const RoomList = ({searchParams}:tParams) => {
    // const kosts=null;
    // const { state, dispatch } = useFilter();
    // const resp = await new Promise(resolve => setTimeout(resolve, 5000))
    // const kosts = resp.success ? resp.data.kosts : [];
    // console.log(searchParams)
    const location = searchParams.q;
    const campus = searchParams.campus;
    const category = searchParams.category;
    const minPrice = searchParams.minPrice;
    const maxPrice = searchParams.maxPrice;
    const room_facilities = searchParams.room_facilities;
    const bath_facilities = searchParams.bath_facilities;
    const rules = searchParams.rules;
    // console.log(location)
    const [kosts, setKosts] = useState<tKosts[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true)
    const start = useRef<number>(0);
    const count = useRef<number>(0);
    const hasFetchted = useRef<boolean>(false);
    
    const getData = useCallback(async () => {
        setLoading(true)
        // console.log(hasFetchted.current)
        // console.log(campus)
        if(hasFetchted.current) return;

        // let resp:{success?: string, error?: string, data:any} | undefined;
        // if(location)
        //     resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/loc/${start}/5`, {name: location});
        // else if(campus)
        //     resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/campus/${start}/5/${btoa(campus)}`);
        // else
        //     resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts/${start.current}/5`);
        const data = {
            location: location,
            campus: campus,
            category: category,
            range: {
                start: minPrice,
                end: maxPrice
            },
            rules: rules && JSON.parse(atob(rules)),
            room_facilities: room_facilities && JSON.parse(atob(room_facilities)),
            bath_facilities: bath_facilities && JSON.parse(atob(bath_facilities)),
        };
        console.log(data)
        const resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/filter/${start.current}/5`, data)
        if(resp?.success){
            count.current = resp.data.count_data;
            setKosts(prev => [...(prev ?? []), ...resp.data.kosts]);
            // dispatch({type: 'SET_KOST', kosts: resp.data.kosts})
        }
        // setLoading(false);
        setLoading(false)
    }, [category, location, campus, minPrice, maxPrice, room_facilities, bath_facilities, rules])
    const handleClick = () => {
        start.current += 5;
        hasFetchted.current = false;
        getData();
    }

    useEffect(() => {
        setKosts(undefined);
        // setLoading(true)
        getData();
        hasFetchted.current = true;
        return () => {
            hasFetchted.current = false;
        }
    }, [getData]);
    // const kosts = state.kosts;
    return <>
        {
            kosts ?
                kosts.length > 0  ?
                <>
                    {
                        kosts.map((v:tKosts, i:number) => {
                            const active_rooms:tRooms = v.active_rooms[0];
                            return <div key={i} className="shadow-lg relative lg:mx-0 lg:pb-0 pb-8 mb-10">
                                    <Link href={`/room/${(v.name + ' ' + active_rooms.name).toLowerCase()
                                            .replace(/\s+/g, "-") // Ganti spasi dengan "-"
                                            .replace(/[^a-z0-9-]/g, "")}`} className="lg:grid grid-cols-3 lg:my-0 my-10">
                                            <span className="overflow-hidden w-full block lg:mb-0 mb-4">
                                                <Image src={active_rooms?.thumbnail
                                                    ? `/api/images${active_rooms?.thumbnail}`
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
                                                <p className="text-2xl font-extrabold mb-5">{active_rooms.price.toLocaleString("id-ID", {
                                                                                                style: "currency",
                                                                                                currency: "IDR",
                                                                                                minimumFractionDigits: 0,
                                                                                                maximumFractionDigits: 0
                                                                                            })}/Bulan</p>
                                                
                                            </div>
                                        </Link>
                                    </div>
                        })
                    }
                    <CustomButton className={`block !w-50 mx-auto py-2 rounded-md ${start.current+5 >= count.current && 'hidden'}`} onClick={handleClick} isLoading={loading}>Lihat Selengkapnya</CustomButton>
                </>
                : <Image width={440} height={700} src="/img/empty.jpg" alt="empty" className="block mx-auto" />
            : <SkeletonTheme borderRadius={8} height={230}>
                <Skeleton />
            </SkeletonTheme>
        }
        
        
    </>
}

export default RoomList;