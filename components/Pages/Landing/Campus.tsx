"use client";
import Image from "next/image";
import { memo, useState } from "react";
interface iCampus {
  name: string;
  image: string;
}
const campusList: iCampus[] = [
  {
    name: "Institute Teknologi Bandung",
    image: "itb.png",
  },
  {
    name: "Universitas Padjajaran",
    image: "unpad.png",
  },
  {
    name: "Universitas Pendidikan Indonesia",
    image: "upi.svg",
  },
  {
    name: "Universitas Komputer Indonesia",
    image: "unikom.png",
  },
  {
    name: "Universitas Maranatha",
    image: "maranatha.png",
  },
  {
    name: "Universitas Parahyangan",
    image: "unpar.png",
  },
  {
    name: "Institute Telkom",
    image: "telkom.png",
  },
  {
    name: "Universitas Gajah Mada",
    image: "ugm.png",
  },
  {
    name: "Universitas Indonesia",
    image: "ui.png",
  },
];
const Campus = memo(function Campus() {
  const [campus, setCampus] = useState<string>("Institute Teknologi Bandung");
  return (
    <div className="scrollbar-none relative snap-x snap-mandatory text-nowrap flex-row space-x-4 overflow-x-auto w-full inline-flex flex-nowrap py-6">
      {campusList.map((v: iCampus, i: number) => {
        return (
          <label
            key={v.name}
            htmlFor={`${i}`}
            className={`p-4 text-md flex-none flex justify-between items-center gap-4 rounded-lg cursor-pointer text-nowrap h-[71px] ${
              campus === v.name
                ? "bg-azure-600 text-white"
                : "bg-stroke text-strokedark"
            } `}
          >
            <input
              id={`${i}`}
              type="radio"
              onChange={(e) => setCampus(e.target.value)}
              value={v.name}
              name="campus"
              hidden
            />
            <Image
              src={`/img/campus/${v.image}`}
              width={40}
              height={40}
              alt={v.name}
            />
            {v.name}
          </label>
        );
      })}
    </div>
  );
});

export default Campus;
