import { useAppSelector } from "@/redux/hooks";
import { ArrowDownIcon, BellIcon } from "@/ui/icons";
import Image from "next/image";
import React from "react";
import { HiBars3 } from "react-icons/hi2";
interface Props {
  toggle: any;
}
const TopComponent = ({ toggle }: Props) => {
  const t = useAppSelector((s) => s.auth.user);
  return (
    <div className="flex justify-between w-full lg:w-min space-x-10 items-center px-4 lg:px-10 py-3 lg:py-5">
      <div className="flex items-center">
        <div className="flex md:hidden" onClick={() => toggle()}>
          <HiBars3 />
        </div>
        <div className="bg-white h-10 w-10 flex justify-center items-center rounded-xl cursor-pointer">
          <BellIcon />
        </div>
      </div>
      <div className="flex  w-max gap-x-2 py-2 justify-between px-2 items-center bg-white rounded-xl">
        <Image
          src={"/assets/images/alt-prof.jpg"}
          width={28}
          className="object-center"
          height={28}
          alt="profile"
        />
        <span className="text-brand_black-500 text-sm font-semibold font-Nunito">
          {t?.email}
        </span>
        <i className="cursor-pointer">
          <ArrowDownIcon />
        </i>
      </div>
    </div>
  );
};

export default TopComponent;
