import { useAppDispatch } from "@/redux/hooks";
import { buyerId } from "@/redux/slices/buyerslice";
import ImageWithFallback from "@/ui/components/ImgComponent";
import FormattedDate from "@/ui/components/formatteddate";
import NotFound from "@/ui/components/notfound";
import Button from "@/ui/form/Button";
import { MoreIcon, Verified } from "@/ui/icons";
import { URLS } from "@/utils/URLS";
import { IProduct } from "@/utils/orderTypes";
import { cn } from "@/utils/styles";
import {
  IBuyer,
  SellerRowProduct,
  SellerRowProps,
  SellerTableProps,
  SellerTableSellerSection,
} from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface BuyerTableProps {
  data: IBuyer[];
  page?: number;
}
const BuyersTable = ({ data, page = 0 }: BuyerTableProps) => {
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
            <tr className=" text-sm  text-center text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 font-medium rounded-l-xl">No.</th>
              <th className="px-4 py-3 font-medium text-center">Name</th>
              <th className="px-4 py-3 font-medium text-center">Product</th>
              <th className="px-4 py-3 font-medium text-center">Phone</th>
              <th className="px-4 py-3 font-medium text-center">Registered</th>
              <th className="px-4 py-3 font-medium text-center">Varified</th>
              <th className="px-4 py-3 font-medium rounded-r-xl text-center"></th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {data.length > 0 && data !== undefined ? (
              <>
                {data?.map((item, index: number) => (
                  <TableRow
                    key={index}
                    index={index}
                    item={item}
                    page={page}
                    open={index === openRowIndex}
                    handleClick={() => handleRowClick(index)}
                  />
                ))}
              </>
            ) : (
              <NotFound text="No buyer found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyersTable;

interface Props {
  open: boolean;
  handleClick: any;
  index?: number;
  item: IBuyer;
  page: number;
}
const TableRow = ({ open, handleClick, index = 0, item, page }: Props) => {
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white  text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3 rounded-l-lg">
          {page && index + 1 + (page - 1) * 5}
        </td>
        <td className="px-4 py-3">
          <BuyerSection
            profile={item.profile_image}
            email={item.email}
            name={item.fullName}
          />
        </td>
        <td className="px-4 py-3">
          <ProductSection
            product={item.latestProduct && item.latestProduct.product[0]}
          />
        </td>
        <td className="px-4 py-3 text-center">
          {item.phoneNumber ? item.phoneNumber : "---"}
        </td>
        <td className="px-4 py-3">
          <FormattedDate date={item.createdAt} />
        </td>
        <td className="px-4 pt-10  h-full flex justify-center items-center">
          <Verified color={item.varified ? "#0062FF" : "D0E7DC"} />
        </td>
        <td
          onClick={handleClick}
          className="px-4 py-3 rounded-r-lg self-center  cursor-pointer relative"
        >
          <div className="!z-0">
            <MoreIcon />
          </div>
          {open && (
            <div className="absolute top-11 right-7">
              <Dropdown id={item._id} />
            </div>
          )}
        </td>
      </tr>
    </>
  );
};
const BuyerSection = ({ email, name, profile }: SellerTableSellerSection) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 relative">
        <ImageWithFallback
          src={profile}
          fallbackSrc="/assets/images/alt-prof.jpg"
          alt="Seller Profile"
          className="object-contain shrink-0"
        />
      </div>
      <div className="space-y-1 font-Montserrat">
        <h1 className="text-sm font-bold  whitespace-nowrap">{name}</h1>
        <h1 className="text-xs">
          <span className="text-brand_grey-500 whitespace-nowrap font-medium">
            {email}
          </span>
        </h1>
      </div>
    </div>
  );
};

const DROPARRAY = [
  {
    title: "View Profile",
    path: URLS.BUYER_PROFILE,
  },
  {
    title: "View Bookings",
    path: URLS.BUYER_BOOKING,
  },
  {
    title: "View Invoices",
    path: URLS.BUYER_INVOICE,
  },
];
interface DropProps {
  id: string;
}
const Dropdown = ({ id }: DropProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleDropClick = (path: string) => {
    dispatch(buyerId(id));
    router.push(path);
  };
  return (
    <div className="bg-white shadow-2xl rounded-xl relative !z-10">
      <ul className="py-4 font-Montserrat text-xs font-semibold ">
        {DROPARRAY.map((item, index) => (
          <li
            key={index}
            onClick={() => handleDropClick(item.path)}
            className="hover:bg-brand_yellow-500 hover:text-white py-2 w-full px-5 rounded-lg"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
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
          src={product?.images && product.images[0]}
          fallbackSrc="/assets/images/prod-alt.png"
          alt=""
          className="!h-full !w-full object-contain"
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-sm font-semibold font-Montserrat leading-[22px]">
          {product && product.add_title}
        </h1>
        <h1 className="text-xs font-Roboto font-medium whitespace-nowrap">
          <span className="text-brand_grey-200">Category</span>{" "}
          {product && product.category}
          <span className="text-brand_grey-200">and</span>{" "}
          {product && product.sub_category}
        </h1>
        <h1 className="text-xs font-Roboto ">
          <span className="text-brand_grey-200">City</span>{" "}
          {product.location && product.location.city}
        </h1>
      </div>
    </div>
  );
};
