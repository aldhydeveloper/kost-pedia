'use client'
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useStore from './store';
import Card from "@/components/Card";
import FormNavigation from './FormNavigation' 
import FormSidebar from './FormSidebar'; 
import KostForm from './KostForm' ;
import AddressForm from './AddressForm' ;
import ImageForm from './ImageKostForm' ;
import FacilitiesForm from './FacilitiesForm' ;
import RoomForm from './RoomForm' ;
import { useForm } from "./FormHook";

import "react-toastify/dist/ReactToastify.css";
import Get from "@/service/get";
import { tRooms } from "./FormType";

async function urlToFile(url: string, filename: string, mimeType?: string): Promise<File> {
    console.log(`${process.env}`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType || blob.type });
}

const Form = ({id}:{id:string}) => {
    const router  = useRouter();
    const step = useStore(s => s.state.step);
    const state = useStore(s => s.state);
    const dispatch = useStore(s => s.dispatch);
    const { submitForm } = useForm();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        try {
            const resp = await submitForm(e, id);
            
            if (resp.success) {
                toast.success(<span className="text-nowrap">{resp.success}</span>, {
                    position: "top-center",
                    className: "w-96",
                });
                setTimeout(() => {
                    router.push("/property/kost");
                }, 3000);
            } else {
                console.log(toast)
                toast.error(<span className="text-nowrap">{resp.error}</span>, {
                    position: "top-center",
                    className: "w-96",
                });
                dispatch({
                    type: 'SUBMITED',
                    value: false
                })
            }
        } catch (e) {
            toast.error(<span className="text-nowrap">Internal Server Error.</span>, {
                position: "top-center",
                className: "w-96",
            });
            dispatch({
                type: 'SUBMITED',
                value: false
            })
        }
    }

    useEffect(() => {
        if(id){
            const getDataKost = async () => {
                const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/kost/${id}`);
                // console.log(resp)
                if(resp.success){
                    const d = resp.data;
                    // console.log(d.name)
                    const first_image_split = d.front_image.split('/')
                    const first_image_name = first_image_split[2] || undefined;
                    console.log(first_image_name)
                    const first_image = first_image_name ? await urlToFile(d.front_image, first_image_name) : undefined;
                    dispatch({
                        type: 'SET_KOST',
                        state: {
                            kost: {
                                name: d.name,
                                desc: d.desc,
                                created_year: d.created_year,
                                category: d.category,
                                kost_rules: d.rules.map((v:{id:number}) => v.id),
                                admin_kost_name: d.admin_kosts.name,
                                admin_kost_phone: d.admin_kosts.phone,
                              },
                              address: {
                                full_address: d.address,
                                address_note: d.address_note,
                                province_id: d.province.id,
                                city_id: d.city.id,
                                district_id: d.district.id,
                                village_id: d.village.id,
                              },
                              image: {
                                first_image: first_image,
                                second_image: d.inside_image,
                                third_image: d.street_image,
                              },
                              facilities: {
                                value: d.facilities.map((v:{id:number}) => v.id),
                              },
                              rooms: d.rooms.map((v:any) => {
                                return {
                                    type_name: v.name,
                                    desc: v.desc,
                                    p: 0,
                                    l: 0,
                                    price: 0,
                                    price_year: 0,
                                    room_facilities: [],
                                    bath_facilities: [],
                                    first_image: undefined,
                                    second_image: [],
                                    third_image: undefined,
                                    active: true,
                                    thumbnail: "",
                                }
                              }),
                        }
                    })   
                }
            }
            getDataKost();
        }
    }, [id, dispatch])
    // console.log(state)
    if(id && !state.kost.name) return;
    // console.log('render')
    return <>
        <ToastContainer />
        <div className="grid grid-cols-4 gap-4">
            <Card>
                <FormSidebar />
            </Card>
            <div className="col-span-3 relative">
                
            <Card>
                <form onSubmit={handleSubmit}>
                    <motion.div
                        key={step}
                        className="mb-10"
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {step === 1 && <KostForm />}
                        {step === 2 && <AddressForm />}
                        {step === 3 && <ImageForm />}
                        {step === 4 && <FacilitiesForm />}
                        {step === 5 && <RoomForm />}
                    </motion.div>
                    <FormNavigation />
                </form>
            </Card>
            </div>
        </div>
        </>
}

export default Form;