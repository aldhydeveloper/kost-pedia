import { memo } from "react";
import { tRooms } from "@/components/Property/kost/TypeKost";
interface iPrice {
  dataRooms: tRooms[];
}
const PriceKost = memo(function PriceKost({ dataRooms }: iPrice) {
  console.log(dataRooms);
  return (
    <>
      {dataRooms.length > 0 &&
        dataRooms.map((v, i) => {
          return <div key={i}>{v.room_type_name}</div>;
        })}
    </>
  );
});

export default PriceKost;
