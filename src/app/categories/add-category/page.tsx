"use client";
import CommonLayout from "@/layout/CommonLayout";
import CategoryLayout from "@/layout/categories/CategoryLayout";
import AddCatLayout from "@/layout/categories/add/AddCatLayout";
import React from "react";

const Categories = () => {
  return (
    <CommonLayout>
      <CategoryLayout isShow={false} breadcrump=" / Add Category">
        <AddCatLayout />
      </CategoryLayout>
    </CommonLayout>
  );
};

export default Categories;
