'use client'
import { memo } from 'react';
import { useFormContext } from '../../context/FormContext';
import { useForm } from '../FormHook';
import { tKost, tAddress } from "../FormType";
import Textarea from '@/components/Form/CustomTextarea';
import { useContextSelector } from 'use-context-selector';
import { FormContext, useAddress, useAddressDispatch } from '../../context/FormContextSelector';
import useStore from '../store'
// import { FormContext } from '../../context/FormContextSelector';
// import { FormContext, useAddress, useAddressDispatch } from '../../context/FormContextSelector';
const InputAddress = memo(function InputAddress({name}:{name: keyof tAddress}) {
  const full_address = useStore((store) => store.state.address.full_address);
  const dispatch = useStore((s) => s.dispatch)
    // const state = useAddress();
    // const dispatch  = useAddressDispatch();
    // const { state } = useFormContext();
    // const  { handleInput }  = useForm();
  // const address = useContextSelector(FormContext, ctx => ctx!.state.address);
  // const dispatch = useContextSelector(FormContext, ctx => ctx!.dispatch);
  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => { dispatch({type: 'SET_FIELD', field: e.target.name as keyof tKost, value: e.target.value, param: 'address'}) }
  return  <Textarea
          name="full_address"
          data-param="address"
          label="Alamat Kost"
          value={full_address}
          onChange={handleChange}
        />
})

export default InputAddress;