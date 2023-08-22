import ImageWithFallback from "@/ui/components/ImgComponent";
import FormattedDate from "@/ui/components/formatteddate";
import Button from "@/ui/form/Button";
import { Calendar, MoreIcon } from "@/ui/icons";
import IdComponent from "@/utils/formatId";
import { ProductCardProps } from "@/utils/singleproducttypes";
import Image from "next/image";
import React from "react";

interface Props {
  details: ProductCardProps | undefined;
}
const ProductDetailsCard = ({ details }: Props) => {
  const data = [
    {
      title: "Completed",
      order: details?.completed_orders,
    },
    {
      title: "Active",
      order: details?.active_orders,
    },
    {
      title: "Cancelled",
      order: details?.cancelled_orders,
    },
    {
      title: "Pending",
      order: details?.pending_orders,
    },
  ];
  return (
    <div className="!w-full mb-8 flex flex-col lg:flex-row overflow-auto rounded-xl bg-white">
      <div className="w-full lg:w-1/2 flex flex-col overflow-x-auto shrink-0 p-3 border-r-[1px] border-brand_white-400">
        <div className="flex gap-4  items-center">
          <ImageWithFallback
            src={details?.product?.images[0]}
            fallbackSrc="/assets/images/1.png"
            alt="product"
            className="!h-[50px] !w-[50px] object-contain"
          />
          <div className="flex flex-col">
            <span className="font-Roboto text-sm font-medium">
              {details?.product.add_title}
            </span>
            <span className="font-Nunito text-xs flex items-center font-light text-brand_grey-500">
              Product No. -{" "}
              {details?.product._id && (
                <IdComponent text={details?.product._id} />
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex items-center gap-5">
            <div className="flex text-xs flex-col font-Montserrat">
              <span className="text-brand_grey-500 font-medium">Product</span>
              <span className="font-medium">{details?.product.add_title}</span>
            </div>
            <div className="flex text-xs  flex-col">
              <span className="text-brand_grey-500 font-medium">Category</span>
              <span className="font-medium">{details?.product.category}</span>
            </div>
          </div>
          <div>
            <Button className="bg-brand_yellow-500 border-none !h-10 !py-0 px-2">
              View Product
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-3 overflow-x-auto shrink-0 p-3">
        <h4 className="font-Montserrat  font-semibold">Product Data</h4>
        <div className="flex gap-3">
          {data.map((el, index) => (
            <div key={index} className="flex gap-1 flex-col">
              <span className="text-xs text-brand_grey-500">{el.title}</span>
              <span className="text-sm font-semibold">{el.order}</span>
            </div>
          ))}
          <div className="cursor-pointer">
            <MoreIcon />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Calendar />
          </div>
          <span className="text-xs font-semibold">
            Created <FormattedDate date={details?.product.createdAt} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
