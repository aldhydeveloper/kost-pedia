import Fuse from 'fuse.js'
// import Get from '@/service/get'
// import collect from 'collect.js';

interface iLoc  {
    id: number,
    name: string
}
interface iSearchLoc{
    provinces:iLoc[],
    cities:iLoc[],
    districts:iLoc[]
}


export const fuzzySearch = (rawData:{data: iSearchLoc}, keyword:string) => {
    // const rawData = await getData();

    const province = rawData.data ? rawData.data.provinces : [];
    const city = rawData.data ? rawData.data.cities : [];
    const district = rawData.data ? rawData.data.districts : [];
    // const village = rawData.data ? rawData.data.villages : [];

    // const collection = collect(province).merge(city).merge(district).all();
    const opt = {
        keys: ['name'],
        threshold: 0.1
    }
    // console.log(province)
    // console.log(city)
    // console.log(district)
    const fuse = new Fuse(province, opt);
    const fuse2 = new Fuse(city, opt);
    const fuse3 = new Fuse(district, opt);
    // console.log(fuse.search(keyword).map((result) => result.item))
    return  {
        provinces: fuse.search(keyword).map((result) => result.item),
        cities: fuse2.search(keyword).map((result) => result.item),
        districts: fuse3.search(keyword).map((result) => result.item)
    } ;
    // console.log(data)
}
export type {iSearchLoc};
export interface iKeySearch {
    [key: string]: iSearchLoc;
}