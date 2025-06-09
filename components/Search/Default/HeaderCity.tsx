
import Link from 'next/link';
import { useCity } from './CityContext';


const HeaderCity = () => {
    const { city } = useCity();
    return  <>
        {
            city && <Link href={`/search?q=${city.name}`} className="text-md font-semibold opacity-80">{city.name}</Link>
        }
    </>
}

export default HeaderCity;