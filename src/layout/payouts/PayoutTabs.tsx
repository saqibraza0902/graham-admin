// import { IconComponent } from "@/utils";
import { cn } from "@/utils/styles";
import React from "react";
// import * as AllIcons from "@/ui/Icon/all-icons";
import { usePathname, useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { FaCoins } from 'react-icons/fa'
import { AiOutlineHistory } from 'react-icons/ai'
type TItem = {
    title: string;
    icon: any;
    pathname: string;
};
const data: TItem[] = [
    {
        icon: <FaCoins />,
        title: "Pending Payouts",
        pathname: URLS.PAYOUT_REQUESTS_PENDING,
    },
    {
        icon: <AiOutlineHistory />,
        title: "History",
        pathname: URLS.PAYOUT_REQUESTS_HISTORY,
    },
];
const PayoutTabs = () => {
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
                        "cursor-pointer  bg-white rounded-xl px-5 py-4 flex items-center gap-4",
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
                        className={cn("text-xs font-semibold whitespace-nowrap", {
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

export default PayoutTabs;
