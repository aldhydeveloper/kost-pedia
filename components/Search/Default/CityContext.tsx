'use client'
import { createContext, useReducer, ReactNode, useContext, useState  } from "react"

// interface iState{
//     districtId: number
// }
interface iAction{
    type: 'setDistrictId';
    payload: number;
}
type districtIdType = {
    cityId: number;
    setCityId: React.Dispatch<React.SetStateAction<number>>;
};
// const initialState = { districtId: 0 };
  
// function districtReducer(state:iState) {
//     return { districtId: state.districtId };
// }

const CityContexts = createContext<districtIdType | undefined>(undefined);

type CityProviderProps = {
    children: ReactNode;
  };
  
export function CityProvider({ children }: CityProviderProps) {
  // const [state, dispatch] = useReducer(districtReducer, initialState);
  const [cityId, setCityId] = useState<number>(0);
  // console.log(state)
  return (
    <CityContexts.Provider value={{ cityId, setCityId }}>
      {children}
    </CityContexts.Provider>
  );
}

// 8. Custom Hook
export function useCity() {
  const context = useContext(CityContexts);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context ;
}