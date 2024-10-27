import dynamic from 'next/dynamic';
import Image from "next/image";
import Get from "@/service/get"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
// import Map from "@/components/Maps/Map"

const Map = dynamic(() => import('@/components/Maps/Map'), { ssr: false });
// import L from 'leaflet';
interface iRoom {
    id:string;
    thumbnail: string;
    price: number;
    name: string;
    front_image:string,
    inside_image: []
}
interface iFacilities{
    id: string;
    name: string;
}
export default async function Room({ params }: { params: { slug: string } }){
    const id = params.slug ? params.slug[0] : "";
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/room/${id}`)
    console.log(resp)
    const data = resp.data;
    return <div className="pt-22 container max-w-screen-lg mx-auto">
        {
            data == null ? <h1 className="py-30 font-bold text-4xl text-center">No Data Found.</h1> :
            <>
                <section className="grid grid-cols-3 gap-8 py-10">
                    <div className="col-span-2">
                        <div className="overflow-hidden rounded-lg h-full">
                            {
                                data.front_image ?
                                <Image width={800} height={350} src={data.front_image} alt={data.name} className="object-cover max-w-[unset] h-full w-full" />
                                : ''
                            }
                        </div>
                    </div>
                    <div className="gap-8 flex flex-col">
                        <div className="overflow-hidden rounded-md h-2/4">
                            { data.inside_image[0] ? 
                                <Image width={375} height={120} src={data.inside_image[0]} alt={data.name} className="object-cover max-w-[unset] h-full w-full" />
                            : ''}
                        </div>
                        <div className="overflow-hidden rounded-md h-2/4">
                            { data.inside_image[1] ? 
                                <Image width={375} height={150} src={data.inside_image[1]} alt={data.name} className="object-cover max-w-[unset] h-full w-full" />
                            : ''}
                        </div>
                    </div>
                </section>
                
                <section className="grid grid-cols-3 gap-8 py-10">
                    
                    <div className="col-span-2">
                        <h1 className="text-2xl font-bold mt-8 mb-4">{data.kost.name} - {data.name}</h1>
                        <label className="border rounded-sm px-4 border-bodydark1 mb-3 inline-block mr-4">{data.kost.category}</label><FaMapMarkerAlt className="inline-block mr-1"/><span>{data.kost.district.name}</span>
                        {/* <p>{data.kost.address}</p> */}

                        <hr role="separator" className="border-b border-bodydark1 my-4" />

                        <h2 className="mb-2 font-bold text-xl">Type Kamar</h2>
                        <p>{data.room_size}</p>
                        <hr role="separator" className="border-b border-bodydark1 my-4" />
                        
                        <h2 className="mb-2 font-bold text-xl">Fasilitas Kamar</h2>
                            {
                                data.facilities.length > 0 ?
                                <ul className="grid grid-cols-4 gap-2">{
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
                                <ul className="grid grid-cols-4 gap-2">{
                                        data.bath_facilities.map((v:iFacilities, i:number) => {
                                            return <li key={i}>{v.name}</li>
                                        })
                                    }
                                </ul> : ''
                            }   
                        <hr role="separator" className="border-b border-bodydark1 my-4" />
                        
                        <h2 className="mb-2 font-bold text-xl">Peraturan Kost</h2>
                            {
                                data.kost.rules && data.kost.rules.length > 0 ?
                                <ul className="grid grid-cols-2 gap-2">{
                                        data.kost.rules.map((v:iFacilities, i:number) => {
                                            return <li key={i}>{v.name}</li>
                                        })
                                    }
                                </ul> : ''
                            }   
                        <hr role="separator" className="border-b border-bodydark1 my-4" />
                        
                        <h2 className="mb-2 font-bold text-xl">Lokasi dan lingkungan sekitar</h2>
                        <p className="mb-4">{data.kost.address}</p>
                        <Map address={data.kost.address} />
                    </div>
                    
                    <div className="text-left">
                        <div className="shadow-lg py-4 px-6">
                            <label className="text-xl font-bold mb-4 block">
                            {data.price
                                ? data.price.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    })
                                : ""} / Bulan
                            </label> 
                            <Link href={`https://wa.me/${data.kost.user.mobile}`} target="_blank" className="bg-[#25d366] px-4 py-2 rounded-md text-white text-sm w-full flex justify-between items-center">
                                <Image width={20} height={20} src="/img/wa-white.png" alt="WA" />
                                <span>{data.kost.user.mobile}</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        }
        
    </div>
}