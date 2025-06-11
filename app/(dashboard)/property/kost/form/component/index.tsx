'use client'
import { motion } from "framer-motion";

import { useFormContext } from "../context/FormContext";
import { FormProvider } from '../context/FormContextSelector';
import Card from "@/components/Card";
import FormNavigation from './FormNavigation' 
import FormSidebar from './FormSidebar'; 
import Kost from './KostForm' ;
import Address from './AddressForm' ;
const Form = () => {
    const { state } = useFormContext();
    return <FormProvider><div className="grid grid-cols-4 gap-4">
            <Card>
                <FormSidebar />
            </Card>
            <div className="col-span-3 relative">
                
            <Card>
                <form>
                    <motion.div
                        key={state.step}
                        className="mb-10"
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {state.step === 1 && <Kost />}
                        {state.step === 2 && <Address />}
                    </motion.div>
                    <FormNavigation />
                </form>
            </Card>
            </div>
        </div>
        </FormProvider>
}

export default Form;