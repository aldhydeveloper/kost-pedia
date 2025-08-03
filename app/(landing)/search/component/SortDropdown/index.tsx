'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import 'react-range-slider-input/dist/style.css';
import { LuArrowUpDown } from "react-icons/lu";
import Radio from "@/components/Checkboxes/Radio";


const PriceDropdown = () => {
    const searchParams = useSearchParams();
    const sort = searchParams.get('sorting');
    const router = useRouter();
    const [dropdown, setDropdown] = useState<boolean>(false)
    const [sorting, setSorting] = useState<string>(sort ?? '');
    const dropdownRef = useRef<HTMLDivElement>(null);

  
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target)
        setSorting(e.target.value)
    }
    const resetFilter = () => {
        setSorting('')
    }

    const handleSave = () => {
        const params = new URLSearchParams(searchParams.toString());
        if(sorting)
            params.set('sorting', sorting ?? '');
        else
            params.delete('sorting')
        
        router.push(`/search?${params.toString()}`);
        setDropdown(false);
    }
    useEffect(() => {
        // console.log(sort)
        setSorting(sort ?? '')
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
    }, [sort]);
    return <div ref={dropdownRef} className="relative">
        <button className={`border border-stroke rounded-full text-xl py-3 px-3 text-left ${sort && '!border-azure-400 text-azure-500'}`} onClick={() => setDropdown(prev => !prev)}>
            <LuArrowUpDown />
        </button>
        <div className={`absolute rounded-sm bg-white shadow-2 py-6 px-6 w-60 z-99 duration-200 left-0 ${dropdown ? 'translate-y-2 visible opacity-1' : '-translate-y-1 invisible opacity-0'}`}>
            
            <h2 className="mb-3">Urutkan berdasarkan</h2>
            <ul className="mb-4">
                <li className="py-1">
                    <Radio
                    id="lowestPrice"
                    value="lowest"
                    label="Harga Terendah"
                    name="sorting"
                    checked={sorting === 'lowest'}
                    onChange={handleChange}
                    />
                </li>
                <li className="py-1">
                    <Radio
                    id="highestPrice"
                    value="highest"
                    label="Harga Tertinggi"
                    name="sorting"
                    checked={sorting === 'highest'}
                    onChange={handleChange}
                    />
                </li>
                <li className="py-1">
                    <Radio
                    id="newest"
                    value="newest"
                    label="Iklan Terbaru"
                    name="sorting"
                    checked={sorting === 'newest'}
                    onChange={handleChange}
                    />
                </li>
            </ul>
            
            <div className="border-t pt-4 flex justify-between">
                <button className="text-azure-500 block p-0" onClick={resetFilter}>Reset Filter</button>
                <button className="border border-azure-500 bg-azure-500 text-white rounded-md px-5 py-1 block ml-auto" onClick={handleSave}>Simpan</button>
            </div>
        </div>
    </div>
}

export default PriceDropdown;