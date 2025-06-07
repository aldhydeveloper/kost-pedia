
import { useCity } from './CityContext';


const HeaderCity = () => {
    const { city } = useCity();
    return  <>
        {
            city && <h2 className="text-md font-semibold opacity-80">{city.name}</h2>
        }
    </>
}

export default HeaderCity;