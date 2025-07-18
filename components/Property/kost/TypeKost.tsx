import Input from "@/components/Form/CustomInput";
import Button from "@/components/Utility/CustomButton";
import InputNumeric from "@/components/Form/CustomInputNumeric";
import Switch from "react-switch";
import { memo, useEffect } from "react";
import FotoKost, { tFoto, tFile } from "./FotoKost";
import { tFacility, iFacilities } from "./FacilitiesKost";
import { Facilities } from "@/service";
import Checkbox from "@/components/Checkboxes/Checkbox";
import Textarea from "@/components/Form/CustomTextarea";
import { FaTrashAlt } from "react-icons/fa";
import collect from "collect.js";
// type tFoto = {
//   front_image: string | File;
//   inside_image: string[] | FileList;
//   street_image: string | File;
// };
type tRooms = {
  id: string | null;
  status: boolean;
  room_type_name: string;
  p: number;
  l: number;
  desc: string;
  front_image: string | File;
  inside_image: (string | File)[];
  street_image: string | File;
  price: number | string;
  price_year: number | string;
  thumbnail?: string;
  facilities: {
    rooms: number[];
    bath: number[];
  };
  [key: string]: any;
};
type tType = {
  typeKost: tRooms[];
  callback: (v: tRooms[]) => void;
  index?: number;
  [key: string]: any;
};
const dataRooms = {
  id: null,
  status: true,
  room_type_name: "",
  p: 0,
  l: 0,
  desc: "",
  front_image: "",
  inside_image: [],
  street_image: "",
  price: 0,
  price_year: 0,
  thumbnail: "",
  thumbnail_url: "",
  facilities: {
    rooms: [],
    bath: [],
  },
};
const RoomsComp = memo(function RoomsComp({
  handleChangeRooms,
  handleDeleteRooms,
  rooms,
  index,
  dataFacilities,
}: {
  handleChangeRooms: (rooms: tRooms, index: number | undefined | "") => void;
  handleDeleteRooms: (index: number) => void;
  rooms: tRooms;
  index: number;
  dataFacilities: tFacility[];
}) {
  // const [Rooms, setRooms] = useState<tRooms>(rooms);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // console.log(rooms);
    // setRooms({ ...Rooms, [e.target.name]: e.target.value });
    // handleChangeRooms([...rooms, Rooms]);
    const index = e.target.dataset.index && parseInt(e.target.dataset.index);
    // console.log(index);
    handleChangeRooms({ ...rooms, [e.target.name]: e.target.value }, index);
  };

  const handleChangeSwitch = (index: number) => {
    handleChangeRooms({ ...rooms, status: !rooms.status }, index);
  };
  return (
    <>
      <div className="mb-10 relative">
        <div className="flex gap-4 items-center absolute -top-2 right-15">
          <span>Non Aktif</span>

          <Switch
            onChange={() => {
              handleChangeSwitch(index);
            }}
            checked={rooms.status}
          />
          <span>Aktif</span>
        </div>
        {index > 0 ? (
          <button
            type="button"
            className="absolute right-0 -top-2 bg-danger text-white p-2 rounded-sm text-sm"
            onClick={() => {
              handleDeleteRooms(index);
            }}
          >
            <FaTrashAlt />
          </button>
        ) : (
          ""
        )}
        <Input
          data-index={index}
          name="room_type_name"
          label="Nama Type Kamar"
          value={rooms.room_type_name}
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
        <div className="mb-8">
          <label className="mb-3 block">Fasilitas Kamar</label>
          <ul id={`list-${index}`} className="grid grid-cols-2 gap-2 mb-8">
            {dataFacilities &&
              dataFacilities
                .filter((v) => v.type == 2)
                .map((v: tFacility, i: number) => {
                  return (
                    <li key={i}>
                      <Checkbox
                        data-index={index}
                        id={`${index}-${v.id}`}
                        name="rule"
                        value={v.id}
                        label={v.name}
                        checked={rooms.facilities.rooms.includes(
                          parseInt(v.id)
                        )}
                        onChange={(e) => {
                          const target = e.target;
                          // const newRule = facilities.map((v: iRule) => {
                          const index =
                            target.dataset.index &&
                            parseInt(target.dataset.index);
                          const val = parseInt(target.value);
                          let temp: number[] = [];
                          if (target.checked) {
                            temp = [...rooms.facilities.rooms, val];
                            // temp.push(val);
                            // console.log("checked", temp);
                          } else {
                            temp = rooms.facilities.rooms.filter(
                              (id) => id !== val
                            );
                          }
                          // console.log(target.dataset);
                          handleChangeRooms(
                            {
                              ...rooms,
                              facilities: { ...rooms.facilities, rooms: temp },
                            },
                            index
                          );
                          // setChecked(temp);
                          // handleChangeChoose(temp);
                        }}
                      />
                    </li>
                  );
                })}
          </ul>
          <label className="mb-3 block">Fasilitas Kamar Mandi</label>
          <ul id={`list-${index}`} className="grid grid-cols-2 gap-2 mb-8">
            {dataFacilities &&
              dataFacilities
                .filter((v) => v.type == 3)
                .map((v: tFacility, i: number) => {
                  return (
                    <li key={i}>
                      <Checkbox
                        data-index={index}
                        id={`${index}-${v.id}`}
                        name="rule"
                        value={v.id}
                        label={v.name}
                        checked={rooms.facilities.bath.includes(parseInt(v.id))}
                        onChange={(e) => {
                          const target = e.target;
                          // const newRule = facilities.map((v: iRule) => {
                          const index =
                            target.dataset.index &&
                            parseInt(target.dataset.index);
                          const val = parseInt(target.value);
                          let temp: number[] = [];
                          if (target.checked) {
                            temp = [...rooms.facilities.bath, val];
                            // temp.push(val);
                            // console.log("checked", temp);
                          } else {
                            temp = rooms.facilities.bath.filter(
                              (id) => id !== val
                            );
                          }
                          // console.log(target.dataset);
                          handleChangeRooms(
                            {
                              ...rooms,
                              facilities: { ...rooms.facilities, bath: temp },
                            },
                            index
                          );
                          // setChecked(temp);
                          // handleChangeChoose(temp);
                        }}
                      />
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <InputNumeric
            name="price"
            value={rooms.price}
            label="Harga Bulanan"
            onChange={(values) => {
              handleChangeRooms(
                { ...rooms, price: parseInt(values.floatValue) },
                index
              );
            }}
          />
          <InputNumeric
            name="price_year"
            value={rooms.price_year}
            label="Harga Tahunan"
            onChange={(values) => {
              handleChangeRooms(
                { ...rooms, price_year: parseInt(values.floatValue) },
                index
              );
            }}
          />
        </div>
        <FotoKost
          firstImageID={`frontImage${index}`}
          secondImageID={`insideImage${index}`}
          thirdImageID={`bathImage${index}`}
          data-index={index}
          foto={rooms}
          hasThubmnail={true}
          firstImageLabel="Foto Kamar Tampak Luar"
          secondImageLabel="Foto Kamar Tampak Dalam"
          thirdImageLabel="Foto Kamar Mandi"
          noteFirstImage="Foto bagian depan kamar dengan pencahayaan yang jelas"
          noteSecondImage="Foto dalam kamar dengan cahaya yang terang dan jelas"
          noteThirdImage="Foto kondisi kamar mandi di dalam kamar yang akan digunakan oleh penyewa kost"
          handleFotoKost={(name: string, value: tFile) => {
            handleChangeRooms({ ...rooms, [name]: value }, index);
            // setRooms({ ...Rooms, [name]: value });
          }}
        />
      </div>
    </>
  );
});
const TypeKost = memo(function TypeKost({
  dataFacilities,
  handleDataFacilities,
  typeKost,
  callback,
  isSingle = false,
}: tType & iFacilities & { isSingle?: boolean }) {
  // console.log(typeKost);
  // const [listRooms, setListRooms] = useState<tRooms[]>([]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //   const temp = typeKost.map((v, index) => {
  //     // console.log(index);
  //     // console.log(i);
  //     if (i === index) {
  //       return { ...v, [e.target.name]: e.target.value };
  //     } else {
  //       return v;
  //     }
  //   });
  //   callback(temp);
  // };
  // const handleChangeRooms = (rooms: tRooms[]) => {
  //   callback(rooms);
  // };

  const handleChangeRooms = (rooms: tRooms, index: number | undefined | "") => {
    const temp = typeKost.map((v, i) => {
      if (i === index) {
        return rooms;
      } else {
        return v;
      }
    });
    // const temp = [...typeKost, rooms];
    // console.log(typeKost[index as number]);
    callback(temp);
  };

  useEffect(() => {
    // console.log(handleDataFacilities);
    if (dataFacilities.length === 0) {
      Facilities("all").then((resp) => {
        // console.log(resp);
        if (resp.success) {
          const temp = resp.data.map((v: tFacility) => {
            return { ...v, chekced: false };
          });
          // setFacilitiesList(temp);
          handleDataFacilities(temp);
        }
      });
    }
  }, [dataFacilities, handleDataFacilities]);
  // console.log(typeKost);
  return (
    <div className="mb-10">
      {typeKost.map((v, i) => {
        return (
          <div key={i}>
            <RoomsComp
              dataFacilities={dataFacilities}
              rooms={v}
              handleChangeRooms={handleChangeRooms}
              handleDeleteRooms={(index: number) => {
                const collection = collect(typeKost);
                const filtered = collection
                  .filter((value: any, key: number) => key !== index)
                  .all();
                // console.log(rooms);
                // console.log(filtered);
                callback(filtered);
              }}
              index={i}
            />
            <div className="w-full bg-azure-300 h-2 rounded-full my-7" />
          </div>
        );
      })}
      {!isSingle && (
        <Button
          type="button"
          onClick={() => {
            const temp = [...typeKost, dataRooms];
            // temp.push(dataRooms);
            callback(temp);
            // console.log(temp);
          }}
        >
          Tambah Kamar
        </Button>
      )}
    </div>
  );
});

export default TypeKost;
export type { tRooms };
export { dataRooms };
