'use client'
import React from "react";
import useStore from './store';
const sidebar = [
  "Data Kost",
  "Alamat Kost",
  "Foto Kost",
  "Fasilitas",
  "Type Kamar",
];

const FormSidebar = () => {
    const dispatch  = useStore(s => s.dispatch);
    const currentStep = useStore(s => s.state.step);

    const handleStep = (e:React.MouseEvent<HTMLLIElement>) => {
        // console.log(e)
        const target = e.currentTarget;
        dispatch({
            type: 'SET_STEP',
            value: parseInt(target.getAttribute('data-value') ?? '0')
        })
    }
    return <>
      <ul role="sidebar">
        {sidebar.map((v, i) => {
          const key = i+1;
          return (
            <li
              key={key}
              data-value={key}
              className={`pb-1 flex items-center gap-2 ${
                key <= currentStep ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={ key < currentStep ?  handleStep : undefined }
            >
              <span
                className={`inline-block w-4 h-4 rounded-full border-2 ${
                  key <= currentStep
                    ? "border-meta-5 bg-meta-5"
                    : " opacity-55"
                }`}
              ></span>
              <span
                className={`${
                  key <= currentStep ? "text-meta-5" : "opacity-55"
                }`}
              >
                {v}
              </span>
            </li>
          );
        })}
      </ul>
    </>
}

export default FormSidebar