import ImageWithFallback from "@/ui/components/ImgComponent";
import FormattedDate from "@/ui/components/formatteddate";
import NotFound from "@/ui/components/notfound";
import Button from "@/ui/form/Button";
import IdComponent from "@/utils/formatId";
import { Order, IProduct } from "@/utils/orderTypes";
import { cn } from "@/utils/styles";
import React from "react";

interface BookingProps {
  orders: Order[];
}
const BookingTable = ({ orders }: BookingProps) => {
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-left text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 font-medium text-center rounded-l-xl">
                Order ID
              </th>
              <th className="px-4 py-3 font-medium text-center">Product</th>
              <th className="px-4 py-3 font-medium text-center">
                Lease Period
              </th>
              <th className="px-4 py-3 font-medium text-center">Total Rent</th>
              <th className="px-4 py-3 font-medium text-center rounded-r-xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {orders?.length > 0 && orders !== undefined ? (
              <>
                {orders?.map((item, index: number) => (
                  <TableRow key={index} item={item} />
                ))}
              </>
            ) : (
              <NotFound text="No orders found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
interface BookingTableRowProps {
  item?: Order;
}
const TableRow = ({ item }: BookingTableRowProps) => {
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white ">
        <td className="px-4 py-3 rounded-l-xl whitespace-nowrap font-Roboto font-medium">
          <span className="flex items-center">
            {item?._id && <IdComponent text={item?._id} />}
          </span>
        </td>
        <td className="px-4 py-3 text-sm ">
          <ProductSection product={item?.product && item?.product} />
        </td>
        <td className="px-4 py-3">
          <PeriodSection
            rented_as={
              item?.product?.prices?.rented_as
                ? item?.product?.prices?.rented_as
                : ""
            }
            time={item?.time_difference ? item?.time_difference : 0}
            start_time={item?.start_date ? item?.start_date : ""}
            end_time={item?.end_date ? item?.end_date : ""}
          />
        </td>
        <td className="px-4 py-3 text-sm font-Roboto font-medium text-center">
          € {item?.total_price}
        </td>
        <td className="px-4 py-3 rounded-r-xl">
          <Button
            className={cn({
              "bg-brand_green-100 capitalize text-brand_green-800 h-10 py-0 font-semibold border-none":
                true,
            })}
          >
            {item?.order_status}
          </Button>
        </td>
      </tr>
    </>
  );
};
interface Prop {
  product: IProduct | undefined;
}
const ProductSection = ({ product }: Prop) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[75px] h-[75px] relative">
        <ImageWithFallback
          src={product?.images[0]}
          fallbackSrc="/assets/images/alt-prof.jpg"
          alt="Product"
          className="object-contain shrink-0"
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-sm font-semibold font-Montserrat leading-[22px]">
          {product?.add_title}
        </h1>
        <h1 className="text-xs font-Roboto whitespace-nowrap">
          <span className="text-brand_grey-200">Category</span>{" "}
          {product?.category} <span className="text-brand_grey-200">and </span>
          {product?.sub_category}
        </h1>
        <h1 className="text-xs font-Roboto ">
          <span className="text-brand_grey-200">City</span>{" "}
          {product?.vendor_details.city}
        </h1>
      </div>
    </div>
  );
};

interface PeriodSectionProps {
  time: number;
  rented_as: string;
  start_time: string;
  end_time: string;
}
const PeriodSection = ({
  end_time,
  rented_as,
  start_time,
  time,
}: PeriodSectionProps) => {
  return (
    <div className="flex items-center justify-center flex-col whitespace-nowrap">
      <h1 className="text-center font-Montserrat font-semibold text-sm">
        {time} {rented_as}
      </h1>
      <h1 className="text-center text-brand_grey-200 font-Montserrat font-medium text-xs">
        <FormattedDate date={start_time} time={true} /> to{" "}
        <FormattedDate date={end_time} time={true} />
      </h1>
    </div>
  );
};
