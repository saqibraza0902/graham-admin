import { limit } from "@/instance/limit";
import Pagination from "@/ui/components/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
  len?: number;
}
const OrdersLayout = ({ title = "Orders (0)", len = 0, children }: Props) => {
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const router = useRouter();
  const totalPages: number | undefined = len && Math.ceil(len / limit);
  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(page));
    router.push(`?${searchParams.toString()}`);
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold font-Nunito">{title}</h2>
      <div className="mt-5">{children}</div>
      <div>
        {len > 0 ? (
          <div>
            <Pagination
              currentPage={Number(page)}
              onPageChange={handlePageChange}
              totalPages={Number(totalPages)}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default OrdersLayout;
