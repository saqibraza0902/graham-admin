import React from "react";
import { SvgProps } from "../SvgProps";

export const Search = (props: SvgProps) => {
  return (
    <svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 0a8.5 8.5 0 105.257 15.18l.403.394 3.133 3.133.094.083a1 1 0 001.32-1.497l-3.14-3.141-.395-.385A8.5 8.5 0 008.5 0zm0 2a6.5 6.5 0 110 13 6.5 6.5 0 010-13z"
        fill="#0A1629"
      />
    </svg>
  );
};
