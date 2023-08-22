"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import SellerHomeLayout from "@/layout/seller/SellerHomeLayout";
import SellerTable from "@/layout/seller/SellerTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Seller = () => {
  const [Ads, setAds] = useState([]);
  const [len, setLen] = useState<number | undefined>();
  const [loading, setloading] = useState(true);
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [prevPage, setPrevPage] = useState(page);
  useEffect(() => {
    if (page !== prevPage) {
      setAds([]);
      setPrevPage(page);
    }
    const getAds = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `/admin/get/sellers/filtration?page=${page}&limit=${limit}`
        );
        setloading(false);
        setAds(data.users);
        setLen(data.totalDocuments);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getAds();
  }, [page, prevPage]);
  return (
    <CommonLayout>
      <SellerHomeLayout len={Ads && Ads.length > 0 ? len : 0}>
        {!loading ? (
          <SellerTable page={Number(page)} data={Ads} />
        ) : (
          <Loader color="#000" />
        )}
      </SellerHomeLayout>
    </CommonLayout>
  );
};

export default Seller;
