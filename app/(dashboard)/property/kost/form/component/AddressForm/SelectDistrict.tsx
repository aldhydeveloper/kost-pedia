'use client'
import { useState, useEffect, memo } from 'react';
import { tLoc } from './AddressType';
import { useForm } from '../FormHook';
import Select from '@/components/Form/CustomSelect';
import useStore from '../store'
import Get from '@/service/get';

const initialState = { id: 0, name: "-- Pilih Kecamatan --" };

const SelectCity = memo(function SelectCity() {
    const city_id = useStore((store) => store.state.address.city_id);
    const district_id = useStore((store) => store.state.address.district_id);
    const  { handleInput }  = useForm();
    const [districts, setDistricts] = useState<tLoc[]>([initialState]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // console.log(isLoading)
    // console.log('render disids')
    useEffect(() => {
        const getDistricts = async () => {
            setIsLoading(true)
            const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/district/bycity/${city_id}`)
            
            if(resp.success){
                setDistricts([
                    initialState, 
                    ...resp.data
                ])
            }
            setIsLoading(false)
        }
        if(city_id != 0) getDistricts(); else setDistricts([initialState])
    }, [city_id]);
    return <Select
                    id="district"
                    label="Kecamatan"
                    name="district_id"
                    data-param="address"
                    isLoading={isLoading}
                    option={districts}
                    value={district_id}
                    onChange={handleInput}
                />
})

export default SelectCity;