import { InfinitySpin } from "react-loader-spinner";
import { ReactNode } from "react";
import Link from "next/link";
import Spinner from "@/components/spinner";

interface iProps {
  // type: React.ComponentProps<"button">;
  children: React.ReactNode;
  role?: string;
  icon?: ReactNode | null;
  disabled?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
}
const Button = ({ className, role = "button", ...props }: iProps) => {
  // console.log(props);
  // const className =
  // "";
  const Action = props.href ? (
    <Link
      href={props.href}
      className="inline-flex items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    />
  ) : (
    <button
      {...props}
      className={`cursor-pointer block text-center rounded-lg border
       ${
         role == "link"
           ? "border-none bg-tranparent py-2 text-azure-600"
           : "w-full border-primary bg-primary p-4 text-white"
       } transition  ${
        props.disabled ? "!opacity-70 cursor-default" : "hover:bg-opacity-90"
      } ${className}`}
    >
      {props.disabled ? <Spinner /> : props.children}
    </button>
  );
  return Action;
  // <button
  //   type={type}
  //   className="inline-flex items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
  // >
  //   <span>{icon ? icon : ""}</span>
  //   {text}
  // </button>
};
export default Button;
