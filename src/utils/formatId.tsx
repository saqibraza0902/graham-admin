import useCopy from "@/hooks/useCopy";
import { cn } from "@/utils/styles";
import React from "react";
interface InvoiceIDComponentProps {
  text: string;
  className?: string;
}
const IdComponent = ({ text, className }: InvoiceIDComponentProps) => {
  const { handleCopy } = useCopy();
  const truncateString = (full_string: string) => {
    if (!full_string) {
      return "";
    }
    if (full_string.length <= 6) {
      return full_string;
    }
    return `${full_string.slice(0, 3)}...${full_string.slice(-3)}`;
  };
  const handleCopyText = () => {
    handleCopy(text, "Copied successfully!");
  };
  return (
    <div onClick={handleCopyText} className={cn("cursor-pointer", className)}>
      {truncateString(text)}
    </div>
  );
};

export default IdComponent;
