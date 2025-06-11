import { FormProvider } from './context/FormContext';
import Form  from './component';
import Button from "@/components/Utility/CustomButton";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function FormWizardPage() {
  return (
    <FormProvider>
      <Button
        href="/property/kost"
        role="link"
        className="text-xl text-black mb-8"
      >
        <FaChevronLeft /> Property
      </Button>
      <Form />
    </FormProvider>    
  );
}