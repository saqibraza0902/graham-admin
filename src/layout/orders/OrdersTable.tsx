import { useAppDispatch } from "@/redux/hooks";
import { buyerId } from "@/redux/slices/buyerslice";
import { setSellerID } from "@/redux/slices/sellerslice";
import ImageWithFallback from "@/ui/components/ImgComponent";
import FormattedDate from "@/ui/components/formatteddate";
import NotFound from "@/ui/components/notfound";
import { MoreIcon, Verified } from "@/ui/icons";
import { URLS } from "@/utils/URLS";
import { formatCurrency } from "@/utils/currencyFormat";
import IdComponent from "@/utils/formatId";
import { IProduct, Order } from "@/utils/orderTypes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TableProps {
  orders: Order[];
  page?: number;
}
const OrdersTable = ({ orders, page }: TableProps) => {
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
              <th className="px-4 py-3 font-medium rounded-l-xl">Order ID</th>
              <th className="px-4 py-3 font-medium text-center">Post ID</th>
              <th className="px-4 py-3 font-medium text-center">Product</th>
              <th className="px-4 py-3 font-medium text-center">Invoice ID</th>
              <th className="px-4 py-3 font-medium text-center">Amount</th>
              <th className="px-4 py-3 font-medium text-center">Date</th>
              <th className="px-4 py-3 font-medium text-center">Buyer Name</th>
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
                    page={page}
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

export default OrdersTable;

interface Props {
  item: Order;
  page?: number;
  open: boolean;
  handleClick: any;
}
const TableRow = ({ item, handleClick, open }: Props) => {
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white  text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3 text-center rounded-l-lg">
          <span className="flex items-center">
            #
            <IdComponent text={item._id} />
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="flex items-center">
            #
            <IdComponent text={item.product._id} />
          </span>
        </td>
        <td className="px-4 py-3 ">
          <ProductSection product={item.product} />
        </td>
        <td className="px-4 py-3 text-center">
          <span className="flex items-center">
            #
            <IdComponent text={item._id} />
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
        <td
          onClick={handleClick}
          className="px-4 py-3 rounded-r-lg self-center  cursor-pointer relative"
        >
          <div className="!z-0">
            <MoreIcon />
          </div>
          {open && (
            <div className="absolute top-11 right-7">
              <Dropdown item={item} />
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

const DROPARRAY = [
  {
    title: "View Buyer Profile",
    path: URLS.ORDERS_VIEW_BUYER,
  },
  {
    title: "View Owner Profile",
    path: URLS.ORDERS_VIEW_SELLER,
  },
  {
    title: "Product Page",
  },
  {
    title: "View Invoice",
    path: URLS.ORDERS_VIEW_INVOICE,
  },
];
interface DropProps {
  item: Order;
}
const Dropdown = ({ item }: DropProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleDropClick = (path: string) => {
    if (path === URLS.ORDERS_VIEW_INVOICE) {
      router.push(`${path}?id=${item._id}`);
    } else {
      dispatch(buyerId(item.buyer._id));
      dispatch(setSellerID(item.seller._id));
      router.push(path);
    }
  };
  return (
    <div className="bg-white shadow-2xl rounded-xl relative !z-10">
      <ul className="py-4 font-Montserrat text-xs font-semibold ">
        {DROPARRAY.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (item.path) {
                handleDropClick(item.path);
              }
            }}
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
