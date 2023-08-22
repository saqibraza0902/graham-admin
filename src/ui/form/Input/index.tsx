import { cn } from "@/utils/styles";
import React from "react";
import Label from "../Label";
import { Search } from "@/ui/icons";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  wrapperClassName?: string;
  label?: string;
  showIcon?: boolean;
  value?: string | number;
  rightElement?: React.ReactNode;
  labelClassName?: string;
}
const Input = ({
  className,
  error = "",
  wrapperClassName,
  label,
  showIcon = true,
  value,
  rightElement,
  labelClassName = "",
  ...props
}: InputProps) => {
  return (
    <div className={cn("space-y-1 w-full", wrapperClassName)}>
      {label && <Label className={labelClassName} text={label} />}
      <div
        className={cn(
          "flex items-center rounded-10px bg-white px-3 rounded-xl",
          {
            "border-brand_red-600": error,
            "focus-within:border-brand_blue-500": !error,
            "pr-4": rightElement,
          },
          className
        )}
      >
        {showIcon && (
          <div>
            <Search />
          </div>
        )}
        <input
          autoComplete="off"
          placeholder="Enter text..."
          {...props}
          value={value}
          className={cn(
            "h-12 p-4 w-full rounded-10px bg-transparent  outline-none font-Roboto text-brand_gray-400 placeholder:text-brand_gray-100"
          )}
        />
        {rightElement && rightElement}
      </div>
    </div>
  );
};

export default Input;
