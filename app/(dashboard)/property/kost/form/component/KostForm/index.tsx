'use client'
import { useFormContext } from '../../context/FormContext';
import { tKost } from '../FormType';
import { useForm } from '../FormHook';
import { useKost, tRules } from '../KostForm/KostHook';
import Input from "@/components/Form/CustomInput";
import { PatternFormat } from "react-number-format";
import Select from '@/components/Form/CustomSelect';
import Textarea from '@/components/Form/CustomTextarea';
import Checkbox from '@/components/Checkboxes/Checkbox';

const KostForm = () => {
    const { state } = useFormContext();
    const  { handleInput, handleInputFormatNumber, handleCheckbox }  = useForm();
    const  { rules }  = useKost();
    // console.log('render kost')
    return <>
      <div className="grid grid-cols-5 gap-4">
        <Input
          classNameParent="col-span-2"
          label="Nama Kost"
          name="name"
          data-param="kost"
          value={state.kost.name}
          onChange={handleInput}
        />
        <div className="col-span-1">
          <label className="mb-2 inline-block text-nowrap">
            Tahun kost dibangun
          </label>
          <PatternFormat
            value={state.kost.created_year}
            onValueChange={(values) => handleInputFormatNumber(values, 'created_year', 'kost')}
            data-param="kost"
            mask="_"
            format="####"
            allowEmptyFormatting
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-azure-500 active:border-azure-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-azure-500"
          />
        </div>
        <Select
          classNameParent="col-span-2"
          label="disewakan untuk"
          data-param="kost"
          name="category"
          value={state.kost.category}
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
        />
      </div>
      <Textarea
        label="Deskripsi Kost"
        name="desc"
        data-param="kost"
        value={state.kost.desc}
        onChange={handleInput}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nama Admin Kost"
          name="admin_kost_name"
          data-param="kost"
          value={state.kost.admin_kost_name}
          onChange={handleInput}
        />
        <Input
          label="No. Telp Admin Kost"
          name="admin_kost_phone"
          data-param="kost"
          value={state.kost.admin_kost_phone}
          onChange={handleInput}
        />
      </div>
      <p className="mb-2">Peraturan Kost</p>
      {
        rules.length > 0 && (
        <ul className="grid grid-cols-2 gap-2 mb-8">
          {rules.map((v:tRules) => (
            <li key={v.id}>
              <Checkbox
                id={`check${v.id}`}
                value={v.id}
                label={v.name}
                checked={state.kost.kost_rules.includes(v.id)}
                name="kost_rules"
                data-param="kost"
                onChange={handleCheckbox}
              />
            </li>
          ))}
        </ul>
        )
      }
    </>
}
export default KostForm;
export type {tKost}