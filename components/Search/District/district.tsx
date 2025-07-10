import Link from "next/link"
import { FaChevronRight } from "react-icons/fa6";

interface iParams {
    id: number;
    name: string;
    cityName: string;
}
export default  function District({id, name, cityName}:iParams){
    return <Link type="button" href={`/search?q=${name}&city=${cityName}`} className="flex items-center w-full justify-between border-b py-4 border-stroke">
                <span>{name}</span>
                <FaChevronRight />
            </Link>
}

export type {iParams}