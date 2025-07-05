'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import NumberFormat, { NumericFormat } from "react-number-format";
import RangeSlider, { InputEventHandler } from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
// import SearchPage from './SearchPageCopy';

type tPrice = {
    min: number;
    max: number;
}
type tInputNumeric = {
    value: number;
    onInput :(values:NumberFormat.NumberFormatValues, sourceInfo:NumberFormat.SourceInfo) => void;
}
const InputNumber = ({value, onInput}:tInputNumeric) => {
    return <NumericFormat id="priceMin" name="min" className="border rounded-md border-bodydark px-4 py-1 w-full" value={value} thousandSeparator="." decimalSeparator="," onValueChange={onInput} />
}
const PriceDropdown = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [dropdown, setDropdown] = useState<boolean>(false)
    const [rangePrice, setRangePrice] = useState<tPrice>({
        min: 300000,
        max: 7000000
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

  
    const onSlide = (value:number[]) => {
        // console.log(value)
        // const name = 
        setRangePrice({
            min: value[0],
            max: value[1]
        })
    }
    const onInput = (values:NumberFormat.NumberFormatValues, sourceInfo:NumberFormat.SourceInfo) => {
        const name = sourceInfo.event?.currentTarget.name as 'min' | 'max';
        // console.log(values)
        if(name)
            setRangePrice(prev => ({...prev, [name]: values ? values.floatValue : 0}))
        // console.log(name)
    } 

    const handleSave = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('minPrice', rangePrice.min.toString());
        params.set('maxPrice', rangePrice.max.toString());
        router.push(`/search?${params.toString()}`);
        setDropdown(false);
    }
    useEffect(() => {
         function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdown(false);
            }
            }

            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
    }, []);
    return <div ref={dropdownRef} className="relative">
        <button className="border border-stroke rounded-full py-2 px-8 w-full" onClick={() => setDropdown(prev => !prev)}>Harga</button>
        <div className={`absolute rounded-sm bg-white shadow-2 py-8 px-6 w-90 z-99 duration-200 ${dropdown ? 'translate-y-2 visible opacity-1' : '-translate-y-1 invisible opacity-0'}`}>
            <div className="grid grid-cols-2 mb-8 gap-5">
                <div>
                    <p>Minimal</p>
                    <InputNumber value={rangePrice.min} onInput={onInput} />
                </div>
                <div>
                    <label>Maximal</label>
                    <InputNumber value={rangePrice.max} onInput={onInput} />
                </div>
            </div>
            <RangeSlider
                max={10000000}
                min={100000}
                step={10000}
                value={[rangePrice.min, rangePrice.max]}
                onInput={onSlide}
            />
            
            <div className="border-t pt-6">
                <button className="border border-azure-500 bg-azure-500 text-white rounded-md px-5 py-1 block ml-auto" onClick={handleSave}>Simpan</button>
            </div>
        </div>
    </div>
}

export default PriceDropdown;