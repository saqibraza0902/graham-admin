"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import TaxesLayout from "@/layout/taxes/TaxesLayout";
import TaxesTable from "@/layout/taxes/TaxesTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { TaxesItemProps } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Taxes = () => {
  const [newTax, setNewTax] = useState([]);
  const [len, setlen] = useState<number | undefined>();
  const [loading, setloading] = useState(true);
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [prevPage, setPrevPage] = useState(page);

  useEffect(() => {
    if (page !== prevPage) {
      setNewTax([]);
      setPrevPage(page);
    }
    const getTaxes = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `/tax/all-taxes/filtration?limit=${limit}&page=${page}`
        );
        setNewTax(data.taxes);
        setlen(data.totalDocuments);
        setloading(false);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getTaxes();
  }, [page, prevPage]);

  const del = async (id: string) => {
    try {
      const { data } = await api.delete(`/tax/${id}`);
      if (data) {
        const filteredArray = newTax.filter(
          (item: TaxesItemProps) => item._id !== id
        );
        setNewTax(filteredArray);
        toast.success(data.msg);
      }
    } catch (error) {
      const err = handleApiError(error);
      toast.error(err);
    }
  };

  return (
    <CommonLayout>
      <TaxesLayout
        title={`Taxes(${newTax.length > 0 ? len : 0})`}
        len={newTax.length > 0 ? len : 0}
      >
        {!loading ? (
          <TaxesTable del={del} page={Number(page)} getTax={newTax} />
        ) : (
          <Loader color="#000" loading={true} />
        )}
      </TaxesLayout>
    </CommonLayout>
  );
};

export default Taxes;
