import React from "react";
import { SvgProps } from "../SvgProps";

export const Filter = (props: SvgProps) => {
  return (
    <svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 0h11.093a3 3 0 012.242 4.993l-4.789 5.386v6.385c0 .296-.055.588-.162.863l-.09.202A2.382 2.382 0 018.1 18.894l-.894-.447a3 3 0 01-1.659-2.683V10.38L.758 4.993a3 3 0 01-.75-1.773L0 3a3 3 0 013-3zm11.093 2H3a1 1 0 00-.747 1.664l5.04 5.672a1 1 0 01.253.664v5.764a1 1 0 00.553.894l.895.448a.382.382 0 00.552-.342V10a1 1 0 01.253-.664l5.041-5.672A1 1 0 0014.093 2z"
        fill="#0A1629"
      />
    </svg>
  );
};
