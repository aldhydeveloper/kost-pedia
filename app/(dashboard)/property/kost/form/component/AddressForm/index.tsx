// 'use client'
// import { useForm } from '../FormHook';
// import { useAddress } from './AddressHook';
// import Select from '@/components/Form/CustomSelect';
// import Textarea from '@/components/Form/CustomTextarea';
import SelectProvince from './SelectProvince';
import InputAddress from './InputAddress';
import { useContextSelector } from 'use-context-selector';
import { useFormContext } from '../../context/FormContext';
import { FormContext } from '../../context/FormContextSelector';
import { tKost } from '../FormType';
const Address = () => {
    // const state = useAddress();
    // const dispatch  = useAddressDispatch();
    // const { state } = useFormContext();
    // const { provinces, cities, getCities, districts, getDistricts, villages, getVillages } = useAddress();
    // const  { handleInput }  = useForm();
    // console.log('render address')
    return <>
        {/* <Textarea
            name="address_note"
            data-param="address"
            label="Catatan Alamat"
            value={state.address.address_note}
            onChange={handleInput}
        /> */}
        <InputAddress name="full_address" />
        {/* <InputAddress name="address_note" /> */}
        <SelectProvince />
        {/* <Select
            id="city"
            label="Kota/Kabupaten"
            name="city_id"
            data-param="address"
            isLoading={cities.length == 0 && !!state.address.province_id}
            option={cities}
            value={state.address.city_id}
            onChange={getDistricts}
        />
        <Select
            id="district"
            label="Kecamatan"
            name="district_id"
            data-param="address"
            isLoading={districts.length == 0}
            option={districts}
            value={state.address.district_id}
            onChange={getVillages}
        />
        <Select
            id="village"
            label="Kelurahan"
            name="village"
            data-param="address"
            isLoading={villages.length == 0}
            option={villages}
            value={state.address.village_id}
            onChange={handleInput}
        /> */}
    </>
}

export default Address;