import React from "react";
import { SvgProps } from "../SvgProps";

export const ProductIcon = (props: SvgProps) => {
  return (
    <svg
      width={20}
      height={18}
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32 0H0v9.474h1.6v17.368c0 .838.337 1.64.937 2.233.6.592 1.414.925 2.263.925h22.4c.849 0 1.663-.333 2.263-.925.6-.592.937-1.395.937-2.233V9.474H32V0zM3.2 3.158h25.6v3.158H3.2V3.158zm24 23.684H4.8V9.474h22.4v17.368zM24 12.632v9.473h-3.2v-4.09l-5.264 5.195-2.256-2.226 5.264-5.195H14.4v-3.157H24z"
        fill={props.color}
      />
    </svg>
  );
};
