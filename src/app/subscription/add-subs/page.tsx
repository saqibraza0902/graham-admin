"use client";
import CommonLayout from "@/layout/CommonLayout";
import SubsLayout from "@/layout/subscription/SubsLayout";
import AddSubsLayout from "@/layout/subscription/add/AddSubsLayout";
import { useSearchParams } from "next/navigation";
import React from "react";

const Subscription = () => {
  const params = useSearchParams();
  const id = params.get("id");
  return (
    <CommonLayout>
      <SubsLayout
        title={id ? "Update Subscription" : "Add Subscription"}
        isShow={false}
      >
        <AddSubsLayout />
      </SubsLayout>
    </CommonLayout>
  );
};

export default Subscription;
