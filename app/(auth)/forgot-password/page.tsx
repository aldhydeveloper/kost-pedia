'use client'
import { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Post from "@/service/post";
import CustomButton from "@/components/Utility/CustomButton";
import "react-toastify/dist/ReactToastify.css";

type tParams = {
    email: string;
    token: string
}

type tInput = {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

type tFormPassword = {
  password: string;
  confirmPassword: string;
  handlePassword: (e:React.ChangeEvent<HTMLInputElement>) => void
  handleConfirmPassword: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const InputPassword = memo(function InputPassword({label, placeholder, value, name,  onChange}: tInput) {
  // console.log(name)
  return <div className="mb-4">
      <h3 className="text-lg mb-1 text-boxdark">{label}</h3>
        <div className="relative">
            <input
            type="password"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
            />

                
              
        <span className="absolute right-4 top-4">
          <svg
            className="fill-current"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                fill=""
              />
              <path
                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                fill=""
              />
            </g>
          </svg>
        </span>
      </div>
    </div>
})
// const FormResetPassword = ({password, confirmPassword, handlePassword, handleConfirmPassword}:tFormPassword) => {
//   // console.log(form)
//   return 
// }
export default function ForgotPassword({searchParams}:{searchParams:tParams}) {
    // console.log(searchParams)
    const email = searchParams.email;
    const token = searchParams.token;
    const router = useRouter();
    const [verified, setVerified] = useState<boolean | undefined>(undefined);
    // const [form, setForm] = useState({
    //   password: '',
    //   confirmPassword: ''
    // });
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const disabled = isLoading || password === '' || confirmPassword === '';
    // const [disabled, setDisabled] = useState<boolean>(false);
    // console.log(password === '' && confirmPassword === '')
    // console.log(disabled)
    const handlePassword = useCallback((e:React.ChangeEvent<HTMLInputElement>)  => {
      const value = e.target.value;
      setPassword(value)
    }, [])
    const handleConfirmPassword = useCallback((e:React.ChangeEvent<HTMLInputElement>)  => {
      const value = e.target.value;
      setConfirmPassword(value);
    },[]);

    const handleSend = async () => {
       if(password !== confirmPassword){
        toast.error(<span className="text-nowrap">Password konfirmasi tidak sesuai.</span>, {
                  position: "top-center",
                  className: "w-96",
                });
        return false;
       }
       setIsLoading(true);

       
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/forgot-password/reset`,
          {
            method: "POST",
            headers:{
              authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                password_confirm: confirmPassword,
            })
          }
          
        ).then(resp => resp.json());
        // console.log(resp)
        if(resp.rc == '00'){
          toast.success(<span className="text-nowrap">{resp.message}</span>, {
                  position: "top-center",
                  className: "w-96",
                });       
          setTimeout(() => {
            router.push("/signin");
          }, 3000);
        }else{
          setIsLoading(false)
          toast.error(<span className="text-nowrap">{resp.message}</span>, {
                  position: "top-center",
                  className: "w-96",
                });
        }
    }
    
    useEffect(() => {
      async function verifyEmail(){
        const body = {
            email: email,
            token: token
        }
        const resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/forgot-password/verify`, body);
        // console.log(resp)
        if(resp.rc == '00'){
          setVerified(true);
        }else{
          setVerified(false);
        }
      }
      verifyEmail();
    }, [router, email, token]);

    if(verified === undefined || verified)
        return <div className="h-screen flex items-center justify-center flex-col">
          <ToastContainer />
          {
            verified ? 
              <>
                <div className="w-full max-w-96">
                  <h1 className="text-2xl font-semibold text-boxdark mb-4">Reset Password</h1>
                  
                  <InputPassword label="Password baru" placeholder="Masukkan Password Baru" name="password" value={password} onChange={handlePassword} />
                  <InputPassword label="Konfirmasi Password baru"  placeholder="Masukkan Konfirmasi Password Baru" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} />
                  
                  <CustomButton className="mt-10" disabled={disabled} onClick={handleSend} isLoading={isLoading}>
                    Kirim
                  </CustomButton>
                </div>
              </>:
              <>
                <h1 className="text-4xl font-semibold text-graydark">Verifikasi Email ...</h1>
                <small>Tunggu sebentar. sistem sedang memverifikasi email Anda</small>
              </>
          }
        </div>

    if(verified === false)
        router.push('/signin')

    // if(verified)
    //     router.push('forgot-password')
}
