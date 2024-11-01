import Image from "next/image"
import Link from "next/link";
interface iRoom {
    id: string;
    thumbnail: string;
    price: number;
    name: string;
    room_type_name?: string;
}
interface iKost{
    id: string;
    name: string;
    category: string;
    room: iRoom;
}
const Rooms = ({id, name, category, room, ...otherProps}:iKost) => {
return <Link href={`/room/${id}`} {...otherProps}> 
                <div
                className="flex items-end rounded-lg h-50 overflow-hidden bg-center bg-cover bg-no-repeat mb-6"
                style={{
                backgroundImage: `url('${
                    room?.thumbnail
                    ? `${room?.thumbnail}`
                    : "/img/empty-img.jpg"
                }')`,
                }}
            >
                <div
                className={`bg-[#00000080] h-full w-full z-10 text-white p-4 `}
                >
                    <Image
                        src="/img/kostpedia.png"
                        width="85"
                        height="20"
                        alt="Logo Kostpedia"
                        className="block ml-auto"
                    />
                </div>
            </div>

            <label className="border rounded-md border-[#00000020] bg-transparent text-md font-bold px-1 mb-2 w-20 block text-center">
                {category}
            </label>
            <p className="font-medium mb-1">
                {name} - {room?.name}
            </p>
            <span className="text-md font-bold">
                {room?.price
                ? room?.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    })
                : ""}
            </span>
        </Link>
}

export type {iRoom, iKost};
export default Rooms;