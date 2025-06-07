'use client'
import { memo } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useCity } from "./Default/CityContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
// import {selectShow} from "@/store/selectors";
// import { store } from "@/store";
type iData = {
  [key: string]: any;
};
// const data: iData = {
//   Jakarta: ["Lorem", "Ipsum", "Dummy", "Text", "Printing"],
//   Bandung: ["Ipsum", "Lorem", "Text", "Printing"],
//   Bogor: ["Ipsum", "Printing", "Text", "Lorem"],
//   Surabaya: ["Ipsum", "Text", "Printing", "Ipsum"],
//   Yogyakarta: ["Ipsum", "Lorem", "Text", "Printing"],
// };

// const revalidate = 60;
const fetcher = (url:string) => fetch(url).then((res) => res.json());
const Popular =  () => {
  const { city } = useCity();
  // const resp =  Get(`${process.env.NEXT_PUBLIC_API_HOST}/campus`);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}${city ? `/campus/city/${city.id}/0/7` : `/campus/0/7`}`, fetcher);
  console.log(data)
  return (
    <>
    { isLoading ? <SkeletonTheme borderRadius={99} height={26}>
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
      </SkeletonTheme> : (!data.data ? <></> : data.data.map((v:{alias: string, city_name:string}, i:number) => {
      return <Link
              href={`/search?campus=${v.alias}&city=${v.city_name}`}
              className="flex justify-center items-center text-center py-1 mb-3 px-2 bg-stroke rounded-full"
              key={i}
            >
              {v.alias}
            </Link>
    }))}
    </>
  );
};

export default memo(Popular);
