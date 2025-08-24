import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Input from '@/components/Form/CustomInput';
import CustomButton from "@/components/Utility/CustomButton";
import Post from '@/service/post';
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    
    const disabled = email === '' || loading === true;
    
    const handleChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleSend = async () => {
        setLoading(true);
        const resp = await Post(`${process.env.NEXT_PUBLIC_API_HOST}/forgot-password/send`, {
            email: email
        });
        if(resp.rc == '00'){
            setOpenModal(false);
            setLoading(false);
            setEmail('')
            toast.success(<span className="text-nowrap">{resp.message}</span>, {
                        position: "top-center",
                        className: "w-96",
                      });
        }else{ 
            toast.error(<span className="text-nowrap">{resp.message}</span>, {
                        position: "top-center",
                        className: "w-96",
                      });
        }
        // console.log(resp)
        // setDisabled(true)
    }
    return <>
        <Modal open={openModal} onClose={() => {setOpenModal(false)}} 
        styles={{
                modal: {
                    maxWidth: '400px',
                    width: '100%',
                    borderRadius: '8px'
                }
            }}
        center>
            <h1 className="text-2xl font-semibold text-boxdark mb-4">Lupa Password</h1>
            <div className=" w-full">
                <div className="mb-4">
                    <h3 className="text-lg mb-1 text-boxdark">Masukkan Email Anda</h3>
                    <small className="leading-5 block mb-1">Masukkan email yang terdaftar di Kostpedia untuk melakukan verifikasi password baru.</small>
                        <div className="relative">
                            <input
                            type="email"
                            value={email}
                            onChange={handleChangeEmail}
                            placeholder="alamat@email.com"
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
                                    d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                    fill=""
                                />
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
                <CustomButton disabled={disabled} isLoading={loading} onClick={handleSend} >
                    Lanjut
                </CustomButton>
            </div>
        </Modal>
        <p>
            <button type="button" onClick={() => setOpenModal(true)} className="text-meta-5">
                Lupa Password ?  
            </button>
        </p>
    </>
}

export default ForgotPassword;