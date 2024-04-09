"use client";
import { useEffect, useRef, useState } from "react";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
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

export default function Navbar() {
  const pathname = usePathname();
  // console.log(pathname);
  // interface Hover
  const [hover, setHover] = useState<string | null>(null);
  const [style, setStyle] = useState<object | {}>({});
  const [classSearch, setClassSearch] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<any>(0);
  const hoverNav = (state: string | null) => {
    setHover(state);
    // hydrateRoot(blurEl, document.getElementById('root'));
  };

  function setScroll(
    scrollY: number,
    pathname: string,
    style: object,
    lastScrollTop: number,
    st: number = 0
  ) {
    if (scrollY > 300 || pathname !== "/") {
      setStyle(style);
      setClassSearch("!visible !opacity-100");
      lastScrollTop = st <= 0 ? 0 : st;
    } else {
      setStyle({ width: "1200px" });
      setClassSearch(null);
    }
  }

  useEffect(() => {
    const w = ref.current.offsetWidth;
    var lastScrollTop = 0;
    var count = 0;
    const style = {
      width: "100vw",
      borderRadius: "unset",
      transform: "translateY(-1rem)",
      backgroundColor: "rgb(241 247 253)",
      boxShadow: "12px 0px 10px #00000010",
    };
    // console.log(pathname);
    setScroll(0, pathname, style, lastScrollTop);
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      var st = window.scrollY || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      // console.log(st);
      setScroll(scrollY, pathname, style, lastScrollTop, st);

      // console.log(count)
    });
  }, [pathname]);
  return (
    <>
      <WrapSearch onHide={() => setShow(false)} show={show} />
      <nav
        ref={ref}
        className="fixed top-4 rounded-full bg-gradient-to- bg-azure-50/90 to-azure-600/90 z-10 inset-x-0 w-[1200px] mx-auto flex items-center px-10 duration-200 transition-all"
        style={style}
      >
        <Link href="/">
          <h2 className="text-xl font-bold text-azure-700">KOSTPEDIA</h2>
        </Link>
        <ul className="text-slate-900 flex gap-2 container mx-auto px-5 ml-4">
          {nav.map((v, i) => {
            return v.child ? (
              <li
                key={i}
                onMouseEnter={() => hoverNav(v.title)}
                onMouseLeave={() => setHover(null)}
                // className={hover === v.title ? 'group active' : ''}
                className={cx({ hover: hover === v.title }, "classes")}
              >
                <a href="#">{v.title}</a>
                <ul className="absolute py-2 px-4 bg-white text-slate-900 rounded-md shadow-lg group-[.active]:show hide duration-200">
                  {v.child.map((vC, iC) => {
                    return (
                      <li
                        key={iC}
                        className="hover:bg-almond-50 rounded-md px-2 py-2 w-full"
                      >
                        <Link href="/" className="flex items-center">
                          <span className="text-2xl">{vC.icon}</span>
                          <div className="ms-4">
                            <p className="font-bold text-md">{vC.title}</p>
                            <p className="font-normal text-sm">{vC.desc}</p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ) : (
              <li>
                <Link href="/">{v.title}</Link>
              </li>
            );
          })}
          <li
            className={`my-3 mx-6 w-full max-w-sm ml-auto duration-200 invisible opacity-0 ${classSearch}`}
          >
            <button
              className="text-left rounded-full bg-white text-slate-400 mt-0.5 px-4 py-1 text-sm w-full"
              onClick={() => setShow(true)}
            >
              Cari Lokasi ...
            </button>
          </li>
          <li className="my-4 px-2 text-azure-700 font-bold border-r-2 border-azure-500">
            <Link href="/signup">Register</Link>
          </li>
          <li className="py-4 text-azure-700 font-bold">
            {/* <button onClick={() => signIn()}>Login</button> */}
            <Link href="/signin">Login</Link>
          </li>
        </ul>
      </nav>
      {/* <nav className="fixed top-0 right-0 z-20 w-1/2">
        <ul className="text-white flex gap-2 container mx-auto px-5">
          {nav.map((v, i) => {
            return (
              v.child
              ? <li
                  key={i}
                  onMouseEnter={() => hoverNav(v.title)}
                  onMouseLeave={() => setHover(null)}
                  // className={hover === v.title ? 'group active' : ''}
                  className={cx({hover: hover === v.title}, 'classes')}
              ><a href="#">{v.title}</a>
                  <ul className="absolute py-3 px-4 bg-white text-slate-900 rounded-md shadow-lg group-[.active]:show hide duration-200">
                  {(v.child).map((vC, iC) => {
                    return (
                      <li key={iC} className="hover:bg-azure-100 rounded-md px-2 py-2 w-full">
                        <Link href="/" className="flex items-center">
                          <span className="text-2xl">{vC.icon}</span>
                          <div className="ms-4">
                            <p className="font-bold text-md">{vC.title}</p>
                            <p className="font-normal text-sm">{vC.desc}</p>
                          </div> 
                        </Link>
                      </li>
                    );
                      })
                    }
                  </ul>
                </li>
                : <li><Link href="/">{v.title}</Link></li>
              )
            })

          }
        </ul> 
      </nav>*/}
    </>
  );
}
