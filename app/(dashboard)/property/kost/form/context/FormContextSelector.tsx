import { useReducer, ReactNode  } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import type { tKost, tAddress } from "../component/FormType";

type FormState = {
    kost: tKost;
    address: tAddress;
    step: number;
}

type FormAction = {
    type: 'NEXT_STEP'
} | {
    type: 'PREV_STEP'
} | {
    type: 'SET_STEP'; value: number;
} | {
    type: 'SET_FIELD'; field: keyof tKost | keyof tAddress; value: string ; param: keyof Omit<FormState, 'step'>;
}

type ContextValue = {
    state: FormState;
    dispatch: React.Dispatch<FormAction>;
} | null



function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    case 'SET_STEP':
      return { ...state, step: action.value };
    case 'SET_FIELD':
      console.log(action)
        return { ...state, address : {
            ...state.address,
            full_address: action.value
        } 
    };
    default:
      return state;
  }
}

const initialState:FormState = {
    kost: {
        name: '',
        desc: '',
        created_year: '',
        category: '',
        kost_rules: [],
        admin_kost_name: '',
        admin_kost_phone: ''
    },
    address: {
        full_address: '',
        address_note: '',
        province_id: 0,
        city_id: 0,
        district_id: 0,
        village_id: 0
    },
    step: 1
}
const FormContext = createContext<ContextValue>({
    state: initialState,
    dispatch: () => { throw new Error('dispatch called outside FormProvider') }
})

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const contextValue:ContextValue = {
    state,
    dispatch,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}
// export const useFormContext = () => {
//   const context = useContextSelector(FormContext);
//   if (!context) throw new Error('useFormContext must be used within a FormProvider');
//   return context;
// };


const useAddress =  () =>  useContextSelector(FormContext, ctx => ctx!.state.address.full_address)
const useAddressProvince =  () =>  useContextSelector(FormContext, ctx => ctx!.state.address.province_id)

const useAddressDispatch = () => useContextSelector(FormContext, ctx => ctx!.dispatch);


export { FormContext, FormProvider, useAddress, useAddressProvince, useAddressDispatch };