"use client";
import Template from "@/app/(landing)/template";
import Image from "next/image";
import React, { useRef, useEffect, useState, memo, useCallback } from "react";

import { FaPlusCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
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
        accept=".png,.jpg,.jpeg"
        onChange={callback}
      />
      <FaPlusCircle /> Tambah Foto
    </label>
  );
};
const MultiImage = memo(function MultiImage({
  callback,
  callbackThumbnail,
  hasThumbnail,
  thumbnail,
  id,
  images,
}: {
  callback: (images: (string | File)[]) => void;
  callbackThumbnail: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
  images: (string | File)[];
  thumbnail: string | undefined;
  hasThumbnail: boolean;
}) {
  // const [images, setImages] = useState<(string | File)[]>([]);
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files?.length)
    if (e.target.files && e.target.files.length == 1) {
      callback([...images, e.target.files[0]]);
    }
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

  return (
    <div className="pt-3 pb-6 grid grid-cols-3 gap-4 h-[260px]">
      {images.length > 0
        ? images.map((v, i) => {
            return (
              <div key={i} className="overflow-hidden relative">
                {thumbnail == `inside_image${i}` ? (
                  <label className="absolute z-99 bg-azure-700 text-white top-2 right-2 text-xs px-2 py-1 rounded-md">
                    Thumbnail
                  </label>
                ) : (
                  ""
                )}
                <div className="absolute group inset-0 hover:bg-[#00000099] z-9 flex items-center justify-center gap-4">
                  <div className="opacity-0 group-hover:opacity-100 bg-white py-2 ">
                    {hasThumbnail ? (
                      <button
                        name={`inside_image${i}`}
                        type="button"
                        onClick={callbackThumbnail}
                        title="Jadikan Thumbnail"
                        className="flex items-center gap-2  border-b-2 border-gray py-1 px-3 w-full text-sm"
                      >
                        <RiEyeFill className="text-azure-900" /> Jadikan
                        Thumbnail
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      id={`${i}`}
                      name={`inside_image${i}`}
                      type="button"
                      onClick={handleDeleteImage}
                      title="Hapus Gambar"
                      className="flex items-center gap-2 py-1 px-3 w-full text-sm"
                    >
                      <FaTrashAlt className="text-danger" /> Hapus Foto
                    </button>
                  </div>
                </div>
                <Image
                  src={typeof v === "string" || v === undefined ? v : URL.createObjectURL(v)}
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
