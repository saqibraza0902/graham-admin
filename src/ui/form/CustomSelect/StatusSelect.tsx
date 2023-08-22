import { cn } from "@/utils/styles";
import { OptionType } from "@/utils/types";
import React from "react";
import Select from "react-select";
interface Props {
  placeholder: string;
  className?: string;
  value?: OptionType;
  onChange?: any;
  loading?: boolean;
  options: OptionType[];
  [k: string]: any;
}
const StatusSelect = ({
  options,
  value,
  placeholder,
  className,
  loading,
  onChange,
  rest,
}: Props) => {
  return (
    <Select
      styles={{
        placeholder: (styles: any) => ({
          ...styles,
          whiteSpace: "nowrap",
          color: "#000",
        }),
      }}
      className={cn("status-select-container flex-nowrap ", className)}
      classNamePrefix="status-select"
      placeholder={placeholder}
      options={options}
      isDisabled={loading}
      onChange={onChange}
      value={value}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
        DownChevron: () => <div></div>,
      }}
      {...rest}
    />
  );
};

export default StatusSelect;
