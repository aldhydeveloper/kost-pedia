import { InfinitySpin } from "react-loader-spinner";
import { ReactNode } from "react";
import Link from "next/link";
import Spinner from "@/components/spinner";

interface iProps {
  // type: React.ComponentProps<"button">;
  children: React.ReactNode;
  size?: string;
  role?: string;
  icon?: ReactNode | null;
  disabled?: boolean;
  href?: string;
  className?: string;
  inline?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}
const Button = ({
  className,
  size = "md",
  role = "button",
  inline = false,
  isLoading = false,
  ...props
}: iProps) => {
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
      className={`block text-center rounded-lg border
       ${
         role == "link"
           ? "border-none bg-tranparent py-2 text-azure-600"
           : `${!inline && "w-full"} border-primary bg-primary ${
               size == "md" && "p-4"
             } ${size == "sm" && "p-2 px-4 text-sm"}  text-white`
       } transition  ${
        props.disabled ? "!opacity-70" : "hover:bg-opacity-90"
      } ${className}`}
    >
      {isLoading ? <Spinner /> : props.children}
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
