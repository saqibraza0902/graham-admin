"use client";
import CommonLayout from "@/layout/CommonLayout";
import Cards from "@/layout/dashboard/Cards";
import React from "react";
import { CardsArray } from "@/mock/Cards";
const Dashboard = () => {
  return (
    <CommonLayout className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
        {CardsArray.map((el, index) => (
          <Cards key={index} Icon={el.Icon} iconcolor={el.color}>
            <h4 className="text-xs font-medium">{el.title}</h4>
            <h5 className="text-lg font-medium" style={{ color: el.color }}>
              {el.desc}
            </h5>
          </Cards>
        ))}
      </div>
    </CommonLayout>
  );
};

export default Dashboard;
