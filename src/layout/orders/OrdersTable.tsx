import ImageWithFallback from '@/ui/components/ImgComponent';
import FormattedDate from '@/ui/components/formatteddate';
import NotFound from '@/ui/components/notfound';
import { MoreIcon } from '@/ui/icons';
import { URLS } from '@/utils/URLS';
import { formatCurrency } from '@/utils/currencyFormat';
import IdComponent from '@/utils/formatId';
import { IProduct, Order } from '@/utils/orderTypes';
import React, { useState } from 'react';
import Menu from '../Menu';

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
            <div className="absolute -top-7 right-7">
              <Menu
                onClose={handleClick}
                DropArray={[
                  {
                    title: 'View Buyer Profile',
                    path: `${URLS.ORDERS_VIEW_BUYER}?id=${item.buyer._id}`,
                  },
                  {
                    title: 'View Owner Profile',
                    path: `${URLS.ORDERS_VIEW_SELLER}?id=${item.seller._id}`,
                  },
                  {
                    title: 'Product Page',
                  },
                  {
                    title: 'View Invoice',
                    path: `${URLS.ORDERS_VIEW_INVOICE}?id=${item._id}`,
                  },
                ]}
              />
            </div>
          )}
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
          <span className="text-brand_grey-200">Category</span>{' '}
          {product.category} <span className="text-brand_grey-200">and</span>{' '}
          {product.sub_category}
        </h1>
        <h1 className="text-xs font-Roboto ">
          <span className="text-brand_grey-200">City</span>{' '}
          {product.created_by.city}
        </h1>
      </div>
    </div>
  );
};
