import Get from "@/service/get"
import {default as RoomsWraper, iRoom, iKost} from '@/components/Product/Room';

export default async function Room({ slug, district }: { slug: string, district: string }){
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kost/near/${slug}/0/15`)
    // console.log(district)
    if(!resp.data || resp.data.length == 0){
        return <></>
    }

    const kost = resp.data;

    return <>
            <h2 className="mb-2 font-bold text-xl">Kost disekitar</h2>
            <div className=" w-full overflow-hidden">
                <div className="no-scrollbar relative flex snap-x flex-row space-x-4 overflow-x-auto scroll-snap-type-none
              [-webkit-overflow-scrolling:touch]">
                    
                {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8"> */}
                {
                    kost.map((v:iKost & iRoom & {rooms: iRoom[]}, i:number) => {
                        const rooms = v.rooms[0];
                        return <div key={i} className="relative ">
                                <RoomsWraper id={v.id}  name={v.name} category={v.category} room={rooms} district={district || ''} className="aspect-h-[180] aspect-w-[258] w-[67vw] md:w-[229px] !aspect-[25/18] " />
                            </div>
                    })
                }
                </div>
            </div>
        </>
}