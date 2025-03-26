import Image from "next/image"
import Link from "next/link";
interface iRoom {
    id: string;
    thumbnail: string;
    price: number;
    name: string;
    room_type_name?: string;
    district?: string;
}
interface iKost{
    id: string;
    name: string;
    category: string;
    room: iRoom;
}
const Rooms = ({id, name, category, district, room, ...otherProps}:iKost & {district: string}) => {
return <Link href={`/room/${(name + ' ' + room?.name).toLowerCase()
    .replace(/\s+/g, "-") // Ganti spasi dengan "-"
    .replace(/[^a-z0-9-]/g, "")}`} {...otherProps}> 
                <div
                    className="flex items-start rounded-lg h-50 w-full overflow-hidden bg-center bg-cover bg-no-repeat mb-6 relative"
                >
                    
                    <Image
                        src={`${
                            room?.thumbnail
                            ? `${room?.thumbnail}`
                            : "/img/empty-img.jpg"
                        }`}
                        width="1028"
                        height="720"
                        objectFit="cover"
                        alt={name + ' ' + room?.name}
                        className="block w-full h-[200px] ml-auto object-cover"
                    />
                {/* <div
                className={`bg-[#00000080] h-full w-full z-10 text-white p-4 `}
                > */}
                    <Image
                        src="/img/kostpedia.png"
                        width="85"
                        height="20"
                        alt="Logo Kostpedia"
                        className="block ml-auto absolute top-5 left-5"
                    />
                {/* </div> */}
            </div>

            <label className="border rounded-md border-[#00000020] bg-transparent text-md font-bold px-1 mb-2 w-20 block text-center">
                {category}
            </label>
            <p className="font-medium mb-1">
                {name} {room?.name} {district}
            </p>
            <span className="text-md font-bold">
                {room?.price
                ? room?.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })
                : ""}
            </span>
        </Link>
}

export type {iRoom, iKost};
export default Rooms;