import { cn } from "@/utils/styles";
import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "h-12 w-full rounded-xl text-center p-4 border border-black text-xs font-Poppins text-white bg-black",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
