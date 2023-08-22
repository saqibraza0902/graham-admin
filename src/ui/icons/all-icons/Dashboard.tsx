import React from "react";
import { SvgProps } from "../SvgProps";

export const Dashboard = (props: SvgProps) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.667 3.333v3.334H20V3.333h6.667zM10 3.333v10H3.333v-10H10zm16.667 13.334v10H20v-10h6.667zM10 23.333v3.334H3.333v-3.334H10zM30 0H16.667v10H30V0zM13.333 0H0v16.667h13.333V0zM30 13.333H16.667V30H30V13.333zM13.333 20H0v10h13.333V20z"
        fill={props.color}
      />
    </svg>
  );
};
