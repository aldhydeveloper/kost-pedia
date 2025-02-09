'use client'
import Link from "next/link";
import useSWR from "swr";
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
const Popular =  ({ name }: any) => {

  // const resp =  Get(`${process.env.NEXT_PUBLIC_API_HOST}/campus`);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}/campus`, fetcher);
  // console.log(data)
  return (
    <>
    { isLoading || !data.data ? <SkeletonTheme borderRadius={99} height={26}>
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
      </SkeletonTheme> : data.data.map((v:{name: string}, i:number) => {
      return <Link
              href="/search"
              className="flex justify-center items-center py-1 mb-3 px-2 bg-stroke rounded-full"
              key={i}
            >
              {v.name}
            </Link>
    })}
    </>
  );
};

export default Popular;
