'use client'
import {  useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import {show, hide} from "@/store/slices/showSearchSlice";
import {selectShow} from "@/store/selectors";
import { DataProvider } from "@/hooks/useContexts";

import Wrap from './wrap';

interface iSearch {
    customClass?: string
}

const SearchComp = ( {customClass=''}:iSearch) => {
    const dispatch = useDispatch();
    const getShow = useSelector(selectShow);
    const handleFocus = () => {
        dispatch(show());
    }
    const onHide = () => {
        dispatch(hide());
    }

    useEffect(() => {
        console.log('mount')
        dispatch(hide());
    }, [dispatch]);
    // console.log(shown)
    return <>
    <DataProvider>
        <input
            type="text"
            className={`max-w-125 w-full px-10 py-4 outline-none rounded-full text-black ${customClass}`}
            placeholder="mau cari kost dimana?"
            onFocus={handleFocus}
            // onBlur={handleBlur}
          />

          { getShow.show ? <Wrap show={true} onHide={onHide}/> : ''}
    </DataProvider>
    </>
}
export default function Search({customClass=''}:iSearch){
   return <SearchComp customClass={customClass}/>;
}