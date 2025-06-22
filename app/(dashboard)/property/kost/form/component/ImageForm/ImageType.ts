import { tImage as tImageState } from "../FormType";
export type tInputImage = {
  id: string;
  name: keyof tImageState;
  title: string;
  desc: string;
  file?: File | File[] | undefined;
  isArray?: boolean;
};

export type tImage = {
  title: string;
  desc: string;
  firstImage: File | undefined;
  firstImageId: string;
  firstImageName: keyof tImageState;
  firstImageTitle: string;
  firstImageDesc: string;
  secondImage: File[] | undefined;
  secondImageId: string;
  secondImageName: keyof tImageState;
  secondImageTitle: string;
  secondImageDesc: string;
  thirdImage: File | undefined;
  thirdImageId: string;
  thirdImageName: keyof tImageState;
  thirdImageTitle: string;
  thirdImageDesc: string;
  thumbnail?: File | undefined;
};
