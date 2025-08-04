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
            <h2 className="mb-4 font-bold text-xl">Kost disekitar</h2>
            <div className="scrollbar-none overflow-x-auto w-full">
                <div className="relative snap-x snap-mandatory flex-row space-x-4 inline-flex py-6">
                {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8"> */}
                {
                    kost.map((v:iKost & iRoom & {rooms: iRoom[]}, i:number) => {
                        const rooms = v.rooms[0];
                        return <RoomsWraper id={v.id} key={i}  name={v.name} category={v.category} room={rooms} district={district || ''} classNameParent="relative snap-center block w-full min-w-[230px]" />
                    })
                }
                </div>
            </div>
        </>
}