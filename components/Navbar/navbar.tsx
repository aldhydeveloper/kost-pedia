"use client";
import { useEffect, useRef, useState } from "react";
// import { signIn } from "next-auth/react";
import Image from "next/image";
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

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const blurEl = <div className="absolute inset-0 bg-white"></div>;
const nav = [
  {
    title: "Sewa",
    route: "/",
    child: [
      {
        title: "Kos",
        route: "/",
        desc: "Solusi kos kosan dengan harga yang murah.",
        icon: <IoHome />,
      },
      {
        title: "Apartment",
        route: "/",
        desc: "Apertement mewah dan murah.",
        icon: <MdApartment />,
      },
    ],
  },
  {
    title: "Partnership",
    route: "/",
    child: [
      {
        title: "Gabung dengan Kostpedia",
        route: "/",
        desc: "Gabung dengan kami untuk bisnis properti anda.",
        icon: <MdOutlineAddBusiness />,
      },
      {
        title: "Bangun",
        route: "/",
        desc: "Jadikan asset anda sebagai bisnis properti",
        icon: <MdBusinessCenter />,
      },
    ],
  },
];

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

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  // interface Hover
  const [hover, setHover] = useState<string | null>(null);
  const [style, setStyle] = useState<object | {}>({});
  const [classSearch, setClassSearch] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<any>(0);

  // useEffect(() => {}, [pathname]);
  return (
    <>
      <nav className={`absolute top-0 right-0 left-0 px-12 ${ pathname != '/' ? 'shadow-1 py-4' : 'py-8'}`}>
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
          <li className="px-8">Sewa</li>
          <li className="px-8">Partnership</li>
          <li className="px-8 ml-auto">
            <Link href="/signin">Login</Link>
          </li>
          <li className="px-8">
            <button
              type="button"
              className="bg-meta-5 px-8 py-2 rounded-md text-white"
              onClick={chooseRegister}
            >
              Register
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
