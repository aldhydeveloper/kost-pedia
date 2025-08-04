"use client";
import { useRef, useEffect, useState, memo } from "react";
import Image from "next/image";

import File from "@/components/Form/CustomFile";
import { FaPlusCircle } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import FrontImage from "./foto/FrontImage";
import { MultiImage, InputLabelComponent } from "./foto/MultiImage";
import { FaTrashAlt } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

type tFoto = {
  front_image: string | File;
  inside_image: (string | File)[];
  street_image: string | File;
  thumbnail?: string;
  [key: string]: any;
};
type tFile = File | string | (string | File)[];
interface iSetFoto {
  foto: tFoto;
  firstImageID: string;
  secondImageID: string;
  thirdImageID: string;
  hasThubmnail?: boolean;
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
  callbackThumbnail?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasThumbnail: boolean;
  id: string;
  label: string;
  note: string;
  thumbnail: string | undefined;
}

const FrontImage = memo(function FrontImage({
  file,
  thumbnail,
  callback,
  callbackDelete,
  callbackThumbnail,
  hasThumbnail,
  label,
  note,
  id = "frontImage",
}: iImageComp) {
  // console.log("front", file);
  return (
    <div className="pb-6 pt-3 grid grid-cols-3 gap-4 h-[260px]">
      <div className="overflow-hidden relative">
        {thumbnail == "front_image" ? (
          <label className="absolute z-99 bg-azure-700 text-white top-2 right-2 text-xs px-2 py-1 rounded-md">
            Thumbnail
          </label>
        ) : (
          ""
        )}

        {file === "/img/empty-img.jpg" ? (
          <InputLabelComponent id={id} name="front_image" callback={callback} />
        ) : (
          <>
            <div className="absolute group inset-0 hover:bg-[#00000099] z-9 flex items-center justify-center gap-4">
              <div className="opacity-0 group-hover:opacity-100 bg-white py-2 ">
                {hasThumbnail ? (
                  <button
                    name="front_image"
                    type="button"
                    onClick={callbackThumbnail}
                    title="Jadikan Thumbnail"
                    className="flex items-center gap-2 border-b-2 border-gray py-1 px-3 w-full text-sm"
                  >
                    <RiEyeFill className="text-azure-900" /> Jadikan Thumbnail
                  </button>
                ) : (
                  ""
                )}
                <button
                  name="front_image"
                  type="button"
                  onClick={callbackDelete}
                  title="Hapus Gambar"
                  className="flex items-center gap-2 py-1 px-3 w-full text-sm"
                >
                  <FaTrashAlt className="text-danger" /> Hapus Foto
                </button>
              </div>
            </div>
            <Image
              src={typeof file === "string" ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/images${file}` : URL.createObjectURL(file)}
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
  callbackThumbnail,
  thumbnail,
  hasThumbnail,
  id,
  label,
  note,
}: iImageComp) {
  // console.log(thumbnail);
  return (
    <div className="pb-6 pt-3 grid grid-cols-3 gap-4 h-[260px]">
      <div className="overflow-hidden relative">
        {thumbnail == "street_image" ? (
          <label className="absolute z-99 bg-azure-700 text-white top-2 right-2 text-xs px-2 py-1 rounded-md">
            Thumbnail
          </label>
        ) : (
          ""
        )}
        {file === "/img/empty-img.jpg" ? (
          <InputLabelComponent
            id={id}
            name="street_image"
            callback={callback}
          />
        ) : (
          <>
            <div className="absolute group inset-0 hover:bg-[#00000099] z-9 flex items-center justify-center gap-4">
              <div className="opacity-0 group-hover:opacity-100 bg-white py-2 ">
                {hasThumbnail ? (
                  <button
                    name="street_image"
                    type="button"
                    onClick={callbackThumbnail}
                    title="Jadikan Thumbnail"
                    className="flex items-center gap-2 border-b-2 border-gray py-1 px-3 w-full text-sm"
                  >
                    <RiEyeFill className="text-azure-900" /> Jadikan Thumbnail
                  </button>
                ) : (
                  ""
                )}
                <button
                  name="street_image"
                  type="button"
                  onClick={callbackDelete}
                  title="Hapus Gambar"
                  className="flex items-center gap-2 py-1 px-3 w-full text-sm"
                >
                  <FaTrashAlt className="text-danger" /> Hapus Foto
                </button>
              </div>
            </div>
            <Image
              src={typeof file === "string" ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/images${file}` : URL.createObjectURL(file)}
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
  hasThubmnail = false,
  firstImageLabel = "Foto Kost Tampak Depan",
  secondImageLabel = "Foto Kost Tampak Dalam (Max 3)",
  thirdImageLabel = "Foto Kost Tampak Jalan",
  noteFirstImage = "Foto horizontal akan terlihat lebih bagus sebagai foto utama kost anda",
  noteSecondImage = "Perhatikan suasana di dalam kost, gunakan penerangan yang baik agar gambar terlihat lebih jelas",
  noteThirdImage = "Foto ini menunjukan keadaan lingkungan kost anda, pastikan foto dapat mewakili keadaan di sekitar",
}: iSetFoto) {
  // console.log(foto);
  const [file, setFile] = useState<File | string>("/img/empty-img.jpg");
  // const [files, setFiles] = useState<File[]>([]);

  const handleChange_image = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.files) {
      handleFotoKost(e.target.name, e.target.files[0]);
    }
  };
  const handleThumbnail_image = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLTextAreaElement;
    // console.log(target);
    if (target.name) {
      handleFotoKost("thumbnail", target.name);
      // toast.success(
      //   <span className="text-nowrap">Gambar telah dijadikan thumbnail.</span>,
      //   {
      //     position: "top-center",
      //     className: "w-96",
      //   }
      // );
    }
  };
  const handleDelete_image = (e: any) => {
    handleFotoKost(e.currentTarget.name, "/img/empty-img.jpg");
  };
  return (
    <>
      <ToastContainer />
      <div>
        <label className="leading-4 block dark:text-white">
          {firstImageLabel}
        </label>
        <small>{noteSecondImage}</small>
      </div>
      <FrontImage
        file={foto.front_image ? foto.front_image : "/img/empty-img.jpg"}
        callback={handleChange_image}
        callbackDelete={handleDelete_image}
        callbackThumbnail={handleThumbnail_image}
        thumbnail={foto.thumbnail}
        hasThumbnail={hasThubmnail}
        label={firstImageLabel}
        note={noteFirstImage}
        id={firstImageID}
      />
      <div className="mb-1">
        <label className="leading-4 block dark:text-white">
          {secondImageLabel}
        </label>
        <small>{noteSecondImage}</small>
      </div>
      <MultiImage
        id={secondImageID}
        images={foto.inside_image}
        thumbnail={foto.thumbnail}
        hasThumbnail={hasThubmnail}
        callback={(images) => {
          handleFotoKost("inside_image", images);
        }}
        callbackThumbnail={handleThumbnail_image}
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
        thumbnail={foto.thumbnail}
        callback={handleChange_image}
        callbackDelete={handleDelete_image}
        callbackThumbnail={handleThumbnail_image}
        hasThumbnail={hasThubmnail}
        label={thirdImageLabel}
        note={noteThirdImage}
      />
    </>
  );
});

export default FotoKost;
export type { tFoto, tFile };
