'use client'
import {  useEffect, useReducer  } from 'react';
import { tKosts } from '../SearchType';
import Get from '@/service/get';

type tState = {
    kosts: tKosts[] | undefined;
    start: number;
    isLoading: boolean;
}
type Action =
  | { type: 'SET_KOST', kosts: tKosts[] }
  | { type: 'SET_LOADING', isLoading: false }
  | { type: 'NEXT' };

const reducer = (state: tState, action: Action): tState => {
  switch (action.type) {
    case 'SET_KOST':
      return { ...state, kosts: action.kosts};
    case 'NEXT':
      return { ...state, start: state.start + 10 };
    case 'SET_LOADING':
      return { ...state, isLoading: state.isLoading};
    default:
      return state;
  }
};

const useFilter = () => {
    const [state, dispatch] = useReducer(reducer, {
        kosts: undefined,
        start: 0,
        isLoading: false
    });
    // const [start, setStart] = useState<number>(0);
    // useEffect(() => {
    //     const getData = async () => {
    //         const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts/0/10`);
    //         if(resp.success){
    //             dispatch({type: 'SET_KOST', kosts: resp.data.kosts})
    //         }
    //     }
    //     getData();

    // }, []);
    console.log('das')
    // const kosts = state.kosts;
    return { state, dispatch }
}

export default useFilter;