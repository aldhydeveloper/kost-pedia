'use client'

import Image from "next/image";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import ImageGallery from "react-image-gallery";
import { FaTimes } from "react-icons/fa";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect } from "react";
interface iImage {
    front_image: string;
    inside_image: string[];
    bath_image: string;
    kost_front_image: string;
    kost_inside_image: string[];
    street_image: string;
    [key: string]: any;
}
interface iSlide {
  original:string;
  thumbnail:string;
}
const viewAllImage = (image:iImage) => {
  // console.log(image)
  const renderCustomImage = (item:any) => (
    <div className="mx-auto w-[520px] h-[360px] 3xl:w-[720px] 3xl:h-[520px] overflow-hidden">
      <Image
        src={item.original}
        height={720}
        width={1024}
        alt={''}
        className="object-center object-contain w-full h-full"
      />
    </div>
  );
  const renderCustomThumb = (item:any) => {
    return <div className="mx-auto w-full h-[70px] overflow-hidden">
      <Image
        src={item.thumbnail}
        height={720}
        width={1024}
        alt={''}
        className="object-center object-cover w-full h-full"
      />
    </div>
  };
  const sizes = {
    originalHeight: 400, // Atur tinggi gambar
    originalWidth: 1200,  // Atur lebar gambar
  }
  
  var images:iSlide[] = [];
  for(const i in image){
    
    if(Array.isArray(image[i])){
      image[i].forEach((v:string) => {
        images.push({
          original: `${process.env.NEXT_PUBLIC_BASE_URL}/api/images${v}`,
          thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}/api/images${v}`,
        })
      })
    }else{
        images.push({
          original: `${process.env.NEXT_PUBLIC_BASE_URL}/api/images${image[i]}`,
          thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}/api/images${image[i]}`,
        })
    }
  }
    // console.log(images)
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button type="button" onClick={onClose} className="absolute -top-10 right-5 text-4xl">
            <FaTimes />
          </button>
          <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} renderItem={renderCustomImage} renderThumbInner={renderCustomThumb} />
          {/* <div className="mb-8">
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

          } */}
          
          </div>
        );
      },
    });
  };

  const MoreImage  = ({images}:{images:iImage}) => {
    useEffect(() => {
      console.log(window.innerWidth)
    })
    console.log(images)
    return <button className="absolute bottom-2 right-2 bg-white text-black-2 rounded-sm py-1 px-3 text-xs shadow-1" onClick={() => viewAllImage(images)}>Lihat semua foto</button>;
  }

  export type {iImage};
  export default MoreImage;