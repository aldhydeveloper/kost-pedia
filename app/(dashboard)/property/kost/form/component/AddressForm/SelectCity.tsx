'use client'
import { useState, useEffect, memo } from 'react';
import { tLoc } from './AddressType';
import { useForm } from '../FormHook';
import Province from '@/service/dashboard/province';
import Select from '@/components/Form/CustomSelect';
import useStore from '../store'
import City from '@/service/dashboard/city';

const intialState = { id: 0, name: "-- Pilih Kota/Kabupaten --" };

const SelectCity = memo(function SelectCity() {
    const province_id = useStore((store) => store.state.address.province_id);
    const city_id = useStore((store) => store.state.address.city_id);
    const dispatch = useStore((store) => store.dispatch);
    const  { handleInput }  = useForm();
    const [cities, setCities] = useState<tLoc[]>([intialState]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        const getCities = async () => {
            setIsLoading(true)
            const resp = await City(province_id);
            if(resp.success){
                setCities([intialState, ...resp.data])
            }
            setIsLoading(false)
        }
    
        dispatch({
            type: "SET_FIELD",
            field: 'city_id',
            value: 0,
            param: 'address',
        })
        if(province_id != 0) getCities(); else setCities([intialState])
    }, [province_id, dispatch]);
    return <Select
                    id="citites"
                    label="Kota/Kabpuaten"
                    name="city_id"
                    data-param="address"
                    isLoading={isLoading}
                    option={cities}
                    value={city_id}
                    onChange={handleInput}
                />
})

export default SelectCity;