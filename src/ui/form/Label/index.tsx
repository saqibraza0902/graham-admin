import { cn } from "@/utils/styles";
import React from "react";
interface LabelProps {
  text: string;
  className?: string;
}
const Label = ({ text, className }: LabelProps) => {
  return (
    <div
      className={cn("font-Montserrat text-18px text-brand_gray-200", className)}
    >
      {text}
    </div>
  );
};

export default Label;
