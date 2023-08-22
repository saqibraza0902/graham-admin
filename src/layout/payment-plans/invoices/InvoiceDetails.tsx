import FormattedDate from "@/ui/components/formatteddate";
import Button from "@/ui/form/Button";
import { formatCurrency } from "@/utils/currencyFormat";
import { Order } from "@/utils/orderTypes";
import React from "react";

interface IInvoice {
  item: Order;
}
const InvoiceDetails = ({ item }: IInvoice) => {
  const period = () => {
    return (
      <>
        <FormattedDate date={item.start_date} time={true} /> {" - "}
        <FormattedDate date={item.end_date} time={true} />
      </>
    );
  };
  const INVOICE_DETAILS = [
    {
      title: "Invoice No. ",
      detail: item._id,
    },
    {
      title: "Period ",
      detail: period(),
    },
    {
      title: `No of ${item.product.prices.rented_as}`,
      detail: `${item.time_difference} ${item.product.prices.rented_as}`,
    },
    {
      title: "Stock ",
      detail: item.quantity,
    },
    {
      title: `Price per ${item.product.prices.rented_as}`,
      detail: formatCurrency(item.product.prices.rent_price),
    },
    {
      title: "Product ",
      detail: item.product.add_title,
    },
    {
      title: "Rented By ",
      detail: item.seller.fullName,
    },
    {
      title: "Email ",
      detail: item.billing_details.email,
    },
    {
      title: "Phone ",
      detail: item.billing_details.mobile_number,
    },
  ];
  const PAYS = [
    { title: "User Pays", detail: formatCurrency(item.total_price) },
    { title: "Balance", detail: formatCurrency(item.total_price) },
    { title: "You Earned", detail: formatCurrency(item.total_price) },
  ];
  const TAXES = [
    {
      title: "Service Fee",
      detail: formatCurrency(item.service_fee),
    },
    {
      title: "Taxes",
      detail: formatCurrency(item.taxes),
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-start gap-4 lg:items-center lg:justify-between lg:flex-row ">
        <h1 className="text-lg font-semibold flex gap-3">
          Invoice No. : <span className="text-brand_grey-200"> {item._id}</span>
        </h1>
        <Button className="border border-brand_purple-500 text-brand_purple-500 font-semibold bg-transparent h-10 p-0 w-32">
          Print
        </Button>
      </div>
      <div className="mt-8 space-y-4 p-6">
        {INVOICE_DETAILS.map((el, index) => (
          <div className="flex items-center gap-10" key={index}>
            <h1 className="font-semibold text-sm w-28 whitespace-nowrap">
              {el.title}
            </h1>
            <h1 className="font-medium text-sm text-brand_grey-200">
              {el.detail}
            </h1>
          </div>
        ))}
        <div className="h-max w-max border-2 border-brand_gray-900 rounded-lg flex">
          <div className="p-4  border-r-2 border-r-brand_gray-900">
            <h1 className="font-semibold text-sm ">Cost :</h1>
            <h1 className="font-medium text-sm text-brand_gray-200 mt-4">
              Sub Total
            </h1>
          </div>
          <div className="p-4 border-r-2 border-r-brand_gray-900">
            <h1 className="font-semibold text-sm ">Price :</h1>
            <h1 className="font-medium text-sm text-brand_gray-200 mt-4">
              {formatCurrency(item.product.prices.rent_price)}
            </h1>
          </div>
          <div className="p-4">
            <h1 className="font-semibold text-sm ">Detail :</h1>
            <h1 className="font-medium text-sm text-brand_gray-200 mt-4">
              {item.time_difference} / {item.product.prices.rented_as} x{" "}
              {formatCurrency(item.product.prices.rent_price)}
            </h1>
          </div>
        </div>

        {PAYS.map((items, index) => (
          <div key={index} className="flex items-center gap-10">
            <h1 className="font-semibold text-sm w-28">{items.title} :</h1>
            <h1 className="font-medium text-sm text-brand_grey-200">
              {items.detail}
            </h1>
          </div>
        ))}

        <h1 className="text-brand_red-500 text-sm font-medium">
          *we deduct security deposit, city fees, cleaning fees and website
          service fee
        </h1>

        {TAXES.map((item, index) => (
          <div key={index} className="flex items-center gap-10">
            <h1 className="font-semibold text-sm w-28">{item.title}</h1>
            <h1 className="font-medium text-sm text-brand_gray-200">
              {item.detail}
            </h1>
          </div>
        ))}

        <h1 className="text-brand_red-500 text-sm font-medium">
          *taxes are included in your earnings and you are responsible for
          paying these taxes
        </h1>
      </div>
    </div>
  );
};

export default InvoiceDetails;
