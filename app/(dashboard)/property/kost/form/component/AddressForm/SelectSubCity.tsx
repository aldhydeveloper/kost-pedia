'use client'
import { memo } from 'react';
import { useForm } from '../FormHook';
import Select from '@/components/Form/CustomSelect';
import useStore from '../store'
import useCity from './CityHook';

const intialState = { id: 0, name: "-- Pilih Sub Kota/Kabupaten --" };

const SelectCity = memo(function SelectCity() {
    const sub_city_id = useStore((store) => store.state.address.sub_city_id);
    const  { handleInput }  = useForm();
    const{ cities, isLoading } = useCity(intialState);
    
    return <Select
                    id="sub_cities"
                    label="Sub Kota/Kabupaten"
                    name="sub_city_id"
                    data-param="address"
                    isLoading={isLoading}
                    option={cities}
                    value={sub_city_id}
                    onChange={handleInput}
                />
})

export default SelectCity;