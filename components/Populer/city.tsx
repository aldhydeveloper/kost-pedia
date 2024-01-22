import { useState } from "react";
import Link from "next/link";
const data = [
  {
    city: "Jakarta",
    route: "/popular/jakarta",
    img: "jakarta.jpg",
  },
  {
    city: "Bandung",
    route: "/popular/jakarta",
    img: "bandung.jpg",
  },
  {
    city: "Bogor",
    route: "/popular/jakarta",
    img: "bogor.jpg",
  },
  {
    city: "Surabaya",
    route: "/popular/jakarta",
    img: "surabaya.jpg",
  },
  {
    city: "Yogyakarta",
    route: "/popular/jakarta",
    img: "yogyakarta.jpg",
  },
  {
    city: "Malang",
    route: "/popular/malang",
    img: "malang.jpg",
  },
];
export default function PopulerCity() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <>
      <h2 className="text-xl text-bold mb-3">Area Kos Populer</h2>
      <div className="grid grid-cols-6 gap-4">
        {data.map((v, i) => {
          return (
            <Link
              href="/search"
              className={`relative rounded-lg w-full h-60 bg-[length:190%] bg-no-repeat bg-center text-white overflow-hidden duration-200`}
              style={{
                backgroundImage: `url(/img/city/${v.img})`,
                backgroundSize: hover == v.city ? "230%" : "",
              }}
              key={i}
              onMouseEnter={() => setHover(v.city)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="bg-slate-900/60 flex items-center justify-center font-bold text-xl w-full h-full">
                <span>{v.city}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
