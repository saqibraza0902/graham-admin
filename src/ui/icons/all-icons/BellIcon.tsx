import React from "react";
import { SvgProps } from "../SvgProps";

export const BellIcon = (props: SvgProps) => {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0a7.3 7.3 0 017.296 7.06l.004.241v4.5a1.7 1.7 0 001.553 1.695l.28.013c1.111.12 1.154 1.731.128 1.965l-.128.021-.133.007H1l-.133-.007c-1.156-.124-1.156-1.862 0-1.986l.28-.013a1.7 1.7 0 001.547-1.547l.006-.147v-4.5A7.3 7.3 0 0110 0zm1.557 17.103a1 1 0 01.865 1.502 2.8 2.8 0 01-4.844 0 1 1 0 01.752-1.496l.113-.006h3.114zM4.704 7.083A5.3 5.3 0 0115.3 7.3v4.5l.005.197.023.258c.052.426.176.829.36 1.197l.026.049H4.285l.027-.049.1-.217a3.69 3.69 0 00.288-1.434v-4.5l.004-.22z"
        fill="#0A1629"
      />
    </svg>
  );
};
