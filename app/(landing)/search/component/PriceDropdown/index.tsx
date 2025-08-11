'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import NumberFormat, { NumericFormat } from "react-number-format";
import RangeSlider, { InputEventHandler } from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Radio from "@/components/Checkboxes/Radio";
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
    const periodPrice = searchParams.get('period') ?? 'monthly';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const router = useRouter();
    // console.log(periodPrice)
    const [period, setPeriod] = useState<string>(periodPrice);
    const [dropdown, setDropdown] = useState<boolean>(false)
    const [rangePrice, setRangePrice] = useState<tPrice>({
        min: minPrice ? parseInt(minPrice as string) : 300000,
        max: maxPrice ? parseInt(maxPrice as string) : 5000000
    });
    const [sliderRange, setSliderRange] = useState({
        min: periodPrice === 'monthly' ? 100000 : 10000000,
        max: periodPrice === 'monthly' ? 1000000 : 100000000,
        step: periodPrice === 'monthly' ? 10000 : 100000
    })
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
        params.set('period', period.toString());
        params.set('minPrice', rangePrice.min.toString());
        params.set('maxPrice', rangePrice.max.toString());
        router.push(`/search?${params.toString()}`);
        setDropdown(false);
    }

    const handleChangePeriod = (e:ChangeEvent<HTMLInputElement>) => {
        setPeriod(e.target.value)
        setSliderRange({
            min: e.target.value === 'monthly' ? 100000 : 10000000,
            max: e.target.value === 'monthly' ? 10000000 : 100000000,
            step: e.target.value === 'monthly' ? 10000 : 100000
        })
        setRangePrice({
            min: e.target.value === 'monthly' ? 500000 : 8000000,
            max: e.target.value === 'monthly' ? 5000000 : 50000000
        })
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
    // console.log('period', period)
    // console.log('min', sliderRange.min)
    // console.log('max', sliderRange.max)
    return <div ref={dropdownRef} className="relative">
        <button className={`border border-stroke rounded-full py-2 px-8 w-full text-left ${(minPrice && maxPrice) && 'border-azure-400 text-azure-500'}`} onClick={() => setDropdown(prev => !prev)}>Harga</button>
        <div className={`absolute rounded-sm bg-white shadow-2 py-8 px-6 w-90 z-99 duration-200 left-0 ${dropdown ? 'translate-y-2 visible opacity-1' : '-translate-y-1 invisible opacity-0'}`}>
            <label className="mb-2 block">Periode Sewa</label>
            <div className="grid grid-cols-2 mb-4 gap-5">
                <Radio id="monthly" name="period" label="Bulanan" value="monthly" checked={period === 'monthly'} onChange={handleChangePeriod} />
                <Radio id="yearly" name="period" label="Tahunan" value="yearly" checked={period === 'yearly'} onChange={handleChangePeriod}  />
            </div>
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
                max={sliderRange.max}
                min={sliderRange.min}
                step={sliderRange.step}
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