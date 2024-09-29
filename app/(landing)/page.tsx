import { useEffect } from "react";
import ButtonLocation from "@/components/Pages/Landing/ButtonLocation";
import Recommended from "@/components/Pages/Landing/Recommended";
import Promo from "@/components/Pages/Landing/Promo";
import Budget from "@/components/Pages/Landing/Budget";
import Campus from "@/components/Pages/Landing/Campus";

export default function Home() {
  return (
    <>
      <div className="bg-[url(/img/header.png)] h-screen bg-no-repeat bg-cover">
        <div
          className={`lg:px-20 px-10 bg-gradient-to-b from-[#00000090] from-50% to-transparent to-100% h-full w-full text-white flex flex-col items-center justify-center`}
        >
          <h1 className="text-6xl font-bold mt-auto pt-10 tracking-wider">
            Cari kost Exclusive murah dan terbaik
          </h1>
          <p className="text-3xl font-medium mb-6">
            cocok untuk harian dan bulanan
          </p>
          <input
            type="text"
            className="min-w-125 px-10 py-4 outline-none rounded-full text-black"
            placeholder="mau cari kost dimana?"
          />
          <div className="mt-auto ml-0 w-full py-10">
            <p className="font-medium">atau langsung cari di kota kamu</p>
            <div className="my-2 flex gap-4">
              <ButtonLocation text="Bandung" />
              <ButtonLocation text="Jakarta" />
              <ButtonLocation text="Yogyakarta" />
              <ButtonLocation text="Bali" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 container mx-auto px-10">
        <div className="pb-10">
          <p className="text-2xl font-bold text-black">Rekomendasi Kost</p>
          <Recommended />
        </div>

        <div className="pb-10">
          <p className="text-2xl font-bold text-black">Promo Berlangsung</p>
          <Promo />
        </div>

        <div className="pb-10">
          <p className="text-2xl font-bold text-black">
            Cari Hunian Sesuai Budgetmu
          </p>
          <Budget />
        </div>

        <div className="pb-10">
          <p className="text-2xl font-bold text-black">
            Cari hunian area sekitar kampus
          </p>
          <Campus />
          <Budget />
        </div>
      </div>
    </>
  );
}
