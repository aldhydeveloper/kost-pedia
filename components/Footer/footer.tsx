import Image from "next/image";
import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp, FaYoutube, FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { RiTiktokLine } from "react-icons/ri";
export default function Footer() {
  return (
    <>
      <div className="bg-[#383838] py-12">
        <Image
          src="/img/footer/footer-bg.png"
          width={270}
          height={270}
          alt="Footer"
          className="absolute left-0 bottom-0 z-0"
        />
        <div className="relative container mx-auto text-white px-6">
          <div className="grid xl:grid-cols-4 gap-8">
            <div className="col-span-3">
              <Image
                src="/img/footer/white-logo.png"
                width={160}
                height={55}
                alt="Footer Logo"
                className="block mb-6"
              />
              <p className="font-light mb-6">
                Dapatkan Info Kost Exclusive Murah dan Nyaman Hanya di Kostpedia.id
              </p>
              {/* <div className="flex gap-4">
                <Link href="/">
                  <Image
                    src="/img/footer/googleplay.png"
                    width={120}
                    height={50}
                    alt="Google Play"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/img/footer/appstore.png"
                    width={130}
                    height={50}
                    alt="App Store"
                  />
                </Link>
              </div> */}
            </div>
            <div className="flex flex-wrap justify-between gap-16 text-md">
              {/* <ul className="mx-1">
                <li className="py-2 text-azure-700 font-bold">Lorem</li>
                <li>Ipsum</li>
                <li>Ipsum</li>
                <li>Ipsum</li>
              </ul>
              <ul className="mx-1">
                <li className="py-2 text-azure-700 font-bold">Lorem</li>
                <li>Ipsum</li>
                <li>Ipsum</li>
              </ul>
              <ul className="mx-1">
                <li className="py-2 text-azure-700 font-bold">Lorem</li>
                <li>Ipsum</li>
                <li>Ipsum</li>
              </ul>
              <ul className="mx-1">
                <li className="py-2 text-azure-700 font-bold">Lorem</li>
                <li>Ipsum</li>
                <li>Ipsum</li>
                <li>Ipsum</li>
              </ul> */}
              <ul className="xl:mx-5">
                <li className="py-2 text-meta-5 text-bold">Hubungi Kami</li>
                <li className="flex gap-3 items-center py-1">
                  <MdOutlineEmail className="text-xl" /> info.kostpediaindonesia@gmail.com
                </li>
                <li className="flex gap-3 items-center py-1">
                  <Link className="flex gap-3 items-center"  href="https://wa.me/+6285179690858" target="_blank">
                    <FaWhatsapp className="text-xl" /> +6285179690858
                  </Link>
                </li>
                <li className="py-1">
                  <Link className="flex gap-3 items-center" href="https://www.youtube.com/@kostpedia.indonesia" target="_blank">
                    <FaYoutube className="text-xl" /> Kostpedia
                  </Link>
                </li>
                <li className="py-1">
                  <Link className="flex gap-3 items-center" href="https://www.instagram.com/kostpedia.indonesia/" target="_blank">
                    <FaInstagram className="text-xl" /> Kostpedia
                  </Link>
                </li>
                {/* <li className="flex gap-3 items-center py-1">
                  <FaXTwitter className="text-xl" /> Kostpedia
                </li> */}
                <li className="py-1">
                <Link className="flex gap-3 items-center" href="https://www.tiktok.com/@kostpedia.id" target="_blank">
                  <RiTiktokLine className="text-xl" />Kostpedia
                </Link>
                  
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
            <hr className="mb-2" />
            <small>© 2023 Kostpedia. All rights reserved</small>
          </div>
        </div>
      </div>
    </>
  );
}
