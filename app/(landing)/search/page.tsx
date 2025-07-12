import { Metadata } from 'next';
import SearchComponent from "@/components/Search";
import 'react-loading-skeleton/dist/skeleton.css'
import SearchPage from './component';
import RoomList from './component/RoomList';
import { tParams } from './SearchType';

export async function generateMetadata({ searchParams }:tParams): Promise<Metadata> {
    const q = searchParams.q || '';
    const campus = searchParams.campus || '';
    const category = searchParams.category || '';

    const title =  `Kost ${category} ${q ? q : campus} Murah`;
    const desc = `Tersedia banyak pilihan Kost ${category} di ${q ? q : campus} .Cari hunian kost dengan cepat dan mudah di mana saja, Hanya di Kostpedia. Langsung cek sekarang!.`;
    return {
        title: title,
        description: desc,
        // openGraph: {
        //     title: title,
        //     description: desc
        // },
    };
}


export default async function Search({ searchParams }:tParams){
    return <div className="container max-w-4xl pt-30 pb-20 mx-auto">
      <SearchComponent customClass="block border border-stroke mx-auto !py-3 mb-10" />
      <SearchPage  />
      <RoomList searchParams={searchParams} />
    </div>
}