"use client";
import CommonLayout from "@/layout/CommonLayout";
import TaxesLayout from "@/layout/taxes/TaxesLayout";
import TaxesTable from "@/layout/taxes/TaxesTable";
import AddFeeLayout from "@/layout/taxes/add/AddFeeLayout";
import { useSearchParams } from "next/navigation";
import React from "react";

const Taxes = () => {
  const params = useSearchParams();
  const id = params.get("id");
  return (
    <CommonLayout>
      <TaxesLayout title={id ? "Update Tax" : "Add Tax"} isShow={false}>
        <AddFeeLayout />
      </TaxesLayout>
    </CommonLayout>
  );
};

export default Taxes;
