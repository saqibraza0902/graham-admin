import Sidebar from "@/templates/Sidebar";
import React, { useState } from "react";
import { cn } from "@/utils/styles";
import TopComponent from "@/templates/TopComponent";
import ToggleSidebar from "@/templates/ToggleSidebar";
import withAuth from "@/hooks/withAuth";
interface Props {
  children: React.ReactNode;
  className?: string;
}
const CommonLayout = ({ children, className }: Props) => {
  const [isOpen, setisOpen] = useState(false);
  const toggleSideBar = () => {
    setisOpen((prev) => !prev);
  };
  return (
    <div className={cn("bg-brand_white-500 flex h-full w-full", className)}>
      <div className="pl-5 pt-3 w-max hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex md:hidden">
        <ToggleSidebar
          close={() => {
            setisOpen(false);
          }}
          open={isOpen}
        />
      </div>
      <div className="w-full flex-1 overflow-hidden flex-col">
        <div className="flex flex-col-reverse lg:flex-row justify-end">
          <TopComponent toggle={toggleSideBar} />
        </div>
        <div className="p-3 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default withAuth(CommonLayout);
