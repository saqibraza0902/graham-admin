import Pagination from "@/ui/components/pagination";
import Button from "@/ui/form/Button";
import { URLS } from "@/utils/URLS";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  isShow?: boolean;
  title?: string;
  children: React.ReactNode;
  len?: number;
}
const SubsLayout = ({
  isShow = true,
  title = "Subscription Plan",
  len = 0,
  children,
}: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const totalPages: number | undefined = len && Math.ceil(len / 5);
  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(page));
    router.push(`?${searchParams.toString()}`);
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold font-Nunito">{title}</h2>
      {isShow && (
        <div className="flex justify-end my-5">
          <Button
            onClick={() => router.push(URLS.ADD_SUBSCRIPTION)}
            className="font-Montserrat font-medium w-max px-8 h-10 py-0 bg-brand_yellow-500 border-none"
          >
            Add New Subscription
          </Button>
        </div>
      )}
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
        <></>
      )}
    </div>
  );
};

export default SubsLayout;
