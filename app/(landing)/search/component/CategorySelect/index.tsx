import Select from "@/components/Form/CustomSelect";
import React, { useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation'

const CategorySelect = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const category_name = searchParams.get('category');
    const [category, setCategory] = useState<string | null>(category_name);
    const handleInput = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);

        const params = new URLSearchParams(searchParams.toString());
        params.set('category', e.target.value);
        router.push(`/search?${params.toString()}`);
    }
    return <div className="relative">
        <Select
            className="!rounded-full !bg-white !border-stroke text-center"
            classNameParent="!mb-0"
            data-param="kost"
            name="category"
            value={category ?? ''}
            option={[
                {
                id: "",
                name: "-- Katergori --",
                },
                {
                id: "Putra",
                name: "Putra",
                },
                {
                id: "Putri",
                name: "Putri",
                },
                {
                id: "Campur",
                name: "Campur",
                },
            ]}
            onChange={handleInput}
        />
    </div>
}

export default CategorySelect;