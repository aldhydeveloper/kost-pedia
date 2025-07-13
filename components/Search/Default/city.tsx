import React from "react";
import { FaChevronRight } from "react-icons/fa6";
interface iCity{
    id: number;
    name: string;
    value: string;
    handleClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
}
export default function CityContainer({id, name, value, handleClick}:iCity) {
    // const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/loc/popular/cities`, 'default');
    // const [districtComp, setDisctrictComp] = useState<boolean>(false);
    // const cities = resp.data;
    return <button type="button" onClick={handleClick} value={id} name={value} className="flex items-center w-full justify-between border-b py-4 border-stroke">
                <span>{name}</span>
                <FaChevronRight />
            </button>
}
export type {iCity}