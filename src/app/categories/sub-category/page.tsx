"use client";
import api from "@/instance/api";
import { limit } from "@/instance/limit";
import CommonLayout from "@/layout/CommonLayout";
import CategoryLayout from "@/layout/categories/CategoryLayout";
import SubCatTable from "@/layout/categories/sub/SubCatTable";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import { SubCatItemProps } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Categories = () => {
  const [SubCatsArray, setSubCatsArray] = useState([]);
  const [len, setLen] = useState<number | undefined>();
  const [loading, setloading] = useState(true);
  const params = useSearchParams();
  const id = params.get("id");
  const page = params.get("page") || 1;
  useEffect(() => {
    const getSubCats = async () => {
      try {
        setloading(true);
        const { data } = await api.get(
          `category/sub-categories/filtration/${id}?limit=${limit}&page=${page}`
        );
        setloading(false);
        setSubCatsArray(data.subCategories);
        setLen(data.totalDocuments);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getSubCats();
  }, [page, id]);

  const del = async (id: string) => {
    try {
      const { data } = await api.delete(`/category/${id}`);
      if (data) {
        const filtered = SubCatsArray.filter(
          (item: SubCatItemProps) => item._id !== id
        );
        setSubCatsArray(filtered);
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
        len={SubCatsArray.length > 0 ? len : 0}
        isShow={true}
        breadcrump=" / Sub - Category"
      >
        {!loading ? (
          <SubCatTable
            del={del}
            page={Number(page)}
            subCategories={SubCatsArray}
          />
        ) : (
          <Loader color="#000" />
        )}
      </CategoryLayout>
    </CommonLayout>
  );
};

export default Categories;
