'use client'
import PriceDropdown from './PriceDropdown';
import FacilitiesPopup from "./FacilitiesPopup";
import CategorySelect from "./CategorySelect";
import RulesPopup from "./RulesPopup";
const Search = () => {

    return <div className="mb-12 pb-6 border-b border-stroke">
        <div className="max-w-4xl grid grid-cols-5 gap-3 mx-auto items-center">
            <h3 className="text-lg">Filter : </h3>
            <CategorySelect />
            <PriceDropdown />
            <FacilitiesPopup />
            <RulesPopup />  
        </div>
    </div>
}

export default Search;