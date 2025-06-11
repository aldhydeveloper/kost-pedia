'use client'
import { useFormContext } from "../context/FormContext";
import Button from "@/components/Utility/CustomButton";
import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const FormNavigation = () => {
    const { state, dispatch } = useFormContext();
    const step = state.step;
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
                // disabled={disabled.current}
                // isLoading={isLoading}
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