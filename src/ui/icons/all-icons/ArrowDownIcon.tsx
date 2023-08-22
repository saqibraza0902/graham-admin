import React from "react";
import { SvgProps } from "../SvgProps";

export const ArrowDownIcon = (props: SvgProps) => {
  return (
    <svg
      width={10}
      height={6}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.707.293a1 1 0 01.083 1.32l-.083.094-4 4a1 1 0 01-1.32.083l-.094-.083-4-4A1 1 0 011.613.21l.094.083L5 3.585 8.293.293A1 1 0 019.613.21l.094.083z"
        fill="#0A1629"
      />
    </svg>
  );
};

export const ChevArrowDown = (props: SvgProps) => {
  return (
    <svg
      width={18}
      height={10}
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1l8 8 8-8"
        stroke="#92929D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
