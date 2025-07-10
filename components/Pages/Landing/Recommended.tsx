import Get from "@/service/get";
import Image from "next/image";
import Link from "next/link";
import { NumericFormat } from "react-number-format";

interface iRoom {
  id:string;
  thumbnail: string | undefined;
  front_image?: string;
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
const RecommendedComp = ({
  id,
  thumbnail,
  category,
  name,
  price,
  customClass,
  ...otherProps
}: iRoom & { category: string; customClass?: string}) => {
  return (
    <Link href={`/room/${id}`}
      {...otherProps}
      style={{
        backgroundImage: `url('${
          thumbnail ? `${thumbnail}` : "/img/empty-img.jpg"
        }')`,
      }}
      className={`bg-no-repeat bg-cover bg-center overflow-hidden rounded-2xl h-full w-full block`}
    >
      <div
        className={`bg-[#00000080] w-full z-10 text-white py-5 px-8  flex items-end ${customClass}`}
      >
        <div>
          <label className="border rounded-md bg-transparent px-4 py-1 mb-4 w-24 block text-center">
            {category}
          </label>
          <p className="mb-1">{name}</p>
          <span className="text-xl font-bold">
            {price
              ? price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              : ""}
          </span>
        </div>
      </div>
    </Link>
  );
};
const Rekommended = async () => {
  const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts`);
  // console.log(resp);
  if (!resp.success) {
    return <>No data found.</>;
  }
  return (
    <>
      <div className="grid grid-cols-3 py-6 gap-10">
        {resp.data.map((v: iKost & {front_image: string}, i: number) => {
          const room = v.active_rooms[0];
          // console.log(room);
          return (
            <div key={v.id}>
              {i == 0 || i == 1 ? (
                <RecommendedComp
                  id={room.id}
                  
                  thumbnail={room?.thumbnail ? room?.thumbnail : room?.front_image}
                  category={v.category}
                  name={`${v.name} - ${room?.name}`}
                  price={room?.price}
                  customClass="h-125"
                />
              ) : (
                ""
              )}
              {i == 2 ? (
                <div className="flex flex-col justify-between h-full">
                  <RecommendedComp
                    id={room.id}
                    thumbnail={room?.thumbnail}
                    category={v.category}
                    name={`${v.name} - ${room?.name}`}
                    price={room?.price}
                    customClass="h-60"
                  />
                  <RecommendedComp
                    id={room.id}
                    thumbnail={resp.data[i + 1].active_rooms[0]?.thumbnail}
                    category={resp.data[i + 1].category}
                    name={`${resp.data[i + 1].name} - ${
                      resp.data[i + 1].active_rooms[0]?.name
                    }`}
                    price={resp.data[i + 1].active_rooms[0]?.price}
                    customClass="h-60"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Rekommended;
