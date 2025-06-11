'use client'
import { useState, useEffect, memo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useFormContext } from '../../context/FormContext';
// import { FormContext } from '../../context/FormContextSelector';
// import { useAddress } from './AddressHook';
import { tLoc } from './AddressType';
import Province from '@/service/dashboard/province';
import Select from '@/components/Form/CustomSelect';
import { FormContext,useAddressProvince } from '../../context/FormContextSelector';
import useStore from '../store'

const SelectProvince = memo(function SelectProvince() {
  const province_id = useStore((store) => store.state.address.full_address);
  const dispatch = useStore((s) => s.dispatch)
    // const dispatch  = useAddressDispatch();
//   const address = useContextSelector(FormContext, ctx => ctx!.state.address);
//   const dispatch = useContextSelector(FormContext, ctx => ctx!.dispatch);
  console.log('render province')
    // const { dispatch } = useFormContext();
    // const { cities, getCities, districts, getDistricts, villages, getVillages } = useAddress();
    const [provinces, setProvinces] = useState<tLoc[]>([{ id: 0, name: "-- Pilih Provinsi --" }]);
    // console.log('render province')
    // useEffect(() => {
    //     const getProvince = async () => {
    //         const resp = await Province();
    //         if(resp.success){
    //             setProvinces([
    //                 {id: 0, name:'-- Pilih Provinsi --'}, 
    //                 ...resp.data
    //             ])
    //         }
    //     }
    //     getProvince();
    // }, []);
    return <Select
                id="province"
                label="Provinsi"
                name="province_id"
                data-param="address"
                isLoading={provinces.length == 0}
                option={provinces}
                // value={state.province_id}
                // onChange={() => {}}
            />
})

export default SelectProvince;