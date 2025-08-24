'use client'
import { useState } from 'react';

type tParam = {
    price: number | undefined;
    price_year: number | undefined;
}
export default function PriceRoom({price, price_year}:tParam){
    const [period, setPeriod] = useState('bulanan');

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        setPeriod(value)
        // console.log(value)
    }
    return <>
        {
            price_year ? <>
                <label className="mb-3 block">
                    <button type="button" value="bulanan" className={`rounded-s-full border py-1 px-4 text-sm ${period === 'bulanan' && `border-azure-500 text-azure-500`}`} onClick={handleClick}>
                        Bulanan
                    </button>
                    <button type="button" value="tahunan" className={`rounded-e-full border py-1 px-4 text-sm ${period === 'tahunan' && `border-azure-500 text-azure-500`}`} onClick={handleClick}>
                        Tahunan
                    </button>
                </label>
            </> : ''
        }
        <label className="text-xl font-bold mb-4 block">
            {
                period === 'bulanan' ? 
                <>
                    {price
                    ? price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                        })
                    : ""} / Bulan
                </> :
                <>
                    {price_year
                    ? price_year.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                        })
                    : ""} / Tahun
                </>
            }        
                
        </label>    
    </>
}