'use client'
import { useEffect, useState } from 'react';
import CustomButton from'@/components/Utility/CustomButton';
import { useSearchParams, usePathname, useRouter  } from 'next/navigation';
import useFilter from './FilterHook';
const MoreButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [ start, setStart ] = useState();
  const { dispatch } = useFilter();
    
  // const startParam = Number.isNaN(searchParams.get('start') as string) ? parseInt(searchParams.get('start') as string) : 0;
  
  const handleClick = () => {
    // setStart(start + 10)
    // const params = new URLSearchParams(searchParams.toString());
    // console.log(startParam)
    // const start = startParam + 10
    
    // params.set('start', start.toString())
    // if(start)
      // router.push(`${pathname}?${params.toString()}`)
  }
  // useEffect(() => {
  //   setIsLoading(false);
  // }, []);
  return <>
    <CustomButton className={`block !w-50 mx-auto py-2 rounded-md `} onClick={handleClick} isLoading={isLoading}>Lihat Selengkapnya</CustomButton>
  </>
}

export default MoreButton;