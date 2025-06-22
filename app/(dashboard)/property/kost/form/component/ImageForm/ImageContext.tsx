'use client'
import { createContext, useState, useContext } from 'react';
import { tInputImage } from './ImageType';

type tImage = {
  handleFunction:{
    single:  (e:React.ChangeEvent<HTMLInputElement>) => void,
    multi:  (e:React.ChangeEvent<HTMLInputElement>) => void,
    deleteSingle:  (e:React.MouseEvent<HTMLButtonElement>) => void,
    deleteMulti:  (e:React.MouseEvent<HTMLButtonElement>) => void,
    setThumbnail?: (file:string, index?: number) => void
  }
  withThumbnail?: boolean;
  thumbnail?: string;
}

// const initialState = {
//   withThumbnail: false
// };
export const ImageContext = createContext<tImage | undefined>(undefined);

// export ImageContext;
// export const ImageProvider = ({children}:{children:React.ReactNode}) => {
//     const [imageValue, setImageValue] = useState<tImage>(initialState);

//     const value = {
//         imageValue, setImageValue
//     };
//     return <ImageContext.Provider value={value}>
//         {children}
//     </ImageContext.Provider>
// }

export const useImage = () => {
  const ctx = useContext(ImageContext);
  if (!ctx) throw new Error('useLogger must be used within ImageProvider');
  return ctx;
};