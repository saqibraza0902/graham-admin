"use client";
import api from "@/instance/api";
import CommonLayout from "@/layout/CommonLayout";
import SellerLayout from "@/layout/seller/SellerLayout";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/ui/components/loader";
import { handleApiError } from "@/utils/hanldeApiError";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ViewLayout from "../../../../layout/seller/products/view/ViewLayout";
import { useSearchParams } from "next/navigation";

const Seller = () => {
  const [loading, setloading] = useState(true);
  const [cloading, setcloading] = useState(true);
  const [profile, setProfile] = useState();
  const [details, setDetails] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [customer, setCustomer] = useState([]);
  const id = useAppSelector((state) => state.id);
  const params = useSearchParams();
  const [prevPage, setPrevPage] = useState(page);
  const Pid = params.get("id");
  useEffect(() => {
    const getProfile = async () => {
      try {
        setloading(true);
        const [profileRes, products] = await Promise.all([
          api.get(`/admin/user-profile/${id}`),
          api.get(`/admin/product-with-orders-detail/${Pid}`),
        ]);
        setloading(false);
        setDetails(products.data);
        setProfile(profileRes.data);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    };
    getProfile();
  }, [id, Pid]);

  useEffect(() => {
    if (page !== prevPage) {
      setCustomer([]);
      setPrevPage(page);
    }
    const getCustomers = async () => {
      try {
        setcloading(true);
        const { data } = await api.get(
          `/admin/completed-order/${Pid}?limit=1&page=${page}`
        );
        setcloading(false);
        setCustomer(data.orders);
        setTotal(data.totalDocuments);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setcloading(false);
      }
    };
    getCustomers();
  }, [page, Pid, prevPage]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <CommonLayout>
      {!loading ? (
        <SellerLayout prof={profile} tabTitle="Product Detail">
          <ViewLayout
            customer={customer}
            loading={cloading}
            handlePageChange={handlePageChange}
            page={page}
            totalPages={total}
            details={details}
          />
        </SellerLayout>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default Seller;
