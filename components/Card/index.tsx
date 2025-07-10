import React from "react";

export default function Card({
  children, // will be a page or nested layout
  id = "",
  style = {},
  customClass = "",
}: {
  children: React.ReactNode;
  id?: string;
  style?: object;
  customClass?: string;
}) {
  return (
    <>
      <div
        id={id}
        style={style}
        className={`${customClass} py-10 px-4 rounded-xl borde bg-white shadow-default box-content relative `}
      >
        {children}
      </div>
    </>
  );
}
