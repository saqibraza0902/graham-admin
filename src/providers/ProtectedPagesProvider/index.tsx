"use client";
import withAuth from "@/hooks/withAuth";
import React from "react";
interface ProtectedPagesProvider {
  children: React.ReactNode;
}
const ProtectedPagesProvider = ({ children }: ProtectedPagesProvider) => {
  return <>{children}</>;
};

export default withAuth(ProtectedPagesProvider);
