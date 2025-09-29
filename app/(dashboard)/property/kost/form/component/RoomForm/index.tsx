'use client'
import useStore from '../store';
import HeaderForm from '../Untility/HeaderForm';
import RoomCard from './RoomCard';
import useRoom from "./RoomHook";
import Button from "@/components/Utility/CustomButton";
import { FaRegClone  } from "react-icons/fa";

const RoomFrom = () => {
    const { handleAddRoom } = useRoom();
    const rooms = useStore(s => s.state.rooms);
    return <>
      <HeaderForm title="Fasilitas Kost" desc={<>Silahkan tambahkan <strong>Type Kamar</strong> Anda yang lengkap untuk menunjang kebutuhan penyewa kost.</>} Icon={FaRegClone} />
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