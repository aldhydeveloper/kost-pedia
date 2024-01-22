'use client'
import Image from 'next/image';
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Slide() {
  const slider = [
    {url: 'slide1.jpg', alt: 'Image 1'},
    {url: 'slide2.jpeg', alt: 'Image 2'},
    {url: 'slide3.jpg', alt: 'Image 3'},
    {url: 'slide4.jpg', alt: 'Image 4'},
  ]
  return (
    <>
      <div className="relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={true}
          pagination={true}
          loop={true}
          data-swiper-autoplay="2000"
        >
          {slider.map((v, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="relative min-h-[70vh]">
                  {/* <div className="absolute top-0 right-0 bottom-0 left-0 bg-slate-700/80 opacity-70 z-10"></div> */}
                  <Image
                    fill
                    src={`/img/${v.url}`}
                    alt={v.alt}
                    style={{ objectFit: 'cover' }}
                    priority={true}
                    sizes="(max-width: 1024px) 100vw"
                  />
                </div>
              </SwiperSlide>
            )
          })

          }
          {/* <SwiperSlide>
            <div className="relative min-h-[60vh]">
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-70 z-10"></div>
              <Image
                fill
                src="/img/slide1.jpg"
                alt="Image 1"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide> */}
        </Swiper>
      </div>
    </>
  );
};