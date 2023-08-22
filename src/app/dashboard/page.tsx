"use client";
import CommonLayout from "@/layout/CommonLayout";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import api from "@/instance/api";
import Loader from "@/ui/components/loader";
const Dashboard = () => {
  const [analytics, setAnalytics] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getdata = async () => {
      try {
        setloading(true);
        const { data } = await api.get("/admin/dashboard-analytics");
        setAnalytics(data);
        setloading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    getdata();
  }, []);
  return (
    <CommonLayout className="overflow-hidden">
      {!loading ? (
        <>{analytics && <DashboardLayout data={analytics} />}</>
      ) : (
        <Loader />
      )}
    </CommonLayout>
  );
};

export default Dashboard;
