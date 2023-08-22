"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import BuyerHomeLayout from "@/layout/buyer/BuyerHomeLayout";
import BuyersTable from "@/layout/buyer/BuyersTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Buyer = () => {
  const [buyers, setBuyers] = useState([]);
  const [len, setLen] = useState<number | undefined>();
  const [loading, setloading] = useState(true);
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [prevPage, setPrevPage] = useState(page);
  useEffect(() => {
    if (page !== prevPage) {
      setBuyers([]);
      setPrevPage(page);
    }
    const getAds = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `/admin/get/buyers/filtration?page=${page}&limit=${limit}`
        );
        if (data) {
          setloading(false);
          setBuyers(data.users);
          setLen(data.totalDocuments);
        }
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
      <BuyerHomeLayout len={buyers && buyers.length > 0 ? len : 0}>
        {!loading ? (
          <BuyersTable page={Number(page)} data={buyers} />
        ) : (
          <Loader color="#000" />
        )}
      </BuyerHomeLayout>
    </CommonLayout>
  );
};

export default Buyer;
