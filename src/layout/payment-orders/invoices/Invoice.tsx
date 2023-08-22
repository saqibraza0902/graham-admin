import Image from "next/image";
import React from "react";
import InvoiceDetails from "./InvoiceDetails";
import { IProduct, Order } from "@/utils/orderTypes";
import { formatCurrency } from "@/utils/currencyFormat";
import FormattedDate from "@/ui/components/formatteddate";
import ImageWithFallback from "@/ui/components/ImgComponent";
import IdComponent from "@/utils/formatId";
interface IProps {
  invoice: Order;
}
const InvoiceTable = ({ invoice }: IProps) => {
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 font-medium rounded-l-xl">Order ID</th>
              <th className="px-4 py-3 font-medium text-center">Post ID</th>
              <th className="px-4 py-3 font-medium text-center">Product</th>
              <th className="px-4 py-3 font-medium text-center">Invoice ID</th>
              <th className="px-4 py-3 font-medium text-center">Amount</th>
              <th className="px-4 py-3 font-medium text-center">Date</th>
              <th className="px-4 py-3 font-medium text-center">Buyer Name</th>
              <th className="px-4 py-3 font-medium text-center rounded-r-xl">
                Owner
              </th>
            </tr>
          </thead>
          <tbody className="space-y-6 w-full">
            <TableRow item={invoice} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;

interface IRowProps {
  item: Order;
}
const TableRow = ({ item }: IRowProps) => {
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white  text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3 text-center rounded-l-lg">
          <span className="flex items-center">
            #<IdComponent text={item._id} />
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="flex items-center">
            #<IdComponent text={item.product._id} />
          </span>
        </td>
        <td className="px-4 py-3 ">
          <ProductSection product={item.product} />
        </td>
        <td className="px-4 py-3 text-center">
          {" "}
          <span className="flex items-center">
            #<IdComponent text={item._id} />
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          {formatCurrency(item.total_price)}
        </td>
        <td className="px-4 py-3 text-center">
          <FormattedDate date={item.createdAt} time={true} />
        </td>
        <td className="px-4 py-3 text-center">{item.billing_details.name}</td>
        <td className="px-4 py-3 text-center">{item.seller.fullName}</td>
      </tr>
      <InvoiceDetail item={item} />
    </>
  );
};

interface IDetail {
  item: Order;
}
const InvoiceDetail = ({ item }: IDetail) => {
  return (
    <tr>
      <td colSpan={8}>
        <div className="bg-white flex flex-col w-full border-t border-brand_white-600">
          <div className="lg:w-1/2 lg:self-center py-20">
            <InvoiceDetails item={item} />
          </div>
        </div>
      </td>
    </tr>
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
