'use client'
import useStore from "./store";
import Button from "@/components/Utility/CustomButton";
import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useForm } from './FormHook';
const FormNavigation = () => {
    const step = useStore(s => s.state.step);
    const submited = useStore(s => s.state.submited);
    const dispatch = useStore(s => s.dispatch);
    // const { submitForm } = useForm()
    return <>
        <div className="inline-flex items-center justify-between w-full">
        <IconContext.Provider
            value={{ size: "1rem", className: "inline-block" }}
        >
            <Button
            type="button"
            size="sm"
            className={`inline-flex items-center justify-start ${
                step == 1 && "invisible"
            }`}
            onClick={() => dispatch({type: 'PREV_STEP'})}
            inline
            >
            <FaChevronLeft />
            <p>Back</p>
            </Button>
            {step < 5 && (
            <Button
                type="button"
                size="sm"
                className={`inline-flex items-center justify-end`}
                onClick={() => dispatch({type: 'NEXT_STEP'})}
                // disabled={disabled.current}
                inline
            >
                Lanjutkan
                <FaChevronRight />
            </Button>
            )}
            {step >= 5 && (
            <Button
                size="sm"
                className={`inline-flex items-center justify-end`}
                disabled={submited}
                isLoading={submited}
                inline
            >
                Simpan
            </Button>
            )}
        </IconContext.Provider>
        </div>
    </>
}

export default FormNavigation