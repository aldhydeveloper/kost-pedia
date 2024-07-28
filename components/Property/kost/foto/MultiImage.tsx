"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState, memo, useCallback } from "react";

import { FaPlusCircle } from "react-icons/fa";
const ImagesComponent = ({
  callback,
}: {
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  // const handlerChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e);
  //   // callback(e.)
  // };
  return (
    <label
      htmlFor="foto1"
      className="w-full flex items-center justify-center border-2 text-azure-600 rounded-md border-azure-600 h-full"
    >
      <input type="file" id="foto1" className="sr-only" onChange={callback} />
      <FaPlusCircle /> Tambah Foto
    </label>
  );
};
const MultiImage = memo(function MultiImage({
  callback,
  images,
}: {
  callback: (images: (string | File)[]) => void;
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
  console.log(images);
  // console.log(images.length);
  return (
    <div className="py-6 grid grid-cols-3 gap-4 h-[260px]">
      {images.length > 0
        ? images.map((v, i) => {
            return (
              <div key={i} className="overflow-hidden relative">
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
      {images.length < 3 ? <ImagesComponent callback={handlerChange} /> : ""}
    </div>
  );
});

export default MultiImage;
