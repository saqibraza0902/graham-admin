import React from "react";
import { SvgProps } from "../SvgProps";

export const TrashIcon = (props: SvgProps) => {
  return (
    <svg
      width={17}
      height={20}
      viewBox="0 0 19 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.333 21.333C1.333 22.8 2.533 24 4 24h10.667c1.466 0 2.666-1.2 2.666-2.667v-16h-16v16zM4 8h10.667v13.333H4V8zm10-6.667L12.667 0H6L4.667 1.333H0V4h18.667V1.333H14z"
        fill="#fff"
      />
    </svg>
  );
};
