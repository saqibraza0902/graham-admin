"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import OrdersLayout from "@/layout/orders/OrdersLayout";
import OrdersTable from "@/layout/orders/OrdersTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [len, setlen] = useState(0);
  const [loading, setloading] = useState(true);
  const params = useSearchParams();
  const page = params.get("page") || 1;
  useEffect(() => {
    const getorders = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `/admin/all/orders?page=${page}&limit=${limit}`
        );
        setOrders(data.orders);
        setloading(false);
        setlen(data.totalDocuments);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getorders();
  }, [page]);
  return (
    <CommonLayout>
      {!loading ? (
        <OrdersLayout
          len={orders?.length > 0 ? len : 0}
          title={`Orders (${orders?.length > 0 ? len : 0})`}
        >
          <OrdersTable orders={orders} page={Number(page)} />
        </OrdersLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default Orders;
