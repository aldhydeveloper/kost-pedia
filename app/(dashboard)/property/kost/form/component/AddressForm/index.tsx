'use client'
import SelectProvince from './SelectProvince';
import InputAddress from './InputAddress';
import SelectCity from './SelectCity';
import SelectDistrict from './SelectDistrict';
import SelectVillage from './SelectVillage';
import SelectSubCity from './SelectSubCity';
const Address = () => {
    return <>
        <InputAddress name="address" param="address" label="Alamat" />
        <InputAddress name="address_note" param="address" label="Catatan Alamat" />
        <SelectProvince />
        <SelectCity />
        <SelectDistrict />
        <SelectVillage />
        {/* <SelectSubCity /> */}
    </>
}

export default Address;