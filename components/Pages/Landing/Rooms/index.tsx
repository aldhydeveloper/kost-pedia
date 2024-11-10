'use client'
import Get from '@/service/get';
// import RoomFetcher from './RoomFetcher';
import { memo, useEffect, useRef, useState } from 'react';
import {default as RoomsWraper, iRoom, iKost} from '@/components/Product/Room'
import CustomButton from'@/components/Utility/CustomButton';

interface iData extends iKost {
    active_rooms:iRoom[];
    district: { name: string }
}

interface params {
    start: number;
    length: number;
}

const getRooms = (start:number, length:number) => {
    return Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts/${start}/${length}`);
}
// const RoomList = memo(function RoomList(data:iData[]){
//     return <>
//         {data.map((v:iData, i:number) => {
//             if(v.active_rooms.length == 0){
//                 return <div key={i}></div>
//             }
//             const room:iRoom = v.active_rooms[0];
//             // console.log(room)
//             return  <RoomsWraper id={room.id} key={i}  name={v.name} category={v.category} room={room} />
                    
//         })}
//     </>
// });
const Rooms = () => {
    const [data, setData] = useState<iData[]>([]);
    const [start, setStart] = useState<number>(0)
    const [fetched, setFetched] = useState<boolean>(false);
    const showAll = useRef<boolean>(false);
    const length = 8
    
    const handleShowMore = () => {
        setFetched(false)
        setStart((prevCount) => prevCount + length);
    }
    useEffect(() => {
        const getData = async () => {
        // start.current = 
            const resp = await getRooms(start, length);
            if(resp.success){
                setData(data.concat(resp.data))
                // console.log(resp.data.length)
                if(resp.data.length < length){
                    showAll.current = true;
                }
            }else{
                showAll.current = true;
            }
            setFetched(true)
        }
        if(!fetched){
            getData();
        }
        // disabled.current = false;
    }, [start, data, fetched])
    
    if(data.length == 0){
        return false;
    }
    console.log(showAll.current)
    return <>
        <div className="grid grid-cols-4 gap-8 mb-10">
            {data.map((v:iData, i:number) => {
                // console.log(v)
                if(v.active_rooms.length == 0){
                    return <div key={i}></div>
                }
                const room:iRoom = v.active_rooms[0];
                // // console.log(room)
                return  <RoomsWraper id={room.id} key={i}  name={v.name} category={v.category} room={room} district={v.district.name} />
                        
            })}
        </div>
        <CustomButton className={`block !w-50 mx-auto py-2 rounded-md ${showAll.current ? 'hidden':''}`} onClick={handleShowMore} isLoading={!fetched}>Lihat Selengkapnya</CustomButton>
        {/* <RoomFetcher /> */}
    </>
}

export default Rooms;