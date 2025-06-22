'use client'
import { FaPlusCircle } from "react-icons/fa";
import useStore from "../store";
import { useImage } from "./ImageContext";
import { tInputImage } from './ImageType'

type tFileInput = {
    id: string;
    name: string;
    isArray: boolean;
}
const ImageInput = ({id, name, isArray}:tFileInput) => {
  const { handleFunction  } = useImage();
  // const dispatch = useStore(store => store.dispatch)
          return (
            <label
              htmlFor={id}
              className="w-full flex items-center justify-center border-2 text-azure-600 rounded-md border-azure-600 h-full"
            >
              <input
                type="file"
                name={name}
                id={id}
                data-param="image"
                className="sr-only"
                accept=".png,.jpg,.jpeg"
                onChange={!isArray ? handleFunction.single : handleFunction.multi}
                // onChange={!isArray ? handleInputFile : handleInputMultiFile}
              />
              <FaPlusCircle /> Tambah Foto
            </label>
          );
}

export default ImageInput;