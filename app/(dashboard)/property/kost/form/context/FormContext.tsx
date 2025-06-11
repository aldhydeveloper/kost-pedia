'use client'

import React, { createContext, useContext, useMemo, useReducer } from 'react';
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
    type: 'SET_FIELD'; field: keyof tKost | keyof tAddress; value: string | number | string[] | number[]; param: keyof Omit<FormState, 'step'>;
}

const FormContext = createContext<{
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
} | undefined>(undefined);

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

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    case 'SET_STEP':
      return { ...state, step: action.value };
    case 'SET_FIELD':
      return { ...state, [action.param] : {
        ...state[action.param],
        [action.field]: action.value
    } };
    default:
      return state;
  }
}

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const context = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <FormContext.Provider value={context}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within a FormProvider');
  return context;
};

export type { FormState }