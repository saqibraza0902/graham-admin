import React from "react";
import { SvgProps } from "../SvgProps";

export const Verified = (props: SvgProps) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22 10.5l-2.44-2.79.34-3.69-3.61-.82L14.4 0 11 1.46 7.6 0 5.71 3.19 2.1 4l.34 3.7L0 10.5l2.44 2.79-.34 3.7 3.61.82L7.6 21l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L22 10.5zM9.09 15.22l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"
        fill={props.color}
      />
    </svg>
  );
};
