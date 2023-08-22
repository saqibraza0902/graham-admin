"use client";
import CommonLayout from "@/layout/CommonLayout";
import AddBrandLayout from "@/layout/brand/add/AddBrandLayout";
import BrandTable from "@/layout/brand/BrandTable";
import React from "react";
import { useSearchParams } from "next/navigation";

const Brand = () => {
  const params = useSearchParams();
  const id = params.get("id");
  return (
    <CommonLayout>
      <div>
        <h2 className="text-2xl font-semibold font-Nunito">
          {id ? "Update Brand" : "Add Brand"}
        </h2>
        <div>
          <AddBrandLayout />
        </div>
      </div>
    </CommonLayout>
  );
};

export default Brand;
