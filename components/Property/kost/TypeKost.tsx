import Input from "@/components/Form/CustomInput";
import Button from "@/components/Utility/CustomButton";
import { memo, useState } from "react";
import FotoKost, { tFoto, tFile } from "./FotoKost";
// type tFoto = {
//   front_image: string | File;
//   inside_image: string[] | FileList;
//   street_image: string | File;
// };
type tRooms = {
  room_type_name: string;
  p: number;
  l: number;
  front_image: string | File;
  inside_image: string[] | FileList;
  street_image: string | File;
};
type tType = {
  typeKost: tRooms[];
  callback: (v: tRooms[]) => void;
  index?: number;
};
const dataRooms = {
  room_type_name: "",
  p: 0,
  l: 0,
  front_image: "",
  inside_image: [],
  street_image: "",
};
const RoomsComp = memo(function RoomsComp({
  handleChangeRooms,
  rooms,
  index,
}: {
  handleChangeRooms: (rooms: tRooms, index: number | undefined | "") => void;
  rooms: tRooms;
  index: number;
}) {
  // const [Rooms, setRooms] = useState<tRooms>(rooms);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(rooms);
    // setRooms({ ...Rooms, [e.target.name]: e.target.value });
    // handleChangeRooms([...rooms, Rooms]);
    const index = e.target.dataset.index && parseInt(e.target.dataset.index);
    // console.log(e.target.dataset);
    // const temp = rooms.map((v: tRooms, i: number) => {
    //   if (index == i) {
    //     return { ...v, [e.target.name]: e.target.value };
    //   } else {
    //     return v;
    //   }
    // });
    // console.log(temp);
    handleChangeRooms({ ...rooms, [e.target.name]: e.target.value }, index);
  };
  return (
    <>
      <div className="mb-10">
        <Input
          data-index={index}
          name="room_type_name"
          label="Nama Type Kamar"
          value={rooms.room_type_name}
          onChange={handleChange}
        />
        <label className="mb-2 inline-block">Ukuran Kamar</label>
        <div className="flex items-center justify-start gap-4 mb-6">
          <Input
            data-index={index}
            type="number"
            name="p"
            className="max-w-[100px]"
            value={rooms.p}
            onChange={handleChange}
          />
          X
          <Input
            data-index={index}
            type="number"
            name="l"
            className="max-w-[100px]"
            value={rooms.l}
            onChange={handleChange}
          />
        </div>
        <FotoKost
          data-index={index}
          foto={rooms}
          lastImageLabel="Foto Kamar Mandi"
          handleFotoKost={(name: string, value: tFile) => {
            handleChangeRooms({ ...rooms, [name]: value }, index);
            // setRooms({ ...Rooms, [name]: value });
          }}
        />
      </div>
    </>
  );
});
const TypeKost = memo(function TypeKost({ typeKost, callback }: tType) {
  // const [listRooms, setListRooms] = useState<tRooms[]>([]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //   const temp = typeKost.map((v, index) => {
  //     // console.log(index);
  //     // console.log(i);
  //     if (i === index) {
  //       return { ...v, [e.target.name]: e.target.value };
  //     } else {
  //       return v;
  //     }
  //   });
  //   callback(temp);
  // };
  // const handleChangeRooms = (rooms: tRooms[]) => {
  //   callback(rooms);
  // };

  const handleChangeRooms = (rooms: tRooms, index: number | undefined | "") => {
    const temp = typeKost.map((v, i) => {
      // console.log(v);
      // console.log(i);
      // console.log(rooms);
      // console.log(rooms);
      if (i == index) {
        return rooms;
      } else {
        return v;
      }
    });
    console.log(temp);
    callback(temp);
  };
  const handleAddRoom = () => {};
  // console.log(typeKost);
  return (
    <div className="mb-10">
      {typeKost.map((v, i) => {
        return (
          <RoomsComp
            key={i}
            rooms={v}
            handleChangeRooms={handleChangeRooms}
            index={i}
          />
        );
      })}
      <Button
        type="button"
        onClick={() => {
          const temp = [...typeKost, dataRooms];
          // temp.push(dataRooms);
          callback(temp);
          // console.log(temp);
        }}
      >
        Tambah Kamar
      </Button>
    </div>
  );
});

export default TypeKost;
export type { tRooms };
