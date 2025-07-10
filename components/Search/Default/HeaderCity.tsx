
import Link from 'next/link';
import { useCity } from './CityContext';
import { FaChevronLeft } from 'react-icons/fa6';


const HeaderCity = () => {
    const { city, setCity } = useCity();
    return  <>
        {
            city && 
            <>
                <button onClick={() => {setCity(undefined)}} className="flex items-center gap-2 mb-5"><FaChevronLeft />  Cari Berdasarkan</button>
                <p className="mt-6 mb-1 opacity-60">Kota</p>
                <Link href={`/search?q=${city.name}`} className="">{city.name}</Link>
            </>
        }
    </>
}

export default HeaderCity;