// import { IconComponent } from "@/utils";
import { cn } from "@/utils/styles";
import React from "react";
// import * as AllIcons from "@/ui/Icon/all-icons";
import { usePathname, useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { BagIcon, Person, Profile } from "@/ui/icons";
type TItem = {
  title: string;
  icon: any;
  pathname: string;
};
const data: TItem[] = [
  {
    icon: <BagIcon />,
    title: "Products",
    pathname: URLS.SELLER_PRODUCTS,
  },
  {
    icon: <Profile />,
    title: "Booking",
    pathname: URLS.SELLER_BOOKING,
  },
  {
    icon: <Profile />,
    title: "Invoices",
    pathname: URLS.SELLER_INVOICE,
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
              "bg-black": el.pathname && pathname.includes(el.pathname),
            }
          )}
        >
          {React.cloneElement(el.icon, {
            color:
              el.pathname && pathname.includes(el.pathname) ? "#fff" : "#000",
          })}
          <h1
            className={cn("text-xs font-semibold", {
              "text-white": el.pathname && pathname.includes(el.pathname),
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
