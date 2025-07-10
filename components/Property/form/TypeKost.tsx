"use client";
import { useRef, useEffect, useState, memo } from "react";
import Input from "@/components/Form/CustomInput";

interface iStateTypeKost {
  roomType: {
    name: string;
    p: number | string;
    l: number | string;
  };
  handleChange: (e: any) => void;
}
const TypeKost = memo(function TypeKost({
  roomType,
  handleChange,
}: iStateTypeKost) {
  // const [roomType, setRoomType] = useState({
  //   name: "",
  //   size: {
  //     p: 0,
  //     l: 0,
  //   },
  // });
  console.log("render type");
  return (
    <>
      <Input
        type="text"
        name="name"
        label="Nama Type Kamar"
        value={roomType.name}
        onChange={handleChange}
        // onChange={({ target }) =>
        //   setRoomType({ ...roomType, name: target.value })
        // }
      />
      <label className="mb-2 inline-block">Ukuran Kamar</label>
      <div className="flex items-center justify-start gap-4">
        <Input
          type="number"
          name="p"
          className="max-w-[100px]"
          value={roomType.p}
          onChange={handleChange}
          // onChange={({ target }) =>
          //   setRoomType({
          //     ...roomType,
          //     size: {
          //       ...roomType.size,
          //       p: !isNaN(parseInt(target.value)) ? parseInt(target.value) : 0,
          //     },
          //   })
          // }
        />
        X
        <Input
          type="number"
          name="l"
          className="max-w-[100px]"
          value={roomType.l}
          onChange={handleChange}
          // onChange={({ target }) =>
          //   setRoomType({
          //     ...roomType,
          //     size: {
          //       ...roomType.size,
          //       l: !isNaN(parseInt(target.value)) ? parseInt(target.value) : 0,
          //     },
          //   })
          // }
        />
      </div>
    </>
  );
});

export default TypeKost;
