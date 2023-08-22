import React from "react";

interface Props {
  Icon: React.FunctionComponent;
  iconcolor: string;
  children: React.ReactNode;
}
const Cards = ({ Icon, iconcolor, children }: Props) => {
  return (
    <div className="bg-white w-full lg:w-56 gap-4 h-20 pl-5  rounded-xl flex items-center justify-start">
      <div
        style={{ background: iconcolor }}
        className={` h-14 w-14 flex justify-center items-center rounded-full`}
      >
        <Icon />
      </div>
      <div className="font-Montserrat">{children}</div>
    </div>
  );
};

export default Cards;
