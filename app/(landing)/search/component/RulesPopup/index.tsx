import { useEffect, useRef, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Checkbox from '@/components/Checkboxes/Checkbox';
import { useSearchParams, useRouter } from 'next/navigation'
import Get from '@/service/get';

type tListRules = {
    id: number;
    name: string;
}
const RulesPopup = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [listRules, setListRules] = useState<tListRules[]>([]);
    const [rules, setRules] = useState<number[]>([]);

    const onChangeRules = (e:React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value) as number;
        let newValue = e.target.checked ? [...rules, val] : rules.filter(v => v !== val);
        setRules(newValue)
    }
    
    const onSave = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('rules', btoa(JSON.stringify(rules)));
        setOpenModal(false)
        router.push(`/search?${params.toString()}`);
    }
    useEffect(() => {
        
        const getDataRules = async () => {
            const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/rules`);
            if(resp.success){
                setListRules(resp.data);
            }
        }
        getDataRules()

    }, []);
    // console.log(listFacilities.current)
    return <div className="relative">
        <button className="border border-stroke rounded-full py-2 px-8 w-full" onClick={() => setOpenModal(true)}>Peraturan</button>
        <Modal open={openModal} onClose={() => {setOpenModal(false); setRules([])}}  center>
            <div className="border-b py-4 mb-5">
                <h1 className="text-xl font-semibold text-center">Peraturan</h1>
            </div>
            <h2 className="mb-3">Peraturan Kost</h2>
            <ul className="grid grid-cols-2 gap-2 mb-8">
            {listRules.length > 0 && listRules
                .map((v) => (
                <li key={v.id}>
                    <Checkbox
                    id={`check${v.id}`}
                    value={v.id}
                    label={v.name}
                    name="rules"
                    data-param="rules"
                    checked={rules.includes(v.id)}
                    onChange={onChangeRules}
                    />
                </li>
                ))}
            </ul>
            <div className="flex align-items-center justify-between border-t pt-4">
                <button className="border border-e-form-strokedark rounded-md px-5 py-1 text-sm" onClick={() => {setRules([]); setOpenModal(false);}}>Batal</button>
                <button className="border border-azure-500 bg-azure-500 text-white rounded-md px-5 py-1" onClick={onSave}>Simpan</button>
            </div>
      </Modal>
    </div>
}

export default RulesPopup;