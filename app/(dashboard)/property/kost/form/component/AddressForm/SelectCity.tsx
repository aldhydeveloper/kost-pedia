'use client'
import { memo } from 'react';
import { useForm } from '../FormHook';
import Select from '@/components/Form/CustomSelect';
import useStore from '../store'
import useCity from './CityHook';

const intialState = { id: 0, name: "-- Pilih Kota/Kabupaten --" };

const SelectCity = memo(function SelectCity() {
    const city_id = useStore((store) => store.state.address.city_id);
    const  { handleInput }  = useForm();
    const{ cities, isLoading } = useCity(intialState);
    
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