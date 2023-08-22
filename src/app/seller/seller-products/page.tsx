"use client";
import api from "@/instance/api";
import CommonLayout from "@/layout/CommonLayout";
import SellerLayout from "@/layout/seller/SellerLayout";
import ProductCard from "@/layout/seller/products/ProductCard";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/ui/components/loader";
import NotFound from "@/ui/components/notfound";
import Pagination from "@/ui/components/pagination";
import { handleApiError } from "@/utils/hanldeApiError";
import { AdCreatedBy } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Seller = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<AdCreatedBy | undefined>();
  const [userProducts, setUserProducts] = useState([]);
  const [len, setlen] = useState<number | undefined>();
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [loading, setloading] = useState(true);
  const id = useAppSelector((state) => state.id);
  const totalPages: number | undefined = len && Math.ceil(len / 3);
  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(page));
    router.push(`?${searchParams.toString()}`);
  };
  const [prevPage, setPrevPage] = useState(page);
  useEffect(() => {
    if (page !== prevPage) {
      setUserProducts([]);
      setPrevPage(page);
    }
    const getsellerproducts = async () => {
      try {
        const userId = id;
        setloading(true);
        const [profileRes, productsRes] = await Promise.all([
          api.get(`/admin/user-profile/${id}`),
          api.post(`/admin/user-adds?limit=3&page=${page}`, { userId }),
        ]);
        setloading(false);
        setUserProducts(productsRes.data.adds);
        setlen(productsRes.data.totalDocuments);
        setProfile(profileRes.data);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getsellerproducts();
  }, [id, page, prevPage]);
  return (
    <CommonLayout>
      {!loading ? (
        <SellerLayout prof={profile} tabTitle="Products">
          {!loading ? (
            <>
              {userProducts.length > 0 && userProducts !== undefined ? (
                <>
                  {userProducts.map((item, index) => (
                    <ProductCard key={index} item={item} />
                  ))}
                  {len && (
                    <Pagination
                      currentPage={Number(page)}
                      onPageChange={handlePageChange}
                      totalPages={Number(totalPages)}
                    />
                  )}
                </>
              ) : (
                <NotFound text="Product not found" />
              )}
            </>
          ) : (
            <Loader />
          )}
        </SellerLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default Seller;
