import FormattedDate from "@/ui/components/formatteddate";
import NotFound from "@/ui/components/notfound";
import { formatCurrency } from "@/utils/currencyFormat";
import IdComponent from "@/utils/formatId";
import { Order } from "@/utils/orderTypes";
import React from "react";

interface Prop {
  invoices: Order[];
}
const InvoiceTable = ({ invoices }: Prop) => {
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-left text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 font-medium text-center rounded-l-xl">
                Invoice ID
              </th>
              <th className="px-4 py-3 font-medium text-center">Name</th>
              <th className="px-4 py-3 font-medium text-center">Phone No.</th>
              <th className="px-4 py-3 font-medium text-center">Lease</th>
              <th className="px-4 py-3 font-medium text-center">Paid</th>
              <th className="px-4 py-3 font-medium text-center">Price</th>
              <th className="px-4 py-3 font-medium rounded-r-xl text-center">
                Order Date
              </th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {invoices?.length > 0 && invoices !== undefined ? (
              <>
                {invoices?.map((item, index: number) => (
                  <TableRow key={index} item={item} />
                ))}
              </>
            ) : (
              <NotFound text="No invoice found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
interface InvoiceRow {
  item: Order;
}
const TableRow = ({ item }: InvoiceRow) => {
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white whitespace-nowrap font-Roboto font-medium text-sm ">
        <td className="px-4 py-3 rounded-l-lg ">
          <span className="flex items-center">
            {item?._id && <IdComponent text={item?._id} />}
          </span>
        </td>
        <td className="px-4 py-3">{item.billing_details.name}</td>
        <td className="px-4 py-3">{item.billing_details.mobile_number}</td>
        <td className="px-4 py-3">
          <PeriodSection
            start_time={item.start_date}
            end_time={item.end_date}
          />
        </td>
        <td className="px-4 py-3">€ {item.product.prices.rent_price}</td>
        <td className="px-4 py-3 ">
          {formatCurrency(item.product.prices.rent_price)}{" "}
          {/* {item.product.prices.rent_price} */}
        </td>
        <td className="px-4 py-3 rounded-r-lg ">
          <FormattedDate date={item.createdAt} />
        </td>
      </tr>
    </>
  );
};

interface Props {
  start_time?: string;
  end_time?: string;
}
const PeriodSection = ({ end_time, start_time }: Props) => {
  return (
    <div className="flex items-center font-Montserrat font-semibold text-sm justify-center flex-col whitespace-nowrap text-brand_grey-200">
      <h1 className="text-center">
        <FormattedDate date={start_time} time={true} />
      </h1>
      <h1 className="text-center  ">
        <FormattedDate date={end_time} time={true} />
      </h1>
    </div>
  );
};
