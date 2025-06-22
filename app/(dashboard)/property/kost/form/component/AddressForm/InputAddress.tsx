'use client'
import { memo } from 'react';
import { tKost, tAddress } from "../FormType";
import Textarea from '@/components/Form/CustomTextarea';
import useStore, { FormState } from '../store'
import { useForm } from '../FormHook';

type tInput = {
  name: keyof tAddress;
  param: keyof FormState;
  label: string;
}
const InputAddress = memo(function InputAddress({name, param, label}:tInput) {
  const full_address = useStore((store) => store.state.address[name]);
  const  { handleInput }  = useForm();

  return  <Textarea
          name={name}
          data-param={param}
          label={label}
          value={full_address}
          onChange={handleInput}
        />
})

export default InputAddress;