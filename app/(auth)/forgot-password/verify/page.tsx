'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Post from "@/service/post";
import { setCookie } from "cookies-next";

type tParams = {
    email: string;
    token: string
}

export default function Verify({searchParams}:{searchParams:tParams}) {
    // console.log(searchParams)
      const router = useRouter();
      const [verified, setVerified] = useState<boolean | undefined>(undefined);
    
    useEffect(() => {
        async function verifyEmail(){
            const body = {
                email: searchParams.email,
                token: searchParams.token
            }
            const resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/forgot-password/verify`, body);
            console.log(resp)
            if(resp.rc == '00'){
                setCookie('reset-token', body);
                setVerified(true);
            }
        }
        verifyEmail();
    }, [router, searchParams]);

    if(verified === undefined)
        return <div className="h-screen flex items-center justify-center flex-col">
            <h1 className="text-4xl font-semibold text-graydark">Verifikasi Email ...</h1>
            <small>Tunggu sebentar. halaman ini akan otomatis berpindah</small>
        </div>

    if(verified === false)
        router.push('/signin')

    if(verified)
        router.push('forgot-password')
}
