'use client'
import SelectProvince from './SelectProvince';
import InputAddress from './InputAddress';
import SelectCity from './SelectCity';
import SelectDistrict from './SelectDistrict';
import SelectVillage from './SelectVillage';
import HeaderForm from '../Untility/HeaderForm';

import { FaMapLocationDot  } from "react-icons/fa6";
const Address = () => {
    return <>
    <HeaderForm title="Alamat Kost" desc={<>Silahkan Lengkapi data <strong>Alamat Kost</strong> Anda, untuk memudahkan penyewa mengetahui lokasi kost anda</>} Icon={FaMapLocationDot} />
    <div className="grid grid-cols-2 gap-8">
        <div>
            <InputAddress name="address" param="address" label="Alamat Kost" />
            <div className="grid grid-cols-2 gap-4 mt-2 pt-1">
                <SelectProvince />
                <SelectCity />
                <SelectDistrict />
                <SelectVillage />
            </div>
        </div>
        <InputAddress name="address_note" param="address" label="Catatan Kost (Optional)" rows={6} />
    </div>
    </>
}

export default Address;