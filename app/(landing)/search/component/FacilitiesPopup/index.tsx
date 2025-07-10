import { useEffect, useRef, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Checkbox from '@/components/Checkboxes/Checkbox';
import { useSearchParams, useRouter } from 'next/navigation'
import Get from '@/service/get';

type tListFacilities = {
    id: number;
    name: string;
    type: number;
}
type tFacilities = {
    room_facilities: number[];
    bath_facilities: number[];
}
const initialFacilities = {
        room_facilities: [],
        bath_facilities: []
    }
const FacilitiesPopup = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const room_facilities = searchParams.get('room_facilities') ? JSON.parse(atob(searchParams.get('room_facilities') as string)) : [];
    const bath_facilities = searchParams.get('bath_facilities') ? JSON.parse(atob(searchParams.get('bath_facilities') as string)) : [];

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [listFacilities, setListFacilities] = useState<tListFacilities[]>([]);
    const [facilities, setFacilities] = useState<tFacilities>({
        room_facilities: room_facilities,
        bath_facilities: bath_facilities
    });
    // const [bath_facilities, setBathFacilities] = useState<number[]>([]);

    const onChangeFacilities = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof tFacilities;
        const val = parseInt(e.target.value) as number;
        let newValue = e.target.checked ? [...facilities[name], val] : facilities[name].filter(v => v !== val);
        // console.log(newValue)
        setFacilities(prev => ({...prev, [name]: newValue}))
        
    }

    const onSave = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('room_facilities', btoa(JSON.stringify(facilities.room_facilities)));
        params.set('bath_facilities', btoa(JSON.stringify(facilities.bath_facilities)));
        setOpenModal(false)
        router.push(`/search?${params.toString()}`);
    }
    useEffect(() => {
        
        const getDataFacilities = async () => {
            const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/facilities`);
            if(resp.success){
                setListFacilities(resp.data);
            }
        }
        getDataFacilities()

    }, []);
    // console.log(facilities)
    return <div className="relative">
        <button className="border border-stroke rounded-full py-2 px-8 w-full" onClick={() => setOpenModal(true)}>Fasilitas</button>
        <Modal open={openModal} onClose={() => {setOpenModal(false); setFacilities(initialFacilities)}}  center>
            <div className="border-b py-4 mb-5">
                <h1 className="text-xl font-semibold text-center">Fasilitas</h1>
            </div>
            <h2 className="mb-3">Fasilitas Kamar</h2>
            <ul className="grid grid-cols-2 gap-2 mb-8">
            {listFacilities.length > 0 && listFacilities
                .filter((v:tListFacilities) => v.type === 2)
                .map((v) => (
                <li key={v.id}>
                    <Checkbox
                    id={`check${v.id}`}
                    value={v.id}
                    label={v.name}
                    name="room_facilities"
                    data-param="room_facilities"
                    checked={facilities.room_facilities.includes(v.id)}
                    onChange={onChangeFacilities}
                    />
                </li>
                ))}
            </ul>
            <h2 className="mb-3">Fasilitas Kamar Mandi</h2>
            <ul className="grid grid-cols-2 gap-2 mb-8">
            {listFacilities.length > 0 && listFacilities
                .filter((v:tListFacilities) => v.type === 3)
                .map((v) => (
                <li key={v.id}>
                    <Checkbox
                    id={`check${v.id}`}
                    value={v.id}
                    label={v.name}
                    name="bath_facilities"
                    data-param="bath_facilities"
                    checked={facilities.bath_facilities.includes(v.id)}
                    onChange={onChangeFacilities}
                    />
                </li>
                ))}
            </ul>
            <div className="flex align-items-center justify-between border-t pt-4">
                <button className="border border-e-form-strokedark rounded-md px-5 py-1 text-sm" onClick={() => {setFacilities(initialFacilities); setOpenModal(false);}}>Batal</button>
                <button className="border border-azure-500 bg-azure-500 text-white rounded-md px-5 py-1" onClick={onSave}>Simpan</button>
            </div>
      </Modal>
    </div>
}

export default FacilitiesPopup;