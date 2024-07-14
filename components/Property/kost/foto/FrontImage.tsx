import File from "@/components/Form/CustomFile";
import Image from "next/image";
import { memo, useState } from "react";

const FrontImage = memo(function FrontImage({
  file,
  callback,
  label,
}: {
  file: File | string;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) {
  const [image, setImage] = useState<string>("/img/empty-img.jpg");
  // console.log(file);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
      callback(e);
    }
  };
  return (
    <div className="mb-8">
      <File
        onChange={handleChange}
        name="front_image"
        label={label}
        id="tampakDepan"
        accept=".png,.jpeg,.jpg"
      />
      <Image
        // src={typeof file === "string" ? file : URL.createObjectURL(file)}
        src={image}
        width={500}
        height={500}
        alt="Thumbnail"
        className="my-4"
      />
    </div>
  );
});

export default FrontImage;
