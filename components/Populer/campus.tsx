import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const data = [
  {
    campus: "ITB",
    route: "/popular/itb",
    img: "itb.png",
    address: "Bandung",
  },
  {
    campus: "UNPAD",
    route: "/popular/unpad",
    img: "unpad.png",
    address: "Jatinangor",
  },
  {
    campus: "UPI",
    route: "/popular/upi",
    img: "upi.svg",
    address: "Bandung",
  },
  {
    campus: "UNIKOM",
    route: "/popular/unikom",
    img: "unikom.png",
    address: "Bandung",
  },
  {
    campus: "Universitas Maranatha",
    route: "/popular/maranatha",
    img: "maranatha.png",
    address: "Bandung",
  },
  {
    campus: "UNPAR",
    route: "/popular/unpar",
    img: "unpar.png",
    address: "Bandung",
  },
  {
    campus: "TELKOM",
    route: "/popular/telkom",
    img: "telkom.png",
    address: "Bandung",
  },
  {
    campus: "UGM",
    route: "/popular/ugm",
    img: "ugm.png",
    address: "Yogyakarta",
  },
];
export default function PopulerCity() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <>
      <h2 className="text-xl text-bold mb-3">Area Kos Sekitar Kampus</h2>
      <div className="grid grid-cols-8 gap-4">
        {data.map((v, i) => {
          return (
            <Link
              href="/search"
              className={`relative shadow-md rounded-lg w-full h-24 overflow-hidden duration-200 flex items-center justify-center gap-4 py-2 px-4`}
              // style={{
              //   // backgroundImage: `url(/img/campus/${v.img})`,
              //   backgroundSize: hover == v.city ? "130%" : "",
              // }}
              key={i}
              onMouseEnter={() => setHover(v.campus)}
              onMouseLeave={() => setHover(null)}
            >
              {/* <div className="bg-slate-900/60 flex items-center justify-center font-bold text-xl w-full h-full"></div> */}
              {/* <div className="grid"> */}
              <Image
                src={`/img/campus/${v.img}`}
                width={50}
                height={40}
                alt={v.campus}
              />
              <div>
                <p className="text-xs font-bold">{v.campus}</p>
                <p className="text-xs">{v.address}</p>
              </div>
              {/* </div> */}
            </Link>
          );
        })}
      </div>
    </>
  );
}
