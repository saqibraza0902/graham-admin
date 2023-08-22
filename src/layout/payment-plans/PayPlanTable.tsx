import { PLANS } from "@/mock/SubsOptions";
import ImageWithFallback from "@/ui/components/ImgComponent";
import FormattedDate from "@/ui/components/formatteddate";
import NotFound from "@/ui/components/notfound";
import Button from "@/ui/form/Button";
import { URLS } from "@/utils/URLS";
import { formatCurrency } from "@/utils/currencyFormat";
import IdComponent from "@/utils/formatId";

import { BillingDetails, IProduct, ProcessStatus } from "@/utils/orderTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Order {
  _id: string;
  product: string;
  quantity: number;
  buyer: string;
  seller: string;
  seller_earned: number;
  start_date: string;
  end_date: string;
  time_difference: number;
  total_price: number;
  service_fee: number;
  taxes: number;
  order_status: string;
  payment_status: string;
  process_status: ProcessStatus[];
  billing_details: BillingDetails;
  productInfo: IProduct;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Prop {
  orders: Order[];
}
const PayPlanTable = ({ orders }: Prop) => {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
  const handleRowClick = (index: number) => {
    if (index === openRowIndex) {
      setOpenRowIndex(null);
    } else {
      setOpenRowIndex(index);
    }
  };
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 font-medium rounded-l-xl">Invoice ID</th>
              <th className="px-4 py-3 font-medium text-center">Post ID</th>
              <th className="px-4 py-3 font-medium text-center">Product</th>
              <th className="px-4 py-3 font-medium text-center">Plan</th>
              <th className="px-4 py-3 font-medium text-center">Date</th>
              <th className="px-4 py-3 font-medium text-center">Amount</th>
              <th className="px-4 py-3 font-medium text-center">Owner</th>
              <th className="px-4 py-3 rounded-r-xl font-medium text-center"></th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {orders?.length > 0 && orders !== undefined ? (
              <>
                {orders?.map((item, index: number) => (
                  <TableRow
                    key={index}
                    item={item}
                    open={index === openRowIndex}
                    handleClick={() => handleRowClick(index)}
                  />
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

export default PayPlanTable;

interface RowProp {
  item: Order;
  open: boolean;
  handleClick: any;
}
const TableRow = ({ item }: RowProp) => {
  const router = useRouter();
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white  text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3  text-center rounded-l-lg">
          <span className="flex items-center">
            #{item._id ? <IdComponent text={item._id} /> : ""}
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="flex items-center">
            #{item._id ? <IdComponent text={item.productInfo._id} /> : ""}
          </span>
        </td>
        <td className="px-4 py-3 ">
          <ProductSection product={item.productInfo} />
        </td>
        <td className="px-4 py-3 text-center">
          {PLANS.map((el) => {
            if (el.value === item.productInfo.plan.name) {
              return el.label;
            }
          })}
          {}
        </td>
        <td className="px-4 py-3 text-center">
          {" "}
          <FormattedDate date={item.createdAt} time={true} />
        </td>
        <td className="px-4 py-3 text-center">
          {formatCurrency(item.total_price)}
        </td>
        <td className="px-4 py-3 text-center">
          {item.productInfo.vendor_details.name}
        </td>
        <td className="px-4 py-3 rounded-r-lg self-center  cursor-pointer relative">
          <Button
            onClick={() =>
              router.push(`${URLS.PAYMENT_PLANS_INVOICE}?id=${item._id}`)
            }
            className="bg-brand_yellow-500 border-none font-normal h-10 py-0"
          >
            View Details
          </Button>
        </td>
      </tr>
    </>
  );
};

interface ProductProps {
  product: IProduct;
}
const ProductSection = ({ product }: ProductProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[75px] h-[75px] relative">
        <ImageWithFallback
          src={product.images[0]}
          fallbackSrc="/assets/images/4.png"
          alt="Seller Profile"
          className="object-contain shrink-0"
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-sm font-semibold font-Montserrat leading-[22px]">
          {product.add_title}
        </h1>
        <h1 className="text-xs font-Roboto font-medium whitespace-nowrap">
          <span className="text-brand_grey-200">Category</span>{" "}
          {product.category} <span className="text-brand_grey-200">and</span>{" "}
          {product.sub_category}
        </h1>
        <h1 className="text-xs font-Roboto ">
          <span className="text-brand_grey-200">City</span>{" "}
          {product.created_by.city}
        </h1>
      </div>
    </div>
  );
};
