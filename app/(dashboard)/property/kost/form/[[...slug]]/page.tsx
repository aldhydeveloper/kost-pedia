import Form  from '../component';
import Button from "@/components/Utility/CustomButton";

import { FaChevronLeft } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

export default function FormWizardPage({ params }: { params: { slug: string } }) {
  const id = params.slug ? params.slug[0] : "";

  return (
    <>
      <Button
        href="/property/kost"
        role="link"
        className="text-xl text-black mb-8"
      >
        <FaChevronLeft /> Tambah Kost <FaHome />
      </Button>
      <Form id={id} />
    </>
  );
}