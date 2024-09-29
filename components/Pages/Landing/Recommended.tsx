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
const RecommendedComp = ({
  thumbnail,
  category,
  name,
  price,
  customClass,
  ...otherProps
}: iRoom & { category: string; customClass?: string }) => {
  return (
    <div
      {...otherProps}
      style={{
        backgroundImage: `url('${
          thumbnail ? `${thumbnail}` : "/img/empty-img.jpg"
        }')`,
      }}
      className={`bg-no-repeat bg-cover bg-center overflow-hidden rounded-3xl`}
    >
      <div
        className={`bg-[#00000080] w-full z-10 text-white py-5 px-8  flex items-end ${customClass}`}
      >
        <div className="">
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
    </div>
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
        {resp.data.map((v: iKost, i: number) => {
          const room = v.active_rooms[0];
          // console.log(room);
          return (
            <>
              {i == 0 || i == 1 ? (
                <RecommendedComp
                  key={v.id}
                  thumbnail={room?.thumbnail}
                  category={v.category}
                  name={`${v.name} - ${room?.name}`}
                  price={room?.price}
                  customClass="h-125"
                />
              ) : (
                ""
              )}
              {i == 2 ? (
                <div key={v.id} className="flex flex-col justify-between">
                  <RecommendedComp
                    thumbnail={room?.thumbnail}
                    category={v.category}
                    name={`${v.name} - ${room?.name}`}
                    price={room?.price}
                    customClass="h-60"
                  />
                  <RecommendedComp
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
            </>
          );
        })}
      </div>
    </>
  );
};

export default Rekommended;
