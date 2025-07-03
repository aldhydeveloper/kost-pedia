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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType || blob.type });
}

const Form = ({id}:{id:string}) => {
    const router  = useRouter();
    const step = useStore(s => s.state.step);
    const name = useStore(s => s.state.kost.name);
    const dispatch = useStore(s => s.dispatch);
    const { submitForm } = useForm();
    // console.log('form')
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        try {
            const resp = await submitForm(e, id);
            
            if (resp.success) {
                toast.success(<span className="text-nowrap">{resp.success}</span>, {
                    position: "top-center",
                    className: "w-96",
                });
                setTimeout(() => {
                    
                    dispatch({
                        type: "SET_INITIAL"
                    });
                    router.push("/property/kost");
                }, 3000);
            } else {
                console.log(toast)
                toast.error(<span className="text-nowrap">{resp.error}</span>, {
                    position: "top-center",
                    className: "w-96",
                });
                // dispatch({
                //     type: 'SUBMITED',
                //     value: false
                // })
            }
        } catch (e) {
            toast.error(<span className="text-nowrap">Internal Server Error.</span>, {
                position: "top-center",
                className: "w-96",
            });
            // dispatch({
            //     type: 'SUBMITED',
            //     value: false
            // })
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
                    const first_image_name = first_image_split[2] || '';
                    const first_image = first_image_name ? await urlToFile(d.front_image, first_image_name) : undefined;
                    
                    const second_image = Array.isArray(d.inside_image) ? await Promise.all(d.inside_image.map(async (v:string) => {
                        const second_image_split = v.split('/')
                        const second_image_name = second_image_split[2] || '';
                        return await urlToFile(v, second_image_name);
                    })) : [];
                    // const s = await Promise.all(second_image);
                    // console.log(second_image)
                    const third_image_split = d.street_image.split('/')
                    const third_image_name = third_image_split[2] || '';
                    const third_image = third_image_name ? await urlToFile(d.street_image, third_image_name) : undefined;
                    dispatch({
                        type: 'SET_KOST',
                        state: {
                            id: d.id,
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
                                address: d.address,
                                address_note: d.address_note,
                                province_id: d.province.id,
                                city_id: d.city.id,
                                district_id: d.district.id,
                                village_id: d.village.id
                              },
                              image: {
                                first_image: first_image,
                                second_image: second_image,
                                third_image: third_image,
                              },
                              facilities: {
                                value: d.facilities.map((v:{id:number}) => v.id),
                              },
                              rooms: await Promise.all(d.rooms.map(async (v:any) => {
                                const arr_room_size = v.room_size.split('x');
                                
                                const first_image_split = v.front_image.split('/')
                                const first_image_name = first_image_split[2] || '';
                                const first_image = first_image_name ? await urlToFile(v.front_image, first_image_name) : undefined;
                                
                                const second_image_name = v.inside_image;
                                const second_image = Array.isArray(v.inside_image) ? await Promise.all(v.inside_image.map(async (v:string) => {
                                    const second_image_split = v.split('/')
                                    const second_image_name = second_image_split[2] || '';
                                    const image = await urlToFile(v, second_image_name);
                                    // console.log(image)
                                    return image;
                                })) : [];

                                // console.log(first_image)
                                // console.log(second_image)
                                
                                const third_image_split = v.bath_image.split('/')
                                const third_image_name = third_image_split[2] || '';
                                const third_image = third_image_name ? await urlToFile(v.bath_image, third_image_name) : undefined;

                                let thumbnail;
                                if(v.thumbnail == v.front_image)
                                    thumbnail = 'first_image'
                                else if(v.inside_image.includes(v.thumbnail))
                                    thumbnail = `second_image${v.inside_image.indexOf(v.thumbnail)}`
                                else if(v.thumbnail == v.bath_image)
                                    thumbnail = 'third_image'

                                return {
                                    id: v.id,
                                    type_name: v.name,
                                    desc: v.desc,
                                    p: arr_room_size[0] ? parseInt(arr_room_size[0]) : 0,
                                    l: arr_room_size[1] ? parseInt(arr_room_size[1]) : 0,
                                    price: v.price,
                                    price_year: v.price_year,
                                    facilities: v.facilities.map((v:{id: number}) => v.id),
                                    bath_facilities: v.bath_facilities.map((v:{id: number}) => v.id),
                                    front_image_rrom: first_image,
                                    inside_image_room: second_image,
                                    bath_image_room: third_image,
                                    active: v.status,
                                    thumbnail: thumbnail,
                                }
                            }))
                        }
                    })   
                }
            }
            getDataKost();
        }
    }, [id, dispatch])
    // console.log(state)
    if(id && !name) return;
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