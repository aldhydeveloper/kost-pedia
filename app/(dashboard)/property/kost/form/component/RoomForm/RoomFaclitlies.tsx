'use client'
import { useEffect, useState } from "react";
import Checkbox from "@/components/Checkboxes/Checkbox";
import { tListFacilities } from '../FacilitiesForm'
import useStore from "../store";
import useRoom from "./RoomHook";
import { Facilities } from "@/service";


const RoomFacilities = ({index}:{index: number}) => {
    const [facilities, setListFacilities] = useState<tListFacilities[]>([]);
    const { handleCheckbox } = useRoom();
    const room_facilities = useStore(s => s.state.rooms[index].facilities)
    const bath_facilities = useStore(s => s.state.rooms[index].bath_facilities)

    useEffect(() => {
      const getDataFacilities = async () => {
        const resp = await Facilities("all");
        if(resp.success){
          setListFacilities(resp.data)
        }
      }
      getDataFacilities()
    }, [setListFacilities])
    if(!facilities.length) return;
    console.log('name')
    return <>
        <label className="mb-3 block">Fasilitas Kamar</label>
        <ul id={`list-${index}`} className="grid grid-cols-2 gap-2 mb-8">
            {facilities &&
              facilities
                .filter((v) => 2)
                .map((v: tListFacilities, i: number) => {
                  return (
                    <li key={i}>
                      <Checkbox
                        data-index={index}
                        id={`${index}-${v.id}`}
                        name="room_facilities"
                        value={v.id}
                        label={v.name}
                        checked={room_facilities.includes(v.id)}
                        onChange={handleCheckbox}
                        />
                    </li>
                  )
                })
            }
        </ul>
        <label className="mb-3 block">Fasilitas Kamar</label>
        <ul id={`list-${index}`} className="grid grid-cols-2 gap-2 mb-8">
            {facilities &&
              facilities
                .filter((v) => v.type == 3)
                .map((v: tListFacilities, i: number) => {
                  return (
                    <li key={i}>
                      <Checkbox
                        data-index={index}
                        id={`${index}-${v.id}`}
                        name="bath_facilities"
                        value={v.id}
                        label={v.name}
                        checked={bath_facilities.includes(v.id)}
                        onChange={handleCheckbox}
                        />
                    </li>
                  )
                })
            }
        </ul>
      </>
}

export default RoomFacilities;