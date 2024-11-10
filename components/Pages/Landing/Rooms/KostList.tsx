'use client'
import Rooms, {iRoom, iKost}from '@/components/Product/Room'
import { useState } from 'react';

interface iData extends iKost{
    active_rooms: iRoom[]
}
interface iRooms {
    rooms:iData[]
}
const KostList = ({rooms}:{rooms: iData[]}) => {
    const [data, setData] = useState<iKost>();
    return <>
        <div className="grid grid-cols-4 gap-8">
        {rooms.map((v:iData, i:number) => {
                if(v.active_rooms.length == 0){
                    return <div key={i}></div>
                }
                const room:iRoom = v.active_rooms[0];
                // console.log(room)
                return  <Rooms id={room.id} key={i}  name={v.name} category={v.category} room={room}  district={room.district || ''}/>
                        
            })}
        </div>
    </>
}

export default KostList;