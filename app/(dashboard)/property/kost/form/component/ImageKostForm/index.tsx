'use client'
import ImageForm from "../ImageForm"
import useStore from "../store";
import { useForm } from "../FormHook";
import { ImageContext } from '../ImageForm/ImageContext';

const ImageKostForm = () => {
    const { handleInputFile, handleInputMultiFile } = useForm();
    const image  = useStore(store => store.state.image);
    const dispatch  = useStore(store => store.dispatch);

    const value = {
      withThumbnail: false,
      handleFunction:{
        single: handleInputFile,
        multi: handleInputMultiFile,
        deleteSingle: (e:React.MouseEvent<HTMLButtonElement>) => {
          const name = e.currentTarget.name as 'first_image' | 'third_image';
          dispatch({
            type: "SET_FIELD",
            field: name,
            value: undefined,
            param: 'image',
          });
        },
        deleteMulti: (e:React.MouseEvent<HTMLButtonElement>) => {
          const name = e.currentTarget.name as 'second_image';
          const index = e.currentTarget?.getAttribute('data-key') ?? 0 as number;
          console.log(index)
          dispatch({
            type: "SET_FIELD",
            field: name,
            value: image[name]?.filter((v, i) => i != index),
            param: 'image',
          });
        },
      }
    };
    return <ImageContext.Provider value={value}>
            <ImageForm 
                title="Pasang Foto Kost terbaik anda" 
                desc="Foto yang menarik akan menjadi perhatian bagi penyewa kost"
                firstImage={image.first_image}
                firstImageId="firstImage"                            
                firstImageName="first_image"
                firstImageTitle="Foto Kost Tampak Depan"
                firstImageDesc="Foto horizontal akan terlihat lebih bagus sebagai foto utama kost anda"
                secondImage={image.second_image}
                secondImageId="insideImage"
                secondImageName="second_image"
                secondImageTitle="Foto Kost Tampak Dalam (Max 3)"
                secondImageDesc="Perhatikan suasana di dalam kost, gunakan penerangan yang baik agar gambar terlihat lebih jelas"
                thirdImage={image.third_image}
                thirdImageId="streetImage"
                thirdImageName="third_image"
                thirdImageTitle="Foto Kost Tampak Jalan"
                thirdImageDesc="Foto ini menunjukan keadaan lingkungan kost anda, pastikan foto dapat mewakili keadaan di sekitar"
            />
        </ImageContext.Provider>
}

export default ImageKostForm;