"use client";
import api from "@/instance/api";
import CommonLayout from "@/layout/CommonLayout";
import BuyerLayout from "@/layout/buyer/BuyerLayout";
import PayOrderTable from "@/layout/payment-orders/PayOrderTable";
import PaymentOrdersLayout from "@/layout/payment-orders/PaymentOrdersLayout";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { AdCreatedBy } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PaymentOrders = () => {
  const id = useAppSelector((state) => state.buyer);
  const [profile, setProfile] = useState<AdCreatedBy | undefined>();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getprofile = async () => {
      try {
        setloading(true);
        const { data } = await api.get(`/admin/user-profile/${id}`);
        setProfile(data);
        setloading(false);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getprofile();
  }, [id]);
  return (
    <CommonLayout>
      {!loading ? (
        <PaymentOrdersLayout isShown={false}>
          <BuyerLayout
            prof={profile}
            tabTitle={profile?.fullName}
            isShow={false}
          />
        </PaymentOrdersLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default PaymentOrders;
