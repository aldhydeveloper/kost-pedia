import { useEffect, useState, memo } from "react";
import { tLoc } from './AddressType';
import City from '@/service/dashboard/city';
import useStore from '../store'

// const intialState = { id: 0, name: "-- Pilih Kota/Kabupaten --" };

const useCity =  (intialState:tLoc) => {
    const province_id = useStore((store) => store.state.address.province_id);
    const [cities, setCities] = useState<tLoc[]>([intialState]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // console.log(city_id)
    useEffect(() => {
        const getCities = async () => {
            setIsLoading(true)
            const resp = await City(province_id);
            if(resp.success){
                setCities([intialState, ...resp.data])
            }
            setIsLoading(false)
        }
        getCities();
    }, [province_id, intialState]);

    return { cities, isLoading }
}
export default useCity;