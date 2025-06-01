import { Metadata } from 'next';
import SearchPage from './component';


export async function generateMetadata({ searchParams }:{searchParams:{q:string, campus:string, city:string}}): Promise<Metadata> {
  const q = searchParams.q || '';
  const campus = searchParams.campus || '';
  const city = searchParams.city || '';

  const title =  `${q || campus || city ? `Kost ${q ? q : campus} ${city} Murah` : 'Temukan Kost di Kostpedia'}`;
  const desc = `Tersedia banyak pilihan kost di ${q || campus || city ? `${q ? q : campus} ${city}` : 'Kostpedia'}.Cari hunian kost dengan cepat dan mudah di mana saja, Hanya di Kostpedia. Langsung cek sekarang!.`;
  return {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc
    },
  };
}



export default function Search({ searchParams }:{searchParams:{q:string, campus:string}}){
    return <>
     <SearchPage searchParams={searchParams} />
    </>
}