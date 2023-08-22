import React from "react";
import { SvgProps } from "../SvgProps";

export const MoreIcon = (props: SvgProps) => {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={56} height={56} rx={14} fill="#F5F6FA" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.546 19.091a2.546 2.546 0 11-5.091 0 2.546 2.546 0 015.09 0zm0 8.91a2.546 2.546 0 11-5.091 0 2.546 2.546 0 015.09 0zM28 39.454a2.545 2.545 0 100-5.091 2.545 2.545 0 000 5.09z"
        fill="#0A1629"
      />
    </svg>
  );
};
