"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import PostAdLayout from "@/layout/post-ads/PostAdLayout";
import PostAdTable from "@/layout/post-ads/PostAdTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PostAds = () => {
  const [Ads, setAds] = useState([]);
  const [loading, setloading] = useState(true);
  const [len, setlen] = useState<number | undefined>();
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [prevPage, setPrevPage] = useState(page);

  useEffect(() => {
    if (page !== prevPage) {
      setAds([]);
      setPrevPage(page);
    }
    const getAds = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `/admin/add-posts?page=${page}&limit=${limit}`
        );
        setAds(data.adds);
        setlen(data.totalDocuments);
        setloading(false);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getAds();
  }, [page, prevPage]);
  return (
    <CommonLayout>
      <PostAdLayout len={Ads && Ads.length > 0 ? len : 0}>
        {!loading ? (
          <PostAdTable data={Ads} page={Number(page)} />
        ) : (
          <Loader color="#000" />
        )}
      </PostAdLayout>
    </CommonLayout>
  );
};

export default PostAds;
