"use client";
import { useEffect, useRef, useState } from "react";
// import { signIn } from "next-auth/react";
import Image from "next/image";
import { getCookie } from "cookies-next";
// import { hydrateRoot } from 'react-dom';
import { usePathname } from "next/navigation";
import { IoHome } from "react-icons/io5";
import {
  MdApartment,
  MdOutlineAddBusiness,
  MdBusinessCenter,
} from "react-icons/md";
import classNames from "classnames/bind";
import Link from "next/link";
import WrapSearch from "@/components/Search/wrap";
import Cookies from 'js-cookie';

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const cx = classNames.bind({
  hover: "group active",
  classes: "py-4 px-2",
});

const chooseRegister = () => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="bg-white shadow-lg p-8">
          <label className="text-xl font-bold text-black block mb-4">
            Register As :
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/signup?as=Company"
              className="bg-azure-800 text-white px-8 py-2 rounded-md"
            >
              Company
            </Link>
            <Link
              href="/signup?as=Customer"
              className="bg-azure-800 text-white p-8 py-2 rounded-md"
            >
              Customer
            </Link>
          </div>
        </div>
      );
    },
  });
};

// function getCookie(cName:string) {
//   const name = cName + "=";
//   const cDecoded = decodeURIComponent(document.cookie); //to be careful
//   const cArr = cDecoded.split('; ');
//   let res;
//   cArr.forEach(val => {
//     if (val.indexOf(name) === 0) res = val.substring(name.length);
//   })
//   return res
// }

export default function Navbar() {
  const pathname = usePathname();
  // console.log(pathname);
  // interface Hover
  const [hover, setHover] = useState<string | null>(null);
  const [style, setStyle] = useState<object | {}>({});
  const [classSearch, setClassSearch] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean | undefined>(undefined)
  const ref = useRef<any>(0);
  
  useEffect(() => {
    setIsLogin(Cookies.get('token') ? true : false)
  }, [isLogin]);

  if(isLogin === undefined){
    return false;
  }
  return (
    <>
      <nav className={`absolute top-0 right-0 left-0 lg:px-12 ${ pathname != '/' ? 'shadow-1 py-4' : 'py-8'}`}>
        <ul className={`${ pathname == '/' ? `text-white`: `text-boxdark-2`} font-medium flex justify-center items-center`}>
          <li className="px-8">
            <Link href="/">
              <Image
                src={`${ pathname == '/' ? `/img/kostpedia.png` : '/img/kostpedia-dark.png'}`}
                width="100"
                height="30"
                alt="Logo Kostpedia"
              />
            </Link>
            </li>
            {
              !isLogin ?
              <>
                {/* <li className="px-8 ml-auto">
                  <Link href="/signin">Login</Link>
                </li> */}
                <li className="px-8 ml-auto">
                  <Link className="bg-meta-5 px-8 py-2 rounded-md text-white" 
                    href="/signin">Pasang Iklan</Link>
                </li>
              </> 
              : <li className="px-8 ml-auto">
                  <Link href="/property/kost">Dashboard</Link>
              </li>
            }
           
          
          
          
        </ul>
      </nav>
    </>
  );
}
