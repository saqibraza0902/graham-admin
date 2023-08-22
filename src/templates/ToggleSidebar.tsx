"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { SidebarContent } from "@/mock/Sidebar";
interface Props {
  open: boolean;
  close: () => void;
}
const ToggleSidebar = ({ open, close }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const SidebarData = SidebarContent();
  return (
    <div
      className={`fixed inset-y-0 w-full md:w-[50%]  !overflow-hidden z-50  bg-[#F1F1F5] transition-transform duration-300 transform flex lg:hidden
       ${open ? "translate-x-0" : "-translate-x-full"} 
      
      `}
    >
      <div className="bg-white px-5 w-full py-5 rounded-xl">
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center">
            <Image
              src={"/assets/images/logo.png"}
              width={95}
              height={55}
              alt="logo"
            />
            <div onClick={close}>
              <RxCross1 />
            </div>
          </div>
          <div>
            <ul className="py-5 space-y-3">
              {SidebarData.map((item, index) => (
                <li
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    }
                    if (item.pathname) {
                      router.push(item.pathname);
                    }
                  }}
                  className={`${
                    item.prefix && pathname.includes(item.prefix)
                      ? "bg-brand_yellow-500"
                      : ""
                  }  flex gap-6 cursor-pointer font-Montserrat text-sm relative font-semibold px-2 py-3 rounded-xl`}
                  key={index}
                >
                  {item.prefix && pathname.includes(item.prefix) && (
                    <div className="bg-brand_yellow-500 h-10 w-[2px] absolute -left-5 top-0" />
                  )}
                  <i className="w-4">
                    {React.cloneElement(item.icon, {
                      color:
                        item.prefix && pathname.includes(item.prefix)
                          ? "#fff"
                          : "#000",
                    })}
                  </i>
                  <span
                    className={
                      item.prefix && pathname.includes(item.prefix)
                        ? "text-white"
                        : "text-black"
                    }
                  >
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ToggleSidebar;
