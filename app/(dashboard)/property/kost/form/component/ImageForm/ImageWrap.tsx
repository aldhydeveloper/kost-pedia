'use client'
import Image from "next/image"
import { FaTrashAlt } from "react-icons/fa"
import { RiEyeFill } from "react-icons/ri"
import { useImage } from "./ImageContext"
import useStore from "../store";
import { tInputImage } from "./ImageType"

type tImage = {
    id: string,
    name: string,
    isArray: boolean,
    file: File | File[] | undefined;
    // thumbnail?: File;
    index?: number;
    key?: any;
}
const ImageInput = ({id, name, file, index, isArray, ...props}:tImage) => {
    // console.log(`${name}${index}`)
    // index = index && 0;
    const { withThumbnail, handleFunction, thumbnail } = useImage();
    return <>
            {
                (thumbnail && thumbnail === `${name}${!isNaN(index as number) ? index : 0}`) &&
                <label className="absolute z-99 bg-azure-700 text-white top-2 right-2 text-xs px-2 py-1 rounded-md">
                    Thumbnail
                </label>
            }
            <div {...props} className="absolute group inset-0 hover:bg-[#00000099] z-9 flex items-center justify-center gap-4">
                <div className="opacity-0 group-hover:opacity-100 bg-white py-2 ">
                {withThumbnail ? (
                    <button
                    name={name}
                    type="button"
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        console.log(!isNaN(index as number))
                        if(handleFunction.setThumbnail && file)
                            handleFunction.setThumbnail(`${name}${!isNaN(index as number) ? index : 0}`)
                    }}
                    title="Jadikan Thumbnail"
                    className="flex items-center gap-2 border-b-2 border-gray py-1 px-3 w-full text-sm"
                    >
                        <RiEyeFill className="text-azure-900" /> Jadikan Thumbnail
                    </button>
                ) : (
                    ""
                )}
                <button
                    name={name}
                    data-key={index}
                    type="button"
                    onClick={!isArray ? handleFunction.deleteSingle : handleFunction.deleteMulti}
                    title="Hapus Gambar"
                    className="flex items-center gap-2 py-1 px-3 w-full text-sm"
                >
                    <FaTrashAlt className="text-danger" /> Hapus Foto
                </button>
                </div>
            </div>
            {
                file instanceof File  ? <Image
                        src={URL.createObjectURL(file)}
                        fill={true}
                        style={{ objectFit: "cover" }}
                        alt="Thumbnail"
                    />
                : ''

            }
            
        </>
}

export default ImageInput;