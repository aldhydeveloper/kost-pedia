import Get from "@/service/get";
import { createContext, useContext, useEffect, useState } from "react";

interface iAttrLoc{
    id: number;
    name: string;
}
interface iLoc{ 
    provinces: iAttrLoc[];
    districts: iAttrLoc[];
    cities: iAttrLoc[]
}
interface iDataContext { 
    data: iLoc | undefined
    setData: React.Dispatch<React.SetStateAction<iLoc | undefined>>;
}
const DataContext = createContext<undefined | iDataContext>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<undefined | iLoc>(undefined);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/loc`, 'default');
                // const json = resp.data;
                // console.log(resp)
                setData(resp.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    
    return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error("useData must be used within a DataProvider");
    return context;
};