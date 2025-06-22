'use client'
import { useState, useEffect } from 'react';
import Province from '@/service/dashboard/province';
import City from '@/service/dashboard/city';
import Get from '@/service/get';
import { tAddress } from '../FormType';
import useStore from '../store'

type tLoc = {
    id: number;
    name: string;
};
export const useAddress = () => {
    const [provinces, setProvinces] = useState<tLoc[]>([{ id: 0, name: "-- Pilih Provinsi --" }]);
    const [cities, setCities] = useState<tLoc[]>([]);
    const [districts, setDistricts] = useState<tLoc[]>([{ id: 0, name: "-- Pilih Kecamatan --" }]);
    const [villages, setVillages] = useState<tLoc[]>([{ id: 0, name: "-- Pilih Kelurahan --" }]);
    const dispatch = useStore(s => s.dispatch)

    const setValue = (name:keyof tAddress, value: string | number | string[] | number[]) => {
        dispatch({
            type: "SET_FIELD",
            field: name,
            value: value,
            param: 'address',
        });
    }
    const getCities = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const provinceId = parseInt(e.target.value) as number;
        City(provinceId).then(resp => {
            if(resp.success){
                setCities([{ id: 0, name: "-- Pilih Kota/Kabupaten --" }, ...resp.data])
            }
        });
        setValue('province_id', provinceId);
        
    }
    
    const getDistricts = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = parseInt(e.target.value) as number;
        
        Get(`${process.env.NEXT_PUBLIC_API_HOST}/district/bycity/${cityId}`).then(
        (resp) => {
            setDistricts([{ id: 0, name: "-- Pilih Kecamatan --" }, ...resp.data])
        }
        );
    }
    
    const getVillages = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = parseInt(e.target.value) as number;
        
        Get(`${process.env.NEXT_PUBLIC_API_HOST}/village/bydistrict/${districtId}`).then(
        (resp) => {
            setVillages([{ id: 0, name: "-- Pilih Kelurahan --" }, ...resp.data])
        }
        );
    }
    
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
    return { provinces, cities, getCities, districts, getDistricts, villages, getVillages }
}