import Image from "next/image";
import Link from "next/link";
import { NumericFormat } from "react-number-format";
export default function Product({
  folder,
  img,
  name,
  address,
  price,
  route,
}: any) {
  return (
    <>
      <Link
        href={route}
        className="webkit-border-radius relative cursor-pointer snap-center transition-all duration-300 ease-in-out"
      >
        <div className="w-[75vw] md:w-[278px] !aspect-h-[3] !aspect-w-[4] mb-1 overflow-hidden rounded-lg">
          <Image
            className="w-full h-full block object-cover"
            src={img.indexOf("uploads") > -1 ? img : `/img/${folder}/${img}`}
            alt={name}
            fill={true}
            sizes="(max-width: 288px) 100vw"
            loading="lazy"
            // width={400}
            // height={400}
          />
        </div>
        <h4 className="text-md font-bold mb-0">{name}</h4>
        <small>{address}</small>
        <NumericFormat
          value={price}
          prefix="Rp. "
          thousandSeparator="."
          decimalSeparator=","
          className="text-sm font-bold"
          displayType="text"
        />
      </Link>
    </>
  );
}
