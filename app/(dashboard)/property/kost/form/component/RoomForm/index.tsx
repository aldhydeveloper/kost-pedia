'use client'
import useStore from '../store';
import RoomCard from './RoomCard';
import useRoom from "./RoomHook";
import Button from "@/components/Utility/CustomButton";

const RoomFrom = () => {
    const { handleAddRoom } = useRoom();
    const rooms = useStore(s => s.state.rooms);
    return <>
        {
            rooms.map((v, i) => <RoomCard
              key={i}
              index={i}
            />)   
        }
        
        <Button
          type="button"
          onClick={handleAddRoom}
        >
          Tambah Kamar
        </Button>
    </>
}

export default RoomFrom;