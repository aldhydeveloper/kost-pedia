import Get from "@/service/get";
import Image from "next/image";
import { NumericFormat } from "react-number-format";

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
const Promo = async () => {
  const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts`);
  // console.log(resp);
  if (!resp.success) {
    return <>No data found.</>;
  }
  return (
    <>
      <div className="grid grid-cols-3 py-6 gap-10">
        {resp.data.map((v: iKost, i: number) => {
          const room = v.active_rooms[0];
          return i < 3 ? (
            <div
              key={i}
              className="flex items-end rounded-lg h-40 overflow-hidden bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url('${
                  room.thumbnail ? `${room.thumbnail}` : "/img/empty-img.jpg"
                }')`,
              }}
            >
              <div
                key={i}
                className={`bg-[#00000080] h-full w-full z-10 text-white py-5 px-8 `}
              ></div>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </>
  );
};

export default Promo;
