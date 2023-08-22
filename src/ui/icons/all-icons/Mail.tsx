import { SvgProps } from "../SvgProps";

export const Mail = (props: SvgProps) => {
  return (
    <svg
      width={20}
      height={15}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26 0H2a2 2 0 00-2 2v16a2 2 0 002 2h24a2 2 0 002-2V2a2 2 0 00-2-2zm-2.2 2L14 8.78 4.2 2h19.6zM2 18V2.91l11.43 7.91a1 1 0 001.14 0L26 2.91V18H2z"
        fill="#000"
      />
    </svg>
  );
};
