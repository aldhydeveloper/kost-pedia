import {useDistrict} from './hooks';
import District, {iParams} from './district';

export default function DisctrictContainer({cityId,cityName}: {cityId: number, cityName: string}){
    const { district } = useDistrict(cityId);
    if(!district) return <></>

    return <>
        {
            district.map((v:iParams) => <District key={v.id} id={v.id} name={v.name} cityName={cityName} />)
        }
    </>
}