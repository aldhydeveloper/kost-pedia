"use client";
import { useRef, useEffect, useState, memo } from "react";
import Image from "next/image";

import File from "@/components/Form/CustomFile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface iStateFoto {
  thumbnail: File | string;
  files: File[];
  handleChange: (thumbnail: File | string, files: File[]) => void;
}
const FotoKost = memo(function FotoKost({
  thumbnail,
  files,
  handleChange,
}: iStateFoto) {
  // const [file, setFile] = useState<File | string>("/img/empty-img.jpg");
  // const [files, setFiles] = useState<File[]>([]);

  const handleChange_image = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setFile(e.target.files[0]);
      handleChange(e.target.files[0], files);
    }
  };
  const handleChnage_imageMulti = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.files) {
      let m: string[] = [];
      if (Array.from(e.target.files).length > 3) {
        toast.error(
          <span className="text-nowrap">Cannot Upload more then 3 files</span>,
          {
            position: "top-center",
            className: "w-96",
          }
        );
        // if (document.getElementById("kamarKost") !== undefined) {
        (document.getElementById("kamarKost") as HTMLInputElement).value = "";
        // }
        return false;
      }
      Array.from(e.target.files).forEach((v: any, i: number) => {
        // setMulti([...multiFile, URL.createObjectURL(v)]);
        m.push(URL.createObjectURL(v));
      });
      const _files = Array.from(e.target.files);
      // console.log(files);
      // setFiles(_files);
      handleChange(thumbnail, _files);
    }
    // console.log(multiFile);
  };
  return (
    <>
      <File
        onChange={handleChange_image}
        label="Thumbnail Kamar"
        id="fileInput"
        accept=".png,.jpeg,.jpg"
      />
      <Image
        src={
          typeof thumbnail !== "string"
            ? URL.createObjectURL(thumbnail)
            : thumbnail === ""
            ? "/img/empty-img.jpg"
            : thumbnail
        }
        width={500}
        height={500}
        alt="Thumbnail"
        className="my-4"
      />

      <File
        id="kamarKost"
        onChange={handleChnage_imageMulti}
        multiple={true}
        accept=".png,.jpeg,.jpg"
        label="Foto Kamar Kost (Max 3)"
      />
      <div className="grid grid-cols-3 gap-5">
        {files.map((v, i) => {
          return (
            <Image
              key={i}
              src={typeof v === "string" ? v : URL.createObjectURL(v)}
              width={500}
              height={500}
              alt="Thumbnail"
              className="my-4"
            />
          );
        })}
      </div>
    </>
  );
});

export default FotoKost;
