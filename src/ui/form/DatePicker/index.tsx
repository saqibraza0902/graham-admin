import { Search } from "@/ui/icons";
import { cn } from "@/utils/styles";
import React, { useRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  InputType: string;
  label?: string;
  error?: string;
  wrapperClassName?: string;
  className?: string;
  rightElement?: React.ReactNode;
}

const DateInput = ({
  InputType,
  label,
  error,
  wrapperClassName,
  className,
  rightElement,
  ...props
}: Props) => {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const handleContainerClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.focus();
    }
  };

  return (
    <div
      className={cn("space-y-1 w-full", wrapperClassName)}
      onClick={() => handleContainerClick()}
    >
      <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
        {label}
      </label>
      <div
        ref={datePickerRef}
        className={cn(
          "flex items-center rounded-10px bg-white relative px-3 rounded-xl",
          {
            "border-brand_red-600": error,
            "focus-within:border-brand_blue-500": !error,
            "pr-4": rightElement,
          },
          className
        )}
      >
        <input
          placeholder="Enter date"
          className={cn(
            "h-12 p-4 w-full rounded-10px bg-transparent  outline-none font-Roboto text-brand_gray-400 placeholder:text-brand_gray-100"
          )}
          type={InputType}
          {...props}
        />
        <Search />
      </div>
    </div>
  );
};

export default DateInput;
