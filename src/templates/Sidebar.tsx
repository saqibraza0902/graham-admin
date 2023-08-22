"use client";
import { SidebarContent } from "@/mock/Sidebar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();
  const [cleanPathname, setCleanPathname] = useState("/");
  const router = useRouter();
  const SidebarData = SidebarContent();
  useEffect(() => {
    const pathnameParts = pathname.split("/"); // Use pathname from usePathname() directly
    const cleanPath = pathnameParts[1] || "";

    setCleanPathname(`/${cleanPath}`);
  }, [pathname]);
  return (
    <div className="bg-white h-max px-5 w-64 py-5 rounded-xl">
      <div className="w-full flex flex-col">
        <div className=" self-center">
          <Image
            src={"/assets/images/logo.png"}
            width={95}
            height={55}
            priority
            className="h-auto w-auto"
            alt="logo"
          />
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
                  item.prefix && cleanPathname.includes(item.prefix)
                    ? "bg-brand_yellow-500"
                    : ""
                }  flex gap-6 cursor-pointer font-Montserrat text-sm relative font-semibold px-2 py-3 rounded-xl`}
                key={index}
              >
                {item.prefix && cleanPathname.includes(item.prefix) && (
                  <div className="bg-brand_yellow-500 h-10 w-[2px] absolute -left-5 top-0" />
                )}
                <i className="w-4">
                  {React.cloneElement(item.icon, {
                    color:
                      item.prefix && cleanPathname.includes(item.prefix)
                        ? "#fff"
                        : "#000",
                  })}
                </i>
                <span
                  className={
                    item.prefix && cleanPathname.includes(item.prefix)
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
  );
};

export default Sidebar;
