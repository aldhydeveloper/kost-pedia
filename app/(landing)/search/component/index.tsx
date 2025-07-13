'use client'
import PriceDropdown from './PriceDropdown';
import FacilitiesPopup from "./FacilitiesPopup";
import CategorySelect from "./CategorySelect";
import RulesPopup from "./RulesPopup";
const Search = () => {

    return <div className="mb-12 pb-6 border-b border-stroke mx-auto">
        {/* <h3 className="text-lg">Filter : </h3> */}
        <div className="max-w-3xl grid lg:grid-cols-4 grid-cols-2 gap-3 items-center mx-auto">
            <CategorySelect />
            <PriceDropdown />
            <FacilitiesPopup />
            <RulesPopup />  
        </div>
    </div>
}

export default Search;