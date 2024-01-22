'use client'
import Image from 'next/image'
interface iProps {
  img: string,
  name: string,
  childCallback: (name:string) => void
}


export default function City({ img, name, childCallback }: iProps) {
  function handleClick() {
    childCallback(name)
  }
  return (
    <div>
      <button className="w-full !aspect-h-[4] !aspect-w-[4] overflow-hidden rounded-md" onClick={handleClick}>
        <Image
            className="w-full h-full block object-cover"
            src={`/img/city/${img}`}
            alt={name}
            fill={true}
            sizes="(max-width: 288px) 100vw"
            loading="lazy"
            // width={400}
            // height={400}
        />
      </button>
      <p className="text-md text-slate-500">{name}</p>
    </div>
  )
}