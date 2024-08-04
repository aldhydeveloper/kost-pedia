"use client";
import Template from "@/app/(landing)/template";
import Image from "next/image";
import React, { useRef, useEffect, useState, memo, useCallback } from "react";

import { FaPlusCircle } from "react-icons/fa";
const InputLabelComponent = ({
  callback,
  id,
  name,
}: {
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
}) => {
  // const handlerChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e);
  //   // callback(e.)
  // };
  return (
    <label
      htmlFor={id}
      className="w-full flex items-center justify-center border-2 text-azure-600 rounded-md border-azure-600 h-full"
    >
      <input
        type="file"
        name={name}
        id={id}
        className="sr-only"
        onChange={callback}
      />
      <FaPlusCircle /> Tambah Foto
    </label>
  );
};
const MultiImage = memo(function MultiImage({
  callback,
  id,
  images,
}: {
  callback: (images: (string | File)[]) => void;
  id: string;
  images: (string | File)[];
}) {
  // const [images, setImages] = useState<(string | File)[]>([]);
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //   setImages([...images, e.target.files[0]]);
      callback([...images, e.target.files[0]]);
    }
    // if (images.length == 3) {
    // callback([...images, e.target.files[0]]);
    // }
  };
  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.id);
    const value = e.currentTarget.value;
    const temp = images.filter((_, i) => i !== id);
    // console.log(value);
    callback(temp);
    // const tem
    // console.log(id);
  };
  // console.log(images);
  // console.log(images.length);
  return (
    <div className="pt-3 pb-6 grid grid-cols-3 gap-4 h-[260px]">
      {images.length > 0
        ? images.map((v, i) => {
            return (
              <div key={i} className="overflow-hidden relative">
                <button
                  id={`${i}`}
                  type="button"
                  className="absolute group inset-0 hover:bg-[#00000060]  z-9"
                  onClick={handleDeleteImage}
                >
                  <label className="text-white opacity-0 group-hover:opacity-100">
                    Hapus Foto
                  </label>
                </button>
                <Image
                  src={typeof v === "string" ? v : URL.createObjectURL(v)}
                  alt="Image Multi"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })
        : ""}
      {images.length < 3 ? (
        <InputLabelComponent
          name="multi_image"
          id={`foto${images.length}${id}`}
          callback={handlerChange}
        />
      ) : (
        ""
      )}
    </div>
  );
});

export { MultiImage, InputLabelComponent };
