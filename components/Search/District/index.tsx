import {useDistrict} from './hooks';
import District, {iParams} from './district';

export default function DisctrictContainer({cityId}: {cityId: number}){
    const { district } = useDistrict(cityId);
    // console.log(district)
    if(!district) return <></>

    return <>
        {
            district.map((v:iParams) => <District key={v.id} id={v.id} name={v.name} />)
        }
    </>
}