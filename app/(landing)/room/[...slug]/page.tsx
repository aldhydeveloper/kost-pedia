import dynamic from 'next/dynamic';
import Image from "next/image";
import Get from "@/service/get"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

import MoreImage, {iImage} from'@/components/Pages/Landing/MoreImage';
import SearchComponent from "@/components/Search";
import {default as RoomsWraper, iRoom, iKost} from '@/components/Product/Room'

// import Map from "@/components/Maps/Map"

const Map = dynamic(() => import('@/components/Maps/Map'), { ssr: false });
// import L from 'leaflet';
// interface iRoom {
//     id:string;
//     thumbnail: string;
//     price: number;
//     name: string;
//     front_image:string,
//     inside_image: []
// }
interface iFacilities{
    id: string;
    name: string;
}

export default async function Room({ params }: { params: { slug: string } }){
    const slug = params.slug ? params.slug[0] : "";
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/slug/${slug}`)
    console.log('resp',resp)
    if(resp.data.length == 0){
        return <></>
    }
    const data = resp.data[0];
    // console.log(data)
    var room_size = data.room_size ? data.room_size.split('x') : [];
    if(room_size[0] !== undefined && room_size[1] !== undefined){
        room_size = `${room_size[0]} x ${room_size[1]}`;
    }else{
        room_size = data.room_size;
    }
    // console.log(data)
    const id = data.id;
    const other_rooms = data.kost.active_rooms.filter((v:any) => v.id !== id);
    console.log('rooms', other_rooms)
    // console.log(data.kost.active_rooms)
    const images:iImage = {
        front_image: data.front_image,
        inside_image: data.inside_image,
        bath_image: data.bath_image,
        kost_front_image: data.kost.front_image,
        kost_inside_image: data.kost.inside_image,
        street_image: data.kost.street_image,
    }
    return <div className="pt-22 container max-w-[980px] mx-auto lg:px-0 px-6">
        <SearchComponent customClass="block border border-stroke mx-auto !py-3 mb-10" />
        {
            data == null ? <h1 className="py-30 font-bold text-4xl text-center">No Data Found.</h1> :
            <>
                <section className="lg:grid lg:grid-cols-5 gap-8 pb-2">
                    <div className="lg:col-span-3">
                        <MoreImage images={images} />
                        <div className="overflow-hidden rounded-l-lg xl:rounded-r-none rounded-r-lg xl:h-[35rem] h-[28rem] lg:mb-0 mb-6">
                            {
                                data.inside_image[0] ?
                                <Image width={480} height={350} src={data.inside_image[0]} alt={data.name} className="object-cover object-center max-w-[unset] h-full w-full" />
                                : ''
                            }
                        </div>
                    </div>
                    <div className="gap-8 flex flex-col xl:h-[35rem] h-[28rem] col-span-2">
                        <div className="overflow-hidden rounded-r-md xl:rounded-l-none rounded-l-lg h-2/4  relative">
                            { data.front_image ? 
                                <Image width={480} height={350} src={data.front_image} alt={data.name} className="object-cover object-center max-w-[unset] h-full w-full" />
                            : ''}
                            {
                                !data.inside_image[1]  && <MoreImage images={images} />
                            }
                        </div>
                        <div className="overflow-hidden rounded-r-md h-2/4 relative">
                            { data.inside_image[1] ? 
                                <>
                                    <Image width={480} height={350} src={data.inside_image[1]} alt={data.name} className="object-cover object-center max-w-[unset] h-full w-full" />
                                    {/* <button className="absolute bottom-2 right-2 bg-white text-black-2 rounded-md py-1 px-3 text-xs">Lihat semua foto</button> */}
                                    <MoreImage images={images} />
                                </>
                            : ''}
                        </div>
                    </div>
                </section>
                
                <section className="flex lg:flex-row flex-col-reverse gap-8 py-10">
                    
                    <div className="lg:w-2/3 w-full">
                        <h1 className="text-2xl font-bold">{data.kost.name} {data.name} {data.kost.city.name}</h1>
                        <p className="mt-1 mb-5 opacity-80">{data.kost.address}</p>
                        <label className="border rounded-sm px-4 border-bodydark1 mb-3 inline-block mr-4">{data.kost.category}</label><FaMapMarkerAlt className="inline-block mr-1"/><span>{data.kost.district.name}</span>
                        {/* <p>{data.kost.address}</p> */}

                        <hr role="separator" className="border-b border-bodydark1 my-4" />

                        <h2 className="mb-2 font-bold text-xl">Type Kamar</h2>
                        <p>{room_size} Meter</p>
                        <hr role="separator" className="border-b border-bodydark1 my-4" />
                        
                        <h2 className="mb-2 font-bold text-xl">Fasilitas Kamar</h2>
                            {
                                data.facilities.length > 0 ?
                                <ul className="grid grid-cols-4 gap-2 list-disc ml-5">{
                                        data.facilities.map((v:iFacilities, i:number) => {
                                            return <li key={i}>{v.name}</li>
                                        })
                                    }
                                </ul> : ''
                            }   
                        <hr role="separator" className="border-b border-bodydark1 my-4" />
                        
                        <h2 className="mb-2 font-bold text-xl">Fasilitas Kamar Mandi</h2>
                            {
                                data.bath_facilities.length > 0 ?
                                <ul className="grid grid-cols-4 gap-2 list-disc ml-5">{
                                        data.bath_facilities.map((v:iFacilities, i:number) => {
                                            return <li key={i}>{v.name}</li>
                                        })
                                    }
                                </ul> : ''
                            }   
                        <hr role="separator" className="border-b border-bodydark1 my-4" />

                        <h2 className="mb-2 font-bold text-xl">Deskripsi Kost</h2>
                        <p>{data.kost.desc}</p>
                        <hr role="separator" className="border-b border-bodydark1 my-4" />
                        
                        <h2 className="mb-2 font-bold text-xl">Fasilitas Kost</h2>
                            {
                                data.kost.facilities && data.kost.facilities.length > 0 ?
                                <ul className="grid grid-cols-2 gap-2 list-disc ml-5">{
                                        data.kost.facilities.map((v:iFacilities, i:number) => {
                                            return <li key={i}>{v.name}</li>
                                        })
                                    }
                                </ul> : ''
                            }   
                        <hr role="separator" className="border-b border-bodydark1 my-4" />
                        
                        <h2 className="mb-2 font-bold text-xl">Peraturan Kost</h2>
                            {
                                data.kost.rules && data.kost.rules.length > 0 ?
                                <ul className="grid grid-cols-2 gap-2 list-disc ml-5">{
                                        data.kost.rules.map((v:iFacilities, i:number) => {
                                            return <li key={i}>{v.name}</li>
                                        })
                                    }
                                </ul> : ''
                            }   
                        <hr role="separator" className="border-b border-bodydark1 my-4" />
                        
                        {/* <h2 className="mb-2 font-bold text-xl">Lokasi dan lingkungan sekitar</h2>
                        <p className="mb-4">{data.kost.address}</p>
                        <Map address={data.kost.address} /> */}
                        {
                            other_rooms.length > 0 && 
                            <>
                                <h2 className="mb-4 font-bold text-xl">Type lainnya</h2>
                                <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8">
                                {
                                    other_rooms.map((v:iKost & iRoom, i:number) => {
                                        return <RoomsWraper id={v.id} key={i}  name={data.kost.name} category={v.category} room={v} district={data.district || ''} />
                                    })
                                }
                                </div>
                            </>
                        }
                        
                    </div>
                    
                    <div className="text-left lg:w-1/3 w-full">
                        <div className="shadow-lg py-4 px-6">
                            <label className="text-xl font-bold mb-4 block">
                            {data.price
                                ? data.price.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                    })
                                : ""} / Bulan
                            </label> 
                            <Link href={`https://wa.me/+62${data.kost.admin_kosts ? data.kost.admin_kosts.phone.substring(1) : data.kost.user.mobile.substring(1)}`} target="_blank" className="bg-[#25d366] px-4 py-2 rounded-md text-white text-sm w-full flex justify-center items-center gap-4">
                                <Image width={20} height={20} src="/img/wa-white.png" alt="WA" />
                                <span>+62{data.kost.admin_kosts ? data.kost.admin_kosts.phone.substring(1) : data.kost.user.mobile.substring(1)}</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        }
        
    </div>
}