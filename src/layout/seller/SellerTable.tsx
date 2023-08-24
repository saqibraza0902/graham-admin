import ImageWithFallback from '@/ui/components/ImgComponent';
import FormattedDate from '@/ui/components/formatteddate';
import NotFound from '@/ui/components/notfound';
import { MoreIcon, Verified } from '@/ui/icons';
import { URLS } from '@/utils/URLS';
import {
  SellerRowProduct,
  SellerRowProps,
  SellerTableProps,
  SellerTableSellerSection,
} from '@/utils/types';
import React, { useState } from 'react';
import Menu from '../Menu';
const DROPARRAY = [
  {
    title: ' View Profile',
    path: URLS.SELLER_PROFILE,
  },
  {
    title: ' View Products',
    path: URLS.SELLER_PRODUCTS,
  },
  {
    title: ' View Bookings',
    path: URLS.SELLER_BOOKING,
  },
  {
    title: ' View Invoice',
    path: URLS.SELLER_INVOICE,
  },
];
const SellerTable = ({ data, page }: SellerTableProps) => {
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
              <th className="px-4 py-3 font-medium rounded-l-xl">No.</th>
              <th className="px-4 py-3 font-medium text-center">Name</th>
              <th className="px-4 py-3 font-medium text-center">Product</th>
              <th className="px-4 py-3 font-medium text-center">Phone</th>
              <th className="px-4 py-3 font-medium text-center">Registered</th>
              <th className="px-4 py-3 font-medium text-center">Varified</th>
              <th className="px-4 py-3 rounded-r-xl font-medium text-center"></th>
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
              <NotFound text="No seller found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerTable;

const TableRow = ({
  open,
  handleClick,
  item,
  index = 0,
  page,
}: SellerRowProps) => {
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white  text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3 rounded-l-lg">
          {page && index + 1 + (page - 1) * 5}
        </td>
        <td className="px-4 py-3">
          <SellerSection
            profile={item.profile_image}
            email={item.email}
            name={item.fullName}
          />
        </td>
        <td className="px-4 py-3">
          <ProductSection product={item.latestProduct} />
        </td>
        <td className="px-4 py-3">{item.phoneNumber}</td>
        <td className="px-4 py-3">
          <FormattedDate date={item.createdAt} />
        </td>
        <td className="px-4 pt-10  h-full flex justify-center items-center">
          <Verified color={item.varified ? '#0062FF' : 'D0E7DC'} />
        </td>
        <td
          onClick={handleClick}
          className="px-4 py-3 rounded-r-lg self-center  cursor-pointer relative"
        >
          <div className="!z-0">
            <MoreIcon />
          </div>
          {open && (
            <div className="absolute -top-11 right-7">
              <Menu
                DropArray={DROPARRAY}
                onClose={handleClick}
                seller_id={item._id}
              />
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

const SellerSection = ({ email, name, profile }: SellerTableSellerSection) => {
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

interface ProductProp {
  img: string[];
  name: string;
  city: string;
  category: string;
  sub_category: string;
}
const ProductSection = ({ product }: SellerRowProduct) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[75px] h-[75px] relative">
        <ImageWithFallback
          src={product?.images[0]}
          fallbackSrc="/assets/images/prod-alt.png"
          alt=""
          className="!h-full !w-full object-contain"
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
          {product.location.city}
        </h1>
      </div>
    </div>
  );
};
