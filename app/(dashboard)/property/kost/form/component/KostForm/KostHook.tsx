'use client'
import { useState, useEffect } from 'react';
import Rules from "@/service/dashboard/rules";

type tRules = {
    id:number;
    name:string
}
export const useKost = () => {
    const [rules, setRules] = useState<tRules[]>([]);

    useEffect(() => {
        const getRules = async () => {
            const dataRules =  await Rules();
            if(dataRules.success){
                setRules(dataRules.data)
            }
        }
        getRules();
    }, []);

    return { rules }
}

export type { tRules }