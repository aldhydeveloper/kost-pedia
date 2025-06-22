"use client";
import NumberFormat from "react-number-format";
import { tKost, tAddress, tImage } from "./FormType";
import useStore, { FormState } from "./store";
import Send from "@/service/Send";

type tParam = keyof Omit<FormState, "step" | "submited">;

export const useForm = () => {
  const state = useStore((s) => s.state);
  const dispatch = useStore((s) => s.dispatch);
  const dispactInput = (
    name: keyof tKost | keyof tImage,
    value: any,
    param: tParam
  ) => {
    dispatch({
      type: "SET_FIELD",
      field: name,
      value: !isNaN(value) ? parseInt(value) : value,
      param: param,
    });
  };

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispactInput(
      e.target.name as keyof tKost,
      e.target.value,
      e.target.getAttribute("data-param") as tParam
    );
  };

  const handleInputFormatNumber = (
    values: NumberFormat.NumberFormatValues,
    name: keyof tKost,
    param: tParam
  ) => {
    dispactInput(name, values.floatValue as number, param);
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: number[]
  ) => {
    const target = e.target;
    const val = parseInt(target.value);
    const param = e.target.getAttribute("data-param") as tParam;
    const name = e.target.name as keyof tKost | keyof tAddress;
    let temp: number[] = [];
    // if(Array.isArray(state[param][name])){
    if (target.checked) {
      temp = [...state, val];
    } else {
      temp = state.filter((id: number) => id !== val);
    }

    // }
    dispactInput(e.target.name as keyof tKost, temp, param);
  };

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    const param = e.target.getAttribute("data-param") as tParam;
    const name = e.target.name as keyof tImage;

    dispactInput(name, file, param);
  };

  const handleInputMultiFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.getAttribute("data-param") as "image";
    const name = e.target.name as keyof tImage;

    if (Array.isArray(state[param][name])) {
      const file = e.target.files
        ? Array.isArray(e.target.files[0])
          ? e.target.files[0]
          : [e.target.files[0]]
        : [];
      // console.log(file);
      const newValue = [...(state[param][name] as File[]), file];
      // console.log(newValue);
      dispatch({
        type: "SET_FIELD",
        field: name,
        value: newValue,
        param: param,
      });
    }
  };

  const submitForm = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    dispatch({
      type: "SUBMITED",
      value: true,
    });

    const formData = new FormData();

    const first_image = state.image.first_image;
    const second_image = state.image.second_image;
    const third_image = state.image.third_image;

    if (first_image) formData.append("front_image_kost", first_image);

    if (second_image && second_image.every((item) => item instanceof File)) {
      second_image.forEach((v, i) => {
        formData.append(`inside_image_kost`, v);
      });
    }

    if (third_image) formData.append("street_image_kost", third_image);

    state.rooms.forEach((v, i) => {
      const first_image = v.first_image;
      const second_image = v.second_image;
      const third_image = v.third_image;

      if (first_image) formData.append(`front_image_room${i}`, first_image);

      if (second_image && second_image.every((item) => item instanceof File)) {
        second_image.forEach((v) => {
          formData.append(`inside_image_room${i}`, v);
        });
      }

      if (third_image) formData.append(`bath_image_room${i}`, third_image);
    });

    const respUpload = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((resp) => resp.url_image);
    // console.log(respUpload);

    const rooms = state.rooms.map((v, i) => {
      let thumbnail: string = "";
      if (respUpload) {
        for (const name in respUpload) {
          // console.log(respUpload[i]);
          respUpload[name].some((url: string, i: number) => {
            thumbnail = url;
            return `${name}${i}` == v.thumbnail;
          });

          if (thumbnail) {
            break;
          }
        }
      }
      // console.log(thumbnail);
      // return {
      //     id: v.id,
      //     name: v.room_type_name,
      //     room_size: `${v.p}x${v.l}`,
      //     desc: v.desc,
      //     price: v.price,
      //     price_year: v.price_year,
      //     room_facilities: v.facilities.rooms,
      //     bath_facilities: v.facilities.bath,
      //     // front_image: front_image,
      //     // inside_image: inside_image,
      //     // bath_image: bath_image,
      //     status: v.status,
      //     thumbnail: v.thumbnail ?? v.thumbnail_url,
      //   };
      return {
        id: "",
        name: v.type_name,
        room_size: `${v.p}x${v.l}`,
        desc: v.desc,
        price: v.price,
        price_year: v.price_year,
        front_image: respUpload[`front_image_room${i}`]
          ? respUpload[`front_image_room${i}`].join("")
          : null,
        inside_image: respUpload[`inside_image_room${i}`] && [],
        bath_image: respUpload[`bath_image_room${i}`]
          ? respUpload[`bath_image_room${i}`].join("")
          : null,
        thumbnail: thumbnail,
      };
    });

    // console.log(respUpload);
    const req = {
      ...state.kost,
      ...state.address,
      kost_facilities: state.facilities.value,
      front_image: respUpload.front_image_kost
        ? respUpload.front_image_kost.join("")
        : null,
      inside_image: respUpload.inside_image_kost && [],
      street_image: respUpload.street_image_kost
        ? respUpload.street_image_kost.join("")
        : null,
      rooms: rooms,
    };
    // dispatch({
    //   type: "SUBMITED",
    //   value: false,
    // });
    // console.log(req);
    return await Send(
      `${process.env.NEXT_PUBLIC_API_HOST}/kost/${
        !id ? "createWithRooms" : `updateWithRooms/${id}`
      }`,
      !id ? "Post" : "Put",
      req
    );
  };

  return {
    handleInput,
    handleInputFile,
    handleInputMultiFile,
    handleInputFormatNumber,
    handleCheckbox,
    submitForm,
  };
};
