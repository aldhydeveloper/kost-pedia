'use client'
import { tKost } from '../FormType';
import { useForm, } from '../FormHook';
import Input from "@/components/Form/CustomInput";
import { PatternFormat } from "react-number-format";
import Select from '@/components/Form/CustomSelect';
import Textarea from '@/components/Form/CustomTextarea';
import useStore from "../store";
import Rules from './CheckboxRules'
import { FaStoreAlt } from "react-icons/fa";
import { BiMale, BiFemale, BiMaleFemale } from "react-icons/bi";
import HeaderForm from '../Untility/HeaderForm';
import Image from 'next/image';

const category = [
    {
      id: "Campur",
      value: "Campur",
      // icon: BiMaleFemale
      image: 'campur'
    },
    {
      id: "Putri",
      value: "Putri",
      // icon: BiFemale
      image: 'putri'
    },
    {
      id: "Putra",
      value: "Putra",
      // icon: BiMale
      image: 'putra'
    },
  ]
const KostForm = () => {
  const kost = useStore(({ state }) => state.kost);
  console.log('form')
  const  { handleInput, handleInputFormatNumber }  = useForm();
  return <>
    <HeaderForm title="Data Kost" desc={<>Silahkan Lengkapi data <strong>Kost</strong> Anda</>} Icon={FaStoreAlt} />
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="grid grid-cols-5 gap-4">
          <Input
            classNameParent="col-span-3"
            label="Nama Kost"
            name="name"
            data-param="kost"
            value={kost.name}
            onChange={handleInput}
          />
          <div className="col-span-2">
            <label className="mb-2 inline-block text-nowrap">
              Tahun kost dibangun
            </label>
            <PatternFormat
              value={kost.created_year}
              onValueChange={(values) => handleInputFormatNumber(values, 'created_year', 'kost')}
              data-param="kost"
              mask="_"
              format="####"
              allowEmptyFormatting
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter"
            />
          </div>
          {/* <Select
            classNameParent="col-span-2"
            label="disewakan untuk"
            data-param="kost"
            name="category"
            value={kost.category}
            option={[
              {
                id: "",
                name: "-- Pilih Katergori --",
              },
              {
                id: "Putra",
                name: "Putra",
              },
              {
                id: "Putri",
                name: "Putri",
              },
              {
                id: "Campur",
                name: "Campur",
              },
            ]}
            onChange={handleInput}
          /> */}
        </div>
        <div>
          <label className="mb-2 inline-block text-nowrap">
            Kost untuk ?
          </label>
          <div className="flex mb-4 gap-10">
            {
              category.map(v => (
                <div key={v.id}>
                  <input id={v.id} type="radio" name="category" data-param="kost" className="hidden" value={v.value} checked={kost.category === v.value} onChange={handleInput} />
                  <label htmlFor={v.id} className={`text-center cursor-pointer  ${kost.category === v.value && 'text-meta-5'}`}>
                    <Image src={`/img/form-kost/${v.image}-${kost.category === v.value ? 'check' : 'uncheck'}.png`} alt="campur-unchecked" width={80} height={80} />
                    <p>{v.value}</p>
                  </label>
                </div>
              ))
            }
          </div>
        </div>
        <Textarea
          label="Deskripsi Kost (Optional)"
          name="desc"
          data-param="kost"
          value={kost.desc}
          onChange={handleInput}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nama Admin Kost (Optional)"
            placeholder="cth. kost xxx"
            name="admin_kost_name"
            data-param="kost"
            value={kost.admin_kost_name}
            onChange={handleInput}
          />
          <Input
            label="No. Telp Admin Kost (Optional)"
            name="admin_kost_phone"
            data-param="kost"
            value={kost.admin_kost_phone}
            onChange={handleInput}
          />
        </div>
      </div>
      <div>
        <Rules />
      </div>
    </div>
  </>
}
export default KostForm;
export type {tKost}