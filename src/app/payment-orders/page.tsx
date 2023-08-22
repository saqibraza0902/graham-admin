"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import PayOrderTable from "@/layout/payment-orders/PayOrderTable";
import PaymentOrdersLayout from "@/layout/payment-orders/PaymentOrdersLayout";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PaymentOrders = () => {
  const s_date = useAppSelector((state) => state.date.start_date);
  const e_date = useAppSelector((state) => state.date.end_date);
  const [loading, setloading] = useState(true);
  const [orders, setorders] = useState([]);
  const [len, setlen] = useState(0);
  const params = useSearchParams();
  const page = params.get("page") || 1;
  useEffect(() => {
    const getorder = async () => {
      try {
        setloading(true);
        setorders([]);
        console.log(e_date, s_date);
        const { data } = await api.get(
          `/admin/orders-with-payment-status-payed?limit=${limit}&page=${page}&start_date=${s_date}&end_date=${e_date}`
        );
        setloading(false);
        setlen(data.totalDocuments);
        setorders(data.orders);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getorder();
  }, [page, s_date, e_date]);
  return (
    <CommonLayout>
      {!loading ? (
        <PaymentOrdersLayout
          page={Number(page)}
          len={orders.length > 0 ? len : 0}
        >
          {orders && <PayOrderTable orders={orders} />}
        </PaymentOrdersLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default PaymentOrders;
