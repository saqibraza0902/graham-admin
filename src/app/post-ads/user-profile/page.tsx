"use client";
import api from "@/instance/api";
import CommonLayout from "@/layout/CommonLayout";
import Profile from "@/layout/Profile";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { AdCreatedBy } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const PostAds = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const [loading, setloading] = useState(true);
  const [profile, setProfile] = useState<AdCreatedBy | undefined>();
  useEffect(() => {
    const getProfile = async () => {
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
    getProfile();
  }, [id]);
  return (
    <CommonLayout>
      {!loading ? (
        <div className="w-full">
          {profile && (
            <h2 className="font-Nunito text-brand_black-500 text-xl font-bold">
              Seller / {profile?.fullName}
            </h2>
          )}
          <div className="flex flex-col lg:flex-row gap-5 mt-5">
            <div className="lg:w-4/12 flex flex-col gap-y-5">
              <Profile prof={profile && profile} />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default PostAds;
