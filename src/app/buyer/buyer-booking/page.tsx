"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import BuyerLayout from "@/layout/buyer/BuyerLayout";
import BookingTable from "@/layout/buyer/booking/BookingTable";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { AdCreatedBy } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Buyer = () => {
  const id = useAppSelector((state) => state.buyer);
  const [profile, setProfile] = useState<AdCreatedBy | undefined>();
  const [orders, setOrders] = useState([]);
  const [len, setlen] = useState(0);
  const [loading, setloading] = useState(true);
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [prevPage, setPrevPage] = useState(page);
  useEffect(() => {
    if (page !== prevPage) {
      setOrders([]);
      setPrevPage(page);
    }
    const getorders = async () => {
      try {
        setloading(true);
        const [profileRes, ordersRes] = await Promise.all([
          api.get(`/admin/user-profile/${id}`),
          api.get(`/admin/orders/${id}?limit=3&page=${page}`),
        ]);
        setloading(false);
        setOrders(ordersRes.data.orders);
        setlen(ordersRes.data.totalDocuments);
        setProfile(profileRes.data);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getorders();
  }, [id, page, prevPage]);
  return (
    <CommonLayout>
      {!loading ? (
        <BuyerLayout
          page={Number(page)}
          len={len}
          prof={profile}
          tabTitle="Order Booked"
        >
          <BookingTable orders={orders} />
        </BuyerLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default Buyer;
