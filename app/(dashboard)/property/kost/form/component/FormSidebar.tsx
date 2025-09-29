'use client'
import React from "react";
import useStore from './store';
import { FaStoreAlt , FaRegClone  } from "react-icons/fa";
import { FaMapLocationDot, FaCamera  } from "react-icons/fa6";
import { BsGrid3X2GapFill } from "react-icons/bs";
const sidebar = [
  {
    value:"Data Kost",
    icon: <FaStoreAlt />
  },{
    value:"Alamat Kost",
    icon: <FaMapLocationDot />
  },{
    value:"Foto Kost",
    icon: <FaCamera />
  },{
    value:"Fasilitas",
    icon: <BsGrid3X2GapFill  />,
    size: 'text-5xl'
  },{
    value:"Type Kamar",
    icon: <FaRegClone  />
  }
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
      <ul role="navbar" className="flex items-center justify-center gap-3 py-5 mx-auto mb-2">
        {sidebar.map((v, i) => {
          const key = i+1;
          return (
            <React.Fragment key={key}>
            <li
              data-value={key}
              className={`pb-1 flex items-center ${
                key <= currentStep ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={ key < currentStep ?  handleStep : undefined }
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`h-18 w-18  rounded-full flex-shrink-0 text-white flex items-center justify-center ${v.size || 'text-4xl'} ${key <= currentStep ? 'bg-meta-5 ' : 'bg-bodydark1'}`}>
                  {v.icon}
                </div>
                <label className={`font-semibold ${key <= currentStep ? 'text-boxdark' : 'text-bodydark2'}`}>{v.value}</label>
              </div>
            </li>
            {
              key !== sidebar.length && <li className={`flex border-t-2 border-dotted border-gray-300 mx-2 w-30 pb-9 ${key < currentStep && 'border-meta-5'}`}>
            </li>
            }
            
            </React.Fragment>
          );
        })}
      </ul>
    </>
}

export default FormSidebar