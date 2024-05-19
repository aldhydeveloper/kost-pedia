interface iRooms {
  name: string;
  size: {
    p: number;
    l: number;
  };
}
interface iProps {
  roomType: iRooms;
  setRoomType: React.Dispatch<React.SetStateAction<iRooms>>;
}
import Input from "@/components/Form/CustomInput";
export default function roomType({ roomType, setRoomType }: iProps) {
  return (
    <>
      <Input
        type="text"
        name="type_room"
        label="Nama Type Kamar"
        value={roomType.name}
        onChange={({ target }) =>
          setRoomType({ ...roomType, name: target.value })
        }
      />
      <label className="mb-2 inline-block">Ukuran Kamar</label>
      <div className="flex items-center justify-start gap-4">
        <Input
          type="text"
          name="p_room"
          className="max-w-[100px]"
          value={roomType.size.p}
          onChange={({ target }) =>
            setRoomType({
              ...roomType,
              size: {
                ...roomType.size,
                p: !isNaN(parseInt(target.value)) ? parseInt(target.value) : 0,
              },
            })
          }
        />
        X
        <Input
          type="text"
          name="l_room"
          className="max-w-[100px]"
          value={roomType.size.l}
          onChange={({ target }) =>
            setRoomType({
              ...roomType,
              size: {
                ...roomType.size,
                l: !isNaN(parseInt(target.value)) ? parseInt(target.value) : 0,
              },
            })
          }
        />
      </div>
    </>
  );
}
