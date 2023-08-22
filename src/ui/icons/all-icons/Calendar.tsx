import React from "react";
import { SvgProps } from "../SvgProps";

export const Calendar = (props: SvgProps) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26 5H8a6 6 0 00-6 6v15a6 6 0 006 6h18a6 6 0 006-6V11a6 6 0 00-6-6zM11 2v6M23 2v6M2 14h30"
        stroke="#000"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
