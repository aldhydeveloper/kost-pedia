import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

interface iButtonLoc {
  text: string;
  href: string;
}
const ButtonLocation = ({ text, href }:iButtonLoc) => {
  return (
    <>
      <Link
        href={href}
        className="bg-meta-5 rounded-full px-4 py-2 flex items-center text-lg"
      >
        <FaMapMarkerAlt className="mr-4" />
        {/* <span className="block w-6 h-6 rounded-full bg-bodydark mr-5"></span> */}
        {text}
      </Link>
    </>
  );
};

export default ButtonLocation;
