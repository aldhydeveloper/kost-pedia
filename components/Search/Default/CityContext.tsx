'use client'
import { createContext, useReducer, ReactNode, useContext, useState  } from "react"

type tCity = {
  id: number;
  name: string;
} | undefined
type districtIdType = {
    city: tCity;
    setCity: React.Dispatch<React.SetStateAction<tCity>>;
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
  const [city, setCity] = useState<tCity>(undefined);
  // console.log(state)
  return (
    <CityContexts.Provider value={{ city, setCity }}>
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