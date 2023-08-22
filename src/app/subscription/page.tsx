"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import SubsLayout from "@/layout/subscription/SubsLayout";
import SubsTable from "@/layout/subscription/SubsTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { SubsItemProps } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Subscription = () => {
  const [Subs, setSubs] = useState([]);
  const [len, setlen] = useState<number | undefined>();
  const [loading, setloading] = useState(true);
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [prevPage, setPrevPage] = useState(page);

  useEffect(() => {
    if (page !== prevPage) {
      setSubs([]);
      setPrevPage(page);
    }
    const getSubs = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `/subscription/all-subscriptions/filtration?limit=${limit}&page=${page}`
        );
        setSubs(data.subscriptions);
        setlen(data.totalDocuments);
        setloading(false);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getSubs();
  }, [page, prevPage]);

  const del = async (id: string) => {
    try {
      const { data } = await api.delete(`/subscription/${id}`);
      if (data) {
        const filteredArray = Subs.filter(
          (item: SubsItemProps) => item._id !== id
        );
        setSubs(filteredArray);
        toast.success(data.msg);
      }
    } catch (error) {
      const err = handleApiError(error);
      toast.error(err);
    }
  };
  return (
    <CommonLayout>
      <SubsLayout
        title={`Subscription Plan(${Subs.length > 0 ? len : 0})`}
        len={Subs.length > 0 ? len : 0}
      >
        {!loading ? (
          <SubsTable del={del} page={Number(page)} subs={Subs} />
        ) : (
          <Loader color="#000" loading={true} />
        )}
      </SubsLayout>
    </CommonLayout>
  );
};

export default Subscription;
