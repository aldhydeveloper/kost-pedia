import SearchPage from './component';

export default function Search({ searchParams }:{searchParams:{q:string, campus:string}}){
    return <>
     <SearchPage searchParams={searchParams} />
    </>
}