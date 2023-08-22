"use client";
import api from "@/instance/api";
import CommonLayout from "@/layout/CommonLayout";
import SellerLayout from "@/layout/seller/SellerLayout";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { AdCreatedBy } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Seller = () => {
  const id = useAppSelector((state) => state.id);
  const [loading, setloading] = useState(true);
  const [profile, setProfile] = useState<AdCreatedBy | undefined>();
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
      {!loading ? <SellerLayout prof={profile} isShow={false} /> : <Loader />}
    </CommonLayout>
  );
};

export default Seller;
