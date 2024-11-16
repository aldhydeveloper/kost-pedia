'use client'

import Image from "next/image";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface iImage {
    front_image: string;
    inside_image: string[];
    bath_image: string;
}
const viewAllImage = (image:iImage) => {
  // console.log(image)
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <>
          <div className="mb-8">
            <label className="text-xl font-bold text-black block mb-4">
              Foto Tampak Depan
            </label>
            <Image width={720} height={400} alt="Front Image" src={image.front_image} className="rounded-sm block" />
          </div>
          <div className="mb-8">
            <label className="text-xl font-bold text-black block mb-4">
              Foto Tampak Dalam
            </label>
            <div className="flex flex-col gap-8">
              {
                image.inside_image.map((v, i) => {
                  return <Image key={i} width={720} height={400} alt="Inside Image" src={v} className="rounded-sm block" />
                })
              }
            </div>
          </div>
          {
            image.bath_image && 
            <div className="mb-8">
              <label className="text-xl font-bold text-black block mb-4">
                Foto Kamar Mandi
              </label>
              <Image width={720} height={400} alt="Bath Image" src={image.bath_image} className="rounded-sm block" />
            </div>

          }
          
          </>
        );
      },
    });
  };

  const MoreImage  = ({images}:{images:iImage}) => {
    console.log(images)
    return <button className="absolute bottom-2 right-2 bg-white text-black-2 rounded-md py-1 px-3 text-xs" onClick={() => viewAllImage(images)}>Lihat semua foto</button>;
  }

  export type {iImage};
  export default MoreImage;