'use client';
import api from '@/instance/api';
import CommonLayout from '@/layout/CommonLayout';
import OrdersLayout from '@/layout/orders/OrdersLayout';
import Invoice from '@/layout/orders/invoices/Invoice';
import Loader from '@/ui/components/loader';
import { handleApiError } from '@/utils/hanldeApiError';
import { Order } from '@/utils/orderTypes';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const param = useSearchParams();
  const id = param.get('id');
  const [invoice, setInvoice] = useState<Order>();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getinvoice = async () => {
      try {
        setloading(true);
        const { data } = await api.get(`/admin/single-order/${id}`);
        setInvoice(data);
        setloading(false);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getinvoice();
  }, [id]);
  return (
    <CommonLayout>
      {!loading ? (
        <OrdersLayout title="Invoice">
          {invoice && <Invoice invoice={invoice} />}
        </OrdersLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default Orders;
