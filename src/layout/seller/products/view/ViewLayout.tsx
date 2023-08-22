import ProductDetailsCard from "@/layout/seller/products/ProductDetailsCard";
import CustomerTable from "@/layout/seller/products/view/CustomerTable";
import Loader from "@/ui/components/loader";
import Pagination from "@/ui/components/pagination";
import { ProductCardProps } from "@/utils/singleproducttypes";
import { Order } from "@/utils/viewproducttypes";
import React from "react";

interface Props {
  details: ProductCardProps | undefined;
  customer?: Order[];
  totalPages?: number;
  handlePageChange?: any;
  page?: number;
  loading?: boolean;
}
const ViewLayout = ({
  details,
  customer,
  handlePageChange,
  page,
  loading,
  totalPages = 0,
}: Props) => {
  return (
    <>
      <ProductDetailsCard details={details} />
      <h1 className="font-Montserrat text-xl font-semibold my-5">Customers</h1>
      {!loading ? (
        <>
          {customer?.map((item, index: number) => (
            <CustomerTable item={item} key={index} />
          ))}
          {totalPages > 0 ? (
            <Pagination
              currentPage={Number(page)}
              onPageChange={handlePageChange}
              totalPages={Number(totalPages)}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewLayout;
