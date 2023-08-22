import React from "react";
import { SvgProps } from "../SvgProps";

export const Persons = (props: SvgProps) => {
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
        d="M9.5 24.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM24.5 24.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM17 9.5A3.75 3.75 0 1017 2a3.75 3.75 0 000 7.5zM17 32a7.5 7.5 0 10-15 0M32 32a7.5 7.5 0 10-15 0M24.5 17a7.5 7.5 0 10-15 0"
        stroke={props.color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PersonsLarge = (props: SvgProps) => {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 38a6 6 0 100-12 6 6 0 000 12zM38 38a6 6 0 100-12 6 6 0 000 12zM26 14a6 6 0 100-12 6 6 0 000 12zM26 50c0-6.628-5.372-12-12-12S2 43.372 2 50M50 50c0-6.628-5.372-12-12-12s-12 5.372-12 12M38 26c0-6.628-5.372-12-12-12s-12 5.372-12 12"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
