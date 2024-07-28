"use client";
import { useRef, useEffect, useState, memo } from "react";
import Image from "next/image";

import File from "@/components/Form/CustomFile";
import { FaPlusCircle } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import FrontImage from "./foto/FrontImage";
import MultiImage from "./foto/MultiImage";

type tFoto = {
  front_image: string | File;
  inside_image: (string | File)[];
  street_image: string | File;
};
type tFile = File | (string | File)[];
interface iSetFoto {
  foto: tFoto;
  handleFotoKost: (name: string, value: tFile) => void;
  firstImageLabel?: string;
  secondImageLabel?: string;
  thirdImageLabel?: string;
  noteFirstImage?: string;
  noteSecondImage?: string;
  noteThirdImage?: string;
}

const FrontImage = memo(function FrontImage({
  file,
  callback,
  label,
  note,
}: {
  file: File | string;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  note: string;
}) {
  console.log(file);
  return (
    <div className="mb-8">
      <File
        onChange={callback}
        name="front_image"
        label={label}
        note={note}
        id="tampakDepan"
        accept=".png,.jpeg,.jpg"
      />
      <div className="grid grid-cols-3">
        <div className=" h-[260px] relative overflow-hidden">
          <Image
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
            fill={true}
            style={{ objectFit: "cover" }}
            alt="Thumbnail"
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
});

const InsideImage = memo(function InsideImage({
  files,
  callback,
  label,
  note,
}: {
  files: string[] | FileList;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  note: string;
}) {
  console.log("render inside");
  return (
    <div className="mb-8">
      {/* <File
        id="tampakDalam"
        onChange={callback}
        accept=".png,.jpeg,.jpg"
        label={label}
        note={note}
      /> */}
      <div className="mb-2">
        <label className="leading-4 block dark:text-white">{label}</label>
        <small>{note}</small>
      </div>
      <div className="flex gap-5 py-4">
        {Array.from(files as FileList).map((v, i) => {
          return (
            <Image
              key={i}
              src={typeof v === "string" ? v : URL.createObjectURL(v)}
              width={350}
              height={350}
              alt="Inside Image"
              className=""
            />
          );
        })}
        {/* <div> */}
        <label
          htmlFor="foto1"
          className="h-auto w-75 flex items-center justify-center border-2 text-azure-600 rounded-md border-azure-600"
        >
          <input type="file" id="foto1" className="sr-only" />
          <FaPlusCircle /> Tambah Foto
        </label>
        {/* <button
            type="button"
            className="h-auto w-75 flex items-center justify-center border-2 text-azure-600 rounded-md border-azure-600"
          >
            <FaPlusCircle />
            Tambah Foto
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
});
const StreetImage = memo(function StreetImage({
  file,
  callback,
  label,
  note,
}: {
  file: File | string;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  note: string;
}) {
  // console.log(file);
  return (
    <div className="mb-8">
      <File
        onChange={callback}
        name="street_image"
        label={label}
        note={note}
        id="TampakJalan"
        accept=".png,.jpeg,.jpg"
      />
      <div className="grid grid-cols-3">
        <div className=" h-[260px] relative overflow-hidden">
          <Image
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
            width={350}
            height={350}
            alt="Street Image"
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
});
const FotoKost = memo(function FotoKost({
  foto,
  handleFotoKost,
  firstImageLabel = "Foto Kost Tampak Depan",
  secondImageLabel = "Foto Kost Tampak Dalam (Max 3)",
  thirdImageLabel = "Foto Kost Tampak Jalan",
  noteFirstImage = "Foto horizontal akan terlihat lebih bagus sebagai foto utama kost anda",
  noteSecondImage = "Perhatikan suasana di dalam kost, gunakan penerangan yang baik agar gambar terlihat lebih jelas",
  noteThirdImage = "Foto ini menunjukan keadaan lingkungan kost anda, pastikan foto dapat mewakili keadaan di sekitar",
}: iSetFoto) {
  const [file, setFile] = useState<File | string>("/img/empty-img.jpg");
  // const [files, setFiles] = useState<File[]>([]);

  const handleChange_image = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      handleFotoKost(e.target.name, e.target.files[0]);
    }
  };
  // const handleChange_insideImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     // console.log(e.target.files);
  //     if (Array.from(e.target.files).length > 3) {
  //       toast.error(
  //         <span className="text-nowrap">Cannot Upload more then 3 files</span>,
  //         {
  //           position: "top-center",
  //           className: "w-96",
  //         }
  //       );
  //       // if (document.getElementById("kamarKost") !== undefined) {
  //       (document.getElementById("kamarKost") as HTMLInputElement).value = "";
  //       // }
  //       return false;
  //     }
  //     handleFotoKost("inside_image", e.target.files);
  //   }
  // };
  console.log(foto);
  return (
    <>
      <ToastContainer />
      {foto.front_image ? (
        <FrontImage
          file={foto.front_image}
          callback={handleChange_image}
          label={firstImageLabel}
          note={noteFirstImage}
        />
      ) : (
        <FrontImage
          file={"/img/empty-img.jpg"}
          callback={handleChange_image}
          label={firstImageLabel}
          note={noteFirstImage}
        />
      )}

      <div className="mb-1">
        <label className="leading-4 block dark:text-white">
          {secondImageLabel}
        </label>
        <small>{noteSecondImage}</small>
      </div>
      <MultiImage
        images={foto.inside_image}
        callback={(images) => {
          handleFotoKost("inside_image", images);
        }}
      />
      {/* {foto.inside_image.length > 0 ? (
        <InsideImage
          files={foto.inside_image}
          callback={handleChange_insideImage}
          label={secondImageLabel}
          note={noteSecondImage}
        />
      ) : (
        <InsideImage
          files={["/img/empty-img.jpg"]}
          callback={handleChange_insideImage}
          label={secondImageLabel}
          note={noteSecondImage}
        />
      )} */}
      <StreetImage
        file={foto.street_image ? foto.street_image : "/img/empty-img.jpg"}
        callback={handleChange_image}
        label={thirdImageLabel}
        note={noteThirdImage}
      />
    </>
  );
});

export default FotoKost;
export type { tFoto, tFile };
