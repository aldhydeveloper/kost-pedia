import Image from "next/image";
import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiTiktokLine } from "react-icons/ri";
export default function Footer() {
  return (
    <>
      <div className="bg-[#383838] py-10">
        <Image
          src="/img/footer/footer-bg.png"
          width={270}
          height={270}
          alt="Footer"
          className="absolute left-0 bottom-0 z-0"
        />
        <div className="relative container mx-auto text-white px-6">
          <div className="grid grid-cols-4 gap-8 px-4">
            <div>
              <Image
                src="/img/footer/white-logo.png"
                width={160}
                height={55}
                alt="Footer Logo"
                className="block mb-6"
              />
              <p className="font-light mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s
              </p>
              <div className="flex gap-4">
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
              </div>
            </div>
            <div className="flex justify-between col-span-3 gap-16 text-md">
              <ul className="mx-1">
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
              </ul>
              <ul className="mx-5">
                <li className="py-2 text-azure-700 text-bold">Hubungi Kami</li>
                <li className="flex gap-3 items-center py-1">
                  <MdOutlineEmail className="text-xl" /> kostpedia@gmai.com
                </li>
                <li className="flex gap-3 items-center py-1">
                  <FaWhatsapp className="text-xl" /> +6281323939393
                </li>
                <li className="flex gap-3 items-center py-1">
                  <CiFacebook className="text-xl" /> Kostpedia
                </li>
                <li className="flex gap-3 items-center py-1">
                  <FaInstagram className="text-xl" /> Kostpedia
                </li>
                <li className="flex gap-3 items-center py-1">
                  <FaXTwitter className="text-xl" /> Kostpedia
                </li>
                <li className="flex gap-3 items-center py-1">
                  <RiTiktokLine className="text-xl" />
                  Kostpedia
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 pb-2">
            <hr className="mb-2" />
            <small>© 2023 Kostpedia. All rights reserved</small>
          </div>
        </div>
      </div>
    </>
  );
}
