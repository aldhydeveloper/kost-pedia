'use client'

import React, { createContext, useContext, useReducer } from 'react';

type AddressState = {
    province_id: number;
}
type AddressAction = {
    type: 'SET_LOC'; field: string; value: number;
}

const FormContext = createContext<{
  state: AddressState;
  dispatch: React.Dispatch<AddressAction>;
} | undefined>(undefined);

const initialState:AddressState = {
    province_id: 0,
}

function formReducer(state: AddressState, action: AddressAction): AddressState {
  switch (action.type) {
    default:
      return state;
  }
}

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within a FormProvider');
  return context;
};
// export type { FormState }