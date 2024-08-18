"use client";
import { useRef, useEffect, useState, memo } from "react";
import Image from "next/image";

import File from "@/components/Form/CustomFile";
import { FaPlusCircle } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import FrontImage from "./foto/FrontImage";
import { MultiImage, InputLabelComponent } from "./foto/MultiImage";

type tFoto = {
  front_image: string | File;
  inside_image: (string | File)[];
  street_image: string | File;
};
type tFile = File | string | (string | File)[];
interface iSetFoto {
  foto: tFoto;
  firstImageID: string;
  secondImageID: string;
  thirdImageID: string;
  handleFotoKost: (name: string, value: tFile) => void;
  firstImageLabel?: string;
  secondImageLabel?: string;
  thirdImageLabel?: string;
  noteFirstImage?: string;
  noteSecondImage?: string;
  noteThirdImage?: string;
}

interface iImageComp {
  file: File | string;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  callbackDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
  label: string;
  note: string;
}

const FrontImage = memo(function FrontImage({
  file,
  callback,
  callbackDelete,
  label,
  note,
  id = "frontImage",
}: iImageComp) {
  // console.log(file);
  return (
    <div className="pb-6 pt-3 grid grid-cols-3 gap-4 h-[260px]">
      <div className="overflow-hidden relative">
        {file === "/img/empty-img.jpg" ? (
          <InputLabelComponent id={id} name="front_image" callback={callback} />
        ) : (
          <>
            <button
              type="button"
              className="absolute group inset-0 hover:bg-[#00000060]  z-9"
              name="front_image"
              onClick={callbackDelete}
            >
              <label className="text-white opacity-0 group-hover:opacity-100">
                Hapus Foto
              </label>
            </button>
            <Image
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              fill={true}
              style={{ objectFit: "cover" }}
              alt="Thumbnail"
              // className="my-4"
            />
          </>
        )}
      </div>
    </div>
  );
});

const StreetImage = memo(function StreetImage({
  file,
  callback,
  callbackDelete,
  id,
  label,
  note,
}: iImageComp) {
  // console.log(file);
  return (
    <div className="pb-6 pt-3 grid grid-cols-3 gap-4 h-[260px]">
      <div className="overflow-hidden relative">
        {file === "/img/empty-img.jpg" ? (
          <InputLabelComponent
            id={id}
            name="street_image"
            callback={callback}
          />
        ) : (
          <>
            <button
              type="button"
              className="absolute group inset-0 hover:bg-[#00000060]  z-9"
              name="street_image"
              onClick={callbackDelete}
            >
              <label className="text-white opacity-0 group-hover:opacity-100">
                Hapus Foto
              </label>
            </button>
            <Image
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              fill={true}
              style={{ objectFit: "cover" }}
              alt="Thumbnail"
              // className="my-4"
            />
          </>
        )}
      </div>
    </div>
  );
});
const FotoKost = memo(function FotoKost({
  foto,
  handleFotoKost,
  firstImageID,
  secondImageID,
  thirdImageID,
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
    // console.log(e.target.files);
    if (e.target.files) {
      handleFotoKost(e.target.name, e.target.files[0]);
    }
  };
  const handleDelete_image = (e: any) => {
    handleFotoKost(e.target.name, "/img/empty-img.jpg");
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
      <div>
        <label className="leading-4 block dark:text-white">
          {firstImageLabel}
        </label>
        <small>{noteSecondImage}</small>
      </div>
      {foto.front_image ? (
        <FrontImage
          file={foto.front_image}
          callback={handleChange_image}
          callbackDelete={handleDelete_image}
          label={firstImageLabel}
          note={noteFirstImage}
          id={firstImageID}
        />
      ) : (
        <FrontImage
          file={"/img/empty-img.jpg"}
          callback={handleChange_image}
          callbackDelete={handleDelete_image}
          label={firstImageLabel}
          note={noteFirstImage}
          id={firstImageID}
        />
      )}

      <div className="mb-1">
        <label className="leading-4 block dark:text-white">
          {secondImageLabel}
        </label>
        <small>{noteSecondImage}</small>
      </div>
      <MultiImage
        id={secondImageID}
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
      <div className="mb-1">
        <label className="leading-4 block dark:text-white">
          {thirdImageLabel}
        </label>
        <small>{noteThirdImage}</small>
      </div>
      <StreetImage
        id={thirdImageID}
        file={foto.street_image ? foto.street_image : "/img/empty-img.jpg"}
        callback={handleChange_image}
        callbackDelete={handleDelete_image}
        label={thirdImageLabel}
        note={noteThirdImage}
      />
    </>
  );
});

export default FotoKost;
export type { tFoto, tFile };
