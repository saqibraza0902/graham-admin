import { cn } from "@/utils/styles";
import { OptionType } from "@/utils/types";
import React from "react";
import Select from "react-select";

interface Props {
  placeholder: string;
  className?: string;
  onChange?: any;
  loading?: boolean;
  value?: OptionType | boolean | string | null | number | any;
  options: OptionType[];
  [k: string]: any;
}
const CustomSelect = ({
  options,
  placeholder,
  onChange,
  value,
  loading,
  className,
  rest,
}: Props) => {
  return (
    <Select
      styles={{
        placeholder: (styles: any) => ({
          ...styles,
          whiteSpace: "nowrap",
          color: "#000",
          fontWeight: "revert",
        }),
      }}
      className={cn("react-select-container flex-nowrap ", className)}
      classNamePrefix="react-select"
      placeholder={placeholder}
      options={options}
      isDisabled={loading}
      onChange={onChange}
      isSearchable={false}
      value={value}
      components={{
        IndicatorSeparator: () => null,
        DownChevron: () => <div></div>,
      }}
      {...rest}
    />
  );
};

export default CustomSelect;
