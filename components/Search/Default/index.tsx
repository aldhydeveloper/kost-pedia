'use client'
// import { useEffect, useState, memo } from "react"
import Popular from '@/components/Search/popular';
import WrapCity from './wrap';
// const cities = [
//     'Jakarta',
//     'Bandung',
//     'Bogor',
//     'Surabaya',
//     'Yogyakarta'
//   ];
// interface iCity{
//     id: number;
//     name: string;
// }
const DefaultSearchComponent = () => {
    // console.log(resp)

    return  <>
        <p className="mt-6 mb-3 opacity-60">Kampus Populer</p>
        <div className="grid grid-cols-5 gap-4 pb-1"><Popular /></div>

        <WrapCity />
    </>
}

export default DefaultSearchComponent;