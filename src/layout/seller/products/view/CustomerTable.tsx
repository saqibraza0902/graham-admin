import ImageWithFallback from "@/ui/components/ImgComponent";
import FormattedDate from "@/ui/components/formatteddate";
import { formatCurrency } from "@/utils/currencyFormat";
import { Order } from "@/utils/viewproducttypes";
import Image from "next/image";
import React from "react";

interface Props {
  item?: Order;
}
const CustomerTable = ({ item }: Props) => {
  const lease = () => {
    return (
      <>
        <FormattedDate date={item?.start_date} time={true} /> {` - `}
        <FormattedDate date={item?.end_date} time={true} />
      </>
    );
  };
  const CUSTOMER_DETAILS = [
    {
      title: "Phone No.",
      detail: item?.buyer.phoneNumber,
    },
    {
      title: "Lease",
      detail: lease(),
    },
    {
      title: "Paid",
      detail: formatCurrency(Number(item?.total_price)),
    },
    {
      title: "Price",
      detail: formatCurrency(Number(item?.total_price)),
    },
    {
      title: "Order Date",
      detail: <FormattedDate time={true} date={item?.createdAt} />,
    },
  ];
  return (
    <div className="!w-full  mb-8 flex flex-col lg:flex-row overflow-auto rounded-xl bg-white">
      <div className="w-full flex font-Montserrat gap-4 whitespace-nowrap overflow-x-auto shrink-0 p-3 ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative">
            <ImageWithFallback
              src={item?.buyer.profile_image}
              fallbackSrc="/assets/images/alt-prof.jpg"
              alt="product"
              className="shrink-0 object-contain"
            />
          </div>
          <div className="space-y-1 font-Montserrat">
            <h1 className="text-sm font-bold  whitespace-nowrap">
              {item?.buyer.fullName}
            </h1>
            <h1 className="text-xs">
              <span className="text-brand_grey-500 whitespace-nowrap font-medium">
                {item?.buyer.email}
              </span>
            </h1>
          </div>
        </div>
        {CUSTOMER_DETAILS.map((item, index) => (
          <div className="flex flex-col items-center" key={index}>
            <span className="text-sm text-brand_grey-500">{item.title}</span>
            <span className="text-sm text-brand_black-500 font-medium">
              {item.detail ? item.detail : "---"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTable;
