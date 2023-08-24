'use client';
import api from '@/instance/api';
import CommonLayout from '@/layout/CommonLayout';
import PaymentOrdersLayout from '@/layout/payment-orders/PaymentOrdersLayout';
import SellerLayout from '@/layout/seller/SellerLayout';
import Loader from '@/ui/components/loader';
import { handleApiError } from '@/utils/hanldeApiError';
import { AdCreatedBy } from '@/utils/types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PaymentOrders = () => {
  const param = useSearchParams();
  const id = param.get('id');
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
          <SellerLayout prof={profile} isShow={false} />
        </PaymentOrdersLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default PaymentOrders;
