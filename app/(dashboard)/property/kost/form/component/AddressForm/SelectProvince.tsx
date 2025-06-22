'use client'
import { useState, useEffect, memo } from 'react';
import { tLoc } from './AddressType';
import { useForm } from '../FormHook';
import Province from '@/service/dashboard/province';
import Select from '@/components/Form/CustomSelect';
import useStore from '../store'

const SelectProvince = memo(function SelectProvince() {
    const city_id = useStore((store) => store.state.address.city_id);
    const dispatch = useStore((store) => store.dispatch);

    const province_id = useStore((store) => store.state.address.province_id);
    const  { handleInput }  = useForm();
    const [provinces, setProvinces] = useState<tLoc[]>([{ id: 0, name: "-- Pilih Provinsi --" }]);
    useEffect(() => {
        const getProvince = async () => {
            const resp = await Province();
            if(resp.success){
                setProvinces([
                    {id: 0, name:'-- Pilih Provinsi --'}, 
                    ...resp.data
                ])
            }
        }
        getProvince();
    }, []);
    return <Select
                id="province"
                label="Provinsi"
                name="province_id"
                data-param="address"
                isLoading={provinces.length == 0}
                option={provinces}
                value={province_id}
                onChange={(e) => {
                    handleInput(e);
                }}
            />
})

export default SelectProvince;