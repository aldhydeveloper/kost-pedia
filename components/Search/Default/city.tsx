import React from "react";
import { FaChevronRight } from "react-icons/fa6";
interface iCity{
    id: number;
    name: string;
    handleClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
}
export default function CityContainer({id, name, handleClick}:iCity) {
    return <button type="button" onClick={handleClick} value={id} name={name} className="text-center py-1 mb-3 px-4 bg-stroke rounded-full mr-4">
                <span>{name}</span>
            </button>
}
export type {iCity}