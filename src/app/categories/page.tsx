"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import CategoryLayout from "@/layout/categories/CategoryLayout";
import CategoryTable from "@/layout/categories/CategoryTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { CategoryItemProps } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Categories = () => {
  const [catsArray, setCatsArray] = useState([]);
  const [loading, setloading] = useState(true);
  const [len, setLen] = useState<number | undefined>();
  const params = useSearchParams();
  const page = params.get("page") || 1;
  useEffect(() => {
    const getCats = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `/category/parent/categories/filtration?limit=${limit}&page=${page}`
        );
        setloading(false);
        setCatsArray(data.categories);
        setLen(data.totalDocuments);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getCats();
  }, [page]);

  const del = async (id: string) => {
    try {
      const { data } = await api.delete(`/category/${id}`);
      if (data) {
        const filtered = catsArray.filter(
          (item: CategoryItemProps) => item._id !== id
        );
        setCatsArray(filtered);
        toast.success(data.msg);
      }
    } catch (error) {
      const err = handleApiError(error);
      toast.error(err);
    }
  };
  return (
    <CommonLayout>
      <CategoryLayout
        title={`Category(${catsArray.length > 0 ? len : 0})`}
        len={catsArray.length > 0 ? len : 0}
        isShow={true}
      >
        {!loading ? (
          <CategoryTable del={del} page={Number(page)} categories={catsArray} />
        ) : (
          <Loader color="#000" />
        )}
      </CategoryLayout>
    </CommonLayout>
  );
};

export default Categories;
