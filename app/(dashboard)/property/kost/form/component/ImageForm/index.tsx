'use client'
import ImageCard from "./ImageCard";
import { tImage } from "./ImageType";

const ImageForm = ({
        title,
        desc,
        firstImage,
        firstImageId,
        firstImageName,
        firstImageTitle,
        firstImageDesc,
        secondImage,
        secondImageId,
        secondImageName,
        secondImageTitle,
        secondImageDesc,
        thirdImage,
        thirdImageId,
        thirdImageName,
        thirdImageTitle,
        thirdImageDesc,
        thumbnail
    }:tImage) => {
            
    return <>
        <div className="mb-6">
            <h2 className="mb-0 leading-4 text-lg font-bold">
                {title}
            </h2>
            <small>
                {desc}
            </small>
        </div>
        <ImageCard
            file={firstImage}
            id={firstImageId}
            name={firstImageName}
            title={firstImageTitle}
            desc={firstImageDesc}
        />
        
         <ImageCard
            file={secondImage}
            id={secondImageId}
            name={secondImageName}
            title={secondImageTitle}
            desc={secondImageDesc}
        />
        
        <ImageCard
            file={thirdImage}
            id={thirdImageId}
            name={thirdImageName}
            title={thirdImageTitle}
            desc={thirdImageDesc}
        />
    </>
}

export default ImageForm;