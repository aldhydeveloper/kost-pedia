import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import TabProduct from '@/components/Product/tab'
import City from "@/components/Search/city";
// import Budget from '@/components/Budget/budget'

import Campus from "@/components/Search/campus";
// import {comp1, comp2} from '@/components/Search/popular'
import { FaArrowLeft } from "react-icons/fa6";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { fuzzySearch } from "@/utils/fuzzySearch";
import Button from '@/components/Utility/CustomButton';

import Get from '@/service/get'

const cities = [
  { name: "Jakarta", img: "jakarta.jpg" },
  { name: "Bandung", img: "bandung.jpg" },
  { name: "Bogor", img: "bogor.jpg" },
  { name: "Surabaya", img: "surabaya.jpg" },
  { name: "Yogyakarta", img: "yogyakarta.jpg" },
];

// const cx = classNames.bind({
//   classes: "fixed inset-0 z-50 bg-white",
// });

// const comp = dynamic(() => import('@/components/Search/popular').then((mod) => mod.comp1))
const Popular = dynamic(() => import("@/components/Search/popular"), {
  loading: () => {
    return (
      <SkeletonTheme borderRadius={99} height={26}>
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
        <Skeleton inline={true} />
      </SkeletonTheme>
    );
  },
  ssr: false,
});
const hideClass = "opacity-0 invisible";
const showClass = "opacity-100 visible";


const getData = async () => {
  const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/loc`);
  return resp.data;
}

// const cx = classNames.bind({
//   classes: "fixed inset-0 z-50 bg-white",
// });
export default function Wrap({ show, onHide }: { show: boolean; onHide: any }) {
  const router = useRouter();
  // const search = ;
  // search.then((v) => {
  // })  
  const ref = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState({
    search: "",
  });
  // const [show, setShow] = useState<boolean>(false);
  const [popular, setPopular] = useState<any>(<Popular name={input.search} />);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  // const [showing, setShowing] = useState<boolean>(false);
  function handleCallback(childData: string) {
    setInput({ search: childData });
    setPopular(<Popular name={input.search} />);
  }
  
  const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    setInput({search: e.currentTarget.value})
  };

  const handleClickSearch = async () => {
    // setIsLoadingSearch(true)
    const data = await getData();
    const resp = fuzzySearch(data, input.search)
    // console.log(resp)
    // onHide()
    router.push(`/search?q=${input.search}`);

  }
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
    // console.log()
    // search

    // const search = async () => {
    // }

    // search();
  });
  return (
    <div
      className={`fixed inset-0 z-50 bg-white duration-200 text-graydark ${
        show ? showClass : hideClass
      }`}
    >
      <div className="container max-w-2xl mx-auto py-8">
        <div className="flex mb-4 gap-4">
          <button className="px-4 text-xl" onClick={onHide} >
            <FaArrowLeft />
          </button>
          <input
            type="text"
            className="rounded-full border-slate-200 border outline-none w-full py-3 px-4 text-xs"
            placeholder="Coba Bandung, Jakarta, Surabaya"
            onChange={handleChange}
            value={input.search}
            ref={ref}
          />
          <Button type="button" className="py-2 max-w-20" onClick={handleClickSearch} isLoading={isLoadingSearch}>Cari</Button>
        </div>
        {/* <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="grid grid-cols-5 gap-5">
            {cities.map((v, i) => {
              return (
                <City
                  img={v.img}
                  name={v.name}
                  key={i}
                  childCallback={handleCallback}
                />
              );
            })}
          </div>
          <p className="mt-6 mb-2">Pencarian Populer</p>
          <div className="grid grid-cols-5 gap-4 pb-1">{popular}</div>
          <p className="mt-6 mb-2">Kampus terdekat</p>
          <Campus />
        </div> */}
      </div>
    </div>
  );
}
