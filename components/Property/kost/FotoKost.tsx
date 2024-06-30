"use client";
import { useRef, useEffect, useState, memo } from "react";
import Image from "next/image";

import File from "@/components/Form/CustomFile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type tFoto = {
  front_image: string | File;
  inside_image: string[] | FileList;
  street_image: string | File;
};
type tFile = File | FileList;
interface iSetFoto {
  foto: tFoto;
  handleFotoKost: (name: string, value: tFile) => void;
  lastImageLabel?: string;
}

const FrontImage = memo(function FrontImage({
  file,
  callback,
}: {
  file: File | string;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  // console.log(file);
  return (
    <div className="mb-8">
      <File
        onChange={callback}
        name="front_image"
        label="Foto Kost Tampak Depan"
        id="tampakDepan"
        accept=".png,.jpeg,.jpg"
      />
      <Image
        src={typeof file === "string" ? file : URL.createObjectURL(file)}
        width={500}
        height={500}
        alt="Thumbnail"
        className="my-4"
      />
    </div>
  );
});

const InsideImage = memo(function InsideImage({
  files,
  callback,
}: {
  files: string[] | FileList;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-8">
      <File
        id="tampakDalam"
        onChange={callback}
        multiple={true}
        accept=".png,.jpeg,.jpg"
        label="Foto Kost Tampak Dalam (Max 3)"
      />
      <div className="grid grid-cols-3 gap-5">
        {Array.from(files as FileList).map((v, i) => {
          return (
            <Image
              key={i}
              src={typeof v === "string" ? v : URL.createObjectURL(v)}
              width={500}
              height={500}
              alt="Inside Image"
              className="my-4"
            />
          );
        })}
      </div>
    </div>
  );
});
const StreetImage = memo(function StreetImage({
  file,
  callback,
  label,
}: {
  file: File | string;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) {
  // console.log(file);
  return (
    <div className="mb-8">
      <File
        onChange={callback}
        name="street_image"
        label={label}
        id="TampakJalan"
        accept=".png,.jpeg,.jpg"
      />
      <Image
        src={typeof file === "string" ? file : URL.createObjectURL(file)}
        width={500}
        height={500}
        alt="Street Image"
        className="my-4"
      />
    </div>
  );
});
const FotoKost = memo(function FotoKost({
  foto,
  handleFotoKost,
  lastImageLabel = "Foto Kost Tampak Jalan",
}: iSetFoto) {
  const [file, setFile] = useState<File | string>("/img/empty-img.jpg");
  // const [files, setFiles] = useState<File[]>([]);

  const handleChange_image = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFotoKost(e.target.name, e.target.files[0]);
    }
  };
  const handleChange_insideImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // console.log(e.target.files);
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
      handleFotoKost("inside_image", e.target.files);
    }
  };
  return (
    <>
      <ToastContainer />
      <FrontImage
        file={foto.front_image ? foto.front_image : "/img/empty-img.jpg"}
        callback={handleChange_image}
      />
      <InsideImage
        files={
          foto.inside_image.length > 0
            ? foto.inside_image
            : ["/img/empty-img.jpg"]
        }
        callback={handleChange_insideImage}
      />
      <StreetImage
        file={foto.street_image ? foto.street_image : "/img/empty-img.jpg"}
        callback={handleChange_image}
        label={lastImageLabel}
      />
    </>
  );
});

export default FotoKost;
export type { tFoto, tFile };
