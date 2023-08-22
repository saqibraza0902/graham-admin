/* eslint-disable @next/next/no-img-element */
import ImageWithFallback from "@/ui/components/ImgComponent";
import Button from "@/ui/form/Button";
import { URLS } from "@/utils/URLS";
import IdComponent from "@/utils/formatId";
import { SingleSellerAds } from "@/utils/types";
import { useRouter } from "next/navigation";
import React from "react";

const data = [
  {
    title: "Completed",
    order: 34,
  },
  {
    title: "Active",
    order: 1,
  },
  {
    title: "Cancelled",
    order: 10,
  },
  {
    title: "Pending",
    order: 1,
  },
];
const ProductCard = ({ item }: SingleSellerAds) => {
  const router = useRouter();
  return (
    <div className="!w-96  mb-8 flex flex-col lg:flex-row overflow-auto rounded-xl bg-white">
      <div className="w-full flex flex-col overflow-x-auto shrink-0 p-3 ">
        <div className="flex gap-4 items-center">
          <ImageWithFallback
            src={item?.images[0]}
            fallbackSrc="/assets/images/prod-alt.png"
            alt="product"
            className="h-[50px] w-[50px] object-contain"
          />

          <div className="flex flex-col">
            <span className="font-Roboto text-sm font-medium">
              {item.add_title}
            </span>
            <span className="font-Nunito text-xs font-light flex text-brand_grey-500">
              Product No. - <IdComponent text={item._id} />
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex w-full  items-center gap-5">
            <div className="flex text-xs flex-col font-Montserrat">
              <span className="text-brand_grey-500 font-medium">Product</span>
              <span className="font-medium">{item.add_title}</span>
            </div>
            <div className="flex text-xs  flex-col">
              <span className="text-brand_grey-500 font-medium">Category</span>
              <span className="font-medium">{item.category}</span>
            </div>
          </div>
          <div className="flex self-end">
            <Button
              onClick={() =>
                router.push(`${URLS.SELLER_PRODUCTS_VIEW}?id=${item._id}`)
              }
              className="bg-brand_yellow-500 border-none w-max !h-10 !py-0 px-8"
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
