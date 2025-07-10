import Get from "@/service/get";
import Image from "next/image";
import Link from "next/link";

interface iRoom {
  thumbnail: string;
  price: number;
  name: string;
  room_type_name?: string;
}
interface iKost {
  id: string;
  name: string;
  category: string;
  price: number;
  active_rooms: iRoom[];
}
const Budget = async () => {
  const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts`);
  // console.log(resp);
  if (!resp.success) {
    return <>No data found.</>;
  }
  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-2 py-6 gap-10">
        {resp.data.map((v: iKost, i: number) => {
          const room = v.active_rooms[0];
          
          return i < 4 ? (
          <Link key={i} href={`/room/${(v.name + ' ' + room.name).toLowerCase()
                  .replace(/\s+/g, "-") // Ganti spasi dengan "-"
                  .replace(/[^a-z0-9-]/g, "")}`}>
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
                  
                  className={`h-full w-full z-10 text-white p-4 `}
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
                {v.category}
              </label>
              <p className="font-medium mb-1">
                {v.name} - {room?.name}
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
          ) : (
            ""
          );
        })}
      </div>
    </>
  );
};

export default Budget;
