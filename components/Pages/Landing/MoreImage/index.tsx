'use client'

import Image from "next/image";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
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
    <div className="mx-auto w-[540px] h-[420px] overflow-hidden">
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
    originalWidth: 600,  // Atur lebar gambar
  }
    // const images = [
    //   {
    //     original: image.front_image,
    //     thumbnail: image.front_image,
    //     // ...sizes
    //   }
    // ];
    // if(image.inside_image.length > 0){
    //   image.inside_image.forEach(v => {
    //     images.push({
    //       original: v,
    //       thumbnail: v,
    //       // ...sizes
    //     }) 
    //   })
    //   if(image.bath_image){
    //     images.push({
    //       original: image.bath_image,
    //       thumbnail: image.bath_image,
    //       // ...sizes
    //     }) 
    //   }
    // }
    
    var images:iSlide[] = [];
    for(const i in image){
      
      if(Array.isArray(image[i])){
        image[i].forEach((v:string) => {
          images.push({
            original: v,
            thumbnail: v,
          })
        })
      }else{
          images.push({
            original: image[i],
            thumbnail: image[i],
          })
      }
    }
    console.log(images)
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <>
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
          
          </>
        );
      },
    });
  };

  const MoreImage  = ({images}:{images:iImage}) => {
    console.log(images)
    return <button className="absolute bottom-2 right-2 bg-white text-black-2 rounded-sm py-1 px-3 text-xs" onClick={() => viewAllImage(images)}>Lihat semua foto</button>;
  }

  export type {iImage};
  export default MoreImage;