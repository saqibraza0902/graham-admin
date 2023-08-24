'use client';
import api from '@/instance/api';
import CommonLayout from '@/layout/CommonLayout';
import BuyerLayout from '@/layout/buyer/BuyerLayout';
import { useAppSelector } from '@/redux/hooks';
import Loader from '@/ui/components/loader';
import { handleApiError } from '@/utils/hanldeApiError';
import { AdCreatedBy } from '@/utils/types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const params = useSearchParams();
  const id = params.get('id');
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
      {!loading ? <BuyerLayout prof={profile} isShow={false} /> : <Loader />}
    </CommonLayout>
  );
};

export default Orders;
