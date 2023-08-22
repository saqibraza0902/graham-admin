// import { IconComponent } from "@/utils";
import { cn } from "@/utils/styles";
import React from "react";
// import * as AllIcons from "@/ui/Icon/all-icons";
import { usePathname, useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { Person, Profile } from "@/ui/icons";
type TItem = {
  title: string;
  icon: any;
  prefix: string;
  pathname: string;
};
const data: TItem[] = [
  {
    icon: <Profile />,
    title: "Booking",
    prefix: "/buyer/buyer-booking",
    pathname: URLS.BUYER_BOOKING,
  },
  {
    icon: <Profile />,
    title: "Invoices",
    prefix: "/buyer/buyer-invoice",
    pathname: URLS.BUYER_INVOICE,
  },
];
const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between md:justify-start w-full gap-4 overflow-auto">
      {data.map((el, index) => (
        <div
          onClick={() => {
            router.push(el.pathname);
          }}
          key={index}
          className={cn(
            "cursor-pointer lg:w-40 bg-white rounded-xl px-5 py-2 flex items-center gap-4",
            {
              "bg-black": el.prefix && pathname.includes(el.prefix),
            }
          )}
        >
          {React.cloneElement(el.icon, {
            color: el.prefix && pathname.includes(el.prefix) ? "#fff" : "#000",
          })}
          <h1
            className={cn("text-xs font-semibold", {
              "text-white": el.prefix && pathname.includes(el.prefix),
            })}
          >
            {el.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
