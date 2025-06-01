'use client'
import SearchPage from './SearchPage';
import { DataProvider } from "@/hooks/useContexts";
const Search = ({ searchParams }:{searchParams:{q:string, campus:string}}) => {

    return <>
    <DataProvider>
        <SearchPage searchParams={searchParams} />
    </DataProvider>
    </>
}

export default Search;