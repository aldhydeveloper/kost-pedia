'use client'
import { useState, useEffect } from "react"
import CityButton, {iCity} from './city'
import Get from "@/service/get";
import District from "../District";
import { FaChevronLeft } from "react-icons/fa6";
import City from './city';
import { useCity } from './CityContext';

  
  
  
const WrapDefaultSearch = () => {
    const [cities, setCities] = useState<iCity[]>([]);
    const [disctrit, setDistrict] = useState<undefined | JSX.Element>(undefined);
    const { city, setCity } = useCity();
    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        const id:number = Number(e.currentTarget.value);
        const comp = <District cityId={id} cityName={e.currentTarget.name} />
        setCity({
            id: id,
            name: e.currentTarget.name
        });
        setDistrict(comp)
    }
    useEffect(() => {
        const resp = Get(`${process.env.NEXT_PUBLIC_API_HOST}/loc/popular/cities`, 'default');
        resp.then(resl => {setCities(resl.data)})
    }, [])
    return  <>
        
        <div className="relative overflow-hidden">
            <div className="relative duration-250">
                <p className="mt-6 mb-2 opacity-60">{!city ? 'Kota' : 'Kecamatan'}</p>
                {   
                    !city 
                    ? cities.map((v:iCity) => {
                        return <CityButton key={v.id} id={v.id} value={v.name} name={v.name.replace('Kota', '').replace('Kabupaten', '').replace('Denpasar', 'Bali')} handleClick={handleClick} />
                    })
                    : disctrit
                }
            </div>
        </div>
    </>
}

export default WrapDefaultSearch;