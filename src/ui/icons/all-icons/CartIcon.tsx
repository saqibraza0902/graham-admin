import React from "react";
import { SvgProps } from "../SvgProps";

export const CartIcon = (props: SvgProps) => {
  return (
    <svg
      width={30}
      height={27}
      viewBox="0 0 50 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M49.558 10.979A2.478 2.478 0 0047.52 9.91H13.66l-2.86-6.863A4.94 4.94 0 006.226 0H.446v4.955h5.78L17.98 33.164a2.477 2.477 0 002.287 1.523h19.821a2.484 2.484 0 002.322-1.605l7.433-19.821a2.478 2.478 0 00-.285-2.282zM38.37 29.732H21.92l-6.194-14.866h28.221l-5.575 14.866zM21.504 44.6a3.717 3.717 0 100-7.433 3.717 3.717 0 000 7.433zM38.85 44.6a3.716 3.716 0 100-7.433 3.716 3.716 0 000 7.433z"
        fill="#fff"
      />
    </svg>
  );
};
