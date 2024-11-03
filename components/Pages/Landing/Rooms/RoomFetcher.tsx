import Get from '@/service/get';
import {default as RoomsWraper, iRoom, iKost} from '@/components/Product/Room'
import KostList from './KostList';
interface getParam{
    start?: number;
    length?: number
}
interface iData extends iKost {
    active_rooms:iRoom[]
}
const Rooms = async ({start=0, length=8}:getParam) => {
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts/${start}/${length}`);

    // console.log(resp)
    if(!resp.success){
        return <> No Data.</>
    }
    const data:iData[] = resp.data;
    return <>
        <div className="grid grid-cols-4 gap-8">
            {/* <KostList rooms={data} /> */}
            {data.map((v:iData, i:number) => {
                if(v.active_rooms.length == 0){
                    return <div key={i}></div>
                }
                const room:iRoom = v.active_rooms[0];
                // console.log(room)
                return  <RoomsWraper id={room.id} key={i}  name={v.name} category={v.category} room={room} />
                        
            })}
        </div>
    </>
}

export default Rooms;