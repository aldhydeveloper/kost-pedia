'use client'
import useStore from '../store';
import Input from "@/components/Form/CustomInput"
import Textarea from "@/components/Form/CustomTextarea"
import InputNumeric from "@/components/Form/CustomInputNumeric";
import useRoom from "./RoomHook";
import { FaTrashAlt } from "react-icons/fa";
import Switch from "react-switch";
import ImageForm from "../ImageForm";
import RoomFacilities from "./RoomFaclitlies";
import { ImageContext } from '../ImageForm/ImageContext';

type tRoomCard = {
    index: number;
}
const RoomCard = ({index}: tRoomCard) => {
    const rooms = useStore(s => s.state.rooms[index]);
    const { handleChange, handleChangeNumeric, handleChangeFile, handleChangeFileMulti, handleDeleteRooms, handleDeleteImage, handleDeleteImageMulti, handleStatusRoom, setThumbnail} = useRoom();
    const value = {
        withThumbnail: true,
        thumbnail: rooms.thumbnail,
        handleFunction:{
        single: (e:React.ChangeEvent<HTMLInputElement>) => {
            handleChangeFile(e, index)
        },
        multi: (e:React.ChangeEvent<HTMLInputElement>) => {
            handleChangeFileMulti(e, index)
        },
        deleteSingle: (e:React.MouseEvent<HTMLButtonElement>) => {
            handleDeleteImage(e, index)
        },
        deleteMulti: (e:React.MouseEvent<HTMLButtonElement>) => {
            handleDeleteImageMulti(e, index)
        },
        setThumbnail:(file:string) => {
            setThumbnail(file, index)
        }
    }
    };
    // console.log(rooms.front_image_room)
    return <ImageContext.Provider value={value}>
      <div className="mb-14 relative">
        <div className="flex gap-4 items-center absolute -top-2 right-15">
          <span>Non Aktif</span>

          <Switch
            onChange={(checked:boolean) => {
                handleStatusRoom(checked, index)
            }}
            checked={rooms.active}
          />
          <span>Aktif</span>
        </div>
        {
            index > 0 && (
                <button
                    data-index={index}
                    type="button"
                    className="absolute right-0 -top-2 bg-danger text-white p-2 rounded-sm text-sm"
                    onClick={handleDeleteRooms}
                >
                    <FaTrashAlt />
                </button>
            ) 
        }
        <Input
            data-index={index}
            name="type_name"
            label="Nama Type Kamar"
            value={rooms.type_name}
            onChange={handleChange}
        />
        <Textarea
            data-index={index}
            name="desc"
            label="Deskripsi"
            value={rooms.desc}
            onChange={handleChange}
        />
        <label className="mb-2 inline-block">Ukuran Kamar</label>
        <div className="flex items-center justify-start gap-4 mb-6">
            <Input
            data-index={index}
            type="number"
            name="p"
            className="max-w-[100px]"
            value={rooms.p}
            onChange={handleChange}
            />
            X
            <Input
            data-index={index}
            type="number"
            name="l"
            className="max-w-[100px]"
            value={rooms.l}
            onChange={handleChange}
            />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
            <InputNumeric
            name="price"
            value={rooms.price}
            label="Harga Bulanan"
            onChange={(values) => {
                handleChangeNumeric(
                values.floatValue,
                index,
                'price'
                );
            }}
            />
            <InputNumeric
            name="price_year"
            value={rooms.price_year}
            label="Harga Tahunan"
            onChange={(values) => {
                handleChangeNumeric(
                values.floatValue,
                index,
                'price_year'
                );
            }}
            />
        </div>
        <div className="mb-8">
          <RoomFacilities index={index}  />
        </div>
        <ImageForm 
            title="" 
            desc=""
            firstImage={rooms.front_image_room}                            
            firstImageId={`firstImage${index}`}                           
            firstImageName="front_image_room"
            firstImageTitle="Foto Kamar Tampak Luar"
            firstImageDesc="Foto dalam kamar dengan cahaya yang terang dan jelas"
            secondImage={rooms.inside_image_room}     
            secondImageId={`insideImage${index}`}
            secondImageName="inside_image_room"
            secondImageTitle="Foto Kamar Tampak Dalam"
            secondImageDesc="Foto dalam kamar dengan cahaya yang terang dan jelas"
            thirdImage={rooms.bath_image_room}     
            thirdImageId={`streetImage${index}`}
            thirdImageName="bath_image_room"
            thirdImageTitle="Foto Kamar Mandi"
            thirdImageDesc="Foto kondisi kamar mandi di dalam kamar yang akan digunakan oleh penyewa kost"
        />
        
    </div>
    </ImageContext.Provider>
}

export default RoomCard;