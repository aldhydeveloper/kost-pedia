import {useDistrict} from './hooks';
import District, {iParams} from './district';
import { useCity } from '../Default/CityContext';

export default function DisctrictContainer(){
    const { city } = useCity();
    const { district } = useDistrict(city.id);
    if(!district || !city.id) return <></>

    return <>
        <p className="mt-6 mb-3 opacity-60">Kecamatan</p>
        {
            district.map((v:iParams) => <District key={v.id} id={v.id} name={v.name} cityName={city.name} />)
        }
    </>
}