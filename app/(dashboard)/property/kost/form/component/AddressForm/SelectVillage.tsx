'use client'
import { useState, useEffect, memo } from 'react';
import { tLoc } from './AddressType';
import { useForm } from '../FormHook';
import Select from '@/components/Form/CustomSelect';
import useStore from '../store'
import City from '@/service/dashboard/city';
import Get from '@/service/get';

const SelectVillage = memo(function SelectVillage() {
    const district_id = useStore((store) => store.state.address.district_id);
    const village_id = useStore((store) => store.state.address.village_id);
    const  { handleInput }  = useForm();
    const [villages, setVillages] = useState<tLoc[]>([{ id: 0, name: "-- Pilih Kelurahan --" }]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // console.log(isLoading)
    // console.log('render citi')
    useEffect(() => {
        const getVillages = async () => {
            setIsLoading(true)
            const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/village/bydistrict/${district_id}`)
            
            if(resp.success){
                setVillages([
                    {id: 0, name:'-- Pilih Kelurahan --'}, 
                    ...resp.data
                ])
            }
            setIsLoading(false)
        }
        if(district_id != 0) getVillages();

    }, [district_id]);
    return <Select
                    id="village"
                    label="Kelurahan"
                    name="village_id"
                    data-param="address"
                    isLoading={isLoading}
                    option={villages}
                    value={village_id}
                    onChange={handleInput}
                />
})

export default SelectVillage;