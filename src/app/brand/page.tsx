"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import BrandLayout from "@/layout/brand/BrandLayout";
import BrandTable from "@/layout/brand/BrandTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { BrandItemProps } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Brand = () => {
  const [Brands, setBrands] = useState([]);
  const [loading, setloading] = useState(true);
  const [len, setlen] = useState<number | undefined>();
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [prevPage, setPrevPage] = useState(page);

  useEffect(() => {
    if (page !== prevPage) {
      setBrands([]);
      setPrevPage(page);
    }
    const getBrands = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `/brand/all-brands/filtration?limit=${limit}&page=${page}`
        );
        setBrands(data.brands);
        setlen(data.totalDocuments);
        setloading(false);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getBrands();
  }, [page, prevPage]);

  const del = async (id: string) => {
    try {
      const { data } = await api.delete(`/brand/delete/${id}`);
      if (data) {
        const filteredArray = Brands.filter(
          (item: BrandItemProps) => item._id !== id
        );
        setBrands(filteredArray);
        toast.success(data.msg);
      }
    } catch (error) {
      const err = handleApiError(error);
      toast.error(err);
    }
  };
  return (
    <CommonLayout>
      <BrandLayout len={Brands.length > 0 ? len : 0}>
        {!loading ? (
          <BrandTable del={del} page={Number(page)} brands={Brands} />
        ) : (
          <Loader color="#000" />
        )}
      </BrandLayout>
    </CommonLayout>
  );
};

export default Brand;
