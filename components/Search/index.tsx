'use client'
import { Provider, useDispatch, useSelector } from "react-redux";
import {show, hide} from "@/store/slices/showSearchSlice";
import {selectShow} from "@/store/selectors";
import { store } from "@/store";

import Wrap from './wrap';

const SearchComp = () => {
    const dispatch = useDispatch();
    const getShow = useSelector(selectShow);
    const handleFocus = () => {
        dispatch(show());
    }
    const onHide = () => {
        dispatch(hide());
    }
    // console.log(shown)
    return <>
        <input
            type="text"
            className={`max-w-125 w-full px-10 py-4 outline-none rounded-full text-black`}
            placeholder="mau cari kost dimana?"
            onFocus={handleFocus}
            // onBlur={handleBlur}
          />

          <Wrap show={getShow.show} onHide={onHide} />
    </>
}
export default function Search(){
   return <Provider store={store}>
                <SearchComp/>
            </Provider>
}