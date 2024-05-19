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
  className?: string;
}

export default function customLink({
  href,
  children,
  className,
  role = "button",
  back = false,
  ...otherProps
}: iProps) {
  return (
    <Link
      href={href}
      {...otherProps}
      className={`inline-flex items-center ${className}
        ${
          role == "button"
            ? "px-6 py-2 rounded-full bg-azure-800 text-white"
            : "bg-transparent"
        }`}
    >
      {back ? <BsChevronLeft className="inline-block mr-3" /> : ""}
      {children}
    </Link>
  );
}
