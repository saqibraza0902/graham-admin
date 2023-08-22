"use client";
import api from "@/instance/api";
import CommonLayout from "@/layout/CommonLayout";
import BookingTable from "@/layout/buyer/booking/BookingTable";
import SellerLayout from "@/layout/seller/SellerLayout";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { AdCreatedBy } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Seller = () => {
  const id = useAppSelector((state) => state.id);
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
          api.get(`/admin/seller-orders/${id}?limit=3&page=${page}`),
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
        <SellerLayout
          page={Number(page)}
          len={len}
          prof={profile}
          tabTitle="Order Booked"
        >
          <BookingTable orders={orders} />
        </SellerLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default Seller;
