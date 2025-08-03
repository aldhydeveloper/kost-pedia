import dynamic from 'next/dynamic';
import Image from "next/image";
import Get from "@/service/get"
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

import MoreImage, {iImage} from'@/components/Pages/Landing/MoreImage';
import SearchComponent from "@/components/Search";
import Filter from "@/components/Pages/Landing/Filter"
import {default as RoomsWraper, iRoom, iKost} from '@/components/Product/Room';
import Breadcrumbs, {Crumb} from '@/components/Utility/Breadcrumbs';
import NearKosts from '../component/NearKosts';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug ? params.slug[0] : "";
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/slug/${slug}`,  'force-cache')

    const data = resp.data[0];
    if(!data){
        return {};
    }
  const title =  `${data.kost.name} ${data.name} ${data.kost.city.name}`;
  const desc = `Ada kamar kosong di ${title} Jalan ${data.kost.address}. Langsung hubungi pemilik kost sekarang juga dan dapatkan harga menarik.`;
  return {
    title: title,
    description: desc,
    // openGraph: {
    //   title: title,
    //   description: desc
    // },
  };
}


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
    console.log(resp)
    if(!resp.data || resp.data.length == 0){
        return <div className="min-h-[70vh] flex items-center justify-center"><h1 className="text-4xl text-center font-bold">No data found.</h1></div>
    }
    const data = resp.data[0];
    var room_size = data.room_size ? data.room_size.split('x') : [];
    if(room_size[0] !== undefined && room_size[1] !== undefined){
        room_size = `${room_size[0]} x ${room_size[1]}`;
    }else{
        room_size = data.room_size;
    }
    const id = data.id;
    const other_rooms = data.kost.active_rooms.filter((v:any) => v.id !== id);
    const images:iImage = {
        front_image: data.front_image || '',
        inside_image: data.inside_image || '',
        bath_image: data.bath_image || '',
        kost_front_image: data.kost.front_image,
        kost_inside_image: isValidJSON(data.kost.inside_image) || data.kost.inside_image,
        street_image: data.kost.street_image,
    };

    function isValidJSON(data:string) {
        try {
          return JSON.parse(data);; // Jika berhasil di-parse, berarti valid JSON
        } catch (error) {
          return false; // Jika error, berarti bukan JSON
        }
      }
    const arrImages:string[] = Object.values(images).flat(2).filter(v => !!v).map(v => isValidJSON(v) || v);
    // console.log(data)
    const breadcrumbs:Crumb[] = [
        {href: `/search?city=${data.kost.city.name}`, label:data.kost.city.name},
        {href: `/search?district=${data.kost.district.name}&city=${data.kost.city.name}`, label:data.kost.district.name},
        {href: '', label:`${data.kost.name} ${data.name} ${data.kost.city.name}`},
    ]
    let count = 0
    return <div className="pt-22 container max-w-[980px] mx-auto lg:px-0 px-6">
        <SearchComponent customClass="block border border-stroke mx-auto !py-3 mb-10" />
        <Filter />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {
            data == null ? <h1 className="py-30 font-bold text-4xl text-center">No Data Found.</h1> :
            <>
                <section className="lg:grid grid-cols-3 grid-rows-2 gap-8 pb-2">
                    {
                        arrImages.map((v:string, i) => {
                            if(count < 3){
                                count++;
                                if(i == 0){
                                    return <div key={i} className="col-span-2 row-span-2 overflow-hidden rounded-l-lg xl:rounded-r-none rounded-r-lg xl:h-[35rem] h-[28rem] lg:mb-0">
                                        {
                                            <Image width={480} height={350} src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/images${v}`} alt={v} className="object-cover object-center max-w-[unset] h-full w-full" />
                                        }
                                        </div>
                                }else{
                                    return <div key={i} className="relative overflow-hidden rounded-r-md xl:rounded-l-none rounded-l-lg h-[16.5rem]">
                                                <Image width={480} height={350} src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/images${v}`} alt={v} className="object-cover object-center max-w-[unset] h-full w-full" />
                                                { count == 3 && <MoreImage images={images} />}
                                            </div>
            
                                        
                                }
                            }else{
                                return false;
                            }
                            
                        })
                    }
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
                                <div className="mb-1">
                                    <h2 className="mb-4 font-bold text-xl">Type lainnya</h2>
                                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8">
                                    {
                                        other_rooms.map((v:iKost & iRoom, i:number) => {
                                            return <RoomsWraper id={v.id} key={i}  name={data.kost.name} category={data.kost.category} room={v} district={data.kost.district.name || ''} />
                                        })
                                    }
                                    </div>
                                </div>
                                <hr role="separator" className="border-b border-bodydark1 my-5" />
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
                            <Link href={`https://wa.me/+62${data.kost.admin_kosts ? data.kost.admin_kosts.phone.substring(1) : data.kost.user.mobile.substring(1)}?text=Halo%20Bu%2FPak%2C%20Saya%20ingin%20bertanya%20mengenai%20Kost%20Anda%20yang%20saya%20lihat%20di%20Kostpedia.id%20(%20*${data.kost.name}%20${data.name}%20${data.kost.city.name}*%20-%20https%3A%2F%2Fkostpedia.id%2Froom%2F${slug}%20)%2E%20Saya%20berharap%20untuk%20mendengar%20informasi%20mengenai%20kost%20anda%2E%20Terima%20kasih`} target="_blank" className="bg-[#25d366] px-4 py-2 rounded-md text-white text-sm w-full flex justify-center items-center gap-4">
                                <Image width={20} height={20} src="/img/wa-white.png" alt="WA" />
                                <span>+62{data.kost.admin_kosts ? data.kost.admin_kosts.phone.substring(1) : data.kost.user.mobile.substring(1)}</span>
                            </Link>
                        </div>
                    </div>
                </section>
                    <NearKosts slug={slug} district={data.kost.district.name || ''} />
            </>
        }
        
    </div>
}