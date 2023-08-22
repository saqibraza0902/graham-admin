import React from "react";
import { SvgProps } from "../SvgProps";

export const LogoutIcon = (props: SvgProps) => {
  return (
    <svg
      width={19}
      height={18}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.75.833c.727 0 1.326.547 1.407 1.251l.01.166v25.5c0 .726-.547 1.325-1.252 1.407l-.165.01h-8.5a1.417 1.417 0 01-.165-2.825l.165-.009h7.084V3.666H19.25a1.417 1.417 0 01-1.407-1.251l-.01-.165c0-.727.547-1.326 1.252-1.407l.165-.01h8.5zM13.035 6.797l.134.118 7.083 7.083c.51.51.55 1.314.118 1.87l-.118.133-7.083 7.084a1.417 1.417 0 01-2.122-1.87l.118-.134 4.664-4.665H2.25a1.417 1.417 0 01-.165-2.824l.165-.009H15.83l-4.664-4.665a1.417 1.417 0 01-.118-1.87l.118-.133a1.417 1.417 0 011.726-.216l.144.098z"
        fill={props.color}
      />
    </svg>
  );
};
