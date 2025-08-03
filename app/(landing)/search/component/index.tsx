'use client'
import SortDropdown from "./SortDropdown";
import CategorySelect from "./CategorySelect";
import PriceDropdown from './PriceDropdown';
import FacilitiesPopup from "./FacilitiesPopup";
import RulesPopup from "./RulesPopup";
import Link from 'next/link';
const Search = () => {

    return <div className="mb-12 pb-6 border-b border-stroke mx-auto">
        {/* <h3 className="text-lg">Filter : </h3> */}
        <div className="max-w-3xl flex gap-3 text-left items-center text-xs font-thin">
            <SortDropdown />
            <CategorySelect />
            <PriceDropdown />
            <FacilitiesPopup />
            <RulesPopup />
            <Link type="button" className="text-azure-500 p-0" href="/search">Reset Filter</Link>
        </div>
    </div>
}

export default Search;