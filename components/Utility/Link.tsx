import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
enum eRole {
  "button",
  "link",
}
interface iProps {
  href: string;
  role?: string;
  back?: boolean;
  children: string | React.ReactNode;
}

export default function customLink({
  href,
  children,
  role = "button",
  back = false,
  ...otherProps
}: iProps) {
  return (
    <>
      <Link
        href={href}
        {...otherProps}
        className={`mb-5 inline-flex items-center text-lg
        ${
          role == "button"
            ? "px-6 py-2 rounded-full bg-azure-800 text-white"
            : "bg-transparent text-azure-950"
        }`}
      >
        {back ? <BsChevronLeft className="inline-block mr-3" /> : ""}
        {children}
      </Link>
    </>
  );
}
