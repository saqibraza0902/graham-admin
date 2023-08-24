/* eslint-disable @next/next/no-img-element */
import { PLANS } from '@/mock/SubsOptions';
import ImageWithFallback from '@/ui/components/ImgComponent';
import FormattedDate from '@/ui/components/formatteddate';
import NotFound from '@/ui/components/notfound';
import { MoreIcon, Verified } from '@/ui/icons';
import { URLS } from '@/utils/URLS';
import IdComponent from '@/utils/formatId';
import { PostAdRowProps, PostAdTable } from '@/utils/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Menu from '../Menu';

const DROPARRAY = [
  {
    title: 'View Owner Profile',
    path: URLS.POST_ADS_USER_PROFILE,
  },
  {
    title: 'Product Page',
  },
];
const PostAdTable = ({ data, page }: PostAdTable) => {
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
        <table
          className="w-full"
          style={{
            borderStyle: 'hidden',
          }}
        >
          <thead>
            <tr className=" text-sm  text-left text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 font-medium py-3 rounded-l-xl">No.</th>
              <th className="px-4 font-medium py-3 text-center">Post ID</th>
              <th className="px-4 font-medium py-3 text-center">Product</th>
              <th className="px-4 font-medium py-3 text-center">Rent</th>
              <th className="px-4 py-3 font-medium text-center">Date</th>
              <th className="px-4 py-3 font-medium text-center">
                Subscription Plan
              </th>
              <th className="px-4 py-3 font-medium text-center">Owner</th>
              <th className="px-4 py-3 font-medium rounded-r-xl text-center"></th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {data.length > 0 && data !== undefined ? (
              <>
                {data?.map((item, index: number) =>
                  item ? (
                    <TableRow
                      key={index}
                      item={item}
                      page={page}
                      index={index}
                      open={index === openRowIndex}
                      handleClick={() => handleRowClick(index)}
                    />
                  ) : null
                )}
              </>
            ) : (
              <NotFound text="Ads not found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostAdTable;

const TableRow = ({
  open,
  handleClick,
  item,
  index = 0,
  page,
}: PostAdRowProps) => {
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3 text-center rounded-l-lg">
          {page && index + 1 + (page - 1) * 5}
        </td>
        <td className="px-4 py-3 text-center">
          <IdComponent text={item._id} />
        </td>
        <td className="px-4 py-3">
          <ProductSection
            img={item.images}
            name={item.add_title}
            city={item?.location?.city}
            category={item.category}
            sub_category={item.sub_category}
          />
        </td>
        <td className="px-4 py-3 text-center">
          €{item.prices.rent_price} /{' '}
          <span className="!capitalize">{item.prices.rented_as}</span>
        </td>
        <td className="px-4 py-3 text-center">
          <FormattedDate date={item.start_date} />
        </td>
        <td className="px-4 py-3 text-center">
          {PLANS.map((el) => {
            if (el.value === item.plan.name) {
              return el.label;
            }
          })}
        </td>
        <td className="px-4 py-3 text-center">{item.created_by?.fullName}</td>
        <td
          onClick={handleClick}
          className="px-4 py-3 rounded-r-lg self-center  cursor-pointer relative"
        >
          <div className="!z-0">
            <MoreIcon />
          </div>
          {open && (
            <div className="absolute top-4 right-7">
              <Menu
                onClose={handleClick}
                seller_id={item.created_by?._id}
                DropArray={DROPARRAY}
              />
            </div>
          )}
        </td>
      </tr>
    </>
  );
};
interface ProductProp {
  img?: string[];
  name: string;
  city: string;
  category: string;
  sub_category: string;
}
const ProductSection = ({
  img,
  name,
  city,
  category,
  sub_category,
}: ProductProp) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[75px] h-[75px] relative">
        <ImageWithFallback
          className="!h-full object-contain !w-full"
          alt=""
          fallbackSrc="/assets/images/prod-alt.png"
          src={img && img[0]}
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-sm font-semibold font-Montserrat leading-[22px]">
          {name}
        </h1>
        <h1 className="text-xs font-Roboto font-medium whitespace-nowrap">
          <span className="text-brand_grey-200">Category</span> {category}{' '}
          <span className="text-brand_grey-200">and</span> {sub_category}
        </h1>
        <h1 className="text-xs font-Roboto ">
          <span className="text-brand_grey-200">City</span> {city}
        </h1>
      </div>
    </div>
  );
};
