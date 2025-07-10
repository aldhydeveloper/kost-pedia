'use client'
import Checkbox from "@/components/Checkboxes/Checkbox";
import { Facilities } from "@/service";
import { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import useStore from "../store";
import useFacilities from "./FacilitiesHook";


type tListFacilities = {
    id: number;
    name: string;
    type: number;
}
const FacilitiesForm = () => {
    const facilities = useStore(s => s.state.facilities) 
    const { handleChangeCheckbox } = useFacilities();
    const [listFacilities, setListFacilities] = useState<tListFacilities[]>([]);

    useEffect(() => {
        const getDataFacilities = async () => {
            const resp = await Facilities("all");
            if(resp.success){
                setListFacilities(resp.data)
            }
        }
        getDataFacilities()
    }, [setListFacilities])
    return <>
      <LoadingOverlay
        active={!listFacilities.length}
        styles={{
          overlay: (base) => ({
            ...base,
            fadeSpeed: 1,
            borderRadius: "4px",
            background: "rgba(0, 0, 0, 0.25)",
          }),
        }}
      >
      <label className="font-bold text-xl mb-4 block">Fasilitas Kost</label>
      {
        listFacilities.length > 0 &&
        <ul className="grid grid-cols-2 gap-2 mb-8">
        {listFacilities
            .filter((v:tListFacilities) => v.type === 1)
            .map((v) => (
            <li key={v.id}>
                <Checkbox
                id={`check${v.id}`}
                value={v.id}
                label={v.name}
                name="facilities"
                data-param="facilities"
                checked={facilities.value.includes(v.id)}
                onChange={handleChangeCheckbox}
                />
            </li>
            ))}
        </ul>
      }
      </LoadingOverlay>
      
    </>
}

export default FacilitiesForm;
export type {tListFacilities}