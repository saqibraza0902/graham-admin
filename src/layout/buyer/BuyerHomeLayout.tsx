import { limit } from "@/instance/limit";
import Pagination from "@/ui/components/pagination";
import Button from "@/ui/form/Button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  len?: number | undefined;
}
const BuyerHomeLayout = ({ children, len = 0 }: Props) => {
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
    <div className="w-full">
      <h2 className="text-2xl font-semibold font-Nunito">Buyers ({len})</h2>
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row my-5 items-center justify-between">
        <div className="w-full">
          <Button className="rounded-xl md:w-64 h-10 py-0">Buyer</Button>
        </div>
      </div>
      <div>{children}</div>
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
  );
};

export default BuyerHomeLayout;
