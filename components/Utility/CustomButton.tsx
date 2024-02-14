import { ReactNode } from "react";
import Link from "next/link";

enum ButtonTypes {
  "button",
  "submit",
  "reset",
  undefined,
}
interface iProps {
  // type: React.ComponentProps<"button">;
  children: React.ReactNode;
  icon?: ReactNode | null;
  // text: string;
  href?: string;
  onClick?: () => void;
}
const Button = (props: iProps) => {
  const className =
    "inline-flex items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10";
  const Action = props.href ? (
    <Link href={props.href} className={className} />
  ) : (
    <button {...props} className={className} />
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
