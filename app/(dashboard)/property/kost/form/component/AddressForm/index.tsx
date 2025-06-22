'use client'
import SelectProvince from './SelectProvince';
import InputAddress from './InputAddress';
import SelectCity from './SelectCity';
import SelectDistrict from './SelectDistrict';
import SelectVillage from './SelectVillage';
const Address = () => {
    return <>
        <InputAddress name="full_address" param="address" label="Alamat" />
        <InputAddress name="address_note" param="address" label="Catatan Alamat" />
        <SelectProvince />
        <SelectCity />
        <SelectDistrict />
        <SelectVillage />
    </>
}

export default Address;