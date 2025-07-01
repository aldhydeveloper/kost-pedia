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
    // const [cities, setCities] = useState<tLoc[]>([intialState]);
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    // console.log(city_id)
    // useEffect(() => {
    //     const getCities = async () => {
    //         setIsLoading(true)
    //         const resp = await City(province_id);
    //         if(resp.success){
    //             setCities([intialState, ...resp.data])
    //         }
    //         setIsLoading(false)
    //         // dispatch({
    //         //     type: "SET_FIELD",
    //         //     field: 'city_id',
    //         //     value: 0,
    //         //     param: 'address',
    //         // })
    //     }
    
        
    //     if(province_id != 0) getCities(); else setCities([intialState])
    // }, [province_id, dispatch]);
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